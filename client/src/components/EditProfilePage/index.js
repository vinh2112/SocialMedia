import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { authState$ } from "redux/selectors";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import InformationSection from "./InformationSection";
import Menu from "./Menu";
import SecuritySection from "./SecuritySection";
import PaymentHistory from "./PaymentHistorySection";

const EditProfileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: calc(var(--max-width) - 32px);
  width: 100%;
  min-height: calc(100vh - 96px);
  background: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.borderColor};
  margin: 78px auto 16px;

  @media (max-width: 700px) {
    margin: 54px auto 0;
    height: calc(100vh - 54px);
  }
`;

export default function EditProfile() {
  const { currentUser } = useSelector(authState$);
  const history = useHistory();

  const checkIsLoggedIn = useCallback(() => {
    const TOKEN = localStorage.getItem("access_token");
    if (!currentUser && !TOKEN) {
      history.push("/");
    }
  }, [currentUser, history]);

  useEffect(() => {
    checkIsLoggedIn();
  }, [checkIsLoggedIn]);

  return (
    <EditProfileContainer>
      <Menu />
      <Switch>
        <Route path="/setting/info">
          <InformationSection user={currentUser} />
        </Route>
        <Route path="/setting/security">{currentUser && <SecuritySection />}</Route>
        <Route path="/setting/history">{currentUser && <PaymentHistory />}</Route>
      </Switch>
    </EditProfileContainer>
  );
}
