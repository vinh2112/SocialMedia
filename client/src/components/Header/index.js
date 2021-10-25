import React, { useState, useEffect, useRef } from "react";
import {
  HeaderContainer,
  HeaderWrapper,
  HeaderRight,
  HeaderLeft,
  LogoLink,
  SideBarContainer,
  RoundButton,
  RoundButtonLink,
  Avatar,
  UserName,
  AuthGroupButton,
  SignIn,
  SignUp,
} from "./HeaderElements";
import SideBar from "./SideBar";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "redux/actions";
import { authState$, modalState$ } from "redux/selectors";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const domNode = useRef();
  const dispatch = useDispatch();
  const user = useSelector(authState$);
  const { isShow } = useSelector(modalState$);

  const handleSideBar = () => {
    setIsOpen(!isOpen);
    if (!isOpen) isShow && dispatch(actions.hideModal());
  };

  useEffect(() => {
    let handleOutSide = (e) => {
      if (!domNode.current.contains(e.target)) {
        document.body.style.overflowY = null;
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutSide);

    return () => {
      document.removeEventListener("mousedown", handleOutSide);
    };
  });

  const handleLogin = React.useCallback(() => {
    dispatch(
      actions.login.loginRequest({
        email: "18110396@student.hcmute.edu.vn",
        password: "123456",
      })
    );
  }, [dispatch]);

  const handleLogout = React.useCallback(() => {
    dispatch(actions.logout.logoutRequest());
  }, [dispatch]);

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <HeaderRight>
          <LogoLink to="/">
            <h2>Logo</h2>
          </LogoLink>

          {!user.loggedIn ? (
            <button onClick={handleLogin}>Login</button>
          ) : (
            <button onClick={handleLogout}>Log out</button>
          )}
        </HeaderRight>

        {user.isLoading && <p>Loading...</p>}

        <HeaderLeft>
          {user.currentUser ? (
            <RoundButtonLink to={`/profile/${user.currentUser._id}`}>
              <Avatar src={user.currentUser.avatar} alt="Photo" />
              <UserName>@{user.currentUser.name}</UserName>
            </RoundButtonLink>
          ) : (
            <AuthGroupButton>
              <SignIn to="#">Sign in</SignIn>
              <SignUp to="#">Sign up</SignUp>
            </AuthGroupButton>
          )}

          <SideBarContainer ref={domNode}>
            <RoundButton htmlFor="activeCheckBox" onClick={handleSideBar}>
              <Icon icon="feather:menu" />
            </RoundButton>
            <input type="checkbox" id="activeCheckBox"></input>

            <SideBar isOpen={isOpen} handleSideBar={handleSideBar} user={user} />
          </SideBarContainer>
        </HeaderLeft>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default Header;
