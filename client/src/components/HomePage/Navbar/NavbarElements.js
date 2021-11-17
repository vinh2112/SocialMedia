import styled from "styled-components";
import { Link as LinkR } from "react-router-dom";

export const Nav = styled.nav`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  height: 60px;
  z-index: 10;
  position: fixed;
`;

export const NavContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0);
  padding: 0 12px;
`;

export const NavLogo = styled.div`
  display: flex;
  justify-self: flex-start;
  font-size: 24px;
  color: #fff;
  cursor: pointer;
`;
export const NavRight = styled.div`
  display: flex;
`;

export const Search = styled.div`
  margin: 0 10px;
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
`;

export const Btn = styled(LinkR)`
  color: #fff;
  margin-left: 10px;
  text-decoration: none;
  font-size: 16px;
  font-weight: 400;
  border-radius: 30px;
  border: 2px solid white;
  padding: 10px 16px;
  background: black; //#fbf7f0;
  &:hover {
    background: #fff;
    color: #000;
  }
  @media screen and (max-width: 550px) {
    display: none;
  }
`;

export const BarIcon = styled.div`
  display: none;
  @media screen and (max-width: 550px) {
    display: flex;
    align-items: center;
    width: 100%;
    top: 0;
    right: 0;
    cursor: pointer;
    color: #fff;
    font-size: 24px;
    margin-left: 8px;
  }
`;
