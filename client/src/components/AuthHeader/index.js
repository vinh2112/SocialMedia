import React from "react";
import { AuthHeaderContainer, AuthItem } from "./AuthHeaderElements";
import { Icon } from "@iconify/react";

const AuthHeader = () => {
  return (
    <AuthHeaderContainer>
      <div className="auth-header__content">
        <a href="/" className="home-link">
          <Icon icon="eva:arrow-ios-back-fill" /> Home
        </a>

        <div className="auth">
          <AuthItem to="/login">
            <div>Sign in</div>
          </AuthItem>
          <AuthItem to="/register">
            <div>Register</div>
          </AuthItem>
        </div>
      </div>
    </AuthHeaderContainer>
  );
};

export default AuthHeader;
