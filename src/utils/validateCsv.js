import {
  CSV_PAYROLL_EMPLOYEE_HEADER,
  MINMUM_ROW_VALIDATION,
} from "../constants/constant";

export const validateCsvHeader = (csvHeader) => {
  const header = CSV_PAYROLL_EMPLOYEE_HEADER;
  let filteredArray = [];
  if (csvHeader.length === header.length) {
    filteredArray = csvHeader.filter(function (n) {
      return header.indexOf(n) === -1;
    });
    return filteredArray.length === 0;
  }
  return false;
};

export const minmumRowValidation = (fileData) => {
  return fileData.length >= MINMUM_ROW_VALIDATION;
};

export const validateColumnEmpty = (fileData) => {
  const flag = fileData.some((val, key) => {
    return Object.values(val).some((x) => x === null || x.trim() === "");
  });
  return !flag;
};

export const validateColumnEmailPhoneNumber = (fileData) => {
  const flag = fileData.some((val, key) => {
    let reg = new RegExp("^[0-9]+$");
    return validateEmail(val.email) && reg.test(val.phoneNumber);
  });
  return flag;
};

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(email);
}
