import React from "react";
import { AccountContainer, AccountWrapper } from "./AccountElements";
import UserInfo from "./UserInfo";

export default function Account() {
  return (
    <AccountContainer>
      <AccountWrapper>
        <UserInfo />
      </AccountWrapper>
    </AccountContainer>
  );
}
