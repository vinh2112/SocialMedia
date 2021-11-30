import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { authState$ } from "redux/selectors";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import InformationSection from "./InformationSection";
import Menu from "./Menu";
import SecuritySection from "./SecuritySection";

const EditProfileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: calc(var(--max-width) - 32px);
  width: 100%;
  background: ${({ theme }) => theme.primary};
  padding: 54px 0 0;
  border-left: 1px solid ${({ theme }) => theme.contrastColor};
  border-right: 1px solid ${({ theme }) => theme.contrastColor};
  margin: 0 auto;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

export default function EditProfile() {
  const { currentUser } = useSelector(authState$);
  const history = useHistory();

  const checkIsLoggedIn = useCallback(() => {
    if (!currentUser) {
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
      </Switch>
    </EditProfileContainer>
  );
}
