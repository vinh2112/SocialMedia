import styled from "styled-components";
import searchBg from "assets/images/search-bg.jpg";
import { Link } from "react-router-dom";

export const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 54px 0 0;
  background: url(${searchBg}) center no-repeat;
  background-size: cover;

  &:before {
    content: "";
    position: absolute;
    inset: 0;
    background-color: #00000070;
    z-index: 0;
  }
`;

export const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: calc(var(--max-width) - 100px);
  height: 100%;
  padding: 0 20px;
  text-align: center;
  color: #fff;

  & > h1 {
    margin-bottom: 20px;
  }

  & > .search__header-content {
    margin-bottom: 30px;
  }

  & > .search__header-keywords {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    row-gap: 10px;

    & > span {
      flex-shrink: 0;
    }

    & > a {
      margin-left: 6px;
    }
  }
`;

export const KeywordItemLink = styled(Link)`
  text-decoration: none;
  color: #666;
  padding: 4px 10px;
  background-color: #fff;
  border-radius: 5px;

  &:hover {
    text-decoration: underline;
  }
`;
