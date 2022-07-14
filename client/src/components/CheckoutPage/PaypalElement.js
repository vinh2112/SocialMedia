import { Button } from "@mui/material";
import styled from "styled-components";

export const PaymentContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: var(--max-width);
  margin: 0 auto;
  padding: 72px 16px 10px;
`;

export const PaymentLeftSide = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  margin-right: 10px;
  gap: 20px;
`;

export const PaymentRightSide = styled.div`
  flex: 1;
  height: fit-content;
  border-radius: 5px;
  border: 2px solid ${({ theme }) => theme.borderColor};
  margin-left: 10px;
`;

export const OrderContainer = styled.div`
  padding: 16px;

  & > .order-title {
    display: inline-flex;
    flex-direction: column;
    font-size: 20px;
    font-weight: 500;

    &:after {
      content: "";
      padding-bottom: 2px;
      background-color: ${({ theme }) => theme.borderColor};
    }
  }

  & > .order__detail {
    padding-top: 8px;

    & > .order__detail-item.flex {
      display: flex;
      justify-content: space-between;
    }

    & > .order__detail-item {
      margin-top: 16px;

      & > .order__detail-item_title {
        margin-bottom: 6px;
        font-weight: 500;
      }

      & > .order__detail-price {
        font-size: 28px;
        font-weight: 500;
        color: var(--success-color);
      }

      & > .order__detail-item_subTitle {
        font-weight: 500;
        color: ${({ theme }) => theme.subTextColor};
      }
    }
  }

  & > .order__detail-line {
    display: flex;
    padding-bottom: 2px;
    background-color: ${({ theme }) => theme.borderColor};
    margin: 10px 0;
  }
`;

export const UserBlockContainer = styled.div`
  display: flex;
  gap: 10px;
  padding-bottom: 10px;

  & > img {
    width: 60px;
    height: 60px;
    border-radius: 15px;
    object-fit: cover;
  }

  & > .user__block-info {
    margin-top: 6px;

    & > .user__block-info_name {
      font-weight: 500;
    }

    & > .user__block-info_nickname {
      margin-top: 4px;
      color: ${({ theme }) => theme.subTextColor};
    }
  }
`;

export const PayButtonContainer = styled(Button)`
  &&& {
    color: #fff;
    background-color: var(--success-color);
    line-height: 2;
    margin-bottom: 4px;
  }

  &&&.momo {
    color: #fff;
    background-color: #af1a71;
    line-height: 2;
  }

  &&&.zalopay {
    color: #fff;
    background-color: #348fe4;
    line-height: 2;
  }

  &&&.vnpay {
    color: #fff;
    background-color: #004a9c;
    line-height: 2;
  }

  &&&.download {
    color: #fff;
    background-color: var(--primary-color);
    line-height: 2;
  }
`;

export const TopSection = styled.div`
  height: 300px;
  width: 100%;
  border-radius: 5px;
  border: 2px solid ${({ theme }) => theme.borderColor};
  padding: 16px;

  & > img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    object-fit: cover;
  }
`;

export const BottomSection = styled.div`
  width: 100%;
  border-radius: 5px;
  border: 2px solid ${({ theme }) => theme.borderColor};
  padding: 16px;

  & > .payment__options {
    display: flex;
    gap: 16px;
  }

  & > .divider {
    display: flex;
    padding-bottom: 2px;
    background-color: ${({ theme }) => theme.borderColor};
    margin: 16px 0;
  }

  & > .payment__options-list_Ewallet {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-content: center;
    justify-content: center;
    grid-row-gap: 20px;
    grid-column-gap: 40px;
  }
`;

export const PaymentOptionContainer = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 16px;
  padding: 10px 30px 10px 16px;
  border-radius: 5px;
  border: 2px solid ${({ theme }) => theme.borderColor};
  cursor: pointer;

  & > .payment__option-radio {
    position: relative;
    width: 24px;
    height: 24px;
    border: 2px solid ${({ theme }) => theme.borderColor};
    border-radius: 50%;
    transition: all 0.2s ease;

    &:before {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 0;
      height: 0;
      border-radius: 50%;
      background-color: var(--success-color);
      transition: all 0.2s ease;
    }
  }

  & > input:checked + .payment__option-radio:before {
    width: 16px;
    height: 16px;
  }

  & > input:checked + .payment__option-radio {
    border-color: var(--success-color);
  }

  & > .payment__option-content {
    & > .payment__option-content_title {
      font-size: 18px;
      font-weight: 500;
      text-transform: capitalize;
    }

    & > .payment__option-content_body {
      font-size: 14px;
      color: ${({ theme }) => theme.subTextColor};

      &.green {
        color: var(--success-color);
      }

      &.red {
        color: var(--danger-color);
      }
    }
  }
`;

export const EWalletContainer = styled.label`
  position: relative;
  width: 150px;
  height: 150px;
  border: 2px solid ${({ theme }) => theme.borderColor};
  border-radius: 5px;
  background-position: center;
  background-size: 100px;
  background-repeat: no-repeat;
  cursor: pointer;

  & > .overlay {
    position: absolute;
    inset: 0;
    background-color: transparent;
    opacity: 0;
    transition: all 0.1s ease;
  }

  & > input:checked + .overlay {
    background-color: ${({ theme }) => theme.hoverColor};
    opacity: 0.4;
  }
`;
