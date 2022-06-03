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
import { useDispatch, useSelector } from "react-redux";
import { authState$, notificationState$ } from "redux/selectors";
import DefaultAvatar from "images/DefaultAvatar.png";
import NotificationSection from "./NotificationSection";
import * as api from "api";
import * as action from "redux/actions";
import PhotoosLogo from "images/Photoos.png";

const Header = ({ toggle, isAdmin }) => {
  let initialState = {
    notify: false,
    sideBar: false,
  };
  const [isOpen, setIsOpen] = useState(initialState);
  const domNode = useRef();
  const notiNode = useRef();
  const user = useSelector(authState$);
  const notification = useSelector(notificationState$);
  const dispatch = useDispatch();

  const handleSideBar = (e) => {
    setIsOpen({ sideBar: !isOpen.sideBar, notify: false });
  };

  const handleNotifyPopup = async () => {
    if (isOpen.notify && countNotifications(notification.data) !== 0) {
      await api.NotificationAPI.seenNotifications()
        .then((res) => {
          dispatch(action.fetchNotifications.fetchNotificationsSuccess(res.data));
        })
        .catch((err) => console.log(err));
    }

    setIsOpen({ sideBar: false, notify: !isOpen.notify });
  };

  const countNotifications = (data) => {
    const unseenNoti = data.filter((noti) => !noti.seen);

    return unseenNoti.length;
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      if (user.currentUser) {
        await api.NotificationAPI.fetchNotifications()
          .then((res) => {
            dispatch(action.fetchNotifications.fetchNotificationsSuccess(res.data));
          })
          .catch((err) => console.log(err));
      }
    };

    fetchNotifications();
  }, [dispatch, user]);

  useEffect(() => {
    let handleOutSide = (e) => {
      if (!domNode.current.contains(e.target) && !notiNode?.current?.contains(e.target)) {
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
      <HeaderWrapper isAdmin={isAdmin}>
        <HeaderLeft>
          <LogoLink
            to="/"
            onClick={() => {
              const scrollNode = document.querySelector("#scroll-node");
              scrollNode.scrollTop = 0;
            }}
          >
            <img src={PhotoosLogo} alt="" />
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
                <span className="tooltip">Your page</span>
              </RoundButtonLink>

              {user.currentUser.isAdmin && (
                <RoundActionButton to="/administrator/dashboard">
                  <Icon icon="eos-icons:admin-outlined" />
                  <span className="tooltip">Administrator</span>
                </RoundActionButton>
              )}

              <RoundActionButton to="/messages">
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
                  {countNotifications(notification.data) !== 0 && (
                    <span className="badge">{countNotifications(notification.data)}</span>
                  )}
                </RoundLabelButton>
                <input type="checkbox" id="notify-checkbox" hidden />

                <NotificationSection isOpen={isOpen.notify} notifications={notification.data} />
              </NotificationContainer>
            </>
          ) : (
            <AuthGroupButton>
              <SignIn to="/home" onClick={toggle}>
                Sign in
              </SignIn>
              <SignUp to="/signup">Sign up</SignUp>
            </AuthGroupButton>
          )}

          <SideBarContainer ref={domNode}>
            <RoundLabelButton htmlFor="activeCheckBox" onClick={handleSideBar}>
              <Icon icon="feather:menu" />
              <span className="tooltip">Menu</span>
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
