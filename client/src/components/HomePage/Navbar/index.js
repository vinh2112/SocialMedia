import React from "react";
import { Nav, NavContainer, NavLogo, NavRight, Search, Btn, BarIcon } from "./NavbarElements";
import { FaBars } from "react-icons/fa";
import { useHistory } from "react-router-dom";
const Navbar = ({ toggle }) => {
  const history = useHistory();
  const handleSearchClick = () => {
    history.push("/search");
  };
  const handleNewFeedsClick = () => {
    history.push("");
  };
  return (
    <Nav>
      <NavContainer>
        <NavLogo onClick={handleNewFeedsClick}>Photoos</NavLogo>
        <NavRight>
          <Search onClick={handleSearchClick}>
            <span className="iconify" data-icon="feather:search"></span>
          </Search>
          <BarIcon>
            <FaBars />
          </BarIcon>
          <Btn to="/home" onClick={toggle}>
            Signin
          </Btn>
          <Btn to="/signup">Signup</Btn>
        </NavRight>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
