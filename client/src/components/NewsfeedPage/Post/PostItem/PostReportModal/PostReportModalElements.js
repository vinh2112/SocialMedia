import styled from "styled-components";

export const ModalContainer = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 350px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.primary};
  box-shadow: 0 2px 5px 0 rgba(0 0 0 / 40%);
  z-index: 1;
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
  font-weight: 500;
  letter-spacing: 1px;
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
  margin: 6px 10px;
`;

export const ReportOption = styled.label`
  display: flex;
  align-items: center;
  border-radius: 5px;
  padding: 10px 8px;
  transition: all 0.1s ease;

  &:hover {
    background-color: ${({ theme }) => theme.contrastColor};
  }

  & > .report__option-title {
    margin-left: 8px;
    font-size: 14px;
    letter-spacing: 1px;
  }

  & > .report__option-radio {
    position: relative;
    width: 22px;
    height: 22px;
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
      background-color: var(--primary-color);
      transition: all 0.2s ease;
    }
  }

  & > input:checked + .report__option-radio:before {
    width: 12px;
    height: 12px;
  }

  & > input:checked + .report__option-radio {
    border-color: var(--primary-color);
  }
`;

export const ReasonAreaWrapper = styled.div`
  padding: 0 10px 6px;
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
    outline: 2px solid ${({ theme }) => theme.contrastColor};
  }
  &:disabled {
    background: ${({ theme }) => theme.contrastColor};
    color: ${({ theme }) => theme.subTextColor};
  }
`;

export const ReportBottom = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0 10px 10px;
`;
