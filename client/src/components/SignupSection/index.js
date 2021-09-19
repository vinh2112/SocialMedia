import React, { useState } from "react";
import img from "../../images/img3.jpg";
import {
  SignupContainer,
  ImgWrapper,
  Img,
  InfoContainer,
  Txb,
  TxbWrapper,
  InfoTop,
  InfoBottom,
  ButtonSignup,
  LoginDiv,
  Signin,
  Headline,
  Subline,
  Description,
} from "./SignupElements";

import { ItemsWrapper } from "../Sidebar/SidebarElements";

const SignupSection = () => {
  const [focus, setFocus] = useState(false);
  const isFocus = () => {
    setFocus(!focus);
  };
  return (
    <SignupContainer>
      <ImgWrapper>
        <Img src={img} type="image/jpg" />
      </ImgWrapper>

      <InfoContainer>
        <InfoTop>
          <Headline>SIGN UP</Headline>
          <Subline>HI!</Subline>
          <Description>Create your new account</Description>
        </InfoTop>
        <InfoBottom>
          <TxbWrapper>
            <Txb id="user" placeholder=" "></Txb>
            <label htmlFor="user">Email</label>
          </TxbWrapper>

          <TxbWrapper>
            <Txb id="fName" placeholder=" "></Txb>
            <label htmlFor="fNname">Full name</label>
          </TxbWrapper>

          <TxbWrapper>
            <Txb id="pwd" placeholder=" "></Txb>
            <label htmlFor="pwd">Password</label>
          </TxbWrapper>

          <TxbWrapper>
            <Txb id="repwd" placeholder=" "></Txb>
            <label htmlFor="repwd">Verifying password</label>
          </TxbWrapper>

          <ButtonSignup>Sign Up</ButtonSignup>

          <ItemsWrapper>
            <span class="iconify" data-icon="akar-icons:facebook-fill"></span>
            <span class="iconify" data-icon="fa-brands:instagram"></span>
            <span
              class="iconify"
              data-icon="entypo-social:twitter-with-circle"
            ></span>
          </ItemsWrapper>

          <LoginDiv>
            Already have account ?<Signin>Sign in</Signin>
          </LoginDiv>
        </InfoBottom>
      </InfoContainer>
    </SignupContainer>
  );
};

export default SignupSection;
