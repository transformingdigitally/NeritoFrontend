import actions from "../constants/action";
import { monthDiff } from "../utils";
const INITIAL_STATE = {
  loader: false,
  salaryEmployeeList: [],
  message: "",
  csvList: [],
  error: true,
  freezeMonth: "",
  freezeYear: "",
  freezeLoader: false,
  unfreezeLoader: false,
  freezeDoneSalary: false,
  config: {},
  sk: "",
  fileValidation: {},
  orgName: "",
};

const salaryEmployeeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.SAVE_CSV_LIST:
      return {
        ...state,
        csvList: action.payload,
      };
    case actions.GET_SALARY_EMPLOYEE_LIST:
      return {
        ...state,
        loader: true,
        message: "",
        error: false,
      };
    case actions.DELETE_SALARY_EMPLOYEE:
      return {
        ...state,
        message: "SALARY_EMPLOYEE_DELETED_SUCCESSFULLY",
        error: true,
      };
    case actions.RESET_SNACKBAR_VALUES:
      return {
        ...state,
        message: "",
        error: false,
      };
    case actions.SALARY_EMPLOYEE_LIST_SUCCESS:
      return {
        ...state,
        loader: false,
        salaryEmployeeList: action.payload,
        message: "",
        error: true,
      };
    case actions.SALARY_EMPLOYEE_LIST_FAILURE:
      return {
        ...state,
        loader: false,
        salaryEmployeeList: [],
        message: "API_ERROR_MESSAGE",
        error: false,
      };
    case actions.REFRESHED_SALARY_EMPLOYEE_LIST:
      return {
        ...state,
        loader: false,
        salaryEmployeeList: action.payload,
        message: "",
        error: true,
      };

    case actions.DELETE_SALARY_EMPLOYEE_SUCCESS:
      const salaryEmployees = state.salaryEmployeeList;
      const updatedList = salaryEmployees.filter(
        (x) => !(x.Id === action.payload.Id && x.SK === action.payload.SK),
      );
      return {
        ...state,
        salaryEmployeeList: JSON.parse(JSON.stringify(updatedList)),
        message: "",
        error: true,
      };
    case actions.SALARY_EMPLOYEE_STATUS_SUCCESS:
      const salaryEmployeeData = state.salaryEmployeeList;
      var foundIndex = salaryEmployeeData.findIndex(
        (x) => x.Id === action.payload.uuid,
      );
      salaryEmployeeData[foundIndex].Status = action.payload.Status;
      return {
        ...state,
        salaryEmployeeList: JSON.parse(JSON.stringify(salaryEmployeeData)),
      };
    case actions.CREATE_SALARY_EMPLOYEE_SUCCESS:
      const updatedOrNewList = {
        ...action.payload,
      };
      const salaryEmployeeList = state.salaryEmployeeList;
      var foundIndexCreate = salaryEmployeeList.findIndex(
        (x) => x.Id === action.payload.Id && x.SK === action.payload.SK,
      );
      if (foundIndexCreate !== -1) {
        salaryEmployeeList[foundIndexCreate] = updatedOrNewList;
        return {
          ...state,
          salaryEmployeeList: JSON.parse(JSON.stringify(salaryEmployeeList)),
          message: "SALARY_EMPLOYEE_UPDATED_SUCCESSFULLY",
          error: true,
        };
      } else
        return {
          ...state,
          message: "SALARY_EMPLOYEE_CREATED_SUCCESSFULLY",
          error: true,
          companyList: [
            ...state.salaryEmployeeList,
            {
              ...updatedOrNewList,
            },
          ],
        };

    case actions.FREEZE_SALARY_EMPLOYEE_LIST:
      return {
        ...state,
        freezeLoader: true,
      };
    case actions.UNFREEZE_SALARY_EMPLOYEE_LIST:
      return {
        ...state,
        unfreezeLoader: true,
      };
    case actions.UPDATE_FREEZE_SALARY_EMPLOYEE_LIST:
      return {
        ...state,
        freezeLoader: false,
        freezeMonth: new Date().getMonth() + 1,
        freezeYear: new Date().getFullYear(),
        message: "SALARY_EMPLOYEE_LIST_FREEZE",
        freezeDoneSalary: true,
        error: true,
      };
    case actions.UPDATE_UNFREEZE_SALARY_EMPLOYEE_LIST:
      return {
        ...state,
        unfreezeLoader: false,
        freezeMonth: new Date().getMonth(),
        freezeYear: new Date().getFullYear(),
        message: "SALARY_EMPLOYEE_LIST_UNFREEZE",
        freezeDoneSalary: false,
        error: true,
      };
    case actions.FAILED_FREEZE_SALARY_EMPLOYEE_LIST:
      return {
        ...state,
        message: "API_ERROR_MESSAGE",
        freezeLoader: false,
        error: false,
      };
    case actions.FAILED_UNFREEZE_SALARY_EMPLOYEE_LIST:
      return {
        ...state,
        message: "API_ERROR_MESSAGE",
        unfreezeLoader: false,
        error: false,
      };
    case actions.SUCCESS_COMPANY_DATA:
      if (action.payload.length === 0) {
        return {
          ...state,
          freezeLoader: false,
        };
      } else {
        const salaryData = action.payload[0];
        return {
          ...state,
          freezeLoader: false,
          freezeMonth: salaryData.SalaryFreezeMonth,
          freezeYear: salaryData.SalaryFreezeYear,
          config: JSON.parse(salaryData.Config),
          fileValidation: JSON.parse(salaryData.FileValidation),
          sk: salaryData.SK,
          orgName: salaryData.OrgName,
          freezeDoneSalary:
            salaryData.SalaryFreezeYear !== "" &&
            salaryData.SalaryFreezeYear !== null &&
            salaryData.SalaryFreezeMonth !== "" &&
            salaryData.SalaryFreezeMonth !== null &&
            monthDiff(
              new Date(salaryData.SalaryFreezeYear, salaryData.SalaryFreezeMonth - 1),
              new Date(new Date().getFullYear(), new Date().getMonth()),
            ) <= 0,
        };
      }

    case actions.FAILURE_COMPANY_DATA:
      return {
        ...state,
        message: "API_ERROR_MESSAGE",
        error: false,
      };
    case actions.RESET_CSV_LIST:
      return {
        ...state,
        csvList: [],
      };
    case actions.GET_USER_ORGANIZATION:
      return {
        ...state,
        loader: true,
        message: "",
        error: false,
      };
    case actions.NO_COMPANY_ASSIGNED:
      return {
        ...state,
        loader: false,
        message: "ERROR_NO_COMPANY_ASSIGNED",
        error: false,
      };
    case actions.LOGOUT_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default salaryEmployeeReducer;
