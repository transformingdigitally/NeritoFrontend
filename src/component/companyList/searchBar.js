import React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import useTranslation from "../../resources/index";

export default function CustomizedInputBase({
  searchInput,
  setSearchInput,
  setGridData,
  companyList,
}) {
  const translation = useTranslation();

  const filterData = (e) => {
    if (searchInput === "") {
      setGridData(companyList);
    } else if (searchInput !== "") {
      let filteredData = companyList.filter((value) => {
        return value.OrgName?.toLowerCase().includes(searchInput.toLowerCase());
      });
      setGridData(filteredData);
    }
  };
  return (
    <Paper
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={translation.SEARCH_KEYWORD}
        inputProps={{ "aria-label": "Search Keyword" }}
        value={searchInput}
        onKeyPress={(e) => e.key === "Enter" && filterData(searchInput)}
        onChange={(e) => {
          setSearchInput(e.target.value);
          filterData(e);
        }}
      />
      <IconButton
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={(e) => {
          filterData(e);
        }}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
