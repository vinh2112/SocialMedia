import React, { useState, useEffect, useRef } from "react";
import {
  HeaderContainer,
  HeaderWrapper,
  HeaderRight,
  HeaderLeft,
  LogoLink,
  SideBarContainer,
  RoundLabelButton,
  RoundButtonLink,
  Avatar,
  UserName,
  AuthGroupButton,
  SignIn,
  SignUp,
  RoundActionButton,
  NotificationContainer,
} from "./HeaderElements";
import SideBar from "./SideBar";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import { authState$ } from "redux/selectors";
import DefaultAvatar from "images/DefaultAvatar.png";
import NotificationSection from "./NotificationSection";

const Header = ({ toggle }) => {
  let initialState = {
    notify: false,
    sideBar: false,
  };
  const [isOpen, setIsOpen] = useState(initialState);
  const domNode = useRef();
  const notiNode = useRef();
  const user = useSelector(authState$);

  const handleSideBar = (e) => {
    setIsOpen({ sideBar: !isOpen.sideBar, notify: false });
  };

  const handleNotifyPopup = () => {
    setIsOpen({ sideBar: false, notify: !isOpen.notify });
  };

  useEffect(() => {
    let handleOutSide = (e) => {
      if (!domNode.current.contains(e.target) && !notiNode.current.contains(e.target)) {
        document.body.style.overflowY = null;
        setIsOpen(initialState);
      }
    };

    document.addEventListener("mousedown", handleOutSide);

    return () => {
      document.removeEventListener("mousedown", handleOutSide);
    };
  });

  return (
    <HeaderContainer id="header">
      <HeaderWrapper>
        <HeaderLeft>
          <LogoLink to="/" onClick={() => window.scrollTo(0, 0)}>
            <h2>Photoos</h2>
          </LogoLink>
        </HeaderLeft>

        <HeaderRight>
          {user.currentUser ? (
            <>
              <RoundButtonLink to={`/profile/${user.currentUser._id}`}>
                <Avatar
                  src={user.currentUser.avatar ? user.currentUser.avatar : DefaultAvatar}
                  alt="Photo"
                />
                <UserName>@{user.currentUser.name}</UserName>
              </RoundButtonLink>

              {user.currentUser.isAdmin && (
                <RoundActionButton to="/administrator/dashboard">
                  <Icon icon="eos-icons:admin-outlined" />
                  <span className="tooltip">Administrator</span>
                </RoundActionButton>
              )}
            </>
          ) : (
            <AuthGroupButton>
              <SignIn to="/home" onClick={toggle}>
                Sign in
              </SignIn>
              <SignUp to="/signup">Sign up</SignUp>
            </AuthGroupButton>
          )}

          <RoundActionButton to="#">
            <Icon icon="ant-design:message-outlined" />
            <span className="tooltip">Message</span>
          </RoundActionButton>

          <NotificationContainer ref={notiNode}>
            <RoundLabelButton
              htmlFor="notify-checkbox"
              className="mg-r fs-14"
              onClick={handleNotifyPopup}
            >
              <Icon icon="codicon:bell" />
              <span className="tooltip">Notification</span>
              <span className="badge">2</span>
            </RoundLabelButton>
            <input type="checkbox" id="notify-checkbox" hidden />

            <NotificationSection isOpen={isOpen.notify} />
          </NotificationContainer>

          <SideBarContainer ref={domNode}>
            <RoundLabelButton htmlFor="activeCheckBox" onClick={handleSideBar}>
              <Icon icon="feather:menu" />
            </RoundLabelButton>
            {/* <input type="checkbox" id="activeCheckBox"></input> */}

            <SideBar isOpen={isOpen.sideBar} handleSideBar={handleSideBar} user={user} />
          </SideBarContainer>
        </HeaderRight>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default Header;
