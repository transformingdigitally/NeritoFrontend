import { combineReducers } from "redux";
import login from "./login";
import company from "./company";
import employee from "./employee";
import salaryEmployee from "./salaryEmployee";
import settings from "./settings";

export default combineReducers({
  login,
  company,
  employee,
  salaryEmployee,
  settings,
});
