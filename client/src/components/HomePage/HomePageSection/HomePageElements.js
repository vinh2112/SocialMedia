import styled from "styled-components";
//import { Link as LinkR } from "react-router-dom";
import { MdArrowForward, MdKeyboardArrowRight } from "react-icons/md";
import { Link as LinkS } from "react-scroll";

export const HomePgContainer = styled.div`
  display: flex;
  z-index: 1;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  position: relative;

  :before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.2) 100%),
      linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, transparent 100%);
    z-index: 3;
  }
`;

export const VideoHpg = styled.video`
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  z-index: 2;
`;

export const HeroBg = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 2;
`;

export const InfoContainer = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  z-index: 3;
  max-width: 1280px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 60px 40px;

  @media screen and (max-width: 550px) {
    width: 100%;
  }
`;

export const InfoHeadline = styled.h1`
  color: #fff;
  margin-top: 320px;
  margin-bottom: 15px;
  font-size: 45px;
  @media screen and (max-width: 550px) {
    margin-top: 270px;
    font-size: 37px;
  }
  @media screen and (max-width: 414px) {
    margin-top: 237px;
    font-size: 40px;
  }
  @media screen and (max-width: 375px) {
    margin-top: 200px;
    font-size: 32px;
  }
`;

export const InfoDescrip = styled.p`
  color: #fff;
  font-size: 18px;
  width: 60%;
  margin-top: 10px;
  margin-bottom: 15px;
  @media screen and (max-width: 550px) {
    width: 80%;
  }
`;

export const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const InfoBtn = styled(LinkS)`
  display: flex;
  background: #fff;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  border-radius: 50px;
  padding: 8px 14px;
  color: #000;
  font-size: 13px;
  cursor: pointer;
`;

export const ArrowForward = styled(MdArrowForward)`
  margin-left: 8px;
  font-size: 16px;
`;

export const ArrowRight = styled(MdKeyboardArrowRight)`
  margin-left: 8px;
  font-size: 16px;
`;
