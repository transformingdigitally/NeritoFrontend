import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomizedSnackBar from "../../common/CustomisedSnackbar";
import useTranslation from "../../resources/index";
import CustomizedInputBase from "../../common/SearchBar";
import GridView from "../../common/GridView";
import "../../assets/scss/global-inner-layout.scss";
import EmployeeLogo from "../../common/employeeLogo";

import {
  getEmployeeList,
  resetSnackbarValues,
  getCompanyData,
} from "../../actions/employee";
import { Box, Grid, Divider } from "@mui/material";
import { getUserOrganisation } from "../../actions/login";

// Showing the failed validation response for AC.
function EmployeeErrorListOperation(props) {
  const dispatch = useDispatch();
  const translation = useTranslation();
  const [actualGridData, setActualGridData] = useState([]);
  const userId = useSelector((state) => state.login.id);
  const employeeList = useSelector((state) => state.employee.employeeList);
  const snackbarMessage = useSelector((state) => state.employee.message);
  const snackbarError = useSelector((state) => state.employee.error);
  const freezeDone = useSelector((state) => state.employee.freezeDone);
  const orgId = useSelector((state) => state.login.orgId);
  const [searchInput, setSearchInput] = useState("");
  const [gridData, setGridData] = useState(employeeList);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const handleSnackbarClose = () => {
    dispatch(resetSnackbarValues());
  };

  const getEmployeeListData = () => {
    dispatch(getEmployeeList({ month, year, orgId }));
  };

  const getOrgDetail = () => {
    dispatch(getCompanyData(orgId));
  };

  let columns = [
    {
      Header: translation.COMPANY_ID,
      accessor: "CompanyId",
    },
    {
      Header: translation.PHONE_NUMBER,
      accessor: "PhoneNumber",
    },
    {
      Header: translation.NAME,
      accessor: "Name",
      Cell: (props) => {
        return <div>{props.row.original.Name}</div>;
      },
    },
    {
      Header: translation.EMAIL,
      accessor: "Email",
    },
    {
      Header: translation.RFC_EMPLOYEE,
      accessor: "RFC",
    },
    {
      Header: translation.TYPE_ACCOUNT,
      accessor: "AccountType",
    },
    {
      Header: translation.BANK_ID,
      accessor: "BankId",
    },
    {
      Header: translation.ACCOUNT_CLABE,
      accessor: "AccountClabe",
    },
    {
      Header: translation.BANK_RESPONSE,
      accessor: "ResponseMessage",
    },
    {
      Header: translation.APPLICATION_DATE,
      accessor: "ApplicationDate",
    },
    {
      Header: translation.ACCOUNT_HOLDER,
      accessor: "AccountHolder",
    },
  ];

  const renderRowSubComponent = React.useCallback(
    ({ row, data }) => {
      const columnsHeader = [
        {
          Header: translation.OPERATION_TYPE,
          accessor: "OperationType",
          Cell: () => data.original.OperationType,
        },
        {
          Header: translation.CONTACT,
          accessor: "Contact",
          Cell: () => data.original.Contact,
        },
        {
          Header: translation.CURRENCY,
          accessor: "Currency",
          Cell: () => data.original.Currency,
        },
      ];
      return <GridView columns={columnsHeader} data={[row.values]} />;
    },
    [translation],
  );

  useEffect(() => {
    if (orgId !== "") {
      getEmployeeListData(orgId);
      getOrgDetail(orgId);
    }
  }, [orgId]);

  useEffect(() => {
    if (userId !== "") {
      dispatch(getUserOrganisation(userId, true));
    }
  }, [userId]);

  useEffect(() => {
    const actualData = employeeList.filter((val) => {
      return val.State === props.isSuccesful;
    });
    setActualGridData(actualData);
    setGridData(actualData);
  }, [employeeList]);

  return (
    <>
      <EmployeeLogo />
      <Box className="payroll-tbl-wrap">
        <div className="payroll-tbl-inner">
          <Grid item className="search-wrap">
            <CustomizedInputBase
              setGridData={setGridData}
              gridList={employeeList}
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              className="tbl-Searchfield"
              flag={false}
            />
          </Grid>
          <Divider className="tbl-divider-pane"></Divider>
          <span>
            {props.isSuccesful === 2
              ? translation.FAILURE
              : translation.SUCCESS}
          </span>
          <Grid container className="information-filter-wrap">
            <Grid
              item
              xl={8}
              xs={8}
              sm={8}
              md={8}
              align="left"
              className="filter-wrap"
            ></Grid>
          </Grid>
          <Grid
            container
            xl={12}
            xs={12}
            sm={12}
            md={12}
            item
            className="table-wrapper-outer employee-tbl-outer"
          >
            <GridView
              className=""
              columns={
                freezeDone ||
                month !== new Date().getMonth() ||
                year !== new Date().getFullYear()
                  ? columns
                  : [...columns]
              }
              data={gridData}
              renderRowSubComponent={renderRowSubComponent}
              autoCollapse={{ sort: false }}
            />
          </Grid>
        </div>
        <Divider variant="middle" />
      </Box>
      {snackbarMessage !== "" && (
        <CustomizedSnackBar
          open={snackbarMessage !== ""}
          severity={snackbarError ? "success" : "error"}
          handleSnackbarClose={handleSnackbarClose}
          snackbarMessage={snackbarMessage}
        />
      )}
    </>
  );
}
export default EmployeeErrorListOperation;
