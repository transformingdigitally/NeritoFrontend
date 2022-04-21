import actions from "../constants/action";
import { API } from "aws-amplify";
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";

export const refreshSalaryEmployeeList = (payload) => ({
  type: actions.REFRESHED_SALARY_EMPLOYEE_LIST,
  payload: payload,
});

export const getSalaryEmployeeList = (payload) => {
  return (dispatch) => {
    dispatch({ type: actions.GET_SALARY_EMPLOYEE_LIST });
    API.graphql({
      query: queries.getListPayrollsByOrganization,
      variables: {
        SK: `${payload.orgId}#${payload.month + 1}-${payload.year}`,
        limit: 3000,
      },
    })
      .then((result) => {
        return result.data.listPayrollsByOrganization.items;
      })
      .then((data) => {
        dispatch({ type: actions.SALARY_EMPLOYEE_LIST_SUCCESS, payload: data });
      })
      .catch((err) => {
        dispatch({ type: actions.SALARY_EMPLOYEE_LIST_FAILURE, payload: err });
      });
  };
};

export const salaryEmployee = (payload) => {
  return (dispatch) => {
    dispatch({ type: actions.CREATE_SALARY_EMPLOYEE });
    API.graphql({
      query: mutations.createOrganizations,
      variables: { input: { ...payload } },
    })
      .then((data) => {
        return data;
      })
      .then((data) => {
        dispatch({
          type: actions.CREATE_SALARY_EMPLOYEE_SUCCESS,
          payload: payload,
        });
      })
      .catch((err) => {
        dispatch({
          type: actions.CREATE_SALARY_EMPLOYEE_FAILURE,
          payload: err,
        });
      });
  };
};

export const salaryEmployeeEdit = (payload) => {
  return (dispatch) => {
    dispatch({ type: actions.CREATE_SALARY_EMPLOYEE });
    API.graphql({
      query: mutations.updateSalaryEmployee,
      variables: { input: { ...payload } },
    })
      .then((data) => {
        return data;
      })
      .then((data) => {
        dispatch({
          type: actions.CREATE_SALARY_EMPLOYEE_SUCCESS,
          payload: payload,
        });
      })
      .catch((err) => {
        dispatch({
          type: actions.CREATE_SALARY_EMPLOYEE_FAILURE,
          payload: err,
        });
      });
  };
};

export const deleteSalaryEmployee = (payload) => {
  return (dispatch) => {
    dispatch({ type: actions.DELETE_SALARY_EMPLOYEE });
    API.graphql({
      query: mutations.deletePayrolls,
      variables: { input: payload },
    })
      .then((data) => {
        return data;
      })
      .then((data) => {
        dispatch({ type: actions.DELETE_SALARY_EMPLOYEE_SUCCESS, payload });
      })
      .catch((err) => {
        dispatch({
          type: actions.DELETE_SALARY_EMPLOYEE_FAILURE,
          payload: err,
        });
      });
  };
};

export const resetSnackbarValues = () => ({
  type: actions.RESET_SNACKBAR_VALUES,
});

export const saveCsvList = (payload) => ({
  type: actions.SAVE_CSV_LIST,
  payload: payload,
});

export const freezeSalaryEmployeeListForCurrentMonth = (payload) => {
  return (dispatch) => {
    dispatch({ type: actions.FREEZE_SALARY_EMPLOYEE_LIST });
    API.graphql({
      query: mutations.updateOrganizations,
      variables: {
        input: {
          SK: payload.sk,
          Id: payload.orgId,
          SalaryFreezeMonth: new Date().getMonth() + 1,
          SalaryFreezeYear: new Date().getFullYear(),
        },
        limit: 300,
      },
    })
      .then((data) => {
        return data;
      })
      .then((data) => {
        dispatch({
          type: actions.UPDATE_FREEZE_SALARY_EMPLOYEE_LIST,
          payload: payload,
        });
        const formData = new FormData();
        formData.append("orgId", payload.orgId);
        fetch(
          "https://to1f63cg1j.execute-api.us-west-1.amazonaws.com/dev/insertdata?action=FREEZE_PAYROLL",
          {
            method: "POST",
            body: JSON.stringify({
              orgId: payload.orgId,
            }),
          },
        ).catch((err) => {
        });
      })
      .catch((err) => {
        dispatch({
          type: actions.FAILED_FREEZE_SALARY_EMPLOYEE_LIST,
          payload: err,
        });
      });
  };
};

export const unfreezeSalaryEmployeeListForCurrentMonth = (payload) => {
  return (dispatch) => {
    dispatch({ type: actions.UNFREEZE_SALARY_EMPLOYEE_LIST });
    API.graphql({
      query: mutations.updateOrganizations,
      variables: {
        input: {
          SK: payload.sk,
          Id: payload.orgId,
          SalaryFreezeMonth: new Date().getMonth(),
          SalaryFreezeYear: new Date().getFullYear(),
        },
        limit: 300,
      },
    })
      .then((data) => {
        return data;
      })
      .then((data) => {
        dispatch({
          type: actions.UPDATE_UNFREEZE_SALARY_EMPLOYEE_LIST,
          payload: payload,
        });
      })
      .catch((err) => {
        dispatch({
          type: actions.FAILED_UNFREEZE_SALARY_EMPLOYEE_LIST,
          payload: err,
        });
      });
  };
};

export const getCompanyData = (orgId) => {
  return (dispatch) => {
    API.graphql({
      query: queries.getOrganizations,
      variables: {
        SK: "METADATA#",
        Id: orgId,

        limit: 1,
      },
    })
      .then((result) => {
        return result.data.getOrganizationsData.items;
      })
      .then((data) => {
        dispatch({ type: actions.SUCCESS_COMPANY_DATA, payload: data });
      })
      .catch((err) => {
        dispatch({ type: actions.FAILURE_COMPANY_DATA, payload: err });
      });
  };
};

export const resetCsvList = (payload) => ({
  type: actions.RESET_CSV_LIST,
  payload: payload,
});
