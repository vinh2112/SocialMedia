import styled from "styled-components";
import { Link as LinkR } from "react-router-dom";
export const SigninContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  padding: 0 10%;
  z-index: 999;
  color: black;
  background: rgba(0, 0, 0, 0.5);
  transition: all 0.2s ease-in-out;
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
`;
export const SigninMenu = styled.form`
  display: flex;
  position: absolute;
  top: ${({ isOpen }) => (isOpen ? "50%" : "40%")};
  left: 50%;
  transition: top 0.1s ease-in-out 0.1s;
  transform: translate(-50%, -50%);
  background: #fff;
  width: 400px;
  height: 550px;
  border-radius: 8px;
  flex-direction: column;
  @media screen and (max-width: 450px) {
    height: 100%;
    width: 100%;
    border-radius: 0;
  }
  @media screen and (min-height: 450px) {
  }
`;

export const FormTop = styled.div`
  display: flex;
  height: 30%;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 0 15%;
`;
export const Headline = styled.h1`
  width: 100%;
  font-size: 2rem;
  margin-top: 35%;
`;
export const Subline = styled.div`
  width: 100%;
  font-size: 0.8rem;
  font-weight: bold;
  margin-top: 5px;
  padding-left: 5px;
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
  position: relative;
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
  &:hover {
    /* padding: -1px -1px;
    border: 2px solid black;
    background: #fff;
    color: black;
    font-weight: 700; */
    :before {
      background: rgba(255, 255, 255, 0.15);
      position: absolute;
      z-index: 3;
      content: "";
      width: 100%;
      height: 40px;
    }
  }
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
    cursor: pointer;
    margin: 5px 7px;
  }
`;

export const ErrorWrapper = styled.div`
  color: red;
  font-size: 12px;
  width: 100%;
  display: flex;
  text-align: flex-start;
  padding-left: 5px;
`;
