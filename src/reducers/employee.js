import actions from "../constants/action";
import { monthDiff } from "../utils";
const INITIAL_STATE = {
  loader: false,
  employeeList: [],
  message: "",
  csvList: [],
  error: true,
  freezeMonth: "",
  freezeYear: "",
  freezeLoader: false,
  unfreezeLoader: false,
  freezeDone: false,
  config: {},
  sk: "",
  fileValidation: {},
  orgName: "",
};

const employeeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.SAVE_CSV_LIST:
      return {
        ...state,
        csvList: action.payload,
      };
    case actions.GET_EMPLOYEE_LIST:
      return {
        ...state,
        loader: true,
        message: "",
        error: false,
      };
    case actions.DELETE_EMPLOYEE:
      return {
        ...state,
        message: "EMPLOYEE_DELETED_SUCCESSFULLY",
        error: true,
      };
    case actions.RESET_SNACKBAR_VALUES:
      return {
        ...state,
        message: "",
        error: false,
      };
    case actions.EMPLOYEE_LIST_SUCCESS:
      return {
        ...state,
        loader: false,
        employeeList: action.payload,
        message: "",
        error: true,
      };
    case actions.EMPLOYEE_LIST_FAILURE:
      return {
        ...state,
        loader: false,
        employeeList: [],
        message: "API_ERROR_MESSAGE",
        error: false,
      };
    case actions.REFRESHED_EMPLOYEE_LIST:
      return {
        ...state,
        loader: false,
        employeeList: action.payload,
        message: "",
        error: true,
      };

    case actions.DELETE_EMPLOYEE_SUCCESS:
      const employees = state.employeeList;
      const updatedList = employees.filter(
        (x) => !(x.Id === action.payload.Id && x.SK === action.payload.SK),
      );
      return {
        ...state,
        employeeList: JSON.parse(JSON.stringify(updatedList)),
        message: "",
        error: true,
      };
    case actions.EMPLOYEE_STATUS_SUCCESS:
      const employeeData = state.employeeList;
      var foundIndex = employeeData.findIndex(
        (x) => x.Id === action.payload.uuid,
      );
      employeeData[foundIndex].Status = action.payload.Status;
      return {
        ...state,
        employeeList: JSON.parse(JSON.stringify(employeeData)),
      };
    case actions.CREATE_EMPLOYEE_SUCCESS:
      const updatedOrNewList = {
        ...action.payload,
      };
      const employeeList = state.employeeList;
      var foundIndexCreate = employeeList.findIndex(
        (x) => x.Id === action.payload.Id && x.SK === action.payload.SK,
      );
      if (foundIndexCreate !== -1) {
        employeeList[foundIndexCreate] = updatedOrNewList;
        return {
          ...state,
          employeeList: JSON.parse(JSON.stringify(employeeList)),
          message: "EMPLOYEE_UPDATED_SUCCESSFULLY",
          error: true,
        };
      } else
        return {
          ...state,
          message: "EMPLOYEE_CREATED_SUCCESSFULLY",
          error: true,
          companyList: [
            ...state.employeeList,
            {
              ...updatedOrNewList,
            },
          ],
        };

    case actions.FREEZE_EMPLOYEE_LIST:
      return {
        ...state,
        freezeLoader: true,
      };

    case actions.UNFREEZE_EMPLOYEE_LIST:
      return {
        ...state,
        unfreezeLoader: true,
      };

    

    case actions.UPDATE_FREEZE_EMPLOYEE_LIST:
      return {
        ...state,
        freezeLoader: false,
        freezeMonth: new Date().getMonth() + 1,
        freezeYear: new Date().getFullYear(),
        message: "EMPLOYEE_LIST_FREEZE",
        freezeDone: true,
        error: true,
      };

    case actions.UPDATE_UNFREEZE_EMPLOYEE_LIST:
      return {
        ...state,
        unfreezeLoader: false,
        freezeMonth: new Date().getMonth(),
        freezeYear: new Date().getFullYear(),
        message: "EMPLOYEE_LIST_UNFREEZE",
        freezeDone: false,
        error: true,
      };

    
    case actions.FAILED_FREEZE_EMPLOYEE_LIST:
      return {
        ...state,
        message: "API_ERROR_MESSAGE",
        freezeLoader: false,
        error: false,
      };
    case actions.FAILED_UNFREEZE_EMPLOYEE_LIST:
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
        const companyData = action.payload[0];
        return {
          ...state,
          freezeLoader: false,
          freezeMonth: companyData.FreezeMonth,
          freezeYear: companyData.FreezeYear,
          config: JSON.parse(companyData.Config),
          fileValidation: JSON.parse(companyData.FileValidation),
          sk: companyData.SK,
          orgName: companyData.OrgName,
          freezeDone:
            companyData.FreezeYear !== "" &&
            companyData.FreezeYear !== null &&
            companyData.FreezeMonth !== "" &&
            companyData.FreezeMonth !== null &&
            monthDiff(
              new Date(companyData.FreezeYear, companyData.FreezeMonth - 1),
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

export default employeeReducer;
