import ReportedPosts from "components/Administrator/ReportedPosts";
import AdminSidebar from "components/Administrator/SideBar";
import Header from "components/Header";
import React, { useEffect } from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminState$, authState$ } from "redux/selectors";
import { useHistory } from "react-router-dom";
import Dashboard from "components/Administrator/Dashboard";
import LoadingSection from "components/LoadingSection";
import * as actions from "redux/actions";

const AdminContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 54px 0 0;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const AdminMainbar = styled.div`
  padding: 16px 16px 16px calc(16px + 255px);
  height: calc(100vh - 54px);
  width: 100%;

  @media (min-width: 1440px) {
    padding: 16px 16px 16px calc(16px + 320px);
  }

  @media (max-width: 900px) {
    padding: 16px 16px 16px calc(16px + 260px);
  }
`;

export default function AdminPage() {
  const { currentUser } = useSelector(authState$);
  const { isLoading } = useSelector(adminState$);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkIsLoggedIn = () => {
      if (!currentUser && !currentUser?.isAdmin) {
        history.push("/");
      } else {
        dispatch(actions.fetchDataAdmin.fetchDataAdminRequest());
      }
    };
    checkIsLoggedIn();
  }, [currentUser, history, dispatch]);
  return (
    <>
      <Header isAdmin={true} />
      <AdminContainer>
        {isLoading ? (
          <LoadingSection />
        ) : (
          <>
            <AdminSidebar />

            <AdminMainbar>
              <Switch>
                <Route path="/administrator/dashboard">
                  <Dashboard />
                </Route>
                <Route path="/administrator/users">users</Route>
                <Route path="/administrator/posts">posts</Route>
                <Route path="/administrator/keywords">keywords</Route>
                <Route path="/administrator/reports">
                  <ReportedPosts />
                </Route>
              </Switch>
            </AdminMainbar>
          </>
        )}
      </AdminContainer>
    </>
  );
}
