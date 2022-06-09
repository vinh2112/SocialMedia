import React from "react";
import { OverLay, SearchItemContainer, WatchButton } from "./SearchItemContainerElements";

const SearchItem = ({ post, index, showModal }) => {
  const heightRef = React.useRef(Math.random() * 100 + 230);
  const handleShowModal = () => {
    const indexPost = index;
    showModal(indexPost);
  };

  return (
    <SearchItemContainer onClick={handleShowModal}>
      <img loading="lazy" src={post.image.watermark} alt="" style={{ height: heightRef.current }} />

      <OverLay>
        <WatchButton>Watch Now</WatchButton>
      </OverLay>
    </SearchItemContainer>
  );
};

export default SearchItem;
