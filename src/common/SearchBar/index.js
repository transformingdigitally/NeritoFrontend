import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import useTranslation from "../../resources/index";

export default function CustomizedInputBase({
  searchInput,
  setSearchInput,
  setGridData,
  gridList,
  flag,
}) {
  const translation = useTranslation();

  const filterData = (e) => {
    if (searchInput === "") {
      setGridData(gridList);
    } else if (searchInput !== "") {
      let filteredData = gridList.filter((value) => {
        if (flag) {
          const fullName = `${value.Name}`;
          return (
            value.OrgName?.toLowerCase().includes(searchInput.toLowerCase()) ||
            fullName.toLowerCase().includes(searchInput.toLowerCase()) ||
            value.UserName?.toLowerCase().includes(searchInput.toLowerCase()) ||
            value.Email?.toLowerCase().includes(searchInput.toLowerCase())
          );
        } else {
          const fullName = `${value.Name}`;
          return (
            fullName.toLowerCase().includes(searchInput.toLowerCase()) ||
            value.Email?.toLowerCase().includes(searchInput.toLowerCase()) ||
            value.UserName?.toLowerCase().includes(searchInput.toLowerCase())
          );
        }
      });
      setGridData(filteredData);
    }
  };

  useEffect(() => {
    if (searchInput === "") {
      filterData();
    }
  }, [searchInput, filterData]);

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
