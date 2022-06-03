import Posts from "components/NewsfeedPage/Post";
import PostUpdateModal from "components/NewsfeedPage/Post/PostUpdateModal";
import React from "react";
import { useSelector } from "react-redux";
import { authState$ } from "redux/selectors";
import styled from "styled-components";
import Account from "./Account";

const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: var(--max-width);
  width: 100%;
  padding: 78px 0px 0;
  margin: 0 auto;
  gap: 5px;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 54px 0 0;
    max-width: 100%;
  }
`;

export default function Profile({ isProfileLoading }) {
  const { currentUser } = useSelector(authState$);

  return (
    <ProfileContainer>
      <Account isLoading={isProfileLoading} />
      <Posts direction="right" />
      {currentUser && <PostUpdateModal user={currentUser} />}
    </ProfileContainer>
  );
}
