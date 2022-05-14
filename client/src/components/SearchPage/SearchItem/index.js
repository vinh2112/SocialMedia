import React from "react";
import { OverLay, SearchItemContainer, WatchButton } from "./SearchItemContainerElements";

export default function SearchItem({ post, index, showModal }) {
  const handleShowModal = () => {
    const indexPost = index;
    showModal(indexPost);
  };

  return (
    <SearchItemContainer
      style={{
        backgroundImage: `url(${post.image.watermark})`,
      }}
      onClick={handleShowModal}
    >
      <OverLay>
        <WatchButton>Watch Now</WatchButton>
      </OverLay>
    </SearchItemContainer>
  );
}
