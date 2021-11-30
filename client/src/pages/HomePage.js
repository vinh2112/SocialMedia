import React, { useState } from "react";
import Home from "components/HomePage";
const HomePage = () => {
  const [isOpen, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!isOpen);
  };

  return <Home toggle={toggle} isOpen={isOpen} />;
};

export default HomePage;
