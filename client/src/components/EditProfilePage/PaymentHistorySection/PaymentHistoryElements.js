import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const PaymentHistoryContainer = styled.div`
  margin: 0 auto;
  padding: 8px;
  width: 100%;
`;

export const PaymentItemContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  @media (max-width: 840px) {
    flex-direction: column;
    align-items: flex-start;
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  }
`;

export const PaymentPhotoWrapper = styled(Link)`
  display: inline-flex;
  justify-content: center;
  width: 120px;

  @media (max-width: 840px) {
    justify-content: flex-start;
  }
`;

export const Photo = styled.img`
  max-width: 100px;
  object-fit: contain;
  border-radius: 5px;
`;

export const PaymentDetail = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-left: 8px;
  margin-right: 8px;
  flex: 1;

  & > .payment-date {
    min-width: 100px;
    text-align: center;
    font-size: 14px;
    color: ${({ theme }) => theme.subTextColor};
  }

  & > .payment-price {
    color: ${({ type }) => (type === "received" ? `var(--success-color)` : `var(--danger-color)`)};
    font-size: 20px;
    font-weight: 700;
    min-width: 60px;
    text-align: center;
  }

  & > .payment-type {
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 700;
    color: ${({ theme }) => theme.subTextColor};
  }

  @media (max-width: 840px) {
    margin-right: 0;
    margin-left: 0;
  }
`;

export const NameUser = styled(NavLink)`
  color: ${({ theme }) => theme.textColor};
  text-decoration: none;
  align-self: center;
  font-size: 14px;
  width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  &:hover {
    text-decoration: underline;
  }
`;

export const DownloadButton = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  display: flex;
  font-size: 20px;
  user-select: none;
  transform: translateY(-50%);
  cursor: pointer;
`;
