import React from "react";
import { Container } from "./SearchHeaderElements";
import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import { autoCompleteStyle, textFieldStyle } from "styles/muiCustom";
import { Icon } from "@iconify/react";

export default function SearchHeader({ query, onSubmit }) {
  const [searchOptions, setSearchOptions] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState(query || "");
  const typingTimeoutRef = React.useRef(null);

  React.useEffect(() => {
    const getRecentSearch = () => {
      let recentSearch = localStorage.getItem("recent_search");
      if (recentSearch) {
        recentSearch = recentSearch.split(",").map((item) => {
          return { label: item, type: "Recent searchs".toUpperCase() };
        });

        setSearchOptions(recentSearch);
      }
    };

    getRecentSearch();
  }, []);

  React.useEffect(() => {
    setSearchTerm(query);
  }, [query]);

  const handleSearchChange = (e, newValue) => {
    setSearchTerm(newValue);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      let recentSearch = localStorage.getItem("recent_search") || "";

      if (newValue) {
        recentSearch = recentSearch.split(",").filter(Boolean);
        recentSearch.unshift(newValue);
        recentSearch = [...new Set(recentSearch)];
        if (recentSearch.length > 5) {
          recentSearch.pop();
        }
      }
      localStorage.setItem("recent_search", recentSearch);
      onSubmit(newValue);
    }, 500);
  };

  return (
    <Container>
      <Autocomplete
        sx={autoCompleteStyle}
        size="small"
        freeSolo
        disablePortal
        inputValue={searchTerm}
        onInputChange={handleSearchChange}
        groupBy={(option) => option.type}
        getOptionLabel={(option) => option.label}
        options={searchOptions}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{ ...textFieldStyle, ...params.sx }}
            placeholder="Search ..."
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment sx={{ ml: 1 }} position="start">
                  <Icon style={{ fontSize: "20px" }} icon="eva:search-outline" />
                </InputAdornment>
              ),
            }}
          />
        )}
        fullWidth
      />

      <div>list keywords</div>
    </Container>
  );
}
