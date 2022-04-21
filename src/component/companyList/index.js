import React, { useEffect, useState } from "react";
import useTranslation from "../../resources/index";
import CustomizedInputBase from "../../common/SearchBar/index";
import GridView from "../../common/GridView";
import CompanyForm from "../formCompany/index";
import ConfirmBox from "../../common/ConfirmBox";
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";
import CustomizedSnackBar from "../../common/CustomisedSnackbar";
import { Edit, Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  Grid,
  LinearProgress,
  IconButton,
  Divider,
} from "@mui/material";
import {
  getCompanyList,
  deleteCompany,
  companyEdit,
  resetSnackbarValues,
} from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import "../../assets/scss/global-inner-layout.scss";
import { useTheme } from "@mui/material/styles";
import { FIELD_VALIDATION } from "../../constants/constant";
import { setDefaultColorTheme } from "../../common/Utility/utility";

const uuId = uuidv4();
const defaultValue = {
  RFC: "",
  OrgName: "",
  FiscalInfo: "",
  PayrollUsers: [],
  Email: "",
  OriginAccount: "",
  File: "",
  AccountUsers: [],
  OrgDetails: "",
  EmployeeEnrollmentDate: "",
  PayrollDisbursement: "",
  Status: true,
  Id: `ORG#${uuId}`,
  SK: `METADATA#${uuId}`,
  Config: {
    Logo: "",
    color: {
      PrimaryColor: "",
      SecondaryColor: "",
      ErrorColor: "",
      SuccessColor: "",
    },
  },
  FileValidation: FIELD_VALIDATION,
  TransferTo: "",
};

