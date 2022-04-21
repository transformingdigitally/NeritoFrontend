import React from "react";
import {
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Table,
  Paper,
  TableContainer,
} from "@mui/material";
import { useTable, useExpanded, usePagination, useSortBy } from "react-table";
import Pagination from "@mui/material/Pagination";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import useTranslation from "../../resources";

function GridView({ columns: userColumns, data, renderRowSubComponent }) {
  const {
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    visibleColumns,
    pageOptions,
    gotoPage,
    state: { pageSize },
  } = useTable(
    {
      columns: userColumns,
      data,
    },
    useSortBy,
    useExpanded,
    usePagination,
  );

  const translation = useTranslation();
  const handleChangePage = (e, pageNumber) => {
    gotoPage(pageNumber - 1);
  };
  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            {/*<MaUTable {...getTableProps()}>*/}
            <TableHead>
              {headerGroups.map((headerGroup) => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <TableCell
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <ArrowDropUpIcon />
                          ) : (
                            <ArrowDropDownIcon />
                          )
                        ) : (
                          ""
                        )}
                      </span>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody {...getTableBodyProps()}>
              {data.length === 0 && (
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell colSpan={12}>
                    <div style={{ textAlign: "center" }}>
                      {translation.NO_RECORD_FOUND}
                    </div>
                  </TableCell>
                </TableRow>
              )}
              {page.map((row) => {
                const data = row;
                prepareRow(row);
                return (
                  <React.Fragment key={row.getRowProps().key}>
                    <TableRow
                      className={row.isExpanded ? "parentExpandedClass" : ""}
                    >
                      {row.cells.map((cell) => {
                        return (
                          <TableCell {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                    {row.isExpanded ? (
                      <TableRow
                        className={row.isExpanded ? "childExpandedClass" : ""}
                      >
                        <TableCell colSpan={visibleColumns.length}>
                          {renderRowSubComponent({ row, data })}
                        </TableCell>
                      </TableRow>
                    ) : null}
                  </React.Fragment>
                );
              })}
            </TableBody>
            {/*</MaUTable> */}
          </Table>
        </TableContainer>

        {data.length > pageSize && (
          <div className="pagination" style={{ margin: "10px 10px" }}>
            <Pagination
              boundaryCount={0}
              siblingCount={1}
              count={pageOptions.length}
              color="primary"
              onChange={handleChangePage}
              variant="outlined"
              shape="rounded"
              showFirstButton
              showLastButton
            />
          </div>
        )}
      </Paper>
    </>
  );
}

export default GridView;
