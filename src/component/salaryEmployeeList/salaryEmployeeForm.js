import React from "react";
import useTranslation from "../../resources/index";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { zeroPad, addZeroes } from "../../common/Utility/utility";
import {
  salaryEmployee,
  salaryEmployeeEdit,
} from "../../actions/salaryEmployee";
import "./employeeform.scss";
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

// Form to update the PP users.
export default function SalaryEmployeeForm({
  open,
  handleClose,
  defaultValue,
  salaryEmployeeForm,
  setSalaryEmployeeForm,
  isEdit,
  setIsEdit,
}) {
  const dispatch = useDispatch();
  const translation = useTranslation();

  const inputEvent = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const re = /^[0-9\b]+$/;
    if (name === "DestinationAccount") {
      if (
        value === "" ||
        (re.test(value) && value >= 0 && value < 99999999999999999999)
      )
        setSalaryEmployeeForm({ ...salaryEmployeeForm, [name]: value });
    } else if (name === "IVA" || name === "ReferenceDate") {
      if (
        value === "" ||
        (re.test(value) && value >= 0 && value < 99999999999999)
      )
        setSalaryEmployeeForm({ ...salaryEmployeeForm, [name]: value });
    } else if (name === "ApplicationDate") {
      const dateValue = getFormatDate(value);
      setSalaryEmployeeForm({ ...salaryEmployeeForm, [name]: dateValue });
    } else {
      setSalaryEmployeeForm({ ...salaryEmployeeForm, [name]: value });
    }
  };

  const handleSingleDropdownValue = (e, name) => {
    const value = e.target.value;
    setSalaryEmployeeForm({ ...salaryEmployeeForm, [name]: value });
  };

  const resetInputField = () => {
    setSalaryEmployeeForm(defaultValue);
    handleClose();
    setIsEdit(false);
  };

  const onSubmits = (event) => {
    event.preventDefault();
    dispatch(
      salaryEmployee({
        ...salaryEmployeeForm,
        ImportAmount: addZeroes(salaryEmployeeForm.ImportAmount),
        IVA: zeroPad(salaryEmployeeForm.IVA, 14),
        ReferenceDate: zeroPad(salaryEmployeeForm.ReferenceDate, 10),
        DestinationAccount: zeroPad(salaryEmployeeForm.DestinationAccount, 20),
      }),
    );
    handleClose();
  };

  const onUpdate = (event) => {
    event.preventDefault();
    dispatch(
      salaryEmployeeEdit({
        ...salaryEmployeeForm,
        ImportAmount: addZeroes(salaryEmployeeForm.ImportAmount),
        IVA: zeroPad(salaryEmployeeForm.IVA, 14),
        ReferenceDate: zeroPad(salaryEmployeeForm.ReferenceDate, 10),
        DestinationAccount: zeroPad(salaryEmployeeForm.DestinationAccount, 20),
      }),
    );
    handleClose();
  };
  const getFormatDate = (dateVal) => {
    return dateVal.split("-").reverse().join("-");
  };

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
                {translation.SALARY_EMPLOYEE_INFORMATION}
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
                        {translation.OPERATION}
                      </Typography>
                      <TextValidator
                        autoFocus
                        name="Operation"
                        fullWidth
                        disabled
                        size="small"
                        value="SPEI"
                        variant="outlined"
                        className="cl-txtfld"
                        placeholder={translation.OPERATION}
                        validators={["required"]}
                        errorMessages={[translation.PLEASE_FILL_REQUIRED_FIELD]}
                      />
                    </Grid>
                    <Grid item xs={12} className="cl-frmcontainer">
                      <Typography gutterBottom align="left">
                        {translation.USER_NAME}
                      </Typography>
                      <TextValidator
                        name="UserName"
                        fullWidth
                        size="small"
                        value={salaryEmployeeForm.UserName}
                        variant="outlined"
                        onChange={inputEvent}
                        className="cl-txtfld"
                        placeholder={translation.USER_NAME}
                        validators={["required"]}
                        errorMessages={[translation.PLEASE_FILL_REQUIRED_FIELD]}
                        inputProps={{ maxLength: "13" }}
                      />
                    </Grid>
                    <Grid item xs={12} className="cl-frmcontainer">
                      <Grid item xs={6}>
                        <Typography gutterBottom align="left">
                          {translation.DESTINATION_ACCOUNT}
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
                            type="text"
                            name="DestinationAccount"
                            fullWidth
                            size="small"
                            value={salaryEmployeeForm.DestinationAccount}
                            variant="outlined"
                            onChange={inputEvent}
                            className="cl-txtfld"
                            validators={["required"]}
                            errorMessages={[
                              translation.PLEASE_FILL_REQUIRED_FIELD,
                            ]}
                            placeholder={translation.DESTINATION_ACCOUNT}
                            inputProps={{ maxLength: "20" }}
                          />
                        </Grid>
                        <br />
                      </Grid>
                    </Grid>
                    <Grid item xs={12} className="cl-frmcontainer">
                      <Grid item xs={6}>
                        <Typography gutterBottom align="left">
                          {translation.IVA}
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
                            type="text"
                            name="IVA"
                            fullWidth
                            size="small"
                            value={salaryEmployeeForm.IVA}
                            variant="outlined"
                            onChange={inputEvent}
                            className="cl-txtfld"
                            validators={["required"]}
                            errorMessages={[
                              translation.PLEASE_FILL_REQUIRED_FIELD,
                            ]}
                            placeholder={translation.IVA}
                            inputProps={{ maxLength: "14" }}
                          />
                        </Grid>
                        <br />
                      </Grid>
                    </Grid>
                    <Grid item xs={12} className="cl-frmcontainer">
                      <Typography gutterBottom align="left">
                        {translation.ORIGIN_ACCOUNT}
                      </Typography>
                      <TextValidator
                        type="text"
                        disabled
                        id="OriginAccount"
                        fullWidth
                        size="small"
                        name="OriginAccount"
                        value={salaryEmployeeForm.OriginAccount}
                        variant="outlined"
                        className="cl-txtfld"
                        validators={["required"]}
                        placeholder={translation.ORIGIN_ACCOUNT}
                      />
                    </Grid>

                    <Grid item xs={12} className="cl-frmcontainer">
                      <Grid item xs={6}>
                        <Typography gutterBottom align="left">
                          {translation.REFERENCE}
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
                            type="text"
                            name="ReferenceDate"
                            id="ReferenceDate"
                            fullWidth
                            size="small"
                            value={salaryEmployeeForm.ReferenceDate}
                            variant="outlined"
                            onChange={inputEvent}
                            className="cl-txtfld"
                            // validators={["required"]}
                            errorMessages={[
                              translation.PLEASE_FILL_REQUIRED_FIELD,
                            ]}
                            placeholder={translation.REFERENCE}
                            inputProps={{ maxLength: "10" }}
                          />
                        </Grid>
                        <br />
                      </Grid>
                    </Grid>
                    <Grid item xs={12} className="cl-frmcontainer">
                      <Typography gutterBottom align="left">
                        {translation.STATUS}
                      </Typography>
                      <FormControl sx={{ width: "100%" }}>
                        <SelectValidator
                          size="small"
                          fullWidth
                          value={salaryEmployeeForm.Status}
                          onChange={(e) =>
                            handleSingleDropdownValue(e, "Status")
                          }
                          input={<OutlinedInput />}
                          validators={["required"]}
                          errorMessages={[translation.PLEASE_SELECT]}
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
                          {translation.IMPORT_AMOUNT}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <TextValidator
                          type="text"
                          name="ImportAmount"
                          fullWidth
                          size="small"
                          value={salaryEmployeeForm.ImportAmount}
                          variant="outlined"
                          onChange={inputEvent}
                          className="cl-txtfld"
                          validators={["required"]}
                          errorMessages={[
                            translation.PLEASE_FILL_REQUIRED_FIELD,
                          ]}
                          placeholder={translation.IMPORT_AMOUNT}
                          inputProps={{ maxLength: "14" }}
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs={12} className="cl-frmcontainer">
                      <Grid item xs={6}>
                        <Typography gutterBottom align="left">
                          {translation.DESCRIPTION}
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
                            name="Description"
                            size="small"
                            fullWidth
                            id="demo-multiple-name"
                            value={salaryEmployeeForm.Description}
                            onChange={inputEvent}
                            input={<OutlinedInput />}
                            className="cl-selectfield"
                            validators={["required"]}
                            errorMessages={[
                              translation.PLEASE_FILL_REQUIRED_FIELD,
                            ]}
                            placeholder={translation.DESCRIPTION}
                            inputProps={{ maxLength: "30" }}
                          />
                        </Grid>
                        <br />
                      </Grid>
                    </Grid>
                    <Grid item xs={12} className="cl-frmcontainer">
                      <Grid item xs={6}>
                        <Typography gutterBottom align="left">
                          {translation.DESTINATION_CURRENCY}
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
                            name="DestinationCurrency"
                            fullWidth
                            size="small"
                            disabled
                            value="PESOS"
                            variant="outlined"
                            onChange={inputEvent}
                            className="cl-txtfld"
                            validators={["required"]}
                            errorMessages={[
                              translation.PLEASE_FILL_REQUIRED_FIELD,
                            ]}
                            placeholder={translation.DESTINATION_CURRENCY}
                          />
                        </Grid>
                        <br />
                      </Grid>
                    </Grid>
                    <Grid item xs={12} className="cl-frmcontainer">
                      <Grid item xs={6}>
                        <Typography gutterBottom align="left">
                          {translation.ORIGIN_CURRENCY}
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
                            <TextValidator
                              name="OriginCurrency"
                              size="small"
                              fullWidth
                              disabled
                              id="demo-multiple-name"
                              value="PESOS"
                              onChange={inputEvent}
                              input={<OutlinedInput />}
                              className="cl-selectfield"
                              validators={["required"]}
                              errorMessages={[
                                translation.PLEASE_FILL_REQUIRED_FIELD,
                              ]}
                              placeholder={translation.ORIGIN_CURRENCY}
                            />
                          </FormControl>
                        </Grid>
                        <br />
                      </Grid>
                    </Grid>
                    <Grid item xs={12} className="cl-frmcontainer">
                      <Grid item xs={6}>
                        <Typography gutterBottom align="left">
                          {translation.PAYMENT_INSTRUCTIONS}
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
                            name="PaymentInstructions"
                            fullWidth
                            size="small"
                            value={salaryEmployeeForm.PaymentInstructions}
                            variant="outlined"
                            onChange={inputEvent}
                            className="cl-txtfld"
                            validators={["required"]}
                            errorMessages={[
                              translation.PLEASE_FILL_REQUIRED_FIELD,
                            ]}
                            placeholder={translation.PAYMENT_INSTRUCTIONS}
                            inputProps={{ maxLength: "70" }}
                          />
                        </Grid>
                        <br />
                      </Grid>
                    </Grid>

                    <Grid item xs={12} className="cl-frmcontainer">
                      <Grid item xs={6}>
                        <Typography gutterBottom align="left">
                          {translation.APPLICATION_DATE}
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
                            type="date"
                            name="ApplicationDate"
                            fullWidth
                            size="small"
                            value={getFormatDate(
                              salaryEmployeeForm.ApplicationDate,
                            )}
                            variant="outlined"
                            onChange={inputEvent}
                            className="cl-txtfld"
                            validators={["required"]}
                            errorMessages={[
                              translation.PLEASE_FILL_REQUIRED_FIELD,
                            ]}
                            placeholder={translation.APPLICATION_DATE}
                          />
                        </Grid>
                        <br />
                      </Grid>
                    </Grid>

                    <Grid item xs={12} className="cl-frmcontainer">
                      <Grid item xs={6}>
                        <Typography gutterBottom align="left">
                          {translation.BENEFICIARY_EMAIL}
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
                            name="Email"
                            fullWidth
                            size="small"
                            value={salaryEmployeeForm.Email}
                            variant="outlined"
                            onChange={inputEvent}
                            className="cl-txtfld"
                            validators={["required"]}
                            errorMessages={[
                              translation.PLEASE_FILL_REQUIRED_FIELD,
                            ]}
                            placeholder={translation.BENEFICIARY_EMAIL}
                            inputProps={{ maxLength: "39" }}
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
