import React from "react";
import { Icon } from "@iconify/react";
import {
  AdminMenuItem,
  AdminSidebarContainer,
  AdminSidebarMenu,
  AdminSidebarTitle,
} from "./SideBarElements";

export default function AdminSidebar() {
  return (
    <AdminSidebarContainer>
      <AdminSidebarTitle>Administrator</AdminSidebarTitle>
      <AdminSidebarMenu>
        <AdminMenuItem to="dashboard" activeClassName="active">
          <Icon icon="ci:dashboard" />
          <span>Dashboard</span>
        </AdminMenuItem>

        <AdminMenuItem to="report" activeClassName="active">
          <Icon icon="carbon:report" />
          <span>Reported Posts</span>
        </AdminMenuItem>
      </AdminSidebarMenu>
    </AdminSidebarContainer>
  );
}
