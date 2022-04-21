// Changing the theme color based on this function
export const setDefaultColorTheme = (theme) => {
  return {
    PrimaryColor: theme.palette.primary.main,
    SecondaryColor: theme.palette.secondary.main,
    ErrorColor: theme.palette.error.main,
    SuccessColor: theme.palette.success.main,
  };
};

// This is a simple empty function which we have imported or used in various places
export const isEmpty = (obj) => {
  return obj === null || obj === undefined || Object.keys(obj).length === 0;
};

//A function to check the validations
export const isFunctionValid = (val, length) => {
  return val && val.length < length;
};

// A function to check the validations
export const isValid = (val, length) => {
  if (isEmpty(val)) {
    return true;
  }
  if (isNaN(val)) {
    return false;
  }
  return val && val.length < length;
};

// A function to check the email validation
export const isEmailValid = (email) => {
  if (isEmpty(email)) {
    return true;
  }
  /* eslint-disable */
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var validEmail = emailRegex.test(email);
  if (email.length > 39 || !validEmail) {
    return false;
  }
  return true;
};

// A function to check the phone number validation
export const isPhoneNumberValid = (phoneNumber) => {
  const phoneNumberRegex =
    /^\+?([0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  if (isEmpty(phoneNumber)) {
    return true;
  } else if (phoneNumber.length !== 16) {
    return false;
  } else if (!phoneNumberRegex.test(phoneNumber)) {
    return false;
  } else {
    return true;
  }
};

// A function to check the Bank Id validation
export const isBankIdValid = (bank_id, bankIdConfig) => {
  if (
    !isEmpty(bank_id) &&
    !isEmpty(bankIdConfig) &&
    !(bankIdConfig.length > 0 && bankIdConfig.indexOf(bank_id) >= 0)
  ) {
    return false;
  }
  return true;
};

// A function to check the Account Type validation
export const isTypeAccountValid = (type_account, typeAccountConfig) => {
  if (
    !isEmpty(type_account) &&
    !isEmpty(typeAccountConfig) &&
    !(
      typeAccountConfig.length > 0 &&
      typeAccountConfig.indexOf(type_account) >= 0
    )
  ) {
    return false;
  }
  return true;
};

export const getDropDownList = (arrayData) => {
  return arrayData.map((val) => {
    const splitter = val.split("#");
    return {
      Id: splitter[0],
      Name: splitter[1],
    };
  });
};

// A function to check the max length validation
export const isValidMaxLength = (headerName, value) => {
  let isValid = true;
  headerName = headerName.toUpperCase().trim();
  if (value.length > headerName.length) {
    isValid = false;
  }
  return isValid;
};

// A function to check the Date validation
export const isValidDate = (date) => {
  var matches = /^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/.exec(date);
  if (matches == null) return false;
  var m = matches[2] - 1;
  var d = matches[1];
  var y = matches[3];
  var composedDate = new Date(y, m, d);
  return (
    composedDate.getDate() == d &&
    composedDate.getMonth() == m &&
    composedDate.getFullYear() == y
  );
};

// A function to check the Date validation
export const isDateValid = (date, length) => {
  if (isEmpty(date)) {
    return false;
  }
  if (date.length > length) {
    return false;
  }
  if (!isValidDate(date)) {
    return false;
  }
  return true;
};

// A function to set the zero padding in various places where we need
export const zeroPad = (num, maxLength) => {
  return num.toString().padStart(maxLength, "0");
};

// A function to add the zeroes in various places where we need
export const addZeroes = (num) => {
  if (!(num.split(".").length === 2)) {
    if (num.length > 12) {
      return parseFloat(num / 100).toFixed(2);
    }
  }
  return Number(num).toFixed(2);
};

// A function to get form field validtaion
export const getFormFileldValidation = (fileValid, t) => {
  const formField = {
    accountClabe: [],
    bankId: [],
    contact: [],
    email: [],
    name: [],
    phoneNumber: [],
    rfc: [],
    typeAccount: [],
  };
  const formErrorMessage = {
    accountClabe: [],
    bankId: [],
    contact: [],
    email: [],
    name: [],
    phoneNumber: [],
    rfc: [],
    typeAccount: [],
  };
  Object.keys(fileValid).map((val) => {
    if (fileValid[val].required) {
      formField[val].push("required");
      formErrorMessage[val].push(t.PLEASE_FILL_REQUIRED_FIELD);
    }
    if (fileValid[val].unique) {
      const name = val[0].toUpperCase() + val.slice(1);
      formField[val].push(`isUnique${name}`);
      formErrorMessage[val].push(t.FIELD_UNIQUE);
    }
  });
  return {
    formField,
    formErrorMessage,
  };
};

// A function to parse CSV validation
export const parseCsvValidation = (csvData) => {
  const messageRowError = csvData.inValidMessages;
  let rows = [];
  let messageError = {};

  messageRowError.map((val) => {
    const splitArr = val.split(",");
    messageError[parseInt(splitArr[0]) - 2] =
      (messageError[parseInt(splitArr[0]) - 2] ?? "") +
      splitArr[1] +
      "@@@@@@@@";
    rows.push(parseInt(splitArr[0] - 2));
    return val;
  });
  return csvData.data.filter((val, key) => {
    if (rows.indexOf(key) !== -1) {
      val.errorMessage = messageError[key];
    }
    return rows.indexOf(key) !== -1;
  });
};

// A function to convert the objects into array
export const convertObjectToArray = (obj) => {
  let bankAccountConfig = JSON.parse(obj);
  let sortedId = Object.keys(JSON.parse(obj));
  sortedId.sort();
  return sortedId.map((obj) => {
    return {
      id: obj,
      name: bankAccountConfig[obj].ShortName || bankAccountConfig[obj],
    };
  });
};

// A function to validate Import Amount
export const isValidImportAmount = (value) => {
  if (isEmpty(value)) {
    return true;
  }
  if (isNaN(value)) {
    return false;
  }
  if (value.split(".").length === 2) {
    if (value.length > 14) {
      return false;
    }
  } else {
    if (value.length > 12) {
      return false;
    }
  }
  return true;
};
