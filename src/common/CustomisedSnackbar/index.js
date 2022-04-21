import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import useTranslation from "../../resources";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackBar({
  severity,
  open,
  snackbarMessage,
  handleSnackbarClose,
}) {
  const translation = useTranslation();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    handleSnackbarClose();
  };

  const messages = {
    API_ERROR_MESSAGE: translation.API_ERROR_MESSAGE,
    COMPANY_CREATED_SUCCESSFULLY: translation.COMPANY_CREATED_SUCCESSFULLY,
    COMPANY_UPDATED_SUCCESSFULLY: translation.COMPANY_UPDATED_SUCCESSFULLY,
    COMPANY_DELETED_SUCCESSFULLY: translation.COMPANY_DELETED_SUCCESSFULLY,
    EMPLOYEE_CREATED_SUCCESSFULLY: translation.EMPLOYEE_CREATED_SUCCESSFULLY,
    EMPLOYEE_UPDATED_SUCCESSFULLY: translation.EMPLOYEE_UPDATED_SUCCESSFULLY,
    EMPLOYEE_DELETED_SUCCESSFULLY: translation.EMPLOYEE_DELETED_SUCCESSFULLY,
    EMPLOYEE_LIST_FREEZE: translation.EMPLOYEE_LIST_FREEZE,
    EMPLOYEE_LIST_UNFREEZE: translation.EMPLOYEE_LIST_UNFREEZE,
    EMPLOYEE_LIST_FREEZE_ERROR: translation.EMPLOYEE_LIST_FREEZE_ERROR,
    SALARY_EMPLOYEE_CREATED_SUCCESSFULLY:
      translation.SALARY_EMPLOYEE_CREATED_SUCCESSFULLY,
    SALARY_EMPLOYEE_UPDATED_SUCCESSFULLY:
      translation.SALARY_EMPLOYEE_UPDATED_SUCCESSFULLY,
    SALARY_EMPLOYEE_DELETED_SUCCESSFULLY:
      translation.SALARY_EMPLOYEE_DELETED_SUCCESSFULLY,
    SALARY_EMPLOYEE_LIST_FREEZE: translation.SALARY_EMPLOYEE_LIST_FREEZE,
    SALARY_EMPLOYEE_LIST_UNFREEZE: translation.SALARY_EMPLOYEE_LIST_UNFREEZE,
    SALARY_EMPLOYEE_LIST_FREEZE_ERROR:
      translation.SALARY_EMPLOYEE_LIST_FREEZE_ERROR,
    ERROR_NO_COMPANY_ASSIGNED: translation.ERROR_NO_COMPANY_ASSIGNED,
  };

  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {messages[snackbarMessage] !== undefined
          ? messages[snackbarMessage]
          : snackbarMessage}
      </Alert>
    </Snackbar>
  );
}
