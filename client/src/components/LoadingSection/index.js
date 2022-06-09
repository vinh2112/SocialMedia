import React from "react";
import styled from "styled-components";
import Loading from "assets/images/Loading.svg";

const LoadingContainer = styled.div`
  background: url(${Loading}) no-repeat center center;
  background-size: 80px;
  padding-bottom: 100px;
  width: 100%;
`;

export default function LoadingSection() {
  return <LoadingContainer></LoadingContainer>;
}
