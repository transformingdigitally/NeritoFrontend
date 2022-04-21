import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { Edit, Delete } from "@mui/icons-material";
import CustomizedSnackBar from "../../common/CustomisedSnackbar";
import useTranslation from "../../resources/index";
import CustomizedInputBase from "../../common/SearchBar";
import GridView from "../../common/GridView";
import { MONTHS, YEARS } from "../../constants/constant";
import ConfirmBox from "../../common/ConfirmBox";
import "../../assets/scss/global-inner-layout.scss";
import SalaryEmployeeForm from "./salaryEmployeeForm";
import EmployeeLogo from "../../common/employeeLogo";
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";

import {
  getSalaryEmployeeList,
  deleteSalaryEmployee,
  salaryEmployeeEdit,
  resetSnackbarValues,
  freezeSalaryEmployeeListForCurrentMonth,
  unfreezeSalaryEmployeeListForCurrentMonth,
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
  IconButton,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { getUserOrganisation } from "../../actions/login";

const uuId = uuidv4();
const defaultValue = {
  Operation: "",
  UserName: "",
  OriginAccount: "",
  DestinationAccount: "",
  ImportAmount: "",
  ReferenceDate: "",
  Description: "",
  OriginCurrency: "",
  DestinationCurrency: "",
  RFC: "",
  IVA: "",
  Email: "",
  ApplicationDate: "",
  PaymentInstructions: "",
  ResponseMessage: "",
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

// Rendering the Salary-Employee-List from the back-end.
// For Update/Delete the Salary Employee data.
function SalaryEmployeeList() {
  const dispatch = useDispatch();
  const translation = useTranslation();
  const PayrollDisbursementApp = translation.PAYROLL_DISBURSEMENT_APP;
  const userId = useSelector((state) => state.login.id);
  const salaryEmployeeList = useSelector(
    (state) => state.salaryEmployee.salaryEmployeeList,
  );
  const snackbarMessage = useSelector((state) => state.salaryEmployee.message);
  const snackbarError = useSelector((state) => state.salaryEmployee.error);
  const freezeLoader = useSelector(
    (state) => state.salaryEmployee.freezeLoader,
  );
  const unfreezeLoader = useSelector(
    (state) => state.salaryEmployee.unfreezeLoader,
  );
  const freezeDoneSalary = useSelector(
    (state) => state.salaryEmployee.freezeDoneSalary,
  );
  const sk = useSelector((state) => state.salaryEmployee.sk);
  const orgId = useSelector((state) => state.login.orgId);
  const [open, setOpen] = useState(false);
  const [openConfirmBox, setOpenConfirmBox] = useState(false);
  const [openConfirmFreezeBox, setOpenConfirmFreezeBox] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [gridData, setGridData] = useState(salaryEmployeeList);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [isEdit, setIsEdit] = useState(false);
  const [salaryEmployeeForm, setSalaryEmployeeForm] = useState(defaultValue);

  const handleSubmit = () => {
    dispatch(
      deleteSalaryEmployee({
        Id: salaryEmployeeForm.Id,
        SK: salaryEmployeeForm.SK,
      }),
    );
    setOpenConfirmBox(false);
  };

  const handleFreezeSubmit = () => {
    freezeSalaryEmployeeList();
    setOpenConfirmFreezeBox(false);
  };

  const handleUnfreezeSubmit = () => {
    unfreezeSalaryEmployeeList();
  };

  const handleSnackbarClose = () => {
    dispatch(resetSnackbarValues());
  };

  const setPopUpValue = (data) => {
    setSalaryEmployeeForm({
      ...data,
    });
    setIsEdit(true);
    setOpen(true);
  };

  const handleStatus = (data) => {
    dispatch(
      salaryEmployeeEdit({
        ...data,
        Status: !data.Status,
      }),
    );
  };

  const deleteConfirmBox = (data) => {
    setSalaryEmployeeForm({
      ...data,
      Status: !data.Status,
    });
    setOpenConfirmBox(true);
  };

  const getSalaryEmployeeListData = () => {
    dispatch(getSalaryEmployeeList({ month, year, orgId }));
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
            style={{ wordBreak: "initial" }}
            color={props.cell.value ? "success" : "error"}
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
      Header: translation.USER_NAME,
      accessor: "UserName",
    },
    {
      Header: translation.ORIGIN_ACCOUNT,
      accessor: "OriginAccount",
    },
    {
      Header: translation.IMPORT_AMOUNT,
      accessor: "ImportAmount",
    },
    {
      Header: translation.REFERENCE,
      accessor: "ReferenceDate",
    },
    {
      Header: translation.IVA,
      accessor: "IVA",
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
      Header: translation.PAYMENT_INSTRUCTIONS,
      accessor: "PaymentInstructions",
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

  const freezeSalaryEmployeeList = () => {
    dispatch(freezeSalaryEmployeeListForCurrentMonth({ orgId, sk }));
  };

  const unfreezeSalaryEmployeeList = () => {
    dispatch(unfreezeSalaryEmployeeListForCurrentMonth({ orgId, sk }));
  };

  useEffect(() => {
    document.title = PayrollDisbursementApp;
  }, [PayrollDisbursementApp]);

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
          <Grid item className="search-wrap">
            <CustomizedInputBase
              setGridData={setGridData}
              gridList={salaryEmployeeList}
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
                    onClick={getSalaryEmployeeListData}
                  >
                    {translation.VIEW}
                  </Button>

                  <SalaryEmployeeForm
                    open={open}
                    handleClose={() => setOpen(false)}
                    defaultValue={defaultValue}
                    salaryEmployeeForm={salaryEmployeeForm}
                    setSalaryEmployeeForm={setSalaryEmployeeForm}
                    isEdit={isEdit}
                    setIsEdit={setIsEdit}
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
              freezeDoneSalary && (
                <LoadingButton
                  loading={unfreezeLoader}
                  color="primary"
                  variant="outlined"
                  type="submit"
                  className=""
                  size="large"
                  disabled={!freezeDoneSalary}
                  onClick={handleUnfreezeSubmit}
                  style={{ marginLeft: "auto", height: "40px" }}
                >
                  {translation.UNFREEZE}
                </LoadingButton>
              )}
            {(month === new Date().getMonth() ||
              (year === new Date().getFullYear() && freezeDoneSalary)) && (
              <LoadingButton
                loading={freezeLoader}
                color="primary"
                variant="outlined"
                type="submit"
                className=""
                size="large"
                disabled={freezeDoneSalary}
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
            className="table-wrapper-outer employee-tbl-outer"
          >
            <GridView
              className=""
              columns={
                freezeDoneSalary ||
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
export default SalaryEmployeeList;
