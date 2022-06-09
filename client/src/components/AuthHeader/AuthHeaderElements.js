import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const AuthHeaderContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 80px;
  z-index: 99;

  & > .auth-header__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1180px;
    padding: 0 20px;
    height: 100%;
    margin: 0 auto;

    & > .home-link {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: ${({ theme }) => theme.textColor};
      font-size: 18px;
      font-weight: 700;
      gap: 8px;
    }

    & > .auth {
      display: flex;
      height: 100%;
      align-items: center;
      gap: 32px;
    }
  }
`;

export const AuthItem = styled(NavLink)`
  position: relative;
  height: 50px;
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 14px;
  font-weight: 700;
  text-transform: capitalize;

  & > div {
    padding: 10px 24px;
    border-radius: 24px;
    background: ${({ theme }) => theme.primary};
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    color: ${({ theme }) => theme.textColor};
  }

  &.active {
    & > div {
      box-shadow: unset;
      color: var(--primary-color);
      background: unset;
    }

    &:before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 12px;
      height: 4px;
      border-radius: 6px;
      background-color: var(--primary-color);
    }
  }
`;
