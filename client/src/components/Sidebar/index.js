import React from "react";
import {
  SideBarContainer,
  SidebarMenu,
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
} from "./SidebarElements";

import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
const Sidebar = () => {
  return (
    <SideBarContainer>
      <SidebarMenu>
        <FormTop></FormTop>
        <FormBottom>
          <TxbWrapper>
            <IconWrapper>
              <span class="iconify" data-icon="ic:round-email"></span>
            </IconWrapper>
            <Txb placeholder="Email"></Txb>
          </TxbWrapper>

          <TxbWrapper>
            <IconWrapper>
              <RiLockPasswordLine />
            </IconWrapper>
            <Txb placeholder="Pwd"></Txb>
          </TxbWrapper>
          <SignupDiv>
            Don't have account yet?
            <SignupInfo>Sign up</SignupInfo>
          </SignupDiv>
          <ButtonLogin>Sign in </ButtonLogin>
          <OrDiv>OR</OrDiv>
          <ButtonSignUp>Create a new account</ButtonSignUp>
          {/* <ButtonLoginGG>
            <IconWrapper>
              <FcGoogle />
            </IconWrapper>
            <ButtonLoginInfo>Sign in with google</ButtonLoginInfo>
          </ButtonLoginGG> */}

          <ItemsWrapper>
            <span class="iconify" data-icon="akar-icons:facebook-fill"></span>
            <span class="iconify" data-icon="fa-brands:instagram"></span>
            <span
              class="iconify"
              data-icon="entypo-social:twitter-with-circle"
            ></span>
          </ItemsWrapper>
        </FormBottom>
      </SidebarMenu>
    </SideBarContainer>
  );
};

export default Sidebar;
