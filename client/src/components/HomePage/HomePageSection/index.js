import React, { useState } from "react";
import video from "../../../videos/video2.mp4";
import {
  HomePgContainer,
  HeroBg,
  VideoHpg,
  InfoContainer,
  InfoHeadline,
  InfoDescrip,
  InfoWrapper,
  InfoBtn,
  ArrowForward,
  ArrowRight,
} from "./HomePageElements";

const HomePageSection = ({ toggle }) => {
  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(!hover);
  };
  return (
    <HomePgContainer>
      <HeroBg>
        <VideoHpg autoPlay loop muted src={video} type="video/mp4" />
      </HeroBg>
      <InfoContainer>
        <InfoHeadline>Our dream is unlimited</InfoHeadline>
        <InfoDescrip>
          Where to get new adventure and traveling around the world
        </InfoDescrip>
        <InfoWrapper>
          <InfoBtn
            onMouseEnter={onHover}
            onMouseLeave={onHover}
            onClick={toggle}
            to="home/signin"
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            offset={-80}
          >
            Get started {hover ? <ArrowForward /> : <ArrowRight />}
          </InfoBtn>
        </InfoWrapper>
      </InfoContainer>
    </HomePgContainer>
  );
};

export default HomePageSection;
