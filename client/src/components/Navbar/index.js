import React from "react";
import {
  Nav,
  NavContainer,
  NavLogo,
  NavRight,
  Search,
  Btn,
  BarIcon,
} from "./NavbarElements";
import { FaBars } from "react-icons/fa";
const Navbar = () => {
  return (
    <Nav>
      <NavContainer>
        <NavLogo>Icon</NavLogo>
        <NavRight>
          <Search>
            <span className="iconify" data-icon="feather:search"></span>
          </Search>
          <BarIcon>
            <FaBars />
          </BarIcon>
          <Btn to="/signin" btnBorder={true} btnColor={false}>
            Signin
          </Btn>
          <Btn to="/signup" btnBorder={false} btnColor={true}>
            Signup
          </Btn>
        </NavRight>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
