import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  padding: 10px 10px 4px;
  border-top: 1px solid ${({ theme }) => theme.borderColor};
`;

export const ContentTop = styled.div`
  display: flex;
`;

export const AvatarWrapper = styled.div``;

export const AvatarLink = styled(Link)``;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  object-fit: cover;
`;

export const AuthorWrapper = styled.div`
  margin-left: 10px;
`;

export const AuthorName = styled(Link)`
  color: ${({ theme }) => theme.textColor};
  text-decoration: none;
`;

export const CreatedDate = styled.div`
  color: ${({ theme }) => theme.subTextColor};
  font-size: 14px;
  margin-top: 4px;
`;

export const DescWrapper = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: ${({ isOverflow }) => (isOverflow ? 4 : "none")};
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const Desc = styled.div`
  line-height: 1.3rem;
`;

export const LoadmoreButton = styled.div`
  margin-top: 4px;
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.subTextColor};
  cursor: pointer;
  user-select: none;
`;
