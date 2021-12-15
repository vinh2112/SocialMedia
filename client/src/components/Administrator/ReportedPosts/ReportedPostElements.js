import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const ReportedPostList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 670px;
  padding: 0 48px;

  @media (max-width: 1024px) {
    padding: 0 16px;
  }
`;

export const ReportedPostContainer = styled.div`
  width: 100%;

  &:not(:first-child) {
    margin-top: 20px;
  }
`;

export const ReportDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  padding: 10px 16px;
`;

export const ReportDetailLeft = styled.div`
  color: ${({ theme }) => theme.subTextColor};

  & > .reason-report {
    color: var(--warning-color);
  }
`;

export const ReportDetailRight = styled.div``;

export const GroupButton = styled.div`
  display: flex;
  gap: 12px;
`;

export const ReportButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;

  &.danger {
    background-color: var(--danger-color);
  }

  &.success {
    background-color: var(--success-color);
  }

  &:after {
    content: ${({ tooltip }) => (tooltip ? "success" : "danger")};
  }
`;

export const PostDetail = styled.div`
  margin-top: 6px;
  background-color: ${({ theme }) => theme.primary};
  border-radius: 5px;
  overflow: hidden;
`;

export const PostDetailTop = styled.div`
  display: flex;
  padding: 8px 14px;
`;

export const AvatarWrapper = styled.div``;

export const Avatar = styled(NavLink)`
  & > img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const DetailRightSide = styled.div`
  margin-left: 8px;
`;

export const NameAuthorLink = styled(NavLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.textColor};
`;

export const CreatedDate = styled.div`
  color: ${({ theme }) => theme.subTextColor};
  font-size: 0.9rem;
  margin-top: 4px;
`;

export const PostDescription = styled.div`
  padding: 0 14px 8px;
`;

export const PostPhoto = styled.img`
  display: flex;
  width: 100%;
  max-height: 500px;
  object-fit: contain;
`;
