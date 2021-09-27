import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  margin-top: 8px;
`;

export const LeftSide = styled.div``;

export const AvatarLink = styled(Link)`
  display: inline-flex;
`;

export const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 8px;
`;

export const RightSide = styled.div`
  flex: 1;
`;

export const CommentContent = styled.div`
  display: inline-block;
  flex-shrink: 1;
  line-height: 20px;
  width: 90%;
`;

export const Name = styled(Link)`
  display: inline-flex;
  font-size: 0.8rem;
  font-weight: 700;
  text-decoration: none;
  margin-right: 4px;
  white-space: nowrap;
  color: ${({ theme }) => theme.textColor};
`;

export const Comment = styled.span`
  font-size: 0.9rem;
  font-weight: 300;
  line-height: 20px;
`;

export const BottomComment = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
`;

export const Time = styled.div`
  font-size: 0.7rem;
  font-weight: 300;
  color: ${({ theme }) => theme.subTextColor};
`;

export const ReplyButton = styled.div`
  margin-left: 16px;
  font-size: 0.8rem;
  font-weight: 500;
  color: ${({ theme }) => theme.subTextColor};
  cursor: pointer;
`;
