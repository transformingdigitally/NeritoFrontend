import actions from "../constants/action";
import { ES } from './../resources/es';

const INITIAL_STATE = {
  loader: false,
  companyList: [],
  message: "",
  error: true,
};

const companyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.GET_COMPANY_LIST:
      return {
        ...state,
        loader: true,
        message: "",
        error: false,
      };
    case actions.CREATE_COMPANY:
      return {
        ...state,
        message: "",
        error: false,
      };
    case actions.CREATE_COMPANY_FAILURE: 
      return {
        ...state,
        message: "API_ERROR_MESSAGE",
        error: false,
      }
    case actions.CREATE_COMPANY_VALIDATION_FAILURE:
      let fieldName = "";
      (action.payload).map(val => {
        fieldName = fieldName + ES[val];
        return val;
      })
      return {
        ...state,
        message: `${fieldName} los campos no tienen valor o valor inválido`,
        error: false,
      }
    case actions.DELETE_COMPANY:
      return {
        ...state,
        message: "COMPANY_DELETED_SUCCESSFULLY",
        error: true,
      };
    case actions.RESET_SNACKBAR_VALUES:
      return {
        ...state,
        message: "",
        error: false,
      };
    case actions.COMPANY_LIST_SUCCESS:
      return {
        ...state,
        loader: false,
        companyList: action.payload,
        message: "",
        error: true,
      };
    case actions.DELETE_COMPANY_SUCCESS:
      const companies = state.companyList;
      const updatedList = companies.filter((x) => !(x.Id === action.payload.Id && x.SK === action.payload.SK));
      return {
        ...state,
        companyList: JSON.parse(JSON.stringify(updatedList)),
        message: "",
        error: true,
      };
    case actions.COMPANY_LIST_FAILURE:
      return {
        ...state,
        loader: false,
        companyList: [],
        message: "API_ERROR_MESSAGE",
        error: false,
      };
    case actions.COMPANY_STATUS_SUCCESS:
      const companyData = state.companyList;
      var foundIndex = companyData.findIndex(x => x.Id === action.payload.uuid);
      companyData[foundIndex].Status = action.payload.Status;
      return {
        ...state,
        companyList: JSON.parse(JSON.stringify(companyData)),
      };
    case actions.CREATE_COMPANY_SUCCESS:
      const updatedOrNewList = {
        ...action.payload
      };
      const companyList = state.companyList;
      var foundIndexCreate = companyList.findIndex(x => x.Id === action.payload.Id && x.SK === action.payload.SK);
      if (foundIndexCreate !== -1) {
        companyList[foundIndexCreate] = updatedOrNewList;
        return {
          ...state,
          companyList: JSON.parse(JSON.stringify(companyList)),
          message: "COMPANY_UPDATED_SUCCESSFULLY",
          error: true,
        }

      } else

        return {
          ...state,
          message: "COMPANY_CREATED_SUCCESSFULLY",
          error: true,
          companyList: [
            ...state.companyList,
            {
              ...updatedOrNewList,
            },
          ]
        }
    case actions.LOGOUT_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default companyReducer;
