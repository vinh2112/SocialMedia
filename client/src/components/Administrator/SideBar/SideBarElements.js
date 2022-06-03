import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const AdminSidebarContainer = styled.div`
  position: fixed;
  width: 100%;
  max-width: 255px;
  min-height: calc(100vh - 54px);
  padding: 14px 0 14px 16px;
  border-right: 1px solid ${({ theme }) => theme.contrastColor};
  background: ${({ theme }) => theme.primary};
  box-shadow: var(--box-shadow);

  @media (min-width: 1440px) {
    max-width: 320px;
  }

  @media (max-width: 900px) {
    max-width: 260px;
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    min-height: 60px;
    max-width: 100%;
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.contrastColor};
  }
`;

export const AdminSidebarTitle = styled.div`
  color: ${({ theme }) => theme.textColor};
  font-size: 20px;
  font-weight: 500;
  filter: opacity(0.6);

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

export const AdminSidebarMenu = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  padding-right: 16px;

  @media (max-width: 768px) {
    flex-direction: row;
    overflow: hidden;
    overflow-x: auto;
    gap: 10px;
  }
`;

export const AdminMenuItem = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 12px 8px 12px 12px;
  border-radius: 5px;
  text-decoration: none;
  color: ${({ theme }) => theme.textColor};
  transition: all 0.2s ease;
  cursor: pointer;
  user-select: none;

  & > .iconify {
    font-size: 24px;
  }

  & > span {
    margin-left: 8px;
    font-size: 12px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  &.active {
    background: ${({ theme }) => theme.contrastColor};
  }

  &:hover {
    background: ${({ theme }) => theme.hoverColor};
  }

  @media (max-width: 768px) {
    border: 1px solid ${({ theme }) => theme.hoverColor};
  }
`;
