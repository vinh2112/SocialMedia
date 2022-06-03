import React from "react";
import { Icon } from "@iconify/react";
import { AdminMenuItem, AdminSidebarContainer, AdminSidebarMenu } from "./SideBarElements";

export default function AdminSidebar() {
  return (
    <AdminSidebarContainer>
      <AdminSidebarMenu>
        <AdminMenuItem to="dashboard" activeClassName="active">
          <Icon icon="ci:dashboard" />
          <span>Dashboard</span>
        </AdminMenuItem>

        <AdminMenuItem to="users" activeClassName="active">
          <Icon style={{ color: "#46B5FD" }} icon="fluent:people-community-28-filled" />
          <span>Users</span>
        </AdminMenuItem>

        <AdminMenuItem to="posts" activeClassName="active">
          <Icon style={{ color: "#FF8B4F" }} icon="carbon:report" />
          <span>Posts</span>
        </AdminMenuItem>

        <AdminMenuItem to="keywords" activeClassName="active">
          <Icon style={{ color: "#aa66cc" }} icon="akar-icons:tag" />
          <span>Keywords</span>
        </AdminMenuItem>

        <AdminMenuItem to="reports" activeClassName="active">
          <Icon style={{ color: "#ffbb33" }} icon="ic:round-report-gmailerrorred" />
          <span>Reports</span>
        </AdminMenuItem>
      </AdminSidebarMenu>
    </AdminSidebarContainer>
  );
}
