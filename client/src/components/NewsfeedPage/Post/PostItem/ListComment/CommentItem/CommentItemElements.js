import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  margin-top: 8px;
`;

export const LeftSide = styled.div``;

export const AvatarLink = styled(Link)`
  display: flex;
  margin-top: 2px;
`;

export const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
`;

export const RightSide = styled.div`
  flex: 1;
`;

export const CommentContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const CommentWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: 4px;
  margin-left: 8px;
`;

export const CommentContent = styled.div`
  display: inline-block;
  line-height: 20px;

  &.replying {
    padding: 4px 8px;
    background: ${({ theme }) => theme.contrastColor};
    border-radius: 5px;
  }
`;

export const Name = styled(Link)`
  display: inline-block;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  margin-right: 4px;
  color: ${({ theme }) => theme.textColor};
`;

export const Comment = styled.div`
  display: inline;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
`;

export const BottomComment = styled.div`
  display: flex;
  align-items: center;
`;

export const Time = styled.div`
  font-size: 0.8rem;
  font-weight: 400;
  color: ${({ theme }) => theme.subTextColor};
`;

export const ReplyButton = styled.div`
  margin-left: 4px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.subTextColor};
  transition: all 0.05s ease-in-out;
  cursor: pointer;
  user-select: none;

  &:hover {
    color: ${({ theme }) => theme.textColor};
    filter: brightness(0.8);
  }
`;

export const ButtonWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: transparent;
  color: ${({ theme }) => theme.textColor};
  font-size: 18px;
  opacity: 0;
  transition: opacity 0.1s ease-in-out, background 0.05s ease-in-out;
  cursor: pointer;

  ${CommentContainer}:hover & {
    opacity: 1;
  }

  &:hover {
    background-color: ${({ theme }) => theme.hoverColor};
  }
`;

export const MenuActions = styled.ul`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: absolute;
  bottom: 120%;
  right: 0;
  padding: 4px;
  background-color: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.borderColor};
  box-shadow: 0 0 8px 0 rgba(0 0 0 / 30%);
  border-radius: 5px;
  user-select: none;
  z-index: 9999;
`;

export const MenuItem = styled.li`
  width: 150px;
  font-size: 14px;
  white-space: nowrap;
  padding: 6px 8px;
  border-radius: 4px;
  color: var(--danger-color);
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.hoverColor};
  }
`;

export const ReplyWrapper = styled.div``;
