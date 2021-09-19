import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 54px;
  background-color: ${({ theme }) => theme.primary};
  border-bottom: ${({ theme }) => theme.contrastColor};
  box-shadow: 0 2px 0 0 rgba(0 0 0 / 7%);
  z-index: 98;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 16px;
`;

export const HeaderRight = styled.div`
  display: flex;
  max-width: 150px;
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

// Round Button

const roundButton = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-left: 8px;
  border-radius: 50%;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.textColor};
  background-color: ${({ theme }) => theme.contrastColor};
`;

export const RoundButton = styled.label`
  cursor: pointer;
  user-select: none;
  ${roundButton}
`;

export const RoundButtonLink = styled(Link)`
  ${roundButton}
  text-decoration: none;
`;

// -----------------