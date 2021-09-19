import styled from "styled-components";
import { Link as LinkR } from "react-router-dom";

export const SignupContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  z-index: 1;
  @media screen and (max-width: 800px) {
    justify-content: center;
    align-items: center;
  }
`;

export const ImgWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 2;
  overflow: hidden;
  :before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.1) 0%,
        rgba(0, 0, 0, 0.2) 100%
      ),
      linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, transparent 100%);
    z-index: 3;
  }
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  -o-object-fit: cover;
`;

export const InfoContainer = styled.div`
  width: 600px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  z-index: 3;
  @media screen and (max-width: 800px) {
    position: absolute;
    width: 500px;
  }
  @media screen and (max-width: 600px) {
    position: absolute;
    width: 400px;
  }
`;

export const InfoTop = styled.div`
  display: flex;
  flex-direction: column;
  height: 30%;
  margin: 0 60px;
  padding-top: 18%;
`;

export const InfoBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 70%;
  margin: 0 60px;
`;

export const TxbWrapper = styled.div`
  display: flex;
  position: relative;
  height: 50px;
  width: 100%;
  margin: 8px 0;
  /* border: 1px solid rgba(0, 0, 0, 0.5); */
  /* border-radius: 4px; */
  align-items: center;
  & > label {
    pointer-events: none;
    position: absolute;
    transition: all 0.2s ease-in-out;
    font-size: 13px;
    top: 50%;
    transform: translateY(-50%);
    left: 15px;
  }
`;

export const Txb = styled.input`
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  width: 100%;
  height: 50px;
  outline: none;
  padding: 0 10px;
  padding-top: 15px;
  &:focus + label,
  &:not(:placeholder-shown) + label {
    top: 12px;
    left: 12px;
    font-size: 11px;
    font-weight: 700;
  }
  &:focus {
    border: 2px solid rgba(0, 0, 0, 1);
    height: 60px;
  }
`;

export const ButtonSignup = styled(LinkR)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  border-radius: 3px;
  margin-top: 40px;
  margin-bottom: 25px;
  height: 40px;
  text-decoration: none;
  color: #fff;
  background: #000;
`;

export const LoginDiv = styled.div`
  margin: 30px 0;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  text-align: right;
  font-size: 14px;
`;

export const Signin = styled(LinkR)`
  text-decoration: none;
  color: black;
  font-weight: 700;
  margin-left: 10px;
  cursor: pointer;
`;

export const Headline = styled.h1`
  font-size: 40px;
`;

export const Subline = styled.div`
  font-size: 33px;
  font-weight: 700;
`;

export const Description = styled.div`
  margin-top: 25px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.8);
`;
