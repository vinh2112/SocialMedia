import { Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const OnlineUserContainer = styled.div`
  position: sticky;
  top: 64px;
  margin-top: 16px;

  & > .contact-title {
    margin-left: 12px;
    margin-bottom: 10px;

    color: ${({ theme }) => theme.subTextColor};
    font-size: 15px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

export const ListOnlineUser = styled.ul`
  height: 100%;
  max-height: calc(100vh - 100px);
`;

export const OnlineUserItemContainer = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  text-decoration: none;
  border-radius: 5px;
  transition: all 0.1s ease;
  padding: 8px 10px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.contrastColor};
  }

  & > span {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: var(--success-color);
  }
`;

export const OUAvatarWrapper = styled.div`
  display: flex;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
`;

export const OUAvatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: opacity(${({ online }) => (online ? 1 : 0.5)});
`;

export const OUName = styled.div`
  margin-left: 10px;
  font-size: 15px;
  font-weight: ${({ online }) => (online ? 500 : 400)};
  user-select: none;
  color: ${({ theme }) => theme.textColor};
  filter: opacity(${({ online }) => (online ? 1 : 0.5)});
`;

export const CustomSkeleton = styled(Skeleton)`
  && {
    background-color: ${({ theme }) => theme.contrastColor};
  }
`;
