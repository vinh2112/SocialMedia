import React from "react";
import { ScrollToTopContainer } from "./ScrollToTopElements";
import { Icon } from "@iconify/react";

const ScrollToTop = ({ scrollToTop }) => {
  return (
    <ScrollToTopContainer onClick={scrollToTop}>
      <Icon icon="gg:push-chevron-up" />
    </ScrollToTopContainer>
  );
};

export default ScrollToTop;