// CompanyList:Rendering the company-list from the back-end.
// For Update/Delete the Company data.
function CompanyList() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const translation = useTranslation();
  const PayrollDisbursementApp = translation.PAYROLL_DISBURSEMENT_APP;
  const companyList = useSelector((state) => state.company.companyList);
  const loader = useSelector((state) => state.company.loader);
  const snackbarMessage = useSelector((state) => state.company.message);
  const snackbarError = useSelector((state) => state.company.error);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openConfirmBox, setOpenConfirmBox] = useState(false);
  const handleOpenConfirmBox = () => setOpenConfirmBox(true);
  const handleCloseConfirmBox = () => setOpenConfirmBox(false);
  const [companyForm, setCompanyForm] = useState(defaultValue);
  const [AccountUsers, setAccountUSers] = useState([]);
  const [PayrollUsers, setPayrollUserss] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [gridData, setGridData] = useState(companyList);
  const [isEdit, setIsEdit] = useState(false);

  const registerNewCompany = () => {
    defaultValue.Id = "";
    defaultValue.SK = "";
    setAccountUSers([]);
    setPayrollUserss([]);
    defaultValue.Config.color = setDefaultColorTheme(theme);
    setCompanyForm(defaultValue);
    handleOpen();
    setIsEdit(false);
  };

  const setFormValues = (val) => {
    const editVal = JSON.parse(JSON.stringify(val));
    editVal.Config =
      editVal.Config !== null
        ? typeof editVal.Config !== "object"
          ? JSON.parse(editVal.Config)
          : editVal.Config
        : {
            Logo: "",
            color: setDefaultColorTheme(theme),
          };
    editVal.FileValidation =
      editVal.FileValidation !== null
        ? typeof editVal.FileValidation !== "object"
          ? JSON.parse(editVal.FileValidation)
          : editVal.FileValidation
        : defaultValue.FileValidation;
    editVal.PayrollUsers = editVal.PayrollUsers.map((val) => {
      const data = typeof val !== "object" ? JSON.parse(val) : val;
      return data.Id + "#" + data.Name;
    });
    editVal.AccountUsers = editVal.AccountUsers.map((val) => {
      const data = typeof val !== "object" ? JSON.parse(val) : val;
      return data.Id + "#" + data.Name;
    });
    return editVal;
  };
  const setPopUpValue = (data) => {
    const values = setFormValues(data);
    setAccountUSers(values.AccountUsers);
    setPayrollUserss(values.PayrollUsers);
    setCompanyForm({
      ...defaultValue,
      ...values,
      // OriginAccount: values.OriginAccount.replace(/^0+/, ""),
    });
    setIsEdit(true);
    handleOpen();
  };

  const handleStatus = (data) => {
    dispatch(
      companyEdit({ ...defaultValue, ...data, Status: !data.Status }, false),
    );
  };

  const handleSubmit = () => {
    dispatch(deleteCompany(companyForm));
    handleCloseConfirmBox();
  };

  const handleSnackbarClose = () => {
    dispatch(resetSnackbarValues());
  };

  const deleteConfirmBox = (data) => {
    const values = setFormValues(data);
    setCompanyForm({ ...defaultValue, ...values });

    handleOpenConfirmBox();
  };
  const columns = [
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
      Header: translation.COMPANY_NAME,
      accessor: "OrgName",
    },
    {
      Header: translation.EMAIL_ADDRESS,
      accessor: "Email",
    },
    {
      Header: translation.ORIGIN_ACCOUNT,
      accessor: "OriginAccount",
    },
    {
      Header: translation.FISCAL_INFO,
      accessor: "FiscalInfo",
      disableSortBy: true,
      Cell: (props) => {
        return `${props.value}%`;
      },
    },
    {
      Header: translation.PAYROLL_USERS,
      accessor: "PayrollUsers",
      disableSortBy: true,

      Cell: ({ row }) => {
        let values = 0;
        if (row.values.PayrollUsers) {
          values = row.values.PayrollUsers.filter((item) => item);

          return <span>{values ? values.length : ""}</span>;
        } else {
          return <span>{""}</span>;
        }
      },
    },
    {
      Header: translation.ACCOUNT_USERS,
      accessor: "AccountUsers",
      disableSortBy: true,

      Cell: ({ row }) => {
        if (row.values.AccountUsers) {
          const values = row.values.AccountUsers.filter((item) => item);
          return <span>{values ? values.length : ""}</span>;
        } else {
          return <span>{""}</span>;
        }
      },
    },

    {
      Header: translation.PAYROLL_DISBURSEMENT,
      accessor: "PayrollDisbursement",
    },
    {
      Header: translation.ENROLLMENT_DATE,
      accessor: "EmployeeEnrollmentDate",
    },
    {
      Header: translation.TRANSFER_TO,
      accessor: "TransferTo",
      width: 700,
      Cell: (props) => {
        return <p>{props.value === "BNK" ? "Banorte Bank" : "Flexe Wallet"}</p>;
      },
    },
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

  useEffect(() => {
    document.title = PayrollDisbursementApp;
  }, [PayrollDisbursementApp]);

  useEffect(() => {
    dispatch(getCompanyList());
  }, [dispatch]);

  useEffect(() => {
    setGridData(companyList);
  }, [companyList]);

  const renderRowSubComponent = React.useCallback(
    ({ row, data }) => {
      const columnsHeader = [
        {
          Header: translation.COMPANY_ID,
          accessor: "expander",
        },
        {
          Header: translation.RFC,
          accessor: "RFC",
          Cell: () => data.original.RFC,
        },
        {
          Header: translation.PAYROLL_USERS,
          accessor: "PayrollUsers",
          disableSortBy: true,
          Cell: (props) => {
            const values = props.value.filter((item) => item);
            return (
              <ol>
                {values.map((val) => {
                  const data = typeof val !== "object" ? JSON.parse(val) : val;
                  return <li>{data.Name}</li>;
                })}
              </ol>
            );
          },
        },
        {
          Header: translation.ACCOUNT_USERS,
          accessor: "AccountUsers",
          disableSortBy: true,
          Cell: (props) => {
            const values = props.value.filter((item) => item);
            return (
              <ol>
                {values.map((val) => {
                  const data = typeof val !== "object" ? JSON.parse(val) : val;
                  return <li>{data.Name}</li>;
                })}
              </ol>
            );
          },
        },
        {
          Header: translation.COMPANY_DETAILS,
          accessor: "OrgDetails",
          Cell: () => data.original.OrgDetails,
          disableSortBy: true,
        },
      ];
      return <GridView columns={columnsHeader} data={[row.values]} />;
    },
    [translation],
  );

  return (
    <>
      {loader && (
        <Box className="progressloader" sx={{ width: "100%" }}>
          {" "}
          <LinearProgress color="primary" />{" "}
        </Box>
      )}

      <Grid container className="page-title-wrap">
        <Grid item xs={6} className="companylist-title-wrap">
          <Typography variant="h4" color="secondary">
            {translation.LIST_COMPANIES}
          </Typography>
        </Grid>
        <Grid item xs={6} className="register-btn-wrap" align="right">
          <Button
            color="primary"
            variant="contained"
            className="primary-btn"
            onClick={registerNewCompany}
          >
            {translation.REGISTER_NEW_COMPANY}
          </Button>
          <CompanyForm
            open={open}
            handleClose={handleClose}
            defaultValue={defaultValue}
            companyForm={companyForm}
            setCompanyForm={setCompanyForm}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            saveAccountUsers={AccountUsers}
            savePayrollUsers={PayrollUsers}
          />

          <ConfirmBox
            openConfirmBox={openConfirmBox}
            handleCloseConfirmBox={handleCloseConfirmBox}
            message={translation.DELETE_COMPANY_CONFIRMATION}
            handleSubmit={handleSubmit}
          />
        </Grid>
      </Grid>

      <Box className="payroll-tbl-wrap">
        <div className="payroll-tbl-inner">
          <Grid item className="search-wrap">
            <CustomizedInputBase
              setGridData={setGridData}
              gridList={companyList}
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              className="tbl-Searchfield"
              flag
            />
          </Grid>
          <Divider className="tbl-divider-pane"></Divider>

          <Grid item className="table-wrapper-outer">
            <GridView
              className="tblgrid-wrap"
              columns={columns}
              data={gridData}
              renderRowSubComponent={renderRowSubComponent}
              autoCollapse={{ sort: true }}
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
export default CompanyList;
