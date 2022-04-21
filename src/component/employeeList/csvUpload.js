import React, { useEffect, useState } from "react";
import { Button, Backdrop, CircularProgress } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDropzone } from "react-dropzone";
import useTranslation from "../../resources/index";
import { MINMUM_ROW_VALIDATION } from "../../constants/constant";
import { refreshEmployeeList, saveCsvList } from "../../actions/employee";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import CSVFileValidator from "csv-file-validator";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import CheckIcon from "@mui/icons-material/Check";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { parseCsvValidation } from "../../common/Utility/utility";
import {
  isPhoneNumberValid,
  isEmailValid,
  isTypeAccountValid,
  isBankIdValid,
  isFunctionValid,
} from "../../common/Utility/utility";

function Accept({ handleClose }) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "text/csv, application/CSV, application/vnd.ms-excel",
  });
  const history = useHistory();
  const translation = useTranslation();
  const dispatch = useDispatch();
  const [csvValidation, setCsvValidaton] = useState("");
  const [isExamined, setIsExamined] = useState(false);
  const [fileName, saveFileName] = useState("");
  const [enableExamine, setEnableExamine] = useState(false);
  const [enableAttachBuuton, setEnableAttachBuuton] = useState(false);
  const csvList = useSelector((state) => state.employee.csvList);
  const bankIdConfig = useSelector((state) => state.settings.bankId);
  const typeAccountConfig = useSelector((state) => state.settings.accountType);
  const fileValidation = useSelector((state) => state.employee.fileValidation);
  const orgId = useSelector((state) => state.login.orgId);
  const acceptedFileItems = acceptedFiles.map((file) => (
    <div className="validate-file-info" key={file.path}>
      <span className="validate-file-icon">
        <CheckIcon fontSize="small" />
      </span>{" "}
      <span className="validate-file-name">
        {file.name} - {file.size} bytes
      </span>
    </div>
  ));

  const redirectErrorList = (e) => {
    e.target.value = null;
    e.preventDefault();
    handleClose();
    history.push("/app/error-list");
  };

  const config = {
    headers: [
      {
        name: "phoneNumber",
        inputName: "phoneNumber",
        required: false,
        requiredError: function (headerName, rowNumber, columnNumber) {
          return `${rowNumber},  ${headerName} ${translation.IS_A_MANDATORY_FIELD}`;
        },
        unique: false,
        uniqueError: function (headerName, rowNumber) {
          return `${rowNumber},  ${headerName} ${translation.SHOULD_BE_UNIQUE} `;
        },
        validate: function (phoneNumber) {
          return isPhoneNumberValid(phoneNumber);
        },
        validateError: function (headerName, rowNumber, columnNumber) {
          return `${rowNumber},  ${translation.INVALID} ${headerName} `;
        },
      },
      {
        name: "name",
        inputName: "name",
        required: false,
        requiredError: function (headerName, rowNumber, columnNumber) {
          return `${rowNumber},  ${headerName} ${translation.IS_A_MANDATORY_FIELD}`;
        },
        unique: false,
        uniqueError: function (headerName, rowNumber) {
          return `${rowNumber},  ${headerName} ${translation.SHOULD_BE_UNIQUE}`;
        },

        validate: function (name) {
          return isFunctionValid(name, 61);
        },
        validateError: function (headerName, rowNumber, columnNumber) {
          return `${rowNumber},  ${translation.INVALID} ${headerName} `;
        },
      },
      {
        name: "email",
        inputName: "email",
        required: false,
        requiredError: function (headerName, rowNumber, columnNumber) {
          return `${rowNumber},  ${headerName} ${translation.IS_A_MANDATORY_FIELD}`;
        },
        unique: false,
        uniqueError: function (headerName, rowNumber) {
          return `${rowNumber},  ${headerName} ${translation.SHOULD_BE_UNIQUE}`;
        },
        validate: function (email) {
          return isEmailValid(email);
        },
        validateError: function (headerName, rowNumber, columnNumber) {
          return `${rowNumber},  ${translation.INVALID} ${headerName} `;
        },
      },
      {
        name: "contact",
        inputName: "contact",
        required: false,
        requiredError: function (headerName, rowNumber, columnNumber) {
          return `${rowNumber},  ${headerName} ${translation.IS_A_MANDATORY_FIELD}`;
        },
        unique: false,
        uniqueError: function (headerName, rowNumber) {
          return `${rowNumber},  ${headerName} ${translation.SHOULD_BE_UNIQUE}`;
        },

        validate: function (contact) {
          return isFunctionValid(contact, 21);
        },
        validateError: function (headerName, rowNumber, columnNumber) {
          return `${rowNumber},  ${translation.INVALID} ${headerName} `;
        },
      },
      {
        name: "rfc",
        inputName: "rfc",
        required: false,
        requiredError: function (headerName, rowNumber, columnNumber) {
          return `${rowNumber},  ${headerName} ${translation.IS_A_MANDATORY_FIELD}`;
        },
        unique: false,
        uniqueError: function (headerName, rowNumber) {
          return `${rowNumber},  ${headerName} ${translation.SHOULD_BE_UNIQUE}`;
        },

        validate: function (rfc) {
          return isFunctionValid(rfc, 14);
        },
        validateError: function (headerName, rowNumber, columnNumber) {
          return `${rowNumber},  ${translation.INVALID} ${headerName} `;
        },
      },
      {
        name: "typeAccount",
        inputName: "typeAccount",
        required: false,
        requiredError: function (headerName, rowNumber, columnNumber) {
          return `${rowNumber},  ${headerName} ${translation.IS_A_MANDATORY_FIELD}`;
        },
        unique: false,
        uniqueError: function (headerName, rowNumber) {
          return `${rowNumber},  ${headerName} ${translation.SHOULD_BE_UNIQUE}`;
        },
        validate: function (typeAccount) {
          return isTypeAccountValid(typeAccount, typeAccountConfig);
        },
        validateError: function (headerName, rowNumber, columnNumber) {
          return `${rowNumber},  ${translation.INVALID} ${headerName} `;
        },
      },
      {
        name: "bankId",
        inputName: "bankId",
        required: false,
        requiredError: function (headerName, rowNumber, columnNumber) {
          return `${rowNumber},  ${headerName} ${translation.IS_A_MANDATORY_FIELD}`;
        },
        unique: false,
        uniqueError: function (headerName, rowNumber) {
          return `${rowNumber},  ${headerName} ${translation.SHOULD_BE_UNIQUE}`;
        },
        validate: function (bankId) {
          return isBankIdValid(bankId, bankIdConfig);
        },
        validateError: function (headerName, rowNumber, columnNumber) {
          return `${rowNumber},  ${translation.INVALID} ${headerName} `;
        },
      },
      {
        name: "accountClabe",
        inputName: "accountClabe",
        required: false,
        requiredError: function (headerName, rowNumber, columnNumber) {
          return `${rowNumber},  ${headerName} ${translation.IS_A_MANDATORY_FIELD}`;
        },
        unique: false,
        uniqueError: function (headerName, rowNumber) {
          return `${rowNumber},  ${headerName} ${translation.SHOULD_BE_UNIQUE}`;
        },
        validate: function (accountClabe) {
          return isFunctionValid(accountClabe, 19);
        },
        validateError: function (headerName, rowNumber, columnNumber) {
          return `${rowNumber},  ${translation.INVALID} ${headerName} `;
        },
      },
    ],
  };

  // For validating the CSV file.
  const validateParseCSV = (fileData) => {
    if (fileData && fileData.length) {
      handleToggle(true);
      setEnableExamine(true);
      config.headers = config.headers.map((val) => {
        val.required = fileValidation[val.name]["required"];
        val.unique = fileValidation[val.name]["unique"];
        return val;
      });
      CSVFileValidator(fileData[0], config)
        .then((csvData) => {
          if (
            csvData.inValidMessages.length > 0 &&
            csvData.inValidMessages[0].startsWith("Header name")
          ) {
            setCsvValidaton(translation.CSV_VALIDATION.INVALID_HEADER);
            setEnableExamine(false);
            handleToggle(false);
            dispatch(saveCsvList([]));
          } else if (csvData.data.length < MINMUM_ROW_VALIDATION) {
            setCsvValidaton(translation.CSV_VALIDATION.MINIMUM_ROW_VALIDATION);
            setEnableExamine(false);
            handleToggle(false);
            dispatch(saveCsvList([]));
          } else {
            const errorData = parseCsvValidation(csvData);
            if (errorData.length > 0) {
              dispatch(saveCsvList(errorData));
              setEnableExamine(false);
              handleToggle(false);
            } else {
              uploadFile();
            }
            setCsvValidaton("");
            return errorData;
          }
        })
        .catch((err) => {
          return err;
        });
    } else {
      setCsvValidaton(translation.PLEASE_SELECT_THE_FILE);
      dispatch(saveCsvList([]));
    }
  };

  // Api call for Uploading the CSV file on S3.
  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append("orgId", orgId);
    formData.append("file", acceptedFiles[0]);

    await fetch(
      "https://lp6hw689md.execute-api.us-west-1.amazonaws.com/dev/file-uploadtest?action=CSVUPLOAD",
      {
        method: "POST",
        body: formData,
      },
    )
      .then((response) => response.json())
      .then((data) => {
        saveFileName(data?.Success?.fileId);
        setEnableExamine(true);
        handleToggle(false);
        setCsvValidaton("");
        setIsExamined(true);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    setIsExamined(false);
    setCsvValidaton("");
    dispatch(saveCsvList([]));
  }, [acceptedFiles]);

  // Api call for Saving the AC Record in the Employee table from S3.
  const saveRecords = async () => {
    setEnableAttachBuuton(true);
    handleToggle(true);
    await fetch(
      "https://to1f63cg1j.execute-api.us-west-1.amazonaws.com/dev/insertdata?action=INSERT",
      {
        method: "POST",
        body: JSON.stringify({
          orgId: orgId,
          fileId: fileName,
        }),
      },
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.Success && data.Success.length > 0) {
          dispatch(refreshEmployeeList(data.Success));
          setEnableAttachBuuton(false);
          handleToggle(false);
          handleClose();
        } else if (data.Errors && data.Errors.inValidMessages) {
          const errorData = parseCsvValidation(data.Errors);
          if (errorData.length > 0) {
            dispatch(saveCsvList(errorData));
          }
          handleToggle(false);
          setIsExamined(false);
          setEnableAttachBuuton(false);
        } else {
          setCsvValidaton(translation.SOMETHING_WENT_WRONG);
          setIsExamined(false);
          setEnableAttachBuuton(false);
          setEnableExamine(false);
          handleToggle(false);
          dispatch(saveCsvList([]));
        }
      });
  };
  const [opens, setOpens] = useState(false);
  const handleCloses = () => {
    setOpens(false);
  };
  const handleToggle = (val) => {
    setOpens(val);
  };
  return (
    <section className="upload-container">
      <div
        className="upload-container-div"
        {...getRootProps({ className: "dropzone-wrap" })}
      >
        <input
          id="testFile"
          disabled={isExamined}
          onClick={(e) => (e.target.value = null)}
          {...getInputProps()}
        />
        <p className="dropzone-inst">{translation.DRAG_DROP}</p>
        <p className="or-txt" style={{ margin: "20px" }}>
          {translation.OR}
        </p>
        <Button
          className="uploadbtn"
          color="error"
          variant="contained"
          style={{ marginBottom: "10px" }}
          disabled={isExamined}
          onClick={(e) => (e.target.value = null)}
        >
          {translation.CLICK_TO_UPLOAD}
        </Button>
      </div>
      <div
        className="validate-control-wrap"
        style={{
          alignItems: "center",
          margin: "10px 0",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div className="vfile-info-wrap">{acceptedFileItems}</div>
        <div className="exmine-button-wrap">
          <Button
            className="examine-btn"
            startIcon={<FactCheckIcon />}
            variant="outlined"
            disabled={enableExamine}
            onClick={() => {
              validateParseCSV(acceptedFiles);
            }}
          >
            {translation.EXAMINE}
          </Button>
          <Backdrop
            sx={{ color: "$white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={opens}
            onClick={handleCloses}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      </div>
      <div className="error-wrapper">
        {csvValidation && (
          <ul style={{ textAlign: "center" }}>
            <span className="validator-txt">{csvValidation}</span>
          </ul>
        )}
        {csvList.length > 0 && acceptedFiles.length > 0 && (
          <ul
            style={{ textAlign: "center", color: "red", marginBottom: "10px" }}
          >
            <Button
              color="error"
              onClick={(e) => {
                redirectErrorList(e);
                e.target.value = null;
              }}
              style={{ textDecoration: "underline" }}
            >
              {translation.VIEW_ERROR}
            </Button>
          </ul>
        )}
      </div>
      <div className="csvSubmitWrap" style={{ textAlign: "center" }}>
        <LoadingButton
          loading={enableAttachBuuton}
          color="primary"
          className="empCSVSubmitBtn"
          size="large"
          variant="contained"
          disabled={!isExamined}
          onClick={() => {
            saveRecords(acceptedFiles);
          }}
        >
          <CloudUploadIcon />
          &nbsp; {translation.ATTACH_FILE}
        </LoadingButton>
        <Backdrop
          sx={{ color: "$white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={opens}
          onClick={handleCloses}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </section>
  );
}
export default Accept;
