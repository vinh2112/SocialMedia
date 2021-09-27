import React from "react";
import {
  AvatarWrapper,
  Avatar,
  EditButton,
  AccountInfo,
  AccountName,
  Desc,
  Details,
  DetailItem,
  Title,
  Detail,
  ButtonWrapper,
  Button,
} from "./AccountInfoElements";
import { Icon } from "@iconify/react";

export default function UserInfo() {
  return (
    <>
      <AvatarWrapper>
        <Avatar src="https://images.unsplash.com/photo-1554080353-a576cf803bda?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGhvdG98ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80" />
        <EditButton>
          <Icon icon="akar-icons:edit" />
        </EditButton>
      </AvatarWrapper>

      <AccountInfo>
        <AccountName>Vương Quốc Vinh</AccountName>
        <Desc>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at.
        </Desc>
        <Details>
          <DetailItem>
            <Detail>12</Detail>
            <Title>Followers</Title>
          </DetailItem>

          <DetailItem>
            <Detail>300</Detail>
            <Title>Followings</Title>
          </DetailItem>

          <DetailItem>
            <Detail>100</Detail>
            <Title>Posts</Title>
          </DetailItem>

          <ButtonWrapper>
            <Button>
              <span>Follow</span>
            </Button>
          </ButtonWrapper>
        </Details>
      </AccountInfo>
    </>
  );
}
