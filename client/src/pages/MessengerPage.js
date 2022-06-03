import Header from "components/Header";
import ChatMenu from "components/MessengerPage/ChatMenu";
import React from "react";
import { useSelector } from "react-redux";
import { authState$ } from "redux/selectors";
import styled from "styled-components";
import * as api from "api";
import { useHistory } from "react-router-dom";
import ChatBox from "components/MessengerPage/ChatBox";

const Messenger = styled.div`
  display: flex;
  height: 100vh;
  padding: 78px 16px 16px;
  margin: 0 auto;
  max-width: var(--max-width);

  @media (max-width: 700px) {
    padding: 54px 0 0;
  }
`;

const MessengerWrapper = styled.div`
  flex: 1;
  display: flex;
  background-color: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 3px;
`;

export default function MessengerPage() {
  const history = useHistory();
  const [currentChat, setCurrentChat] = React.useState(null);
  const [conversations, setConversations] = React.useState([]);
  const { currentUser } = useSelector(authState$);

  React.useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await api.ConversationAPI.getConversations();

        setConversations(res.data);
        history.push(`/messages/${res.data[0]._id}`);
        setCurrentChat(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser) {
      getConversations();
    } else {
      setConversations([]);
    }
  }, [currentUser, history]);

  const handleLastMessage = (convId, message) => {
    const updatedConv = conversations.find((conv) => conv._id === convId);
    if (updatedConv) {
      updatedConv.lastMessage = message.text;
      updatedConv.updatedAt = message.createdAt;

      const newConversations = conversations.filter((conv) => conv._id !== convId);
      setConversations([updatedConv, ...newConversations]);
    }
  };

  const handlefindConv = (conv) => {
    if (conversations.some((c) => c._id === conv._id)) {
      setCurrentChat(conv);
      history.push(`/messages/${conv._id}`);
    } else {
      setConversations((prev) => [conv, ...prev]);
      setCurrentChat(conv);
      history.push(`/messages/${conv._id}`);
    }
  };

  if (!currentUser) {
    history.push("/");
  }

  return (
    <>
      <Header />
      <Messenger>
        <MessengerWrapper>
          <ChatMenu
            onFindConv={handlefindConv}
            conversations={conversations}
            currentUser={currentUser}
            setCurrentChat={setCurrentChat}
          />
          <ChatBox
            handleLastMessage={handleLastMessage}
            currentChat={currentChat}
            currentUser={currentUser}
          />
        </MessengerWrapper>
      </Messenger>
    </>
  );
}
