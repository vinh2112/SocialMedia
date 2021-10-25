import React from "react";
import UserSuggestion from "./UserSuggestion";
import styled from "styled-components";
import PostList from "./Post";
import PostUpdateModal from "./Post/PostUpdateModal";
import { authState$ } from "redux/selectors";
import { useSelector } from "react-redux";

const NewsFeedContainer = styled.div`
  display: flex;
  max-width: var(--max-width);
  width: 100%;
  padding: 80px 16px 0;
  margin: 0 auto;

  @media (max-width: 700px) {
    padding: 68px 0 0;
  }
`;

const NewsFeed = () => {
  const { currentUser } = useSelector(authState$);
  return (
    <NewsFeedContainer>
      <PostList direction="left" />
      <UserSuggestion />
      {currentUser && <PostUpdateModal user={currentUser} />}
    </NewsFeedContainer>
  );
};

export default NewsFeed;
