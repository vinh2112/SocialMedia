import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const ReportContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding-bottom: 20px;
`;

export const ReportedPostList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 540px;

  @media (max-width: 1024px) {
    padding: 0 16px;
  }
`;

export const ReportedPostContainer = styled.div`
  &:not(:nth-child(2)) {
    margin-top: 30px;
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

  & > .created-date {
    font-size: 12px;
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
  color: #fefefe;
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
  margin-top: 10px;
  background-color: ${({ theme }) => theme.primary};
  box-shadow: var(--box-shadow);

  border-radius: 5px;
  overflow: hidden;
`;

export const PostDetailTop = styled.div`
  display: flex;
  padding: 12px 14px 8px;
`;

export const AvatarWrapper = styled.div``;

export const Avatar = styled(NavLink)`
  & > img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const DetailRightSide = styled.div`
  margin-left: 8px;
`;

export const NameAuthorLink = styled(NavLink)`
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.textColor};
`;

export const CreatedDate = styled.div`
  color: ${({ theme }) => theme.subTextColor};
  font-size: 12px;
  margin-top: 2px;
`;

export const PostDescription = styled.div`
  padding: 0 14px 8px;
  font-size: 15px;
`;

export const PostPhoto = styled.img`
  display: flex;
  width: 100%;
  max-height: 500px;
  object-fit: contain;
  background-color: rgba(0, 0, 0, 0.1);
  user-select: none;
`;

export const ReportTop = styled.div`
  display: flex;
  align-items: center;
  width: 500px;
  margin-bottom: 10px;

  & > .report-title {
    padding: 6px 0;
    color: ${({ theme }) => theme.textColor};
    opacity: 0.6;
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 700;
  }

  & > .report-count {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 8px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: var(--danger-color);

    & > span {
      font-size: 14px;
      font-weight: 500;
      color: #fefefe;
    }
  }

  @media (max-width: 1024px) {
    padding: 0 16px;
  }

  @media (max-width: 700px) {
    width: 100%;
  }
`;

export const ReportChartContainer = styled.div`
  position: sticky;
  top: 0px;
  flex: 1;
  max-width: 400px;
  height: fit-content;
  padding: 20px 0 30px;
  border-radius: var(--border-radius-admin);
  background-color: ${({ theme }) => theme.primary};
  box-shadow: var(--box-shadow);
`;
