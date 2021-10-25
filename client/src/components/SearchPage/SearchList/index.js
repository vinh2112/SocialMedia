import React from "react";
import SearchItem from "../SearchItem";
import { SearchListContainer } from "./SearchListElements";

export default function SearchList({ posts, showModal }) {
  return (
    <SearchListContainer>
      {posts.map((post, index) => (
        <SearchItem key={index} post={post} index={index} showModal={showModal} />
      ))}
    </SearchListContainer>
  );
}
