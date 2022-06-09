import React from "react";
import { MenuContainer, MenuItem, MenuListItem } from "./MenuElements";
import { Icon } from "@iconify/react";

export default function Menu() {
  return (
    <MenuContainer>
      <MenuListItem>
        <MenuItem to="info" activeClassName="active">
          <Icon icon="gg:profile" />
          <span>Your Information</span>
        </MenuItem>
        <MenuItem to="security" activeClassName="active">
          <Icon icon="bi:shield-lock" />
          <span>Change Password</span>
        </MenuItem>
        <MenuItem to="history" activeClassName="active">
          <Icon icon="fluent:history-24-filled" />
          <span>Payment History</span>
        </MenuItem>
      </MenuListItem>
    </MenuContainer>
  );
}
