import React from "react";
import Navbar from "./Navbar";
import Signin from "./SigninForm";
import HomePageSection from "./HomePageSection";

const Home = ({ toggle, isOpen }) => {
  return (
    <>
      <Navbar toggle={toggle} />
      <Signin isOpen={isOpen} toggle={toggle} />
      <HomePageSection toggle={toggle} />
    </>
  );
};

export default Home;
