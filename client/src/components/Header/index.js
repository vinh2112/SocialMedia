import React, { useState, useEffect, useRef } from "react";
import {
  HeaderContainer,
  HeaderWrapper,
  HeaderRight,
  HeaderLeft,
  SideBarContainer,
  RoundButton,
  RoundButtonLink,
  Avatar,
  UserName,
} from "./HeaderElements";
import SideBar from "./SideBar";
import { Icon } from "@iconify/react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const domNode = useRef();

  const handleSideBar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    let handleOutSide = (e) => {
      if (!domNode.current.contains(e.target)) setIsOpen(false);
    };

    document.addEventListener("mousedown", handleOutSide);

    return () => {
      document.removeEventListener("mousedown", handleOutSide);
    };
  });

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <HeaderRight>
          <h2>Logo</h2>
        </HeaderRight>

        <HeaderLeft>
          <RoundButtonLink to="#">
            <Avatar
              src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"
              alt="Photo"
            />
            <UserName>Vương Quốc Vinh</UserName>
          </RoundButtonLink>

          <SideBarContainer ref={domNode}>
            <RoundButton htmlFor="activeCheckBox" onClick={handleSideBar}>
              <Icon icon="feather:menu" />
            </RoundButton>
            <input type="checkbox" id="activeCheckBox"></input>

            <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
          </SideBarContainer>
        </HeaderLeft>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default Header;
