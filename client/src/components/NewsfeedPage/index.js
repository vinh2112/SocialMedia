import React from "react";
import UserSuggestion from "./UserSuggestion";
import styled from "styled-components";
import PostList from "./Post";

const NewsFeedContainer = styled.div`
  max-width: var(--max-width);
  width: 100%;
  padding: 80px 16px 0;
  margin: 0 auto;

  @media (max-width: 700px) {
    padding: 68px 0 0;
  }
`;

const NewsFeed = () => {
  return (
    <NewsFeedContainer>
      <PostList />
      <UserSuggestion />
    </NewsFeedContainer>
  );
};

export default NewsFeed;
