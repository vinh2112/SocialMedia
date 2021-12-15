import ReportedPosts from "components/Administrator/ReportedPosts";
import AdminSidebar from "components/Administrator/SideBar";
import Header from "components/Header";
import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { authState$ } from "redux/selectors";
import { useHistory } from "react-router-dom";

const AdminContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: calc(var(--max-width));
  width: 100%;
  padding: 54px 0 0;
  margin: 0 auto;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

export const AdminMainbar = styled.div`
  margin: 0 auto;
  padding: 8px 0;
  height: calc(100vh - 54px);
  overflow: hidden;
  overflow-y: auto;
`;

export default function AdminPage() {
  const { currentUser } = useSelector(authState$);
  const history = useHistory();

  const checkIsLoggedIn = useCallback(() => {
    if (!currentUser && !currentUser?.isAdmin) {
      history.push("/");
    }
  }, [currentUser, history]);

  useEffect(() => {
    checkIsLoggedIn();
  }, [checkIsLoggedIn]);
  return (
    <>
      <Header />
      <AdminContainer>
        <AdminSidebar />

        <AdminMainbar>
          <Switch>
            <Route path="/administrator/report">
              <ReportedPosts />
            </Route>
          </Switch>
        </AdminMainbar>
      </AdminContainer>
    </>
  );
}
