import React, { useEffect, useRef, useState } from "react";
import useTranslation from "../../resources/index";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { DATES } from "../../constants/constant";
import { company, companyEdit } from "../../actions";
import { useSelector } from "react-redux";
import { getUserConfigData } from "../../actions";
import { zeroPad } from "../../common/Utility/utility";
import "./companyform.scss";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator,
} from "react-material-ui-form-validator";
import {
  Button,
  Grid,
  Box,
  FormLabel,
  RadioGroup,
  Radio,
  Container,
  Typography,
  Link,
  Modal,
  Fade,
  Backdrop,
  MenuItem,
  OutlinedInput,
  FormControl,
  InputLabel,
  Select,
  FormControlLabel,
  Switch,
  Tooltip,
  FormHelperText,
} from "@mui/material";
import MultiSelectInput from "./MultiSelectInput";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "64%",
  bgcolor: "#F4F3F3",
  boxShadow: 24,
  pt: 2,
  px: 2,
  pb: 3,
};

export default function CompanyForm({
  open,
  handleClose,
  defaultValue,
  companyForm,
  setCompanyForm,
  isEdit,
  setIsEdit,
  saveAccountUsers,
  savePayrollUsers,
}) {
  const dispatch = useDispatch();
  const myRef = useRef(null);
  const translation = useTranslation();
  const payrollUser = useSelector((state) => state.settings.payrollUser);
  const accountUser = useSelector((state) => state.settings.accountUser);
  const [isFileValid, setIsFileValid] = useState(false);
  const [isTransferValid, setIsTransferValid] = useState(false);

  const inputEvent = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const re = /^[0-9\b]+$/;
    if (name === "OriginAccount") {
      if (
        value === "" ||
        (re.test(value) && value >= 0 && value < 99999999999999999999)
      )
        setCompanyForm({ ...companyForm, [name]: value });
    } else {
      setCompanyForm({ ...companyForm, [name]: value });
    }
  };

  const handleDropDownValue = (e, name) => {
    const value = e.target.value;
    setCompanyForm({ ...companyForm, [name]: value });
  };

  const changeColor = (e, name) => {
    const value = e.target.value;
    setCompanyForm({
      ...companyForm,
      Config: {
        ...companyForm.Config,
        color: {
          ...companyForm.Config.color,
          [name]: value,
        },
      },
    });
  };

  const uploadImage = (e, name) => {
    let file = e.target.files[0];
    if (file) {
      if (file.size > 1000000) {
        setIsFileValid(true);
      } else {
        setIsFileValid(false);

        setCompanyForm({ ...companyForm, [name]: file });
      }
    }
  };

  const resetInputField = () => {
    setCompanyForm(defaultValue);
    handleClose();
    setIsEdit(false);
  };

  const getUserConfigListData = () => {
    dispatch(getUserConfigData({ payrollUser, accountUser }));
  };

  const handleSwitch = (e, validationType, fieldName) => {
    setCompanyForm({
      ...companyForm,
      FileValidation: {
        ...companyForm.FileValidation,
        [fieldName]: {
          ...companyForm.FileValidation[fieldName],
          [validationType]: e.target.checked,
        },
      },
    });
  };

  const executeScroll = () => myRef.current.scrollIntoView();

  const onSubmits = (event) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });

    if (!isFileValid && companyForm.TransferTo !== "") {
      dispatch(company({ ...companyForm }));
      handleClose();
    }
  };

  const onUpdate = (event) => {
    event.preventDefault();
    if (!isFileValid) {
      dispatch(
        companyEdit(
          {
            ...companyForm,
            OriginAccount: zeroPad(companyForm.OriginAccount, 20),
          },
          true,
        ),
      );
      handleClose();
    }
  };

  useEffect(() => {
    if (open) {
      setIsFileValid(false);
      getUserConfigListData();
    }
  }, [open]);

  useEffect(() => {
    getUserConfigListData();
  }, []);

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        hideBackdrop={false}
      >
        <Fade in={open}>
          <Box className="complistModelContainer">
            <Container
              className="cl-modelinner"
              sx={{ ...style, ...{ maxHeight: 650, overflowY: "scroll" } }}
            >
              <div ref={myRef} />
              <Grid item className="closeBtnWrap">
                <Link onClick={handleClose}>
                  <CloseIcon color="gray" className="close_icon" />
                </Link>
              </Grid>
              <ValidatorForm
                className="form"
                autoComplete="off"
                onSubmit={isEdit ? onUpdate : onSubmits}
              >
                <fieldset style={{ padding: 20 }}>
                  <legend style={{ paddingLeft: 5, paddingRight: 5 }}>
                    {translation.COMPANY_INFORMATION}
                  </legend>
                  <Grid
                    item
                    container
                    className="cl-modelform"
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid item xs={6} className="cl-frmcolumn">
                      <Grid item xs={12} className="cl-frmcontainer">
                        <Typography gutterBottom align="left">
                          {translation.COMPANY_NAME}
                          <span className="required">*</span>
                        </Typography>
                        <TextValidator
                          name="OrgName"
                          fullWidth
                          size="small"
                          value={companyForm.OrgName}
                          variant="outlined"
                          autoFocus
                          onChange={inputEvent}
                          className="cl-txtfld"
                          inputProps={{ maxLength: "60" }}
                          placeholder={translation.COMPANY_NAME}
                          validators={["required"]}
                          errorMessages={[
                            translation.PLEASE_FILL_REQUIRED_FIELD,
                          ]}
                        />
                      </Grid>
                      <Grid item xs={12} className="cl-frmcontainer">
                        <Typography gutterBottom align="left">
                          {translation.PAYROLL_USERS}
                          <span className="required">*</span>
                        </Typography>
                        <FormControl sx={{ width: "100%" }}>
                          <MultiSelectInput
                            showSaveUser={companyForm.PayrollUsers}
                            newUserList={payrollUser}
                            saveUserList={savePayrollUsers}
                            handleDropDownValue={handleDropDownValue}
                            t={translation}
                            inputName={"PayrollUsers"}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} className="cl-frmcontainer">
                        <Typography gutterBottom align="left">
                          {translation.EMAIL}
                          <span className="required">*</span>
                        </Typography>
                        <TextValidator
                          id="Email"
                          fullWidth
                          size="small"
                          name="Email"
                          value={companyForm.Email}
                          variant="outlined"
                          className="cl-txtfld"
                          placeholder={translation.EMAIL}
                          type="text"
                          onChange={inputEvent}
                          validators={["required", "isEmail"]}
                          inputProps={{ maxLength: "39" }}
                          errorMessages={[
                            translation.PLEASE_FILL_REQUIRED_FIELD,
                            translation.EMAIL_NOT_VALID,
                          ]}
                        />
                      </Grid>
                      <Grid item xs={12} className="cl-frmcontainer">
                        <Typography gutterBottom align="left">
                          {translation.ORIGIN_ACCOUNT}
                          <span className="required">*</span>
                        </Typography>
                        <TextValidator
                          id="OriginAccount"
                          fullWidth
                          size="small"
                          name="OriginAccount"
                          value={companyForm.OriginAccount}
                          variant="outlined"
                          className="cl-txtfld"
                          placeholder={translation.ORIGIN_ACCOUNT}
                          type="text"
                          onChange={inputEvent}
                          validators={["required"]}
                          errorMessages={[
                            translation.PLEASE_FILL_REQUIRED_FIELD,
                          ]}
                        />
                      </Grid>
                      <Grid item xs={12} className="cl-frmcontainer">
                        <Typography gutterBottom align="left">
                          {translation.ACCOUNT_USERS}
                          <span className="required">*</span>
                        </Typography>
                        <FormControl sx={{ width: "100%" }}>
                          <MultiSelectInput
                            showSaveUser={companyForm.AccountUsers}
                            newUserList={accountUser}
                            saveUserList={saveAccountUsers}
                            handleDropDownValue={handleDropDownValue}
                            t={translation}
                            inputName={"AccountUsers"}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} className="cl-frmcontainer">
                        <Typography gutterBottom align="left">
                          {translation.STATUS}
                        </Typography>
                        <FormControl sx={{ width: "100%" }}>
                          <Select
                            size="small"
                            fullWidth
                            value={companyForm.Status}
                            onChange={(e) => handleDropDownValue(e, "Status")}
                            input={<OutlinedInput />}
                            validators={["required"]}
                            className="cl-selectfield"
                          >
                            <MenuItem key={"Activated"} value={true}>
                              {translation.ACTIVATED}
                            </MenuItem>
                            <MenuItem key={"Deactivated"} value={false}>
                              {translation.DEACTIVATED}
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} className="cl-frmcontainer">
                        <FormControl component="fieldset">
                          <FormLabel component="legend">
                            <Typography gutterBottom align="left">
                              {translation.TRANSFER_TO}
                              <span className="required">*</span>
                            </Typography>
                          </FormLabel>
                          <RadioGroup
                            row
                            name="TransferTo"
                            aria-label="gender"
                            value={companyForm.TransferTo}
                            onChange={(e) => {
                              inputEvent(e);
                              setIsTransferValid(false);
                            }}
                          >
                            <FormControlLabel
                              name="TransferTo"
                              value="BNK"
                              control={
                                <Radio
                                  style={
                                    isTransferValid ? { color: "red" } : {}
                                  }
                                />
                              }
                              label="Banorte Bank"
                            />
                            <FormControlLabel
                              name="TransferTo"
                              value="WLT"
                              control={
                                <Radio
                                  style={
                                    isTransferValid ? { color: "red" } : {}
                                  }
                                />
                              }
                              label="Flexe Wallet"
                            />
                          </RadioGroup>
                        </FormControl>
                        {isTransferValid && (
                          <FormHelperText>
                            <span className="requireds">
                              {translation.PLEASE_FILL_REQUIRED_FIELD}
                            </span>
                          </FormHelperText>
                        )}
                      </Grid>
                    </Grid>
                    <Grid item xs={6} className="cl-frmcolumn">
                      <Grid item xs={12} className="cl-frmcontainer">
                        <Typography gutterBottom align="left">
                          {translation.RFC}
                          <span className="required">*</span>
                        </Typography>
                        <TextValidator
                          name="RFC"
                          fullWidth
                          size="small"
                          value={companyForm.RFC}
                          variant="outlined"
                          type="text"
                          onChange={inputEvent}
                          className="cl-txtfld"
                          validators={["required"]}
                          inputProps={{ maxLength: 13 }}
                          errorMessages={[
                            translation.PLEASE_FILL_REQUIRED_FIELD,
                          ]}
                          placeholder={translation.RFC}
                        />
                      </Grid>
                      <Grid item xs={12} className="cl-frmcontainer">
                        <Typography gutterBottom align="left">
                          {translation.FISCAL_INFO}
                          <span className="required">*</span>
                        </Typography>
                        <TextValidator
                          name="FiscalInfo"
                          fullWidth
                          size="small"
                          value={companyForm.FiscalInfo}
                          variant="outlined"
                          type="number"
                          onChange={inputEvent}
                          className="cl-txtfld"
                          validators={["required"]}
                          inputProps={{ min: 0, max: 100 }}
                          errorMessages={[
                            translation.PLEASE_FILL_REQUIRED_FIELD,
                          ]}
                          placeholder={translation.FISCAL_INFO}
                        />
                      </Grid>

                      <Grid item xs={12} className="cl-frmcontainer">
                        <Grid item xs={6}>
                          <Typography gutterBottom align="left">
                            {translation.EMP_ENROLLMENT_DATE}
                            <span className="required">*</span>
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          container
                          className="cl-disbursmentwrap"
                          rowSpacing={1}
                          xs={12}
                        >
                          <Grid item xs={6}>
                            <FormControl sx={{ width: "100%" }}>
                              {companyForm.EmployeeEnrollmentDate === "" && (
                                <InputLabel id="" className="select-lbl">
                                  {[translation.PLEASE_SELECT]}
                                </InputLabel>
                              )}
                              <SelectValidator
                                fullWidth
                                size="small"
                                id="demo-multiple-name"
                                value={companyForm.EmployeeEnrollmentDate}
                                onChange={(e) =>
                                  handleDropDownValue(
                                    e,
                                    "EmployeeEnrollmentDate",
                                  )
                                }
                                input={<OutlinedInput />}
                                className="cl-selectfield"
                                validators={["required"]}
                                errorMessages={[
                                  translation.PLEASE_FILL_REQUIRED_FIELD,
                                ]}
                              >
                                <MenuItem key={"eed1"} value="" disabled>
                                  {[translation.PLEASE_SELECT]}
                                </MenuItem>
                                {DATES.map((name) => (
                                  <MenuItem key={name} value={name}>
                                    {name}
                                  </MenuItem>
                                ))}
                              </SelectValidator>
                            </FormControl>
                          </Grid>
                          <Grid item xs={6} className="disbursement-lbl">
                            <Typography gutterBottom align="left">
                              {translation.OF_THE_MONTH}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} className="cl-frmcontainer">
                        <Grid item xs={6}>
                          <Typography gutterBottom align="left">
                            {translation.PAYROLL_DISBURSEMENT_DATE}
                            <span className="required">*</span>
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          container
                          className="cl-disbursmentwrap"
                          rowSpacing={1}
                          xs={12}
                        >
                          <Grid item xs={6}>
                            <FormControl sx={{ width: "100%" }}>
                              {companyForm.PayrollDisbursement === "" && (
                                <InputLabel id="" className="select-lbl">
                                  {[translation.PLEASE_SELECT]}
                                </InputLabel>
                              )}
                              <SelectValidator
                                size="small"
                                fullWidth
                                id="demo-multiple-name"
                                value={companyForm.PayrollDisbursement}
                                input={<OutlinedInput />}
                                className="cl-selectfield"
                                validators={["required"]}
                                errorMessages={[
                                  translation.PLEASE_FILL_REQUIRED_FIELD,
                                ]}
                                onChange={(e) =>
                                  handleDropDownValue(e, "PayrollDisbursement")
                                }
                              >
                                <MenuItem disabled value="">
                                  {[translation.PLEASE_SELECT]}
                                </MenuItem>
                                {DATES.map((name) => (
                                  <MenuItem key={name} value={name}>
                                    {name}
                                  </MenuItem>
                                ))}
                              </SelectValidator>
                            </FormControl>
                          </Grid>
                          <Grid item xs={6} className="disbursement-lbl">
                            <Typography gutterBottom align="left">
                              {translation.OF_THE_MONTH}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} className="cl-frmcontainer">
                        <Typography gutterBottom align="left">
                          {translation.COMPANY_DETAILS}
                          <span className="required">*</span>
                        </Typography>
                        <TextValidator
                          id="OrgDetails"
                          fullWidth
                          size="small"
                          name="OrgDetails"
                          value={companyForm.OrgDetails}
                          variant="outlined"
                          onChange={inputEvent}
                          className="cl-txtarea"
                          multiline
                          minRows={4}
                          maxRows={6}
                          validators={["required"]}
                          errorMessages={[
                            translation.PLEASE_FILL_REQUIRED_FIELD,
                          ]}
                          placeholder={translation.PLEASE_ENTER_COMPNAY_DETAILS}
                        />
                      </Grid>
                      <Grid container xs={12} className="cl-frmcontainer">
                        <Grid item xs={6} row>
                          <Typography gutterBottom align="left">
                            {translation.COMPANY_LOGO}
                          </Typography>
                          <input
                            type="file"
                            name="file"
                            accept="image/*"
                            id="raised-button-file"
                            onChange={(e) => uploadImage(e, "File")}
                            style={
                              companyForm.File.length === 0
                                ? { width: "90px", color: "transparent" }
                                : {}
                            }
                          />
                          {isFileValid && (
                            <FormHelperText>
                              <span className="requireds">
                                {translation.LOGO_SHOULD_BE_SMALLER_THAN_1_MB}
                              </span>
                            </FormHelperText>
                          )}
                        </Grid>
                        <Grid item xs={6}>
                          <div style={{ float: "right" }}>
                            {companyForm.Config.Logo && (
                              <img
                                style={{ width: 100, height: 100 }}
                                src={
                                  "https://payroll-nerito-storage-us-west-1.s3.us-west-1.amazonaws.com/logo/" +
                                  encodeURIComponent(companyForm.Config.Logo) +
                                  "?v=" +
                                  new Date()
                                }
                                alt="Company Logo"
                              />
                            )}
                          </div>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </fieldset>
                <fieldset style={{ padding: 20 }}>
                  <legend style={{ paddingLeft: 5, paddingRight: 5 }}>
                    {translation.THEME_COLOR}
                  </legend>
                  <Grid
                    item
                    container
                    className="cl-modelform"
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid item xs={3} className="">
                      <Typography gutterBottom align="left">
                        {translation.PRIMARY_COLOR}
                      </Typography>
                      <input
                        type="color"
                        name="PrimaryColor"
                        id="head"
                        value={companyForm.Config.color.PrimaryColor}
                        onChange={(e) => changeColor(e, "PrimaryColor")}
                      />
                    </Grid>
                    <Grid item xs={3} className="">
                      <Typography gutterBottom align="left">
                        {translation.SECONDARY_COLOR}
                      </Typography>
                      <input
                        type="color"
                        name="SecondaryColor"
                        id="head"
                        value={companyForm.Config.color.SecondaryColor}
                        onChange={(e) => changeColor(e, "SecondaryColor")}
                      />
                    </Grid>
                    <Grid item xs={3} className="">
                      <Typography gutterBottom align="left">
                        {translation.ERROR_COLOR}
                      </Typography>
                      <input
                        type="color"
                        name="ErrorColor"
                        id="head"
                        value={companyForm.Config.color.ErrorColor}
                        onChange={(e) => changeColor(e, "ErrorColor")}
                      />
                    </Grid>
                    <Grid item xs={3} className="">
                      <Typography gutterBottom align="left">
                        {translation.SUCCESS_COLOR}
                      </Typography>
                      <input
                        type="color"
                        name="SuccessColor"
                        id="head"
                        value={companyForm.Config.color.SuccessColor}
                        onChange={(e) => changeColor(e, "SuccessColor")}
                      />
                    </Grid>
                  </Grid>
                </fieldset>
                <fieldset style={{ padding: 20 }}>
                  <legend style={{ paddingLeft: 5, paddingRight: 5 }}>
                    {translation.FILE_INPUT_VALIDATION}
                  </legend>
                  <Grid
                    item
                    container
                    className="cl-modelform"
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid item xs={6} className="">
                      <Typography gutterBottom align="left">
                        {translation.NAME}
                      </Typography>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={companyForm.FileValidation["name"].unique}
                            onChange={(e) => handleSwitch(e, "unique", "name")}
                          />
                        }
                        label="Unique"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={
                              companyForm.FileValidation["name"].required
                            }
                            onChange={(e) =>
                              handleSwitch(e, "required", "name")
                            }
                          />
                        }
                        label="Required"
                      />
                    </Grid>
                    <Grid item xs={6} className="">
                      <Typography gutterBottom align="left">
                        {translation.EMAIL}
                      </Typography>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={companyForm.FileValidation["email"].unique}
                            onChange={(e) => handleSwitch(e, "unique", "email")}
                          />
                        }
                        label="Unique"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={
                              companyForm.FileValidation["email"].required
                            }
                            onChange={(e) =>
                              handleSwitch(e, "required", "email")
                            }
                          />
                        }
                        label="Required"
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    container
                    className="cl-modelform"
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid item xs={6} className="">
                      <Typography gutterBottom align="left">
                        {translation.CONTACT}
                      </Typography>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={
                              companyForm.FileValidation["contact"].unique
                            }
                            onChange={(e) =>
                              handleSwitch(e, "unique", "contact")
                            }
                          />
                        }
                        label="Unique"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={
                              companyForm.FileValidation["contact"].required
                            }
                            onChange={(e) =>
                              handleSwitch(e, "required", "contact")
                            }
                          />
                        }
                        label="Required"
                      />
                    </Grid>
                    <Grid item xs={6} className="">
                      <Typography gutterBottom align="left">
                        {translation.RFC}
                      </Typography>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={companyForm.FileValidation["rfc"].unique}
                            onChange={(e) => handleSwitch(e, "unique", "rfc")}
                          />
                        }
                        label="Unique"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={companyForm.FileValidation["rfc"].required}
                            onChange={(e) => handleSwitch(e, "required", "rfc")}
                          />
                        }
                        label="Required"
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    container
                    className="cl-modelform"
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid item xs={6} className="">
                      <Typography gutterBottom align="left">
                        {translation.TYPE_ACCOUNT}
                      </Typography>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={
                              companyForm.FileValidation["typeAccount"].unique
                            }
                            onChange={(e) =>
                              handleSwitch(e, "unique", "typeAccount")
                            }
                          />
                        }
                        label="Unique"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={
                              companyForm.FileValidation["typeAccount"].required
                            }
                            onChange={(e) =>
                              handleSwitch(e, "required", "typeAccount")
                            }
                          />
                        }
                        label="Required"
                      />
                    </Grid>
                    <Grid item xs={6} className="">
                      <Typography gutterBottom align="left">
                        {translation.BANK_ID}
                      </Typography>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={
                              companyForm.FileValidation["bankId"].unique
                            }
                            onChange={(e) =>
                              handleSwitch(e, "unique", "bankId")
                            }
                          />
                        }
                        label="Unique"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={
                              companyForm.FileValidation["bankId"].required
                            }
                            onChange={(e) =>
                              handleSwitch(e, "required", "bankId")
                            }
                          />
                        }
                        label="Required"
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    container
                    className="cl-modelform"
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid item xs={6} className="">
                      <Typography gutterBottom align="left">
                        {translation.ACCOUNT_CLABE}
                      </Typography>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={
                              companyForm.FileValidation["accountClabe"].unique
                            }
                            onChange={(e) =>
                              handleSwitch(e, "unique", "accountClabe")
                            }
                          />
                        }
                        label="Unique"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={
                              companyForm.FileValidation["accountClabe"]
                                .required
                            }
                            onChange={(e) =>
                              handleSwitch(e, "required", "accountClabe")
                            }
                          />
                        }
                        label="Required"
                      />
                    </Grid>
                    <Grid item xs={6} className="">
                      <Typography gutterBottom align="left">
                        {translation.PHONE_NUMBER}
                      </Typography>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={
                              companyForm.FileValidation["phoneNumber"].unique
                            }
                            onChange={(e) =>
                              handleSwitch(e, "unique", "phoneNumber")
                            }
                          />
                        }
                        label="Unique"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={
                              companyForm.FileValidation["phoneNumber"].required
                            }
                            onChange={(e) =>
                              handleSwitch(e, "required", "phoneNumber")
                            }
                          />
                        }
                        label="Required"
                      />
                    </Grid>
                  </Grid>
                </fieldset>
                <Grid item xs={12} align="center" className="buttonwrapper">
                  <Tooltip
                    title={
                      !isEdit &&
                      companyForm.Id === "" &&
                      (accountUser.length === 0 || payrollUser.length === 0)
                        ? translation.COMPANY_CAN_NOT_CREATED
                        : ""
                    }
                    placement="top"
                  >
                    <span>
                      <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                        onClick={() => {
                          executeScroll();
                          setIsTransferValid(companyForm.TransferTo === "");
                        }}
                        className="companyFormSubmit"
                        size="large"
                        disabled={
                          !isEdit &&
                          companyForm.Id === "" &&
                          (accountUser.length === 0 || payrollUser.length === 0)
                        }
                      >
                        {isEdit ? translation.UPDATE : translation.SUBMIT}
                      </Button>
                    </span>
                  </Tooltip>
                  <Button
                    color="error"
                    variant="text"
                    className="companyFormReset"
                    onClick={resetInputField}
                    size="large"
                  >
                    {translation.CANCEL}
                  </Button>
                </Grid>
              </ValidatorForm>
            </Container>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
