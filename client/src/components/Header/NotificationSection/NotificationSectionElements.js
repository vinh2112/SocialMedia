import { Link } from "react-router-dom";
import styled from "styled-components";

export const NotificationContainer = styled.div`
  position: absolute;
  top: 42px;
  right: -43px;
  min-width: 340px;
  max-height: calc(100vh - 100px);
  overflow: hidden;
  overflow-y: auto;
  border-radius: 5px;
  padding: 8px;
  background-color: ${({ theme }) => theme.primary};
  box-shadow: var(--box-shadow);
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};

  & > .notify-title {
    font-weight: 700;
    font-size: 20px;
    margin: 10px;
  }
`;

export const ListNotification = styled.ul``;

export const NotificationItemContainer = styled.li`
  border-radius: 5px;
  transition: all 0.1s ease;

  &:hover {
    background-color: ${({ theme }) => theme.contrastColor};
  }
`;

export const NotifyWrapper = styled(Link)`
  display: flex;
  padding: 10px;
  text-decoration: none;
  color: ${({ theme }) => theme.textColor};
`;

export const NotifyAvatarWrapper = styled.div`
  display: flex;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
`;

export const NotifyAvatar = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

export const NotifyContent = styled.div`
  margin-left: 8px;
`;

export const NotifyText = styled.div`
  display: -webkit-box;
  max-width: calc(340px - 104px);
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: ${({ seen, theme }) => (seen ? theme.subTextColor : theme.textColor)};
  font-weight: 300;

  & > .notify-sender {
    font-weight: 700;
  }
`;

export const NotifyTime = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-top: 4px;
  color: ${({ seen, theme }) => (seen ? theme.subTextColor : "var(--primary-color)")};
`;
