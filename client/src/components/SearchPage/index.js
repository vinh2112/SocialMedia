import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import SearchHeader from "./SearchHeader";
import SearchList from "./SearchList";
import * as actions from "redux/actions";
import { postState$ } from "redux/selectors";
import Modal from "components/Modal";
import { useLocation } from "react-router-dom";
import { KeywordAPI } from "api";

const SearchContainer = styled.div`
  max-width: var(--max-width);
  width: 100%;
  margin: 0 auto;

  @media (max-width: 700px) {
    padding: 54px 0 0;
  }
`;

export default function SearchSection() {
  const searchQuery = new URLSearchParams(useLocation().search).get("query") || "";
  const [index, setIndex] = useState(null);
  const [keywords, setKeywords] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(searchQuery || "");
  const prevQuery = React.useRef("");
  const [isShowModal, setIsShowModal] = useState(false);
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector(postState$);

  useEffect(() => {
    setPage(1);
    setQuery(searchQuery);

    return () => {
      dispatch(actions.resetPosts());
    };
  }, [searchQuery, dispatch]);

  useEffect(() => {
    const getKeywords = async () => {
      try {
        const res = await KeywordAPI.getKeywords();

        if (res.status === 200) {
          setKeywords(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getKeywords();
  }, []);

  useEffect(() => {
    if (prevQuery.current === query) {
      dispatch(actions.searchPosts.searchPostsRequest({ query, page, isSearching: false }));
    } else {
      dispatch(actions.searchPosts.searchPostsRequest({ query, page, isSearching: true }));
    }
    setIndex(null);
  }, [dispatch, query, page]);

  const handleSearch = React.useCallback(
    (value) => {
      setPage(1);
      prevQuery.current = query;
      setQuery(value);
    },
    [query]
  );

  const handleModal = (index) => {
    if (isShowModal) {
      setIsShowModal(false);
      dispatch(actions.showBoxComment.showBoxCommentRequest(undefined));
    } else {
      setIsShowModal(true);
      setIndex(index);
    }
  };

  const handleNext = () => {
    if (!isLoading) {
      prevQuery.current = query;
      setPage(page + 1);
    }
  };

  return (
    <>
      <SearchHeader query={query} onSubmit={handleSearch} keywords={keywords} />
      <SearchContainer>
        <SearchList posts={data} showModal={handleModal} next={handleNext} isLoading={isLoading} />
        {(index || index === 0) && isShowModal && <Modal post={data[index]} isShow={isShowModal} closeModal={handleModal} />}
      </SearchContainer>
    </>
  );
}
