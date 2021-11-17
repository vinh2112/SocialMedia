import React, { useRef, useState, useEffect } from "react";
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
} from "./SigninElements";
import {useDispatch, useSelector} from 'react-redux';
import * as actions from "redux/actions";
import { authState$ } from "redux/selectors";
import { RiLockPasswordLine } from "react-icons/ri";
import {useHistory} from "react-router-dom";

const Signin = ({toggle,isOpen }) => {
  const overlayModal = useRef();
  const dispatch = useDispatch();
  const user = useSelector(authState$)
  const history = useHistory()

  useEffect(()=>{
    const TOKEN = localStorage.getItem("access_token");
    if(TOKEN){
      history.push("/")
    }
  })
  

  const handleCloseModal = (e) => {
    if (overlayModal.current === e.target) toggle();
    console.log(overlayModal.current);
  };

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    console.log(data)
  };

  const isLogin = () =>{
    if (user.loggedIn){
      history.push("/")
    } 
  }
  const handleLogin = React.useCallback(() => {
    dispatch(
      actions.login.loginRequest({
        email: data.email,
        password: data.password,
      })
    );
    isLogin();
  }, [dispatch,data,isLogin]);

  return (
    <SigninContainer
      id="home/signin"
      isOpen={isOpen}
      onClick={handleCloseModal}
      ref={overlayModal}
    >
      <SigninMenu isOpen={isOpen}>
        <FormTop></FormTop>
        <FormBottom>
          <TxbWrapper>
            <IconWrapper>
              <span className="iconify" data-icon="ic:round-email"></span>
            </IconWrapper>
            <Txb
              placeholder="Email"
              name="email"
              onChange={handleChangeValue}
            ></Txb>
          </TxbWrapper>

          <TxbWrapper>
            <IconWrapper>
              <RiLockPasswordLine />
            </IconWrapper>
            <Txb
              placeholder="Pwd"
              name="password"
              onChange={handleChangeValue}
            ></Txb>
          </TxbWrapper>
          <SignupDiv>
            Don't have account yet?
            <SignupInfo to="\signup">Sign up</SignupInfo>
          </SignupDiv>
          <ButtonLogin to="#" onClick={handleLogin}>
            Sign in{" "}
          </ButtonLogin>
          <OrDiv>OR</OrDiv>
          <ButtonSignUp to="\dsad">Create a new account</ButtonSignUp>
          {/* <ButtonLoginGG>
            <IconWrapper>
              <FcGoogle />
            </IconWrapper>
            <ButtonLoginInfo>Sign in with google</ButtonLoginInfo>
          </ButtonLoginGG> */}

          <ItemsWrapper>
            <span
              className="iconify"
              data-icon="akar-icons:facebook-fill"
            ></span>
            <span className="iconify" data-icon="fa-brands:instagram"></span>
            <span
              className="iconify"
              data-icon="entypo-social:twitter-with-circle"
            ></span>
          </ItemsWrapper>
        </FormBottom>
      </SigninMenu>
    </SigninContainer>
  );
};

export default Signin;
