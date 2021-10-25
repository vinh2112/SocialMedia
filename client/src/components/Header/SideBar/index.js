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

const SideBar = ({ isOpen, handleSideBar, user }) => {
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
            <MenuItemLink className="justify__center lg" to="#">
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
            <Separate />

            <MenuItem>
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
