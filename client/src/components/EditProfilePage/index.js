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
  background: ${({ theme }) => theme.primary};
  padding: 54px 0 0;
  margin: 0 auto;

  @media (max-width: 700px) {
    flex-direction: column;
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
