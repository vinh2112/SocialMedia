import styled from "styled-components";
import { Link as LinkR } from "react-router-dom";
export const SideBarContainer = styled.div`
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 10%;
  top: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.5);
  transition: all 0.2 ease-in-out;
`;
export const SidebarMenu = styled.form`
  display: flex;
  background: #fff;
  width: 400px;
  height: 550px;
  border-radius: 8px;
  flex-direction: column;
`;

export const FormTop = styled.div`
  display: flex;
  height: 30%;
  justify-content: center;
  align-items: center;
`;

export const FormBottom = styled.div`
  display: flex;
  flex-direction: column;
  height: 70%;
  align-items: center;
  margin: 0 15%;
`;

export const TxbWrapper = styled.div`
  display: flex;
  height: 50px;
  width: 100%;
  margin: 5px 0;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  padding: 5px;
  align-items: center;
`;

export const Txb = styled.input`
  display: flex;
  position: relative;
  bottom: 0;
  width: 100%;
  border: none;
  height: 20px;
  outline: none;
`;

export const IconWrapper = styled.div`
  padding: 8px 10px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

export const ButtonLogin = styled(LinkR)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 7px 0;
  padding: 20px 30px;
  height: 30px;
  width: 100%;
  text-decoration: none;
  color: black;
  border-radius: 4px;
  border: 1px solid black;
  background: black;
  color: #fff;
`;

export const ButtonLoginInfo = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const OrDiv = styled.div`
  color: #000000;
  font-size: 15px;
  padding: 10px 0;
`;

export const ButtonSignUp = styled(LinkR)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 0;
  width: 100%;
  padding: 20px 29px;
  height: 30px;
  text-decoration: none;
  color: black;
  border-radius: 4px;
  background: #fff;
  border: 1px solid black;
  color: black;
`;

export const ButtonLoginGG = styled(LinkR)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 5px 0;
  width: 100%;
  padding: 20px 29px;
  height: 30px;
  text-decoration: none;
  color: black;
  border-radius: 4px;
  background: #fff;
  border: 1px solid black;
  color: black;
`;

export const SignupDiv = styled.div`
  display: flex;
  flex-direction: flex-start;
  height: 10px;
  width: 100%;
  margin: 5px 0;
  font-size: 11px;
  padding: 0 5px;
`;

export const SignupInfo = styled(LinkR)`
  margin-left: 5px;
  cursor: pointer;
  text-decoration: none;
  color: black;
  font-weight: 700;

  &:hover {
    text-decoration: underline;
  }
`;

export const ItemsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  margin-top: 20px;

  & .iconify {
    font-size: 30px;
    margin: 5px 7px;
  }
`;
