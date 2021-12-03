import React from "react";
import {
  OverLay,
  Container,
  Separate,
  Top,
  MenuItemLink,
  MenuItem,
  UserInfo,
  Avatar,
  User,
  UserName,
  MenuIcon,
  MenuTitle,
} from "./SideBarElements";
import DefaultAvatar from "images/DefaultAvatar.png";
import ToggleSwitch from "./ToggleSwitch";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import * as actions from "redux/actions";

const SideBar = ({ isOpen, handleSideBar, user }) => {
  const dispatch = useDispatch();

  const handleLogout = React.useCallback(() => {
    dispatch(actions.logout.logoutRequest());
  }, [dispatch]);
  return (
    <OverLay isOpen={isOpen} onClick={handleSideBar}>
      <Container className="side-bar" isOpen={isOpen}>
        <Top className="md">
          {user.currentUser ? (
            <MenuItemLink to={`/profile/${user.currentUser._id}`}>
              <UserInfo>
                <Avatar src={user.currentUser.avatar ? user.currentUser.avatar : DefaultAvatar} />
                <User>
                  <UserName>@{user.currentUser.name}</UserName>
                  <div className="side-bar__view">View your profile</div>
                </User>
              </UserInfo>
            </MenuItemLink>
          ) : (
            <MenuItemLink className="justify__center lg" to="/home">
              <MenuTitle>Sign in</MenuTitle>
            </MenuItemLink>
          )}
        </Top>

        <Separate className="md" />

        <MenuItemLink to="/search">
          <MenuIcon>
            <Icon icon="bx:bx-search" />
          </MenuIcon>

          <MenuTitle>Search</MenuTitle>
        </MenuItemLink>

        <MenuItemLink to="/">
          <MenuIcon>
            <Icon icon="bx:bx-news" />
          </MenuIcon>

          <MenuTitle>Newsfeed</MenuTitle>
        </MenuItemLink>

        <MenuItem htmlFor="switchSideBar">
          <MenuIcon>
            <Icon icon="ic:outline-dark-mode" />
          </MenuIcon>

          <MenuTitle>Dark mode</MenuTitle>

          <ToggleSwitch idCheckBox="switchSideBar" />
        </MenuItem>

        {user.currentUser ? (
          <>
            <MenuItemLink to="/setting/info">
              <MenuIcon>
                <Icon icon="uil:setting" />
              </MenuIcon>

              <MenuTitle>Setting</MenuTitle>
            </MenuItemLink>

            <Separate />

            <MenuItem onClick={() => handleLogout()}>
              <MenuIcon>
                <Icon icon="mdi:exit-to-app" />
              </MenuIcon>

              <MenuTitle>Log out</MenuTitle>
            </MenuItem>
          </>
        ) : null}
      </Container>
    </OverLay>
  );
};

export default SideBar;
