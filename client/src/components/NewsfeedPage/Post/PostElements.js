import { Card, Skeleton } from "@mui/material";
import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  /* padding: ${({ direction }) => (direction === "left" ? "0 20px 0 0" : "0 0 0 20px")}; */
  max-width: calc((var(--max-width) * 2 / 3) - 20px);
  width: 100%;

  & > .infinite-scroll-component__outerdiv {
    padding: 0 16px 0px;

    & > .infinite-scroll-component {
      overflow: visible !important;
    }
  }

  & .post__no-post {
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 1px;
    text-align: center;
    color: ${({ theme }) => theme.subTextColor};
  }

  @media (max-width: 1024px) {
    padding: 0 20px;
    margin: 0 auto;
    order: 2;
  }

  @media (max-width: 600px) {
    width: 100%;
    padding: 0 4px;

    & > .infinite-scroll-component__outerdiv {
      padding: 0;
    }
  }
`;

export const PostTopTitle = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 0 16px 20px;
  & > h3 {
    display: inline-block;
    white-space: nowrap;
    margin-right: 10px;
    font-weight: 500;
    font-size: 16px;
    letter-spacing: 1px;
    color: ${({ theme }) => theme.subTextColor};
  }

  & > span {
    display: block;
    height: 1.1px;
    width: 100%;
    background-color: ${({ theme }) => theme.borderColor};
    user-select: none;
  }

  @media (max-width: 700px) {
    padding: 0 0 20px;
  }
`;

export const CustomCard = styled(Card)`
  && {
    background-color: ${({ theme }) => theme.primary};
    margin: 0 16px 20px;
    box-shadow: var(--box-shadow);
  }
`;

export const CustomSkeleton = styled(Skeleton)`
  && {
    background-color: ${({ theme }) => theme.contrastColor};
  }
`;
