import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const MenuContainer = styled.div`
  width: 100%;
  max-width: 300px;
  padding: 6px;
  border-right: 1px solid ${({ theme }) => theme.borderColor};

  @media (max-width: 700px) {
    max-width: 60px;
  }
`;

export const MenuListItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow: hidden;
`;

export const MenuItem = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 12px 8px;
  border-radius: 5px;
  min-width: 240px;
  color: ${({ theme }) => theme.textColor};
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  user-select: none;

  @media (max-width: 700px) {
    justify-content: center;
    min-width: unset;

    & > span {
      display: none;
    }
  }

  & > .iconify {
    font-size: 26px;
  }

  & > span {
    margin-left: 8px;
  }

  &.active {
    background: ${({ theme }) => theme.contrastColor};
  }

  &:hover {
    background: ${({ theme }) => theme.hoverColor};
  }
`;
