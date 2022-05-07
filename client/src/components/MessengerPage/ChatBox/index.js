import { Icon } from "@iconify/react";
import React, { useContext, useEffect } from "react";
import {
  ChatBoxBottom,
  ChatBoxTop,
  ChatBoxWrapper,
  ChatInput,
  ChatMessages,
  ChatOptions,
  ChatSubmitButton,
  FriendAvatar,
  FriendInfo,
  FriendName,
  MessageAvatar,
  MessageContainer,
  MessageOptions,
  MessageText,
  NoConv,
  OptionItem,
} from "./ChatBoxElements";
import * as api from "api";
import { SocketContext } from "context/socketContext";

export default function ChatBox({ handleLastMessage, currentChat, currentUser }) {
  const [friend, setFriend] = React.useState(null);
  const [messages, setMessages] = React.useState([]);
  const [newMessage, setNewMessage] = React.useState("");
  const [arrivalMessage, setArrivalMessage] = React.useState(null);
  const scrollRef = React.useRef();
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("getMessage", ({ message }) => {
      setArrivalMessage(message);
      handleLastMessage(message.conversationId, message);
    });
  }, [socket, handleLastMessage]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.some((member) => member._id === arrivalMessage.sender._id) &&
      setMessages((prev) => {
        arrivalMessage.lastChild = true;
        if (prev.length !== 0) {
          if (arrivalMessage.sender._id === prev[prev.length - 1].sender._id) {
            prev[prev.length - 1].lastChild = false;
          }
        }
        return [...prev, arrivalMessage];
      });
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const findFriend = () => {
      const user = currentChat?.members?.find((member) => member._id !== currentUser._id);
      setFriend(user);
    };

    if (currentChat) findFriend();

    return () => {
      setFriend(null);
    };
  }, [currentChat, currentUser]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await api.MessageAPI.getMessages(currentChat._id);

        // Handle last child message of user
        const handledMessages = res.data.reduce((acc, curValue, curIndex) => {
          curValue.lastChild = true;

          if (curIndex !== 0) {
            if (curValue.sender._id === acc[curIndex - 1].sender._id) {
              acc[curIndex - 1].lastChild = false;
            }
          }

          return [...acc, curValue];
        }, []);

        setMessages(handledMessages);
      } catch (error) {
        console.log(error);
      }
    };

    if (currentChat) {
      getMessages();
    }

    return () => {
      setMessages([]);
    };
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = {
      conversationId: currentChat._id,
      text: newMessage,
    };

    try {
      await api.MessageAPI.createMessage(message).then((res) => {
        setMessages([...messages, res.data]);
        handleLastMessage(res.data.conversationId, res.data);
        setNewMessage("");

        socket.emit("sendMessage", {
          receiverId: friend._id,
          message: res.data,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  React.useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ChatBoxWrapper>
      {currentChat && friend ? (
        <>
          <ChatBoxTop>
            <FriendSection friend={friend} />
          </ChatBoxTop>
          <ChatMessages>
            {messages?.map((message) => (
              <div key={message._id} ref={scrollRef}>
                <Message message={message} own={message.sender._id === currentUser._id} />
              </div>
            ))}
          </ChatMessages>
          <ChatBoxBottom>
            <ChatOptions>
              <OptionItem>
                <Icon icon="clarity:picture-line" color="#fe3456" />
              </OptionItem>
              <OptionItem>
                <Icon icon="carbon:face-satisfied" color="#fe3456" />
              </OptionItem>
            </ChatOptions>
            <ChatInput
              type="text"
              placeholder="Aa"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleEnter}
            />
            <ChatSubmitButton onClick={handleSubmit}>
              <Icon icon="fluent:send-16-regular" />
            </ChatSubmitButton>
          </ChatBoxBottom>
        </>
      ) : (
        <NoConv>No conversation</NoConv>
      )}
    </ChatBoxWrapper>
  );
}

const Message = ({ message, own }) => {
  return (
    <MessageContainer className={own ? "own" : ""}>
      {own ? null : message.lastChild ? (
        <MessageAvatar src={message.sender.avatar} alt="" />
      ) : (
        <div style={{ padding: "10px" }}></div>
      )}
      <MessageText>{message.text}</MessageText>
      <MessageOptions>
        <div className="react-option">
          <Icon icon="akar-icons:heart" />
        </div>
        <div className="more-option">
          <Icon icon="akar-icons:more-horizontal" />
        </div>
      </MessageOptions>
    </MessageContainer>
  );
};

const FriendSection = ({ friend }) => {
  return (
    <FriendInfo to={`/profile/${friend._id}`}>
      <FriendAvatar src={friend.avatar} alt="" />
      <FriendName>{friend.fullName}</FriendName>
    </FriendInfo>
  );
};
