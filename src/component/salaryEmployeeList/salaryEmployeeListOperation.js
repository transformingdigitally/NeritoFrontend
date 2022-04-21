import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import CustomizedSnackBar from "../../common/CustomisedSnackbar";
import useTranslation from "../../resources/index";
import GridView from "../../common/GridView";
import { MONTHS, YEARS } from "../../constants/constant";
import "../../assets/scss/global-inner-layout.scss";
import EmployeeLogo from "../../common/employeeLogo";

import {
  getSalaryEmployeeList,
  resetSnackbarValues,
  getCompanyData,
} from "../../actions/salaryEmployee";
import {
  Box,
  Typography,
  Grid,
  Divider,
  Button,
  Select,
  OutlinedInput,
  MenuItem,
  Stack,
} from "@mui/material";
import { getUserOrganisation } from "../../actions/login";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 224,
      width: 250,
    },
  },
};

//Showing the success validation response for PP.
function SalaryEmployeeListOperation(props) {
  const dispatch = useDispatch();
  const translation = useTranslation();
  const userId = useSelector((state) => state.login.id);
  const salaryEmployeeList = useSelector(
    (state) => state.salaryEmployee.salaryEmployeeList,
  );
  const snackbarMessage = useSelector((state) => state.salaryEmployee.message);
  const snackbarError = useSelector((state) => state.salaryEmployee.error);
  const freezeDoneSalary = useSelector(
    (state) => state.salaryEmployee.freezeDoneSalary,
  );
  const orgId = useSelector((state) => state.login.orgId);
  const [actualGridData, setActualGridData] = useState([]);
  const [gridData, setGridData] = useState(salaryEmployeeList);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const handleSnackbarClose = () => {
    dispatch(resetSnackbarValues());
  };

  const getSalaryEmployeeListData = () => {
    dispatch(getSalaryEmployeeList({ month, year, orgId }));
  };

  const getOrgDetail = () => {
    dispatch(getCompanyData(orgId));
  };

  let columns = [
    {
      Header: translation.USER_NAME,
      accessor: "UserName",
    },
    {
      Header: translation.DESTINATION_ACCOUNT,
      accessor: "DestinationAccount",
    },
    {
      Header: translation.IMPORT_AMOUNT,
      accessor: "ImportAmount",
    },
    {
      Header: translation.BENEFICIARY_EMAIL,
      accessor: "Email",
    },
    {
      Header: translation.APPLICATION_DATE,
      accessor: "ApplicationDate",
    },
    {
      Header: translation.BANK_RESPONSE,
      accessor: "ResponseMessage",
    },
    {
      Header: translation.EXECUTION_DATE,
      accessor: "ExecutionDate",
    },
    {
      Header: translation.TRACKING_ID,
      accessor: "TrackingID",
    },
    {
      Header: translation.MOVEMENT_NUMBER,
      accessor: "MovementNumber",
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
          Header: translation.OPERATION,
          accessor: "Operation",
          Cell: () => {
            return data.original.Operation === "04" ? "SPEI" : " ";
          },
        },
        {
          Header: translation.DESTINATION_ACCOUNT,
          accessor: "DestinationAccount",
          Cell: () => data.original.DestinationAccount,
        },
        {
          Header: translation.DESCRIPTION,
          accessor: "Description",
          Cell: () => data.original.Description,
        },
        {
          Header: translation.ORIGIN_CURRENCY,
          accessor: "OriginCurrency",
          Cell: () => {
            return data.original.OriginCurrency === 1 ? "PESOS" : " ";
          },
        },
        {
          Header: translation.DESTINATION_CURRENCY,
          accessor: "DestinationCurrency",
          Cell: () => {
            return data.original.DestinationCurrency === 1 ? "PESOS" : " ";
          },
        },
        {
          Header: translation.ORDENING_PAYER_RFC,
          accessor: "RFC",
          Cell: () => {
            return data.original.RFC;
          },
        },
        {
          Header: translation.COMPANY_ID,
          accessor: "SK",
          Cell: () => {
            return data.original.SK.slice(0, -7);
          },
        },
      ];
      return <GridView columns={columnsHeader} data={[row.values]} />;
    },
    [translation],
  );

  useEffect(() => {
    const actualData = salaryEmployeeList.filter((val) => {
      return val.State === props.isSuccesful;
    });
    setActualGridData(actualData);
    setGridData(actualData);
  }, [salaryEmployeeList]);

  useEffect(() => {
    if (orgId !== "") {
      getOrgDetail(orgId);
      getSalaryEmployeeListData(orgId);
    }
  }, [orgId]);

  useEffect(() => {
    if (userId !== "") {
      dispatch(getUserOrganisation(userId, false));
    }
  }, [userId]);

  return (
    <>
      <EmployeeLogo />
      <Box className="payroll-tbl-wrap">
        <div className="payroll-tbl-inner">
          <h3>
            {props.isSuccesful === 1
              ? translation.SUCCESS_MSG
              : translation.ERROR_MSG}
          </h3>
          <Divider className="tbl-divider-pane"></Divider>
          <Grid container className="information-filter-wrap">
            <Grid
              item
              xl={8}
              xs={8}
              sm={8}
              md={8}
              align="left"
              className="filter-wrap"
            >
              <Stack direction="row" spacing={2}>
                <div className="filter-title">
                  <Typography className="">
                    {translation.VIEW_INFORMATION_BY}
                  </Typography>
                </div>
                <div className="filter-elements">
                  <InputLabel className="selectlbl">
                    {translation.MONTH}
                  </InputLabel>
                  <Select
                    className="selectfield"
                    style={{ width: "200px" }}
                    value={month}
                    label={translation.MONTH}
                    onChange={(event) => setMonth(event.target.value)}
                    input={<OutlinedInput />}
                  >
                    {MONTHS.map((name, key) => (
                      <MenuItem key={key} value={key}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <div className="filter-elements">
                  <InputLabel className="selectlbl">
                    {translation.YEAR}
                  </InputLabel>
                  <Select
                    className="selectfield"
                    style={{ width: "200px" }}
                    value={year}
                    MenuProps={MenuProps}
                    onChange={(event) => setYear(event.target.value)}
                    renderValue={(selected) => {
                      if (selected === "") {
                        return <em>Placeholder</em>;
                      }

                      return selected;
                    }}
                  >
                    {YEARS.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <div className="filter-elements">
                  <Button
                    color="success"
                    variant="outlined"
                    type="submit"
                    className=""
                    size="large"
                    onClick={getSalaryEmployeeListData}
                  >
                    {translation.VIEW}
                  </Button>
                </div>
              </Stack>
            </Grid>
          </Grid>
          <Grid
            container
            xl={12}
            xs={12}
            sm={12}
            md={12}
            className="table-wrapper-outer employee-tbl-outer"
          >
            <GridView
              className=""
              columns={
                freezeDoneSalary ||
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
export default SalaryEmployeeListOperation;
