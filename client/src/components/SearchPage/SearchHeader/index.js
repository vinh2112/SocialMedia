import React, { useRef, useState } from "react";
import {
  Container,
  SearchBar,
  SearchClose,
  SearchInput,
  SearchLabel,
  SearchTitle,
} from "./SearchHeaderElements";
import { Icon } from "@iconify/react";

export default function SearchHeader({ onSubmit }) {
  const [searchTerm, setSearchTerm] = useState("");
  const typingTimeoutRef = useRef(null);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      onSubmit(value);
    }, 500);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    onSubmit("");
  };
  return (
    <Container>
      <SearchTitle>Search</SearchTitle>
      <SearchBar>
        <SearchInput
          value={searchTerm}
          onChange={handleSearchChange}
          id="search-input"
          placeholder="Search ..."
          required
        ></SearchInput>
        <SearchLabel htmlFor="search-input">
          <Icon icon="akar-icons:search" />
        </SearchLabel>
        <SearchClose onClick={handleClearSearch}>
          <Icon icon="eva:close-fill" />
        </SearchClose>
      </SearchBar>
    </Container>
  );
}
