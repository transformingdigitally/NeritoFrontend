// Definig all the constants here
export const DATES = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
];

export const MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export const YEARS = [2021, 2022];

export const CSV_PAYROLL_EMPLOYEE_HEADER = [
  "phoneNumber",
  "name",
  "email",
  "contact",
  "rfc",
  "typeAccount",
  "accountClabe",
  "bankId",
];

export const MINMUM_ROW_VALIDATION = 1;

export const FREEZE_STATE = {
  PENDING: 0,
  SUCCESS: 1,
  FAILURE: 2,
};

export const FIELD_VALIDATION = {
  phoneNumber: {
    unique: true,
    required: true,
  },
  name: {
    unique: true,
    required: true,
  },
  email: {
    unique: true,
    required: true,
  },
  contact: {
    unique: true,
    required: true,
  },
  rfc: {
    unique: true,
    required: true,
  },
  typeAccount: {
    unique: true,
    required: true,
  },
  bankId: {
    unique: true,
    required: true,
  },
  accountClabe: {
    unique: true,
    required: true,
  },
};
