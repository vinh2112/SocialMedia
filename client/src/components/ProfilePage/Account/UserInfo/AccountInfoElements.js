import { Avatar, AvatarGroup } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const AvatarWrapper = styled.div`
  position: relative;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: 16px 0 8px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  background-color: ${({ theme }) => theme.contrastColor};

  @media (max-width: 1024px) {
    top: 0;
    left: 0;
    transform: translate(0);
    margin: 0;
  }
`;

export const AvatarUser = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
  transition: all 0.1s ease;

  /* &:hover {
    filter: brightness(1.1);
  } */
`;

export const EditButton = styled(Link)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  right: 0;
  border-radius: 50%;
  color: ${({ theme }) => theme.textColor};
  background-color: ${({ theme }) => theme.contrastColor};
  transition: all 0.05s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.hoverColor};
  }
`;

export const AccountInfo = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 16px 16px;

  & > .account__balance-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 280px;
    margin: 20px 0 0;
    border-radius: 5px;
    border: 2px solid ${({ theme }) => theme.borderColor};
    padding: 12px 10px;

    & > .account__balance {
      display: flex;
      gap: 10px;

      & > span {
        color: ${({ theme }) => theme.subTextColor};
      }

      & > .balance {
        color: var(--success-color);
      }
    }
  }

  @media (max-width: 1024px) {
    padding: 0;
    margin-left: 20px;
    align-items: flex-start;
    justify-content: space-between;
  }
`;

export const AccountName = styled.div`
  font-weight: 500;
  font-size: 1rem;
`;

export const Desc = styled.div`
  margin-top: 16px;
  font-style: italic;
  text-align: center;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.subTextColor};

  @media (max-width: 1024px) {
    text-align: left;
  }
`;

export const Details = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-row-gap: 24px;
  grid-column-gap: 10px;
  width: 100%;
  margin-top: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-row-gap: 10px;
  }
`;

export const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  grid-column: span 3;

  &:nth-child(1),
  &:nth-child(2),
  &:nth-child(3) {
    grid-column: span 2;
  }

  @media (max-width: 1024px) {
    align-items: flex-start;
    margin-top: 0;
  }
`;

export const Title = styled.div`
  text-transform: uppercase;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 1px;
  margin-top: 6px;
  color: ${({ theme }) => theme.subTextColor};

  ${DetailItem}:nth-child(1):hover &,
  ${DetailItem}:nth-child(2):hover & {
    text-decoration: underline;
  }

  ${DetailItem}:nth-child(1) &,
  ${DetailItem}:nth-child(2) & {
    cursor: pointer;
  }
`;

export const Detail = styled.div`
  font-size: 14px;
  font-weight: 700;
  max-width: 140px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  grid-column: span 3;

  @media (max-width: 1024px) {
    grid-column: span 2;
  }

  @media (max-width: 700px) {
    grid-column: span 3;
  }
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  border: 1px solid var(--primary-color);
  border-radius: 5px;
  padding: 8px 16px;
  text-transform: capitalize;
  font-weight: 600;
  letter-spacing: 1px;
  background: ${({ isFollowed }) => (isFollowed ? "transparent" : "var(--primary-color)")};
  color: ${({ isFollowed, theme }) => (isFollowed ? theme.textColor : "#fff")};
  transition: all 0.1s ease-in-out;
  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
  }

  &.btn-secondary {
    background: ${({ theme }) => theme.contrastColor};
    border: 1px solid ${({ theme }) => theme.contrastColor};
    color: ${({ theme }) => theme.textColor};
  }

  & .iconify {
    font-size: 18px;
  }
`;

export const BalanceLink = styled(Link)`
  color: var(--primary-color);
  text-decoration: none;
`;

export const CustomAvatar = styled(Avatar)``;

export const CustomAvatarGroup = styled(AvatarGroup)`
  && {
    & > .MuiAvatar-root {
      width: 20px;
      height: 20px;
      border-color: ${({ theme }) => theme.contrastColor} !important;
      font-size: 0.8rem;
    }
  }
`;
