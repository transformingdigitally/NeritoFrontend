import actions from "../constants/action";
import { convertObjectToArray } from "../common/Utility/utility";

const INITIAL_STATE = {
  loader: false,
  errorMessage: "",
  bankId: [],
  accountType: [],
  payrollUser: [],
  accountUser: [],
  bankIdDetail: [],
  accountTypeDetail: [],
};

const settingsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.SUCCESS_CONFIG_DATA:
      let accountType, bankId;

      if (action.payload.length > 0) {
        bankId = action.payload.find((val) => val.Type === "BANK_ID");
        accountType = action.payload.find((val) => val.Type === "ACCOUNT_TYPE");
      }

      if (bankId.Config && accountType.Config) {
        return {
          ...state,
          bankId: Object.keys(JSON.parse(bankId.Config)),
          accountType: Object.keys(JSON.parse(accountType.Config)),
          bankIdDetail: convertObjectToArray(bankId.Config),
          accountTypeDetail: convertObjectToArray(accountType.Config),
        };
      } else {
        return {
          ...state,
        };
      }

    case actions.SUCCESS_USER_CONFIG_DATA:
      let payrollUser, accountUser;
      if (action.payload.length > 0) {
        payrollUser = action.payload.filter(
          (val) => val.Group === "PAYROLL_USER" && val.OrganizationId === "",
        );

        accountUser = action.payload.filter(
          (val) => val.Group === "ACCOUNT_USER" && val.OrganizationId === "",
        );
      }

      return {
        ...state,
        payrollUser: payrollUser,
        accountUser: accountUser,
      };

    case actions.FAILURE_CONFIG_DATA:
      return {
        ...state,
        // loader: false,
        // errorMessage: action.payload.message,
      };
    default:
      return state;
  }
};
export default settingsReducer;
