import { Button } from "@mui/material";
import styled from "styled-components";

export const PayContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: var(--max-width);
  margin: 0 auto;
  padding: 72px 16px 10px;

  .pay__container {
    width: 80%;
    background-color: ${({ theme }) => theme.primary};
    padding: 40px 80px;
    border-radius: 5px;
    box-shadow: ${({ theme }) => theme.boxShadow};
  }
`;

export const PayInformation = styled.div`
  & > .pay-information__title {
    font-weight: 500;
  }

  & > .pay-information__info {
    margin-top: 16px;
    padding: 16px 24px;
    border: 1px dashed var(--primary-color);
    border-radius: 5px;

    & > .pay-information__item > span {
      font-weight: 700;
      letter-spacing: 1px;
      font-size: 16px;
      color: var(--primary-color);
      margin-right: 4px;
    }

    & > .pay-information__item:not(:first-child) {
      margin-top: 6px;
    }
  }
`;

export const PackageItemButton = styled.div`
  position: absolute;
  display: ${({ isShow }) => (isShow ? "flex" : "none")};
  top: 50%;
  right: 16px;
  padding: 8px;
  border-radius: 5px;
  color: #fff;
  background-color: ${({ isShow }) => (isShow ? "var(--success-color)" : "var(--primary-color)")};
  transform: translateY(-50%);
`;

export const PayPackage = styled.div`
  margin-top: 40px;

  & > .pay-package__title {
    font-weight: 500;
  }

  & > .pay-package__packages {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 32px;
    margin-top: 16px;

    & > .pay-package__item {
      position: relative;
      border: 2px solid ${({ theme }) => theme.borderColor};
      border-radius: 5px;
      padding: 16px 20px;
      font-size: 20px;
      cursor: pointer;

      &:hover > ${PackageItemButton} {
        display: flex;
      }
    }
  }
`;

export const PayMethod = styled.div`
  margin-top: 40px;

  & > .pay-method__title {
    font-weight: 500;
  }

  & > .pay-method__methods {
    margin-top: 16px;

    & > .pay-method__item {
      position: relative;
      display: flex;
      align-items: center;
      position: relative;
      border: 2px solid var(--primary-color);
      border-radius: 5px;
      padding: 8px;
      cursor: pointer;

      &:not(:first-child) {
        margin-top: 20px;
      }

      & > img {
        width: 40px;
        height: 40px;
        margin-right: 12px;
      }

      & > .method__item-name {
        font-weight: 700;
      }

      & > .method__item-selected {
        position: absolute;
        display: none;
        align-items: center;
        justify-content: center;
        color: #fff;
        border-radius: 5px;
        width: 32px;
        height: 32px;
        top: 50%;
        right: 16px;
        transform: translateY(-50%);
        background-color: var(--success-color);
      }

      & > input:checked ~ .method__item-selected {
        display: flex;
      }
    }
  }
`;

export const PayButton = styled.div`
  margin-top: 40px;
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
