import React, { useEffect, useState } from "react";
import useTranslation from "../../resources/index";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { employee, employeeEdit } from "../../actions/employee";
import "./employeeform.scss";
import { useSelector } from "react-redux";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator,
} from "react-material-ui-form-validator";
import {
  Button,
  Grid,
  Box,
  Container,
  Typography,
  Link,
  Modal,
  Fade,
  Backdrop,
  MenuItem,
  OutlinedInput,
  FormControl,
} from "@mui/material";
import { getConfigData } from "../../actions/settings.js";
import {
  getFormFileldValidation,
  isFunctionValid,
  isPhoneNumberValid,
} from "../../common/Utility/utility";

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

// Form to update the AC users.
export default function EmployeeForm({
  open,
  handleClose,
  defaultValue,
  employeeForm,
  setEmployeeForm,
  isEdit,
  setIsEdit,
  employeeList,
  fileValidation,
}) {
  const dispatch = useDispatch();
  const translation = useTranslation();
  const bankId = useSelector((state) => state.settings.bankIdDetail);
  const accountType = useSelector((state) => state.settings.accountTypeDetail);
  const formFileldValidation = getFormFileldValidation(
    fileValidation,
    translation,
  );

  const handleDropDownValue = (e, name) => {
    const value = e.target.value;
    setEmployeeForm({ ...employeeForm, [name]: value });
  };

  const formatToPhone = (event) => {
    const input = event.target.value.replace(/\D/g, "").substring(0, 12); // First ten digits of input only
    const areaCode = input.substring(0, 2);
    const middle = input.substring(2, 5);
    const secondLast = input.substring(5, 8);
    const last = input.substring(8, 12);
    if (input.length > 8) {
      event.target.value = `${"+"}${areaCode}-${middle}-${secondLast}-${last}`;
    } else if (input.length > 5) {
      event.target.value = `${"+"}${areaCode}-${middle}-${secondLast}`;
    } else if (input.length > 2) {
      event.target.value = `${"+"}${areaCode}-${middle}`;
    } else if (input.length > 0) {
      event.target.value = `${"+"}${areaCode}`;
    } else {
      event.target.value = ``;
    }
    return event.target.value;
  };

  const inputEvent = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "PhoneNumber") {
      value = formatToPhone(e);
    }
    setEmployeeForm({ ...employeeForm, [name]: value });
  };

  const handleSingleDropdownValue = (e, name) => {
    const value = e.target.value;
    setEmployeeForm({ ...employeeForm, [name]: value });
  };

  const resetInputField = () => {
    setEmployeeForm(defaultValue);
    handleClose();
    setIsEdit(false);
  };

  const getConfigListData = () => {
    dispatch(getConfigData({ accountType, bankId }));
  };

  const onSubmits = (event) => {
    event.preventDefault();
    dispatch(
      employee({
        RFC: employeeForm.RFC,
        Name: employeeForm.Name,
        LastName: employeeForm.LastName,
        Email: employeeForm.Email,
        Contact: employeeForm.Contact,
        PhoneNumber: employeeForm.PhoneNumber,
        Status: employeeForm.Status,
        AccountType: employeeForm.AccountType,
        BankId: employeeForm.BankId,
        AccountClabe: employeeForm.AccountClabe,
        CompanyId: employeeForm.CompanyId,
        OperationType: employeeForm.OperationType,
        Currency: employeeForm.Currency,
        Id: employeeForm.Id,
        SK: employeeForm.SK,
      }),
    );
    handleClose();
  };

  const checkMaxCharacter = (inputValue, length) => {
    return inputValue === "" || isFunctionValid(inputValue, length);
  };

  const checkUniqueValidation = (inputValue, key) => {
    const data = employeeList.some((val) => {
      return (
        inputValue !== "" &&
        inputValue === val[key] &&
        val.Id !== employeeForm.Id
      );
    });
    return !data;
  };

  const onUpdate = (event) => {
    event.preventDefault();
    dispatch(
      employeeEdit({
        RFC: employeeForm.RFC,
        Name: employeeForm.Name,
        LastName: employeeForm.LastName,
        Email: employeeForm.Email,
        Contact: employeeForm.Contact,
        PhoneNumber: employeeForm.PhoneNumber,
        Status: employeeForm.Status,
        AccountType: employeeForm.AccountType,
        BankId: employeeForm.BankId,
        AccountClabe: employeeForm.AccountClabe,
        CompanyId: employeeForm.CompanyId,
        OperationType: employeeForm.OperationType,
        Currency: employeeForm.Currency,
        Id: employeeForm.Id,
        SK: employeeForm.SK,
      }),
    );
    handleClose();
  };

  useEffect(() => {
    ValidatorForm.addValidationRule("rfcMaxCharacter", (val) => {
      return checkMaxCharacter(val, 14);
    });

    ValidatorForm.addValidationRule("emailMaxCharacter", (val) => {
      return checkMaxCharacter(val, 40);
    });
    ValidatorForm.addValidationRule("phoneNumberMaxCharacter", (val) => {
      return isPhoneNumberValid(val, "PhoneNumber");
    });
    ValidatorForm.addValidationRule("isUniquePhoneNumber", (val) => {
      return checkUniqueValidation(val, "PhoneNumber");
    });
    ValidatorForm.addValidationRule("isUniqueBankId", (val) => {
      return checkUniqueValidation(val, "BankId");
    });
    ValidatorForm.addValidationRule("isUniqueContact", (val) => {
      return checkUniqueValidation(val, "Contact");
    });
    ValidatorForm.addValidationRule("isUniqueEmail", (val) => {
      return checkUniqueValidation(val, "Email");
    });
    ValidatorForm.addValidationRule("isUniqueName", (val) => {
      return checkUniqueValidation(val, "Name");
    });
    ValidatorForm.addValidationRule("isUniqueAccountClabe", (val) => {
      return checkUniqueValidation(val, "AccountClabe");
    });
    ValidatorForm.addValidationRule("isUniqueRfc", (val) => {
      return checkUniqueValidation(val, "RFC");
    });
    ValidatorForm.addValidationRule("isUniqueTypeAccount", (val) => {
      return checkUniqueValidation(val, "AccountType");
    });

    return () => {
      ValidatorForm.removeValidationRule("isUniquePhoneNumber");
      ValidatorForm.removeValidationRule("isUniqueBankId");
      ValidatorForm.removeValidationRule("isUniqueContact");
      ValidatorForm.removeValidationRule("isUniqueEmail");
      ValidatorForm.removeValidationRule("isUniqueName");
      ValidatorForm.removeValidationRule("isUniqueAccountClabe");
      ValidatorForm.removeValidationRule("isUniqueRfc");
      ValidatorForm.removeValidationRule("isUniqueTypeAccount");
    };
  }, [employeeList, employeeForm]);

  useEffect(() => {
    getConfigListData();
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
            <Container className="cl-modelinner" sx={{ ...style }}>
              <Grid item className="closeBtnWrap">
                <Link onClick={handleClose}>
                  <CloseIcon color="gray" className="close_icon" />
                </Link>
              </Grid>
              <Typography gutterBottom variant="h2" align="left">
                {translation.EMPLOYEE_INFORMATION}
              </Typography>
              <ValidatorForm
                className="form"
                autoComplete="off"
                onSubmit={isEdit ? onUpdate : onSubmits}
              >
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
                        {translation.RFC}
                      </Typography>
                      <TextValidator
                        name="RFC"
                        fullWidth
                        size="small"
                        value={employeeForm.RFC}
                        variant="outlined"
                        autoFocus
                        onChange={inputEvent}
                        className="cl-txtfld"
                        placeholder={translation.RFC}
                        validators={[
                          ...formFileldValidation?.formField?.rfc,
                          "rfcMaxCharacter",
                        ]}
                        errorMessages={[
                          ...formFileldValidation?.formErrorMessage?.rfc,
                          translation.MAX_CHARACTER_LENGTH_RFC,
                        ]}
                        inputProps={{ maxLength: "13" }}
                      />
                    </Grid>
                    <Grid item xs={12} className="cl-frmcontainer">
                      <Typography gutterBottom align="left">
                        {translation.NAME}
                      </Typography>
                      <TextValidator
                        style={{ borderColor: "red" }}
                        name="Name"
                        fullWidth
                        size="small"
                        type="name"
                        value={employeeForm.Name}
                        variant="outlined"
                        onChange={inputEvent}
                        className="cl-txtfld"
                        placeholder={translation.ENTER_YOUR_NAME}
                        validators={formFileldValidation?.formField?.name}
                        errorMessages={
                          formFileldValidation?.formErrorMessage?.name
                        }
                        inputProps={{ maxLength: "60" }}
                      />
                    </Grid>
                    <Grid item xs={12} className="cl-frmcontainer">
                      <Grid item xs={6}>
                        <Typography gutterBottom align="left">
                          {translation.CONTACT}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        container
                        className="cl-disbursmentwrap"
                        rowSpacing={1}
                        xs={12}
                      >
                        <Grid item xs={12}>
                          <TextValidator
                            name="Contact"
                            fullWidth
                            size="small"
                            value={employeeForm.Contact}
                            variant="outlined"
                            onChange={inputEvent}
                            className="cl-txtfld"
                            validators={
                              formFileldValidation?.formField?.contact
                            }
                            errorMessages={
                              formFileldValidation?.formErrorMessage?.contact
                            }
                            placeholder={translation.CONTACT}
                            inputProps={{ maxLength: "20" }}
                          />
                        </Grid>
                        <br />
                      </Grid>
                    </Grid>

                    <Grid item xs={12} className="cl-frmcontainer">
                      <Grid item xs={6}>
                        <Typography gutterBottom align="left">
                          {translation.OPERATION_TYPE}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        container
                        className="cl-disbursmentwrap"
                        rowSpacing={1}
                        xs={12}
                      >
                        <Grid item xs={12}>
                          <TextValidator
                            disabled
                            name="OperationType"
                            fullWidth
                            size="small"
                            value={employeeForm.OperationType}
                            variant="outlined"
                            onChange={inputEvent}
                            className="cl-txtfld"
                            validators={["required"]}
                            errorMessages={[
                              translation.PLEASE_FILL_REQUIRED_FIELD,
                            ]}
                            placeholder={translation.OPERATION_TYPE}
                          />
                        </Grid>
                        <br />
                      </Grid>
                    </Grid>
                    <Grid item xs={12} className="cl-frmcontainer">
                      <Typography gutterBottom align="left">
                        {translation.EMAIL}
                      </Typography>
                      <TextValidator
                        id="Email"
                        fullWidth
                        size="small"
                        name="Email"
                        value={employeeForm.Email}
                        variant="outlined"
                        className="cl-txtfld"
                        placeholder={translation.EMAIL}
                        type="text"
                        onChange={inputEvent}
                        validators={[
                          ...formFileldValidation?.formField?.email,
                          "emailMaxCharacter",
                          "isEmail",
                        ]}
                        errorMessages={[
                          ...formFileldValidation?.formErrorMessage?.email,
                          translation.MAX_CHARACTER_LENGTH_EMAIL,
                          translation.EMAIL_NOT_VALID,
                        ]}
                        inputProps={{ maxLength: "39" }}
                      />
                    </Grid>
                    <Grid item xs={12} className="cl-frmcontainer">
                      <Typography gutterBottom align="left">
                        {translation.STATUS}
                      </Typography>
                      <FormControl sx={{ width: "100%" }}>
                        <SelectValidator
                          size="small"
                          fullWidth
                          value={employeeForm.Status}
                          onChange={(e) =>
                            handleSingleDropdownValue(e, "Status")
                          }
                          input={<OutlinedInput />}
                          validators={["required"]}
                          errorMessages={[
                            translation.PLEASE_FILL_REQUIRED_FIELD,
                          ]}
                          className="cl-selectfield"
                        >
                          <MenuItem key={"Activated"} value={true}>
                            {translation.ACTIVATED}
                          </MenuItem>
                          <MenuItem key={"Deactivated"} value={false}>
                            {translation.DEACTIVATED}
                          </MenuItem>
                        </SelectValidator>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid item xs={6} className="cl-frmcolumn">
                    <Grid item xs={12} className="cl-frmcontainer">
                      <Grid item xs={6}>
                        <Typography gutterBottom align="left">
                          {translation.PHONE_NUMBER}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <TextValidator
                          name="PhoneNumber"
                          fullWidth
                          size="small"
                          value={employeeForm.PhoneNumber}
                          variant="outlined"
                          type="phoneNumber"
                          onChange={inputEvent}
                          className="cl-txtfld"
                          validators={[
                            ...formFileldValidation?.formField?.phoneNumber,
                            "phoneNumberMaxCharacter",
                          ]}
                          errorMessages={[
                            ...formFileldValidation?.formErrorMessage
                              ?.phoneNumber,
                            translation.PHONE_NUMBER_NOT_VALID,
                          ]}
                          placeholder={translation.PHONE_NUMBER}
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs={12} className="cl-frmcontainer">
                      <Grid item xs={6}>
                        <Typography gutterBottom align="left">
                          {translation.TYPE_ACCOUNT}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        container
                        className="cl-disbursmentwrap"
                        rowSpacing={1}
                        xs={12}
                      >
                        <Grid item xs={12}>
                          <FormControl sx={{ width: "100%" }}>
                            {/*employeeForm.AccountType.length === 0 && (
                              <InputLabel id="" className="select-lbl">
                                {[translation.PLEASE_SELECT]}
                              </InputLabel>
                            )*/}
                            <SelectValidator
                              name="AccountType"
                              size="small"
                              fullWidth
                              id="demo-multiple-name"
                              value={employeeForm.AccountType}
                              onChange={(e) =>
                                handleDropDownValue(e, "AccountType")
                              }
                              input={<OutlinedInput />}
                              className="cl-selectfield"
                              validators={
                                formFileldValidation?.formField?.typeAccount
                              }
                              errorMessages={
                                formFileldValidation?.formErrorMessage
                                  ?.typeAccount
                              }
                            >
                              {accountType.map((val) => (
                                <MenuItem key={val.id} value={val.id}>
                                  {`${val.id}\u00A0\u00A0\u00A0\u00A0${val.name}`}
                                </MenuItem>
                              ))}
                            </SelectValidator>
                          </FormControl>
                        </Grid>
                        <br />
                      </Grid>
                    </Grid>
                    <Grid item xs={12} className="cl-frmcontainer">
                      <Grid item xs={6}>
                        <Typography gutterBottom align="left">
                          {translation.ACCOUNT_CLABE}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        container
                        className="cl-disbursmentwrap"
                        rowSpacing={1}
                        xs={12}
                      >
                        <Grid item xs={12}>
                          <TextValidator
                            name="AccountClabe"
                            fullWidth
                            size="small"
                            value={employeeForm.AccountClabe}
                            variant="outlined"
                            onChange={inputEvent}
                            className="cl-txtfld"
                            validators={
                              formFileldValidation?.formField?.accountClabe
                            }
                            errorMessages={
                              formFileldValidation?.formErrorMessage
                                ?.accountClabe
                            }
                            placeholder={translation.ACCOUNT_CLABE}
                            inputProps={{ maxLength: "18" }}
                          />
                        </Grid>
                        <br />
                      </Grid>
                    </Grid>
                    <Grid item xs={12} className="cl-frmcontainer">
                      <Grid item xs={6}>
                        <Typography gutterBottom align="left">
                          {translation.BANK_ID}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        container
                        className="cl-disbursmentwrap"
                        rowSpacing={1}
                        xs={12}
                      >
                        <Grid item xs={12}>
                          <FormControl sx={{ width: "100%" }}>
                            <SelectValidator
                              name="BankId"
                              size="small"
                              fullWidth
                              id="demo-multiple-name"
                              value={employeeForm.BankId}
                              onChange={(e) => handleDropDownValue(e, "BankId")}
                              input={<OutlinedInput />}
                              className="cl-selectfield"
                              validators={
                                formFileldValidation?.formField?.bankId
                              }
                              errorMessages={
                                formFileldValidation?.formErrorMessage?.bankId
                              }
                            >
                              {bankId.map((val) => (
                                <MenuItem key={val.id} value={val.id}>
                                  {`${val.id}\u00A0\u00A0\u00A0\u00A0${val.name}`}
                                </MenuItem>
                              ))}
                            </SelectValidator>
                          </FormControl>
                        </Grid>
                        <br />
                      </Grid>
                    </Grid>

                    <Grid item xs={12} className="cl-frmcontainer">
                      <Grid item xs={6}>
                        <Typography gutterBottom align="left">
                          {translation.COMPANY_ID}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        container
                        className="cl-disbursmentwrap"
                        rowSpacing={1}
                        xs={12}
                      >
                        <Grid item xs={12}>
                          <TextValidator
                            disabled
                            name="CompanyId"
                            fullWidth
                            size="small"
                            value={employeeForm.CompanyId}
                            variant="outlined"
                            onChange={inputEvent}
                            className="cl-txtfld"
                            validators={["required"]}
                            errorMessages={[
                              translation.PLEASE_FILL_REQUIRED_FIELD,
                            ]}
                            placeholder={translation.COMPANY_ID}
                          />
                        </Grid>
                        <br />
                      </Grid>
                    </Grid>

                    <Grid item xs={12} className="cl-frmcontainer">
                      <Grid item xs={6}>
                        <Typography gutterBottom align="left">
                          {translation.CURRENCY}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        container
                        className="cl-disbursmentwrap"
                        rowSpacing={1}
                        xs={12}
                      >
                        <Grid item xs={12}>
                          <TextValidator
                            disabled
                            name="Currency"
                            fullWidth
                            size="small"
                            value={employeeForm.Currency}
                            variant="outlined"
                            onChange={inputEvent}
                            className="cl-txtfld"
                            validators={["required"]}
                            errorMessages={[
                              translation.PLEASE_FILL_REQUIRED_FIELD,
                            ]}
                            placeholder={translation.CURRENCY}
                          />
                        </Grid>
                        <br />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} align="center" className="buttonwrapper">
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    className="companyFormSubmit"
                    size="large"
                    onChange={onUpdate}
                  >
                    {translation.UPDATE}
                  </Button>
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
