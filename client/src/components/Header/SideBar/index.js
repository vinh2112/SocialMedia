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
import ToggleSwitch from "./ToggleSwitch";
import { Icon } from "@iconify/react";

const SideBar = ({ isOpen, setIsOpen }) => {
  return (
    <OverLay isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
      <Container className="side-bar" isOpen={isOpen}>
        <Top>
          <MenuItemLink to="#">
            <UserInfo>
              <Avatar src="https://th.bing.com/th/id/R.305f7a45bb74eca1f4c48310a1d46092?rik=xG0UEmbeySS8KQ&pid=ImgRaw&r=0" />
              <User>
                <UserName>Vương Quốc Vinh</UserName>
                <div className="side-bar__view">Xem trang cá nhân của bạn</div>
              </User>
            </UserInfo>
          </MenuItemLink>
        </Top>

        <Separate />

        <MenuItemLink to="#">
          <MenuIcon>
            <Icon icon="bx:bx-search" />
          </MenuIcon>

          <MenuTitle>Tìm kiếm</MenuTitle>
        </MenuItemLink>

        <MenuItemLink to="#">
          <MenuIcon>
            <Icon icon="bx:bx-news" />
          </MenuIcon>

          <MenuTitle>News Feed</MenuTitle>
        </MenuItemLink>

        <MenuItem htmlFor="switchSideBar">
          <MenuIcon>
            <Icon icon="ic:outline-dark-mode" />
          </MenuIcon>

          <MenuTitle>Dark Mode</MenuTitle>

          <ToggleSwitch idCheckBox="switchSideBar" />
        </MenuItem>

        <Separate />

        <MenuItem>
          <MenuIcon>
            <Icon icon="mdi:exit-to-app" />
          </MenuIcon>

          <MenuTitle>Đăng xuất</MenuTitle>
        </MenuItem>
      </Container>
    </OverLay>
  );
};

export default SideBar;
