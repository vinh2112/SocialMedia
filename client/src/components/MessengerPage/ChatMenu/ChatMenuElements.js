import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { css } from "styled-components";

export const ChatMenuContainer = styled.div`
  position: relative;
  width: 320px;
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.borderColor};
  overflow: hidden;

  @media (max-width: 1024px) {
    width: 280px;
  }

  @media (max-width: 700px) {
    width: 83px;
  }
`;

export const ChatMenuWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: ${({ isSearching }) => (isSearching ? "-100%" : "0")};
  opacity: ${({ isSearching }) => (isSearching ? "0" : "1")};
  visibility: ${({ isSearching }) => (isSearching ? "hidden" : "visible")};
  transition: all 0.2s ease;
`;

export const ChatMenuTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 16px 12px;

  & > .chat-title {
    font-size: 28px;
    font-weight: 700;
  }

  @media (max-width: 1024px) {
    padding: 12px 16px 8px;
  }
`;

const buttonStyle = css`
  position: relative;
  display: flex;
  justify-content: center;
  outline: none;
  border: none;
  background: transparent;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.textColor};
  transition: all 0.1s ease;
  cursor: pointer;

  &:before {
    content: "";
    position: absolute;
    inset: -6px;
    background: transparent;
    border-radius: 50%;
    opacity: 0.1;
  }

  &:hover:before {
    background: ${({ theme }) => theme.textColor};
  }
`;

export const ChatSearchButton = styled.button`
  ${buttonStyle}
`;

export const ChatSearchWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  right: ${({ isSearching }) => (isSearching ? "0" : "-100%")};
  opacity: ${({ isSearching }) => (isSearching ? "1" : "0")};
  visibility: ${({ isSearching }) => (isSearching ? "visible" : "hidden")};
  transition: all 0.2s ease;
`;

export const ChatSearchTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 20px 16px 12px;

  @media (max-width: 1024px) {
    padding: 12px 16px 8px;
  }
`;

export const ChatBackButton = styled.div`
  ${buttonStyle}
`;

export const ChatSearchSection = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  padding: 6px 8px;
  background-color: ${({ theme }) => theme.contrastColor};
  flex: 1;
  border-radius: 20px;
`;

export const ChatSearchInput = styled.input`
  flex: 1;
  height: 20px;
  outline: none;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.textColor};
  margin-left: 6px;
`;

export const ChatSearchBottom = styled.div`
  padding: 8px;
`;

export const ChatSearchQuery = styled.div`
  display: flex;
  align-items: center;
  padding: 0 8px;
  font-size: 1rem;

  & > .iconify {
    font-size: 1.8rem;
  }

  & > div {
    margin-left: 8px;
    font-size: 0.9rem;
    font-weight: 500;
  }
`;

export const SearchResults = styled.div`
  margin-top: 10px;
`;

export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 5px;
  transition: all 0.1s ease;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.contrastColor};
  }
`;

export const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

export const UserName = styled.div`
  margin-left: 8px;
  font-weight: 500;
`;

export const ConversationContainer = styled(NavLink)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  border-radius: 5px;
  color: ${({ theme }) => theme.textColor};
  text-decoration: none;
  transition: all 0.1s ease;
  cursor: pointer;

  & > .conv-content {
    display: flex;
    align-items: center;
  }

  & > .badge {
    padding: 5px;
    margin: 0 6px;
    border-radius: 50%;
    background-color: var(--primary-color);

    @media (max-width: 700px) {
      position: absolute;
      margin: 0;
      top: 5px;
      right: 5px;
    }
  }

  &.active:before {
    content: "";
    position: absolute;
    inset: 0;
    background-color: var(--primary-color);
    border-radius: inherit;
    opacity: 0.1;
  }

  &:hover {
    background-color: ${({ theme }) => theme.contrastColor};
  }

  &.active:hover {
    background-color: unset;
  }
`;

export const ConvAvatar = styled.img`
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

export const ConvName = styled.div`
  position: relative;
  font-size: 16px;
  margin-left: 16px;
  font-weight: ${({ seen }) => !seen && "700"};

  @media (max-width: 700px) {
    display: none;
  }
`;

export const ConvLastMessage = styled.div`
  position: relative;
  margin-left: 16px;
  margin-top: 2px;
  font-size: 14px;
  color: ${({ theme }) => theme.subTextColor};

  @media (max-width: 700px) {
    display: none;
  }
`;
