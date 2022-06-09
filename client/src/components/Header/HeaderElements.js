import styled, { css } from "styled-components";
import { NavLink as Link } from "react-router-dom";

export const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 54px;
  background-color: ${({ theme }) => theme.primary};
  border-bottom: 1px solid ${({ theme }) => theme.contrastColor};
  /* box-shadow: var(--box-shadow); */
  z-index: 48;
`;

export const HeaderWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  max-width: ${({ isAdmin }) => (isAdmin ? "" : "var(--max-width)")};
  margin: 0 auto;
  padding: 0 16px;
  z-index: 101;

  @media (max-width: 700px) {
    padding: 0 4px;
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
  width: 300px;
`;

export const HeaderRight = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const NotificationContainer = styled.div`
  position: relative;
`;

export const SideBarContainer = styled.div`
  position: relative;

  #activeCheckBox {
    display: none;
  }
`;

export const LogoLink = styled(Link)`
  color: var(--primary-color);
  text-decoration: none;

  & > img {
    height: 30px;
    object-fit: contain;
  }
`;

// Round Button

const roundButton = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  font-size: 1rem;
  margin-left: 8px;
  color: ${({ theme }) => theme.textColor};
  background-color: ${({ theme }) => theme.contrastColor};
  /* transition: all 0.1s ease-in-out 0s; */
  cursor: pointer;
  user-select: none;

  & > .iconify {
    font-size: 20px;
  }

  & > span.tooltip {
    position: absolute;
    top: 120%;
    font-size: 12px;
    font-weight: 700;
    padding: 6px 8px;
    color: ${({ theme }) => theme.textColor};
    letter-spacing: 1px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.hoverColor};
    opacity: 0;
    transform: scale(0);
    transition: all 0.1s ease;
    user-select: none;
    pointer-events: none;
    z-index: 1;
    cursor: default;
  }

  &:hover {
    background-color: ${({ theme }) => theme.hoverColor};
  }

  &:hover > span {
    opacity: 1;
    transform: scale(1);
  }
`;

export const RoundLabelButton = styled.label`
  ${roundButton}
  position: relative;

  &.fs-14 {
    font-size: 1.4rem;
  }

  &:hover {
    background-color: ${({ theme }) => theme.hoverColor};
  }

  & > span.badge {
    position: absolute;
    top: -2px;
    right: -2px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 11px;
    font-weight: 700;
    min-width: 16px;
    height: 16px;
    padding: 2px 4px;
    border-radius: 9px;
    color: white;
    background-color: var(--danger-color);
    user-select: none;
    pointer-events: none;
    cursor: default;
  }
`;

export const RoundActionButton = styled(Link)`
  ${roundButton}
  position: relative;
  font-size: 1.4rem;
`;

// -----------------

export const RoundButtonLink = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  border-radius: 20px;
  color: ${({ theme }) => theme.textColor};
  text-decoration: none;
  background-color: ${({ theme }) => theme.contrastColor};
  padding: 2px 4px;

  & > span.tooltip {
    position: absolute;
    top: 120%;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1px;
    padding: 6px 8px;
    color: ${({ theme }) => theme.textColor};
    border-radius: 4px;
    background-color: ${({ theme }) => theme.hoverColor};
    opacity: 0;
    transform: scale(0);
    transition: all 0.1s ease;
    user-select: none;
    pointer-events: none;
    z-index: 1;
    cursor: default;
  }

  &:hover {
    background-color: ${({ theme }) => theme.hoverColor};
  }

  &:hover > span {
    opacity: 1;
    transform: scale(1);
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const Avatar = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
`;

export const UserName = styled.div`
  font-size: 14px;
  font-weight: 500;
  padding: 0 4px 0 4px;
  color: ${({ theme }) => theme.textColor};
  max-width: 125px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const AuthGroupButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const SignIn = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${({ theme }) => theme.textColor};
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 1px;
  height: 32px;
  padding: 0 16px;
  background-color: ${({ theme }) => theme.contrastColor};
  border-radius: 16px;
  /* transition: all 0.1s ease-in-out 0s; */

  &:hover {
    background-color: ${({ theme }) => theme.hoverColor};
  }
`;

export const SignUp = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.textColor};
  padding: 2px 4px;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 1px;

  &:hover {
    text-decoration: underline;
  }
`;
