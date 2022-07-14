import React from "react";
import {
  AvatarWrapper,
  EditButton,
  AccountInfo,
  AccountName,
  Desc,
  Details,
  DetailItem,
  Title,
  Detail,
  ButtonWrapper,
  AvatarUser,
  BalanceLink,
  // CustomAvatar,
  // CustomAvatarGroup,
} from "./AccountInfoElements";
import DefaultAvatar from "assets/images/DefaultAvatar.jpg";
import { Icon } from "@iconify/react";
import { authState$, postState$ } from "redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "redux/actions";
import { Box, Button, IconButton } from "@mui/material";
import { containedButtonStyle, outlinedButtonStyle } from "styles/muiCustom";
import countries from "assets/json/countries";

export default function UserInfo() {
  const dispatch = useDispatch();
  const { profile } = useSelector(postState$);
  const { currentUser } = useSelector(authState$);
  const isYourAccount = profile?._id === currentUser?._id;

  const handleInteract = async () => {
    if (currentUser) {
      dispatch(actions.interactUser.interactUserRequest(profile?._id));
    } else {
      // history.push("/login");
      dispatch(
        actions.toast.showToast({
          message: "Please Login",
          type: "warning",
        })
      );
    }
  };

  return (
    <>
      <AvatarWrapper>
        <AvatarUser src={profile?.avatar ? profile.avatar : DefaultAvatar} />
        {profile?._id === currentUser?._id && (
          <EditButton to="/setting/info">
            <IconButton size="small">
              <Icon icon="akar-icons:edit" />
            </IconButton>
          </EditButton>
        )}
      </AvatarWrapper>

      <AccountInfo>
        <AccountName>@{profile?.name}</AccountName>
        <Desc>{profile?.desc}</Desc>
        <Details isYourAccount={isYourAccount}>
          <DetailItem>
            <Detail>
              {/* <CustomAvatarGroup max={4}>
                {profile?.followings.map((user) => {
                  return <CustomAvatar key={user._id} alt={user.name} src={user.avatar} />;
                })}
              </CustomAvatarGroup> */}
              {profile?.followings.length}
            </Detail>
            <Title>Followings</Title>
          </DetailItem>

          <DetailItem>
            <Detail>
              {/* <CustomAvatarGroup max={4}>
                {profile?.followers.map((user) => {
                  return <CustomAvatar key={user._id} alt={user.name} src={user.avatar} />;
                })}
              </CustomAvatarGroup> */}
              {profile?.followers.length}
            </Detail>
            <Title>Followers</Title>
          </DetailItem>

          <DetailItem>
            <Detail>{profile?.likeCount}</Detail>
            <Title>Likes</Title>
          </DetailItem>

          <DetailItem>
            <Detail>
              <Box component="div" sx={{ "& > img": { mr: 1, flexShrink: 0 } }}>
                <img
                  loading="lazy"
                  width="20"
                  src={`https://flagcdn.com/w20/${profile?.from.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w40/${profile?.from.toLowerCase()}.png 2x`}
                  alt=""
                />
                {countries[profile?.from]}
              </Box>
            </Detail>
            <Title>Country</Title>
          </DetailItem>

          <DetailItem>
            <Detail>{profile?.city}</Detail>
            <Title>City</Title>
          </DetailItem>

          {/* Check if user is current user */}
          {profile?._id !== currentUser?._id && (
            <>
              <ButtonWrapper onClick={handleInteract}>
                {/* Check if current user is follow or following this user */}
                {profile?.followers.some((follower) => follower._id === currentUser?._id) ? (
                  <Button
                    sx={{ ...outlinedButtonStyle, textTransform: "capitalize" }}
                    variant="outlined"
                    startIcon={<Icon icon="akar-icons:check" />}
                    fullWidth
                  >
                    Following
                  </Button>
                ) : (
                  // <Button isFollowed={false}>
                  //   <span>follow</span>
                  // </Button>
                  <Button sx={{ ...containedButtonStyle, textTransform: "capitalize" }} variant="contained" fullWidth>
                    Follow
                  </Button>
                )}
              </ButtonWrapper>
              <ButtonWrapper>
                <Button
                  sx={{ ...outlinedButtonStyle, textTransform: "capitalize" }}
                  variant="outlined"
                  startIcon={<Icon icon="akar-icons:chat-bubble" />}
                  fullWidth
                >
                  Chat
                </Button>
              </ButtonWrapper>
            </>
          )}
        </Details>

        {profile?._id === currentUser?._id && (
          <div className="account__balance-wrapper">
            <div className="account__balance">
              <span>Balance:</span>
              <div className="balance">${currentUser?.wallet}</div>
            </div>

            <BalanceLink to="/pay">More</BalanceLink>
          </div>
        )}
      </AccountInfo>
    </>
  );
}
