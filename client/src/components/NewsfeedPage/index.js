import React, { useEffect } from "react";
import styled from "styled-components";
import PostList from "./Post";
import PostUpdateModal from "./Post/PostUpdateModal";
import { authState$ } from "redux/selectors";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import PostChart from "./PostChart";

const NewsFeedContainer = styled.div`
  display: flex;
  max-width: var(--max-width);
  width: 100%;
  padding: 80px 16px 0;
  margin: 0 auto;

  @media (max-width: 1024px) {
    flex-direction: column;
  }

  @media (max-width: 700px) {
    padding: 68px 0 0;
  }
`;

const NewsFeed = () => {
  const { currentUser } = useSelector(authState$);
  // const history = useHistory();
  // useEffect(() => {
  //   console.log(currentUser);
  //   const { avatar } = currentUser;
  //   if (avatar === "") {
  //     history.push("/setting/info");
  //   }
  // });
  return (
    <NewsFeedContainer>
      <PostList direction="left" />
      <PostChart />
      {currentUser && <PostUpdateModal user={currentUser} />}
    </NewsFeedContainer>
  );
};

export default NewsFeed;
