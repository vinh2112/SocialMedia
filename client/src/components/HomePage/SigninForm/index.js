import React, { useRef, useState, useEffect } from "react";

import { Icon } from "@iconify/react";
import {
  SigninContainer,
  SigninMenu,
  FormTop,
  FormBottom,
  Txb,
  TxbWrapper,
  ButtonLogin,
  OrDiv,
  ButtonSignUp,
  IconWrapper,
  SignupDiv,
  SignupInfo,
  ItemsWrapper,
  ErrorWrapper,
  Headline,
  Subline,
} from "./SigninElements";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "redux/actions";
import { authState$ } from "redux/selectors";
import { RiLockPasswordLine } from "react-icons/ri";
import { useHistory } from "react-router-dom";

const Signin = ({ toggle, isOpen }) => {
  const overlayModal = useRef();
  const dispatch = useDispatch();
  const user = useSelector(authState$);
  const history = useHistory();
  const [hidden, setHidden] = useState(false);
  const isHidden = () => {
    setHidden(!hidden);
    console.log(hidden);
  };

  useEffect(() => {
    const TOKEN = localStorage.getItem("access_token");
    if (TOKEN) {
      history.push("/");
    }
  });

  const handleCloseModal = (e) => {
    if (overlayModal.current === e.target) toggle();
  };

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const isLogin = React.useCallback(() => {
    if (user.loggedIn) history.push("/");
  }, [history, user]);

  const handleLogin = React.useCallback(() => {
    dispatch(
      actions.login.loginRequest({
        email: data.email,
        password: data.password,
      })
    );
    // if (user.loggedIn) {
    //   history.push("/");
    // } else {
    //   setMessage(user.errMsg);
    //   console.log(user.errMsg);
    // }

    isLogin();
  }, [dispatch, data, isLogin]);

  return (
    <SigninContainer id="home/signin" isOpen={isOpen} onClick={handleCloseModal} ref={overlayModal}>
      <SigninMenu isOpen={isOpen}>
        <FormTop>
          <Headline>Welcome to Icon</Headline>
          <Subline>Login to experience world</Subline>
        </FormTop>
        <FormBottom>
          <TxbWrapper>
            <IconWrapper>
              <span className="iconify" data-icon="ic:round-email"></span>
            </IconWrapper>
            <Txb placeholder="Email" name="email" onChange={handleChangeValue}></Txb>
          </TxbWrapper>

          <TxbWrapper>
            <IconWrapper>
              <RiLockPasswordLine />
            </IconWrapper>
            <Txb
              type={hidden ? "text" : "password"}
              placeholder="Password"
              name="password"
              onChange={handleChangeValue}
            ></Txb>
            <i onClick={isHidden} name="repwd" style={{ cursor: "pointer" }}>
              <Icon icon="dashicons:hidden" />
            </i>
          </TxbWrapper>
          <SignupDiv>
            Don't have account yet?
            <SignupInfo to="/signup">Sign up</SignupInfo>
          </SignupDiv>
          {user.errMsg ? <ErrorWrapper>{user.errMsg}</ErrorWrapper> : null}
          <ButtonLogin to="#" onClick={handleLogin}>
            Sign in
          </ButtonLogin>
          <OrDiv>OR</OrDiv>
          <ButtonSignUp to="/signup">Create a new account</ButtonSignUp>
          {/* <ButtonLoginGG>
            <IconWrapper>
              <FcGoogle />
            </IconWrapper>
            <ButtonLoginInfo>Sign in with google</ButtonLoginInfo>
          </ButtonLoginGG> */}

          <ItemsWrapper>
            <span className="iconify" data-icon="akar-icons:facebook-fill"></span>
            <span className="iconify" data-icon="fa-brands:instagram"></span>
            <span className="iconify" data-icon="entypo-social:twitter-with-circle"></span>
          </ItemsWrapper>
        </FormBottom>
      </SigninMenu>
    </SigninContainer>
  );
};

export default Signin;
