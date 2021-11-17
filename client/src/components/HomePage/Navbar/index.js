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
const Navbar = ({ toggle }) => {
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
          <Btn to="home/signin" onClick={toggle}>
            Signin
          </Btn>
          <Btn to="/signup">Signup</Btn>
        </NavRight>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
