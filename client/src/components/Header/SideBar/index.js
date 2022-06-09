import React, { useEffect } from "react";
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
import DefaultAvatar from "assets/images/DefaultAvatar.jpg";
import ToggleSwitch from "./ToggleSwitch";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import * as actions from "redux/actions";
import useScrollBlock from "hooks/useScrollBlock";

const SideBar = ({ isOpen, handleSideBar, user }) => {
  const dispatch = useDispatch();
  const [blockScroll, allowScroll] = useScrollBlock();

  useEffect(() => {
    if (isOpen && window.innerWidth <= 1024) {
      blockScroll();
    }

    return () => allowScroll();
  }, [isOpen, blockScroll, allowScroll]);

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
            <MenuItemLink className="justify__center lg" to="/login">
              <MenuTitle>Sign in</MenuTitle>
            </MenuItemLink>
          )}
        </Top>

        <Separate className="md" />

        {user?.currentUser?.isAdmin && (
          <MenuItemLink to="/administrator/dashboard">
            <MenuIcon>
              {/* <Icon icon="eos-icons:admin-outlined" /> */}
              <Icon icon="eos-icons:admin" />
            </MenuIcon>

            <MenuTitle>Administrator</MenuTitle>
          </MenuItemLink>
        )}

        {user.currentUser && (
          <MenuItemLink to="/messages">
            <MenuIcon>
              {/* <Icon icon="ant-design:message-outlined" /> */}
              <Icon icon="ant-design:message-filled" />
            </MenuIcon>

            <MenuTitle>Messages</MenuTitle>
          </MenuItemLink>
        )}

        <MenuItem htmlFor="switchSideBar">
          <MenuIcon>
            {/* <Icon icon="ic:outline-dark-mode" /> */}
            <Icon icon="ic:baseline-dark-mode" />
          </MenuIcon>

          <MenuTitle>Dark mode</MenuTitle>

          <ToggleSwitch idCheckBox="switchSideBar" />
        </MenuItem>

        {user.currentUser ? (
          <>
            <MenuItemLink to="/setting/info">
              <MenuIcon>
                {/* <Icon icon="uil:setting" /> */}
                <Icon icon="ant-design:setting-filled" />
              </MenuIcon>

              <MenuTitle>Setting</MenuTitle>
            </MenuItemLink>

            <Separate />

            <MenuItem onClick={() => handleLogout()}>
              <MenuIcon>
                {/* <Icon icon="mdi:exit-to-app" /> */}
                <Icon icon="bxs:exit" />
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
