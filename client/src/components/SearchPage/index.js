import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import SearchHeader from "./SearchHeader";
import SearchList from "./SearchList";
import * as actions from "redux/actions";
import { postState$ } from "redux/selectors";
import Modal from "components/Modal";

const SearchContainer = styled.div`
  max-width: var(--max-width);
  width: 100%;
  padding: 72px 16px 0;
  margin: 0 auto;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 72px 16px 0;
  }
`;

export default function SearchSection() {
  const [index, setIndex] = useState(null);
  const [isShowModal, setIsShowModal] = useState(false);
  // const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const { data } = useSelector(postState$);

  useEffect(() => {
    dispatch(actions.searchPosts.searchPostsRequest(query));
    setIndex(null);
  }, [dispatch, query]);

  useEffect(() => {
    return () => {
      dispatch(actions.resetPosts());
    };
  }, [dispatch]);

  const handleSearch = (value) => {
    // setPage(1);
    setQuery(value);
  };
  const handleModal = (index) => {
    if (isShowModal) {
      setIsShowModal(false);
      dispatch(actions.showBoxComment.showBoxCommentRequest(undefined));
    } else {
      setIsShowModal(true);
      setIndex(index);
    }
  };

  return (
    <SearchContainer>
      <SearchHeader onSubmit={handleSearch} />
      <SearchList posts={data} showModal={handleModal} />
      {(index || index === 0) && isShowModal && (
        <Modal post={data[index]} isShow={isShowModal} closeModal={handleModal} />
      )}
    </SearchContainer>
  );
}
