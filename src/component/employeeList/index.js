import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { Edit, Delete } from "@mui/icons-material";
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";
import CustomizedSnackBar from "../../common/CustomisedSnackbar";
import useTranslation from "../../resources/index";
import CustomizedInputBase from "../../common/SearchBar";
import GridView from "../../common/GridView";
import { MONTHS, YEARS } from "../../constants/constant";
import ConfirmBox from "../../common/ConfirmBox";
import "../../assets/scss/global-inner-layout.scss";
import EmployeeForm from "./employeeForm";
import EmployeeLogo from "../../common/employeeLogo";

import {
  getEmployeeList,
  deleteEmployee,
  employeeEdit,
  resetSnackbarValues,
  freezeEmployeeListForCurrentMonth,
  unfreezeEmployeeListForCurrentMonth,
  getCompanyData,
} from "../../actions/employee";
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
  IconButton,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { getUserOrganisation } from "../../actions/login";

const uuId = uuidv4();
const defaultValue = {
  RFC: "",
  Name: "",
  Contact: "",
  Email: "",
  PhoneNumber: "",
  Status: true,
  BankId: "",
  AccountType: "",
  AccountClabe: "",
  CompanyId: "",
  OperationType: "",
  Currency: "",
  Id: `ORG#${uuId}`,
  SK: `METADATA#${uuId}`,
};

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 224,
      width: 250,
    },
  },
};

