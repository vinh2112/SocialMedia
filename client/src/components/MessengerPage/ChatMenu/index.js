import React, { useRef } from "react";
import {
  ChatMenuContainer,
  ChatMenuTop,
  ChatMenuWrapper,
  ChatSearchButton,
  ChatSearchWrapper,
  ConvAvatar,
  ConversationContainer,
  ConvLastMessage,
  ConvName,
  ChatSearchTop,
  ChatBackButton,
  ChatSearchSection,
  ChatSearchInput,
  ChatSearchQuery,
  ChatSearchBottom,
  SearchResults,
  UserContainer,
  UserAvatar,
  UserName,
} from "./ChatMenuElements";
import moment from "moment";
import { Icon } from "@iconify/react";
import * as api from "api";
import DefaultAvatar from "assets/images/DefaultAvatar.jpg";

export default function ChatMenu({ onFindConv, conversations, currentUser, setCurrentChat }) {
  const [isSearching, setIsSearching] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [users, setUsers] = React.useState([]);
  const typingTimeout = useRef(null);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = setTimeout(() => {
      handleSubmitSearch(value);
    }, 500);
  };

  const handleSubmitSearch = async (value) => {
    try {
      await api.UserAPI.searchUsers(value).then((res) => {
        setUsers(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = () => {
    setIsSearching(!isSearching);
    setQuery("");
    setUsers([]);
  };

  return (
    <ChatMenuContainer isSearching={isSearching}>
      <ChatMenuWrapper isSearching={isSearching}>
        <ChatMenuTop>
          <div className="chat-title">Chat</div>
          <ChatSearchButton onClick={() => setIsSearching(!isSearching)}>
            <Icon icon="akar-icons:chat-edit" />
          </ChatSearchButton>
        </ChatMenuTop>
        <div style={{ padding: "8px" }}>
          {conversations.map((c) => (
            <div key={c._id} onClick={() => setCurrentChat(c)}>
              <Conversation conversation={c} currentUser={currentUser} />
            </div>
          ))}
        </div>
      </ChatMenuWrapper>

      <ChatSearchWrapper isSearching={isSearching}>
        <ChatSearchTop>
          <ChatBackButton onClick={handleBack}>
            <Icon icon="eva:arrow-back-fill" />
          </ChatBackButton>
          <ChatSearchSection>
            <Icon icon="bx:search" id="search-icon" />
            <ChatSearchInput type="text" placeholder="Search..." value={query} onChange={handleSearch} />
          </ChatSearchSection>
        </ChatSearchTop>

        <ChatSearchBottom>
          {query && (
            <ChatSearchQuery>
              <Icon icon="bx:search" id="search-icon" />
              <div>Search for "{query}"</div>
            </ChatSearchQuery>
          )}

          {users.length !== 0 && (
            <SearchResults>
              {users.map((user) => (
                <UserSearch key={user._id} user={user} onFindConv={onFindConv} handleBack={handleBack} />
              ))}
            </SearchResults>
          )}
        </ChatSearchBottom>
      </ChatSearchWrapper>
    </ChatMenuContainer>
  );
}

const Conversation = ({ conversation, currentUser }) => {
  const [friend, setFriend] = React.useState(null);

  React.useEffect(() => {
    const user = conversation.members.find((member) => member._id !== currentUser._id);
    setFriend(user);
  }, [currentUser, conversation]);

  return (
    <ConversationContainer to={`/messages/${conversation._id}`} activeClassName="active">
      <div className="conv-content">
        <ConvAvatar src={friend?.avatar || DefaultAvatar} alt="" />
        <div>
          <ConvName seen={true}>{friend?.fullName}</ConvName>
          {conversation.lastMessage && (
            <ConvLastMessage>
              {conversation.lastMessage} • {moment(conversation.updatedAt).toNow(true)}
            </ConvLastMessage>
          )}
        </div>
      </div>

      {/* {!conversation.seen && <span className="badge"></span>} */}
    </ConversationContainer>
  );
};

const UserSearch = ({ user, onFindConv, handleBack }) => {
  const handleOnClick = async (receiverId) => {
    try {
      await api.ConversationAPI.findConversation(receiverId).then((res) => {
        onFindConv(res.data);
        handleBack();
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContainer onClick={() => handleOnClick(user._id)}>
      <UserAvatar alt="" src={user.avatar || DefaultAvatar} />
      <UserName>{user.fullName}</UserName>
    </UserContainer>
  );
};
