import Posts from "components/NewsfeedPage/Post";
import React from "react";
import styled from "styled-components";
import Account from "./Account";

const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: var(--max-width);
  width: 100%;
  padding: 80px 16px 0;
  margin: 0 auto;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 54px 0 0;
  }
`;

export default function Profile() {
  return (
    <ProfileContainer>
      <Account />
      <Posts direction="right" />
    </ProfileContainer>
  );
}
