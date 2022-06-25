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
import DefaultAvatar from "assets/images/DefaultAvatar.jpg";
import NotificationSection from "./NotificationSection";
import * as api from "api";
import * as action from "redux/actions";
import PhotoosLogo from "assets/images/Photoos.svg";

const Header = ({ toggle, isAdmin }) => {
  let initialState = {
    notify: false,
    sideBar: false,
  };
  const [isOpen, setIsOpen] = useState(initialState);
  const domNode = useRef();
  const notiNode = useRef();
  const { currentUser } = useSelector(authState$);
  const { data, isLoading } = useSelector(notificationState$);
  const dispatch = useDispatch();

  const handleSideBar = (e) => {
    setIsOpen({ sideBar: !isOpen.sideBar, notify: false });
  };

  const handleNotifyPopup = async () => {
    setIsOpen({ sideBar: false, notify: !isOpen.notify });

    if (isOpen.notify && countNotifications(data) !== 0) {
      await api.NotificationAPI.seenNotifications()
        .then((res) => {
          dispatch(action.fetchNotifications.fetchNotificationsSuccess(res.data));
        })
        .catch((err) => console.log(err));
    }
  };

  const countNotifications = (data) => {
    const unseenNoti = data.filter((noti) => !noti.seen.some((user) => user === currentUser?._id));

    return unseenNoti.length;
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      if (currentUser && !data.length && !isLoading) {
        dispatch(action.fetchNotifications.fetchNotificationsRequest());
      }
    };

    fetchNotifications();
  }, [dispatch, currentUser, data, isLoading]);

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
          {currentUser ? (
            <>
              <RoundButtonLink to={`/profile/${currentUser._id}`}>
                <Avatar src={currentUser.avatar ? currentUser.avatar : DefaultAvatar} alt="Photo" />
                <UserName>@{currentUser.name}</UserName>
                <span className="tooltip">Your page</span>
              </RoundButtonLink>
            </>
          ) : (
            <AuthGroupButton>
              <SignIn to="/login" onClick={toggle}>
                Sign in
              </SignIn>
              <SignUp to="/register">Sign up</SignUp>
            </AuthGroupButton>
          )}

          <RoundActionButton to="/">
            <Icon icon="bx:home-alt" />
            <span className="tooltip">Home</span>
          </RoundActionButton>

          <RoundActionButton to="/search">
            <Icon icon="bi:grid-3x3-gap" />
            <span className="tooltip">Explore</span>
          </RoundActionButton>

          {currentUser && (
            <NotificationContainer ref={notiNode}>
              <RoundLabelButton htmlFor="notify-checkbox" className="mg-r fs-14" onClick={handleNotifyPopup}>
                <Icon icon="codicon:bell" />
                <span className="tooltip">Notification</span>
                {countNotifications(data) !== 0 && <span className="badge">{countNotifications(data)}</span>}
              </RoundLabelButton>
              <input type="checkbox" id="notify-checkbox" hidden />

              <NotificationSection isOpen={isOpen.notify} notifications={data} userId={currentUser?._id} />
            </NotificationContainer>
          )}

          <SideBarContainer ref={domNode}>
            <RoundLabelButton htmlFor="activeCheckBox" onClick={handleSideBar}>
              <Icon icon="feather:menu" />
              <span className="tooltip">Menu</span>
            </RoundLabelButton>
            {/* <input type="checkbox" id="activeCheckBox"></input> */}

            <SideBar isOpen={isOpen.sideBar} handleSideBar={handleSideBar} user={currentUser} />
          </SideBarContainer>
        </HeaderRight>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default Header;
