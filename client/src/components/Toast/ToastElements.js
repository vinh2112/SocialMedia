import styled from "styled-components";

export const ToastContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  bottom: 32px;
  left: 24px;
  opacity: 0.95;
  z-index: 9999;

  @media (max-width: 768px) {
    bottom: 24px;
    left: 16px;
  }

  .toast {
    display: inline-flex;
    align-items: center;
    height: 50px;
    min-width: 250px;
    border-radius: 5px;
    border-left: 4px solid;
    box-shadow: 0 5px 8px rgba(0, 0, 0, 0.08);
    background-color: ${({ theme }) => theme.toastColor};
    overflow: hidden;
  }

  .toast + .toast {
    margin-top: 16px;
  }

  .toast__message {
    flex: 1;
    padding: 0 8px 0 0;
    font-size: 15px;
    font-weight: 500;
  }

  .toast__icon {
    display: flex;
    align-items: center;
    padding: 0 16px;
    font-size: 20px;
  }

  .toast__close {
    padding: 0 6px;
    align-self: stretch;
    display: flex;
    align-items: center;
    cursor: pointer;
    border-left: 1px solid ${({ theme }) => theme.borderColor};
  }

  .toast__close:hover {
    background-color: ${({ theme }) => theme.hoverColor};
    transition: all 0.1s ease;
  }

  .toast--success {
    border-color: var(--success-color);
  }

  .toast--success .toast__icon {
    color: var(--success-color);
  }

  .toast--danger {
    border-color: var(--danger-color);
  }

  .toast--danger .toast__icon {
    color: var(--danger-color);
  }

  .toast--warning {
    border-color: var(--warning-color);
  }

  .toast--warning .toast__icon {
    color: var(--warning-color);
  }
`;
