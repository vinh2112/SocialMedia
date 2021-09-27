import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const OverLay = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  transition: all 0.1s ease-out 0s;

  @media (max-width: 1024px) {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    transition: all 0.25s ease-out 0s;
  }
`;

export const Container = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  border-radius: 5px;
  padding: 8px;
  background-color: ${({ theme }) => theme.primary};
  box-shadow: 0 0 20px 0 rgba(0 0 0 / 7%);
  transition: right 0.2s ease-in-out 0s, top 0.1s linear 0s;
  opacity: 0.97;

  @media (max-width: 1024px) {
    position: fixed;
    top: 0;
    bottom: 0;
    right: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
    width: 320px;
    border-radius: 0;
    transition: right 0.5s ease-in-out 0s, top 0.1s linear 0s;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const Top = styled.div`
  display: none;

  &.md {
    @media (max-width: 1024px) {
      display: flex;
    }
  }
`;

// MenuItem

const menuItem = css`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.textColor};
  border-radius: 5px;
  min-width: 250px;
  width: 100%;
  padding: 8px;
  transition: all 0.2s ease-out 0s;

  &:hover {
    background-color: ${({ theme }) => theme.contrastColor};
  }
`;

export const MenuItem = styled.label`
  cursor: pointer;
  user-select: none;
  ${menuItem}
`;

export const MenuItemLink = styled(Link)`
  display: flex;
  text-decoration: none;
  ${menuItem}

  &.justify__center {
    justify-content: center;
  }

  &.lg {
    height: 50px;
  }
`;

//-----------

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
`;

export const Avatar = styled.img`
  width: 60px;
  height: 60px;
  margin-right: 8px;
  border-radius: 50%;
  object-fit: cover;
`;

export const User = styled.div`
  white-space: nowrap;
  & > .side-bar__view {
    color: #999;
    font-size: 0.8rem;
  }
`;

export const UserName = styled.div`
  margin-bottom: 4px;
  color: ${({ theme }) => theme.textColor}!important;
  font-weight: 700;
  font-size: 0.9rem;
`;

export const Separate = styled.div`
  width: 100%;
  height: 1px;
  margin: 8px 0;
  background-color: ${({ theme }) => theme.contrastColor};

  &.md {
    display: none;

    @media (max-width: 1024px) {
      display: flex;
    }
  }
`;

export const MenuIcon = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  margin-right: 12px;
  font-size: 1.4rem;

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
    opacity: 0.1;
  }
`;

export const MenuTitle = styled.div`
  font-weight: 700;
  font-size: 0.8rem;
`;
