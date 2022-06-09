import React from "react";
import styled from "styled-components";
import PostList from "./Post";
import PostUpdateModal from "./Post/PostUpdateModal";
import { authState$ } from "redux/selectors";
import { useSelector } from "react-redux";
import PostChart from "./PostChart";
import OnlineUserSection from "./OnlineUserSection";
// import OnlineUserSection from "./OnlineUserSection";

const NewsFeedContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: var(--max-width);
  width: 100%;
  padding: 78px 0px 0;
  margin: 0 auto;
  gap: 10px;

  @media (max-width: 1024px) {
    padding: 54px 0 0;
    flex-direction: column;
  }

  @media (max-width: 700px) {
    padding: 54px 0 0;
  }
`;

const NewsFeedRight = styled.div`
  padding-right: 16px;
  flex: 1;

  @media (max-width: 1024px) {
    padding-right: 0;
  }
`;

const NewsFeed = () => {
  const { currentUser } = useSelector(authState$);

  return (
    <NewsFeedContainer>
      <PostList direction="left" />
      <NewsFeedRight>
        <PostChart />
        {currentUser && <OnlineUserSection />}
      </NewsFeedRight>
      {currentUser && <PostUpdateModal user={currentUser} />}
    </NewsFeedContainer>
  );
};

export default NewsFeed;
