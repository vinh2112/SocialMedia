import styled from "styled-components";
import LoginImage from "assets/images/login_image2.png";

export const LoginContainer = styled.div`
  &:before {
    content: "";
    position: fixed;
    top: 0;
    right: 0;
    width: 200px;
    height: 200px;
    transform: translate(30%, -30%);
    background-color: var(--primary-color);
    border-radius: 50%;
    filter: blur(20px) opacity(0.3);
    z-index: 0;
  }

  &:after {
    content: "";
    position: fixed;
    top: 40%;
    left: 10%;
    width: 200px;
    height: 200px;
    transform: translate(30%, -30%);
    background-color: var(--primary-color);
    border-radius: 50%;
    filter: blur(20px) opacity(0.1);
    z-index: 0;
  }

  & > .login__body {
    position: relative;
    display: flex;
    width: 100%;
    max-width: 1180px;
    height: 100vh;
    margin: 0 auto;
    padding: 0 20px;
    z-index: 1;

    & > div {
      flex: 1;
      flex-shrink: 0;
      width: 100%;
    }

    & > .login__container-left {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100%;
      height: 100%;

      @media (max-width: 768px) {
        display: none;
      }

      & > .login__heading {
        font-size: 48px;
        font-weight: 500;

        & > span {
          margin-left: 20px;
        }

        & > span > img {
          width: 200px;
        }
      }

      & > .login__content-1 {
        margin-top: 48px;
      }

      & > .login__content-1,
      & > .login__content-2 {
        font-weight: 500;
        word-spacing: 2px;
      }

      & > .login__content-2 {
        margin-top: 10px;
        & > a {
          margin-left: 12px;
          text-decoration: none;
          font-weight: 700;
          color: var(--primary-color);
        }
      }

      & > .login__image {
        position: absolute;
        top: 50%;
        right: 0;
        width: 200px;
        height: 200px;
        background: url(${LoginImage}) center no-repeat;
        background-size: contain;
        z-index: 1;
      }
    }

    & > .login__container-right {
      position: relative;
      z-index: 1;

      & > .login__form {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        width: 100%;
        max-width: 400px;
        border-radius: 10px;

        @media (max-width: 768px) {
          left: 50%;
          transform: translate(-50%, -50%);
        }

        & .login__forget-password {
          font-size: 14px;
          font-weight: 500;
          color: var(--primary-color);
          cursor: pointer;
        }
      }
    }
  }
`;
