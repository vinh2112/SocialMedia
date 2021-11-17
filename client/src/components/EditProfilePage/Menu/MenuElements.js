import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const MenuContainer = styled.div`
  width: 100%;
  max-width: 300px;
  min-height: calc(100vh - 54px);
  padding: 8px 4px;
  border-right: 1px solid ${({ theme }) => theme.contrastColor};
`;

export const MenuTitle = styled.div`
  color: ${({ theme }) => theme.textColor};
  font-size: 25px;
  font-weight: 700;
  filter: opacity(0.6);
  margin-left: 8px;
`;

export const MenuListItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 12px;
`;

export const MenuItem = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 12px 8px;
  border-radius: 5px;
  color: ${({ theme }) => theme.textColor};
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  user-select: none;

  & > .iconify {
    font-size: 26px;
  }

  & > span {
    margin-left: 8px;
  }

  &.active {
    background: ${({ theme }) => theme.hoverColor};
  }

  &:hover {
    background: ${({ theme }) => theme.hoverColor};
  }
`;
