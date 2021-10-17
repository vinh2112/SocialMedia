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
import DefaultAvatar from "images/DefaultAvatar.png";
import { Icon } from "@iconify/react";
import { authState$, postState$ } from "redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "redux/actions";

export default function UserInfo() {
  const dispatch = useDispatch();
  const { isLoading, profile } = useSelector(postState$);
  const { currentUser } = useSelector(authState$);
  const isYourAccount = profile?._id === currentUser?._id;

  const handleInteract = () => {
    dispatch(actions.interactUser.interactUserRequest(profile?._id));
  };

  return (
    <>
      {isLoading ? null : (
        <>
          <AvatarWrapper>
            <Avatar src={profile?.avatar ? profile.avatar : DefaultAvatar} />
            {profile?._id === currentUser?._id && (
              <EditButton>
                <Icon icon="akar-icons:edit" />
              </EditButton>
            )}
          </AvatarWrapper>

          <AccountInfo>
            <AccountName>@{profile?.name}</AccountName>
            <Desc>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at.
            </Desc>
            <Details isYourAccount={isYourAccount}>
              <DetailItem>
                <Detail>{profile?.followers.length}</Detail>
                <Title>Followers</Title>
              </DetailItem>

              <DetailItem>
                <Detail>{profile?.followings.length}</Detail>
                <Title>Followings</Title>
              </DetailItem>

              <DetailItem>
                <Detail>Viet Nam</Detail>
                <Title>From</Title>
              </DetailItem>

              {/* Check if user is current user */}
              {profile?._id !== currentUser?._id && (
                <ButtonWrapper onClick={handleInteract}>
                  {/* Check if current user is follow or following this user */}
                  {profile?.followers.some(
                    (follower) => follower._id === currentUser?._id
                  ) ? (
                    <Button isFollowed={true}>
                      <Icon icon="akar-icons:check" />
                      <span>following</span>
                    </Button>
                  ) : (
                    <Button isFollowed={false}>
                      <span>follow</span>
                    </Button>
                  )}
                </ButtonWrapper>
              )}
            </Details>
          </AccountInfo>
        </>
      )}
    </>
  );
}
