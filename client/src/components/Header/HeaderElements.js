import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 54px;
  background-color: ${({ theme }) => theme.primary};
  border-bottom: 1px solid ${({ theme }) => theme.contrastColor};
  box-shadow: var(--box-shadow);
  z-index: 48;
`;

export const HeaderWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 16px;
  z-index: 101;
`;

export const HeaderRight = styled.div`
  display: flex;
  width: 300px;
`;

export const HeaderLeft = styled.div`
  display: flex;
  justify-content: flex-end;
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
`;

// Round Button

const roundButton = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  margin-left: 12px;
  border-radius: 50%;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.textColor};
  background-color: ${({ theme }) => theme.contrastColor};
  transition: all 0.1s ease-in-out 0s;
`;

export const RoundButton = styled.label`
  cursor: pointer;
  user-select: none;
  ${roundButton}

  &:hover {
    background-color: ${({ theme }) => theme.hoverColor};
  }
`;

// -----------------

export const RoundButtonLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  border-radius: 20px;
  text-decoration: none;
  background-color: ${({ theme }) => theme.contrastColor};
  padding: 2px 4px;
  transition: all 0.1s ease-in-out 0s;

  &:hover {
    background-color: ${({ theme }) => theme.hoverColor};
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
  max-width: 130px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const AuthGroupButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 145px;

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
  height: 35px;
  padding: 0 16px;
  background-color: ${({ theme }) => theme.contrastColor};
  border-radius: 20px;
  transition: all 0.1s ease-in-out 0s;

  &:hover {
    background-color: ${({ theme }) => theme.hoverColor};
  }
`;

export const SignUp = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.textColor};
  padding: 2px 4px;

  &:hover {
    text-decoration: underline;
  }
`;
