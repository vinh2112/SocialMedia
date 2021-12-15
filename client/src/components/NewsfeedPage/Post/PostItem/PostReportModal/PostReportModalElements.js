import { LoadingButton } from "@mui/lab";
import styled from "styled-components";

export const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 350px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.primary};
  box-shadow: 0 2px 5px 0 rgba(0 0 0 / 40%);
`;

export const ModalTop = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  padding: 16px 0;
  border-bottom: 1px solid ${({ theme }) => theme.contrastColor};
`;

export const ModalTitle = styled.h3`
  color: ${({ theme }) => theme.subTextColor};
  text-transform: uppercase;
`;

export const ButtonCloseModal = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ButtonCloseModalWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  font-size: 1.2rem;
  background-color: ${({ theme }) => theme.contrastColor};
  color: ${({ theme }) => theme.textColor};
  transition: all 0.1s ease-in-out 0s;

  &:hover {
    background-color: ${({ theme }) => theme.hoverColor};
  }

  &:active {
    font-size: 1.1rem;
    width: 32px;
    height: 32px;
  }
`;

export const ReportContent = styled.div`
  margin: 6px;
`;

export const ReportOption = styled.p`
  transition: all 0.1s ease;
  border-radius: 5px;

  &:hover {
    background-color: ${({ theme }) => theme.hoverColor};
  }

  [type="radio"]:checked,
  [type="radio"]:not(:checked) {
    position: absolute;
    left: -9999px;
  }
  [type="radio"]:checked + label,
  [type="radio"]:not(:checked) + label {
    position: relative;
    padding-left: 36px;
    cursor: pointer;
    line-height: 20px;
    display: inline-block;
    color: ${({ theme }) => theme.textColor};
  }
  [type="radio"]:checked + label:before,
  [type="radio"]:not(:checked) + label:before {
    content: "";
    position: absolute;
    left: 8px;
    top: 50%;
    transform: translateY(-50%);
    width: 18px;
    height: 18px;
    border: 1px solid #ddd;
    border-radius: 100%;
    background: #fff;
  }
  [type="radio"]:checked + label:after,
  [type="radio"]:not(:checked) + label:after {
    content: "";
    width: 12px;
    height: 12px;
    background: var(--primary-color);
    position: absolute;
    top: calc(50%);
    left: 11px;
    transform: translateY(-50%);
    border-radius: 100%;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
  }
  [type="radio"]:not(:checked) + label:after {
    opacity: 0;
    -webkit-transform: scale(0) translateY(-50%);
    transform: scale(0) translateY(-50%);
  }
  [type="radio"]:checked + label:after {
    opacity: 1;
    -webkit-transform: scale(1) translateY(-50%);
    transform: scale(1) translateY(-50%);
  }
`;

export const ReportOptionLabel = styled.label`
  /* margin-left: 8px; */
  width: 100%;
  padding: 14px 8px;
`;

export const ReasonAreaWrapper = styled.div`
  padding: 0 6px 6px;
`;

export const ReasonArea = styled.textarea`
  padding: 4px 8px;
  width: 100%;
  resize: none;
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.borderColor};
  outline: none;
  border-radius: 3px;
  background: none;
  color: ${({ theme }) => theme.textColor};

  &:focus {
    outline: 2px solid ${({ theme }) => theme.hoverColor};
  }
  &:disabled {
    background: ${({ theme }) => theme.hoverColor};
    color: ${({ theme }) => theme.subTextColor};
  }
`;

export const ReportBottom = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0 6px 10px;
`;

export const CustomLoadingButton = styled(LoadingButton)`
  && {
    color: #fefefe;
    width: 100%;
    max-width: 120px;
    background-color: ${({ loading, theme }) =>
      loading ? theme.hoverColor : "var(--primary-color)"};

    &:hover {
      background-color: var(--primary-color);
    }

    & svg {
      color: #fefefe;
    }

    @media (max-width: 700px) {
      max-width: unset;
    }
  }
`;
