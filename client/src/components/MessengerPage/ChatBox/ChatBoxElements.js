import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const ChatBoxWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const ChatBoxTop = styled.div`
  padding: 8px 10px 6px;

  @media (max-width: 1024px) {
    padding: 2px 10px 0;
  }
`;

export const FriendInfo = styled(NavLink)`
  position: relative;
  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => theme.textColor};
  text-decoration: none;
  padding: 6px 8px 6px 6px;
  border-radius: 5px;
  transition: all 0.1s ease;

  /* @media (max-width: 1024px) {
    padding: 6px 8px 6px 6px;
  } */

  &:hover {
    background-color: ${({ theme }) => theme.contrastColor};
  }
`;

export const FriendAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

export const FriendName = styled.div`
  margin-left: 8px;
  font-weight: 700;
`;

export const ChatBoxBottom = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
`;

export const ChatOptions = styled.div`
  display: flex;
  margin-right: 12px;
  gap: 10px;
`;

export const OptionItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  cursor: pointer;

  &:before {
    content: "";
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    opacity: 0.1;
    transition: all 0.1s ease;
  }

  &:hover::before {
    background-color: var(--primary-color);
  }
`;

export const ChatInput = styled.textarea`
  flex: 1;
  border: 0;
  outline: 0;
  overflow: hidden;
  min-height: 20px;
  resize: none;
  background: transparent;
  border-bottom: 2px solid ${({ theme }) => theme.contrastColor};
  font-size: 16px;
  height: 28px;
  line-height: 20px;
  padding: 4px;
  color: ${({ theme }) => theme.textColor};
  transition: border 0.15s ease-out 0s;

  &:focus,
  &:not(:placeholder-shown) {
    border-bottom: 2px solid ${({ theme }) => theme.subTextColor};
  }
  &::placeholder {
    font-weight: 500;
  }
`;

export const ChatSubmitButton = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  outline: none;
  border: none;
  background: transparent;
  margin-left: 12px;
  color: var(--primary-color);
  font-size: 1.4rem;
  cursor: pointer;

  &.disable {
    opacity: 0.3;
    cursor: default;
  }

  &:before {
    content: "";
    position: absolute;
    inset: -8px;
    border-radius: 50%;
    opacity: 0.1;
    transition: all 0.1s ease;
  }

  &:hover::before {
    background-color: var(--primary-color);
  }
`;

export const ChatMessages = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  overflow-y: auto;
`;

export const MessageContainer = styled.div`
  display: flex;
  align-items: flex-end;
  margin-top: 6px;
  /* align-self: flex-end; */

  &.own {
    justify-items: flex-end;
    flex-direction: row-reverse;
  }
`;

export const MessageAvatar = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  object-fit: cover;
`;

export const MessageText = styled.div`
  max-width: 60%;
  margin: 0 10px;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.contrastColor};

  ${MessageContainer}.own & {
    margin: 0 0 0 10px;
    border: none;
    background-color: ${({ theme }) => theme.contrastColor};
  }
`;

export const MessageOptions = styled.div`
  align-self: center;
  display: flex;
  gap: 16px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.1s ease;

  ${MessageContainer}:hover & {
    opacity: 1;
    visibility: visible;
  }

  ${MessageContainer}.own & {
    flex-direction: row-reverse;
  }

  & > div {
    position: relative;
    display: flex;
    font-size: 1.2rem;
    transition: all 0.1s ease;
    cursor: pointer;

    &:before {
      content: "";
      position: absolute;
      inset: -5px;
      border-radius: 50%;
      opacity: 0.1;
      transition: all 0.1s ease;
    }

    &:hover::before {
      background-color: ${({ theme }) => theme.textColor};
    }
  }
`;

export const NoConv = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
