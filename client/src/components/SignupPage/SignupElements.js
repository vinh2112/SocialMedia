import styled from "styled-components";
import Signup from "assets/images/signup.svg";

export const SignupContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 20px;
  height: 100vh;
  display: flex;
  align-items: center;

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
    filter: blur(20px) opacity(0.1);
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

  & > .signup__form {
    position: relative;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    z-index: 1;
  }

  & > .signup__content-right {
    flex: 1;
    height: 100%;
    background: url(${Signup}) center no-repeat;
    background-size: 400px;

    @media (max-width: 1024px) {
      display: none;
    }
  }
`;
