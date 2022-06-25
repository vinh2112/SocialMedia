import React from "react";
import { useSelector } from "react-redux";
import { adminState$ } from "redux/selectors";
import { UserCard, UserSectionContainer } from "./UsersElements";
import UserTable from "./UserTable";

const UserSection = () => {
  const { data } = useSelector(adminState$);
  const { userData } = data || {};

  if (!userData) return null;

  return (
    <UserSectionContainer>
      <h3 className="user__title">User</h3>
      <div className="user__body">
        <UserCard span={4}>
          <UserTable data={userData} />
        </UserCard>
      </div>
    </UserSectionContainer>
  );
};

export default UserSection;
