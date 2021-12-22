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
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  padding: 8px;

  @media (max-width: 840px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const PaymentPhotoWrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  width: 120px;
`;

export const Photo = styled.img`
  max-width: 120px;
  max-height: 100px;
  object-fit: contain;
  border-radius: 5px;
`;

export const PaymentDetail = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-left: 12px;
  margin-right: 60px;
  flex: 1;

  & > .payment-date {
    min-width: 100px;
    text-align: center;
    color: ${({ theme }) => theme.subTextColor};
  }

  & > .payment-price {
    color: ${({ type }) => (type === "received" ? `var(--success-color)` : `var(--danger-color)`)};
    font-size: 1.6rem;
    min-width: 60px;
    text-align: center;
  }

  & > .payment-type {
    text-transform: uppercase;
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
`;

export const DownloadButton = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  display: flex;
  font-size: 1.6rem;
  user-select: none;
  transform: translateY(-50%);
  cursor: pointer;
`;
