import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const MenuContainer = styled.div`
  width: 100%;
  max-width: 300px;
  min-height: calc(100vh - 54px);
  padding: 8px 4px;
  border-right: 1px solid ${({ theme }) => theme.contrastColor};

  @media (max-width: 700px) {
    padding: 8px 16px;
    min-height: 60px;
    max-width: 100%;
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.contrastColor};
  }
`;

export const MenuTitle = styled.div`
  color: ${({ theme }) => theme.textColor};
  font-size: 25px;
  font-weight: 700;
  filter: opacity(0.6);
  margin-left: 8px;

  @media (max-width: 700px) {
    margin-left: 0;
  }
`;

export const MenuListItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 12px;

  @media (max-width: 700px) {
    flex-direction: row;
    overflow: hidden;
    overflow-x: auto;
    gap: 10px;
  }
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

  @media (max-width: 700px) {
    border: 1px solid ${({ theme }) => theme.hoverColor};
  }
`;