// Rendering the Employee-list from the back-end.
// For Update/Delete the Employee data.
function EmployeeList() {
  const dispatch = useDispatch();
  const translation = useTranslation();
  const PayrollDisbursementApp = translation.PAYROLL_DISBURSEMENT_APP;
  const userId = useSelector((state) => state.login.id);
  const employeeList = useSelector((state) => state.employee.employeeList);
  const fileValidation = useSelector((state) => state.employee.fileValidation);
  const snackbarMessage = useSelector((state) => state.employee.message);
  const snackbarError = useSelector((state) => state.employee.error);
  const freezeLoader = useSelector((state) => state.employee.freezeLoader);
  const unfreezeLoader = useSelector((state) => state.employee.unfreezeLoader);
  const freezeDone = useSelector((state) => state.employee.freezeDone);
  const sk = useSelector((state) => state.employee.sk);
  const orgId = useSelector((state) => state.login.orgId);
  const [open, setOpen] = useState(false);
  const [openConfirmBox, setOpenConfirmBox] = useState(false);
  const [openConfirmFreezeBox, setOpenConfirmFreezeBox] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [gridData, setGridData] = useState(employeeList);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [isEdit, setIsEdit] = useState(false);
  const [employeeForm, setEmployeeForm] = useState(defaultValue);

  const handleSubmit = () => {
    dispatch(deleteEmployee({ Id: employeeForm.Id, SK: employeeForm.SK }));
    setOpenConfirmBox(false);
  };

  const handleFreezeSubmit = () => {
    freezeEmployeeList();
    setOpenConfirmFreezeBox(false);
  };

  const handleUnfreezeSubmit = () => {
    unfreezeEmployeeList();
  };

  const handleSnackbarClose = () => {
    dispatch(resetSnackbarValues());
  };

  const setPopUpValue = (data) => {
    setEmployeeForm({
      ...data,
    });
    setIsEdit(true);
    setOpen(true);
  };

  const handleStatus = (data) => {
    dispatch(
      employeeEdit({
        ...data,
        Status: !data.Status,
      }),
    );
  };

  const deleteConfirmBox = (data) => {
    setEmployeeForm({
      ...data,
      Status: !data.Status,
    });
    setOpenConfirmBox(true);
  };

  const getEmployeeListData = () => {
    dispatch(getEmployeeList({ month, year, orgId }));
  };

  const getOrgDetail = () => {
    dispatch(getCompanyData(orgId));
  };

  const conditionallyHide = [
    {
      Header: translation.STATUS,
      accessor: "Status",
      disableSortBy: true,

      Cell: (props) => {
        return (
          <Button
            className="status-btn"
            variant="contained"
            color={props.cell.value ? "success" : "error"}
            style={{ wordBreak: "initial" }}
            onClick={(e) => {
              handleStatus(props.row.original);
            }}
          >
            {props.cell.value ? translation.ACTIVATED : translation.DEACTIVATED}
          </Button>
        );
      },
    },
    {
      Header: translation.ACTION,
      accessor: "row",
      disableSortBy: true,
      Cell: (props) => {
        return (
          <>
            <IconButton
              color="success"
              aria-label="open drawer"
              onClick={(e) => {
                setPopUpValue(props.row.original);
              }}
              edge="start"
            >
              <Edit />
            </IconButton>
            <IconButton
              color="error"
              aria-label="open drawer"
              onClick={(e) => {
                deleteConfirmBox(props.row.original);
              }}
              edge="start"
            >
              <Delete />
            </IconButton>
          </>
        );
      },
    },
  ];
  let columns = [
    {
      Header: () => null,
      accessor: "Id",
      id: "expander",
      Cell: ({ row }) => (
        <span {...row.getToggleRowExpandedProps()}>
          {row.isExpanded ? (
            <ArrowCircleUpOutlinedIcon color="primary" />
          ) : (
            <ArrowCircleDownOutlinedIcon color="darkGray" />
          )}
        </span>
      ),
    },

    {
      Header: translation.NAME,
      accessor: "Name",
      Cell: (props) => {
        return <div>{props.row.original.Name}</div>;
      },
    },
    {
      Header: translation.PHONE_NUMBER,
      accessor: "PhoneNumber",
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
        {
          Header: translation.COMPANY_ID,
          accessor: "CompanyId",
          Cell: () => data.original.CompanyId,
        },
      ];
      return <GridView columns={columnsHeader} data={[row.values]} />;
    },
    [translation],
  );
  const freezeEmployeeList = () => {
    dispatch(freezeEmployeeListForCurrentMonth({ orgId, sk }));
  };

  const unfreezeEmployeeList = () => {
    dispatch(unfreezeEmployeeListForCurrentMonth({ orgId, sk }));
  };

  useEffect(() => {
    document.title = PayrollDisbursementApp;
  }, [PayrollDisbursementApp]);
  useEffect(() => {}, []);

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
    setGridData(employeeList);
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
                    onClick={getEmployeeListData}
                  >
                    {translation.VIEW}
                  </Button>

                  <EmployeeForm
                    open={open}
                    handleClose={() => setOpen(false)}
                    defaultValue={defaultValue}
                    employeeForm={employeeForm}
                    setEmployeeForm={setEmployeeForm}
                    isEdit={isEdit}
                    setIsEdit={setIsEdit}
                    employeeList={employeeList}
                    fileValidation={fileValidation}
                  />
                  <ConfirmBox
                    openConfirmBox={openConfirmBox}
                    handleCloseConfirmBox={() => setOpenConfirmBox(false)}
                    message={translation.DELETE_EMPLOYEE_CONFIRMATION}
                    handleSubmit={handleSubmit}
                  />
                  <ConfirmBox
                    openConfirmBox={openConfirmFreezeBox}
                    handleCloseConfirmBox={() => setOpenConfirmFreezeBox(false)}
                    message={translation.FREEZE_EMPLOYEE_CONFIRMATION}
                    handleSubmit={handleFreezeSubmit}
                  />
                </div>
              </Stack>
            </Grid>

            {month === new Date().getMonth() &&
              year === new Date().getFullYear() &&
              freezeDone && (
                <LoadingButton
                  loading={unfreezeLoader}
                  color="primary"
                  variant="outlined"
                  type="submit"
                  className=""
                  size="large"
                  disabled={!freezeDone}
                  onClick={handleUnfreezeSubmit}
                  style={{ marginLeft: "auto", height: "40px" }}
                >
                  {translation.UNFREEZE}
                </LoadingButton>
              )}
            {(month === new Date().getMonth() ||
              (year === new Date().getFullYear() && freezeDone)) && (
              <LoadingButton
                loading={freezeLoader}
                color="primary"
                variant="outlined"
                type="submit"
                className=""
                size="large"
                disabled={freezeDone}
                onClick={() => setOpenConfirmFreezeBox(true)}
                style={{ marginLeft: "auto", height: "40px" }}
              >
                {translation.FREEZE}
              </LoadingButton>
            )}
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
                  : [...columns, ...conditionallyHide]
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
export default EmployeeList;
