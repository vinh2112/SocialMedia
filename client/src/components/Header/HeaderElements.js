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
  box-shadow: 0 0 10px 0 rgba(0 0 0 / 10%);
  z-index: 100;
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
  max-width: 200px;
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
  color: ${({ theme }) => theme.textColor};
  text-decoration: none;
`;

// Round Button

const roundButton = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-left: 12px;
  border-radius: 50%;
  font-size: 1.2rem;
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
  height: 40px;
  border-radius: 20px;
  text-decoration: none;
  background-color: ${({ theme }) => theme.contrastColor};
  padding: 5px;
  transition: all 0.1s ease-in-out 0s;

  &:hover {
    background-color: ${({ theme }) => theme.hoverColor};
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
`;

export const UserName = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0 5px 0 8px;
  color: ${({ theme }) => theme.textColor};
`;

export const AuthGroupButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 155px;

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
  height: 40px;
  padding: 0 20px;
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
