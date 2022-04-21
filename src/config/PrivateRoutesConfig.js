import Roles from "./roles";
import CompanyList from "../component/companyList";
import EmployeeList from "../component/employeeList";
import EmployeeListOperation from "../component/employeeList/employeeListOperation";
import SalaryEmployeeListOperation from "../component/salaryEmployeeList/salaryEmployeeListOperation";
import EmployeeErrorList from "../component/employeeList/EmployeeErrorList";
import SalaryEmployeeList from "../component/salaryEmployeeList";
import SalaryErrorList from "../component/salaryEmployeeList/SalaryErrorList";
import { FREEZE_STATE } from "../constants/constant";

const routes = [
  {
    component: EmployeeErrorList,
    path: "/error-list",
    title: "Error List",
    exact: true,
    permission: [Roles.PAYROLL_USER],
  },
  {
    component: EmployeeList,
    path: "/",
    title: "Employee List",
    exact: true,
    permission: [Roles.PAYROLL_USER],
  },
  {
    component: SalaryErrorList,
    path: "/error-list",
    title: "Salary Error List",
    exact: true,
    permission: [Roles.ACCOUNT_USER],
  },
  {
    component: SalaryEmployeeList,
    path: "/",
    title: "Salary Employee List",
    exact: true,
    permission: [Roles.ACCOUNT_USER],
  },
  {
    component: CompanyList,
    path: "/",
    title: "Company List",
    exact: true,
    permission: [Roles.SUPER_ADMIN],
  },
  {
    component: EmployeeListOperation,
    isSuccesful: FREEZE_STATE.SUCCESS,
    path: "/emp-operation",
    title: "Employee List Operation",
    exact: true,
    permission: [Roles.PAYROLL_USER, Roles.ACCOUNT_USER],
  },
  {
    component: EmployeeListOperation,
    isSuccesful: FREEZE_STATE.FAILURE,
    path: "/emp-err-operation",
    title: "Employee Error List Operation",
    exact: true,
    permission: [Roles.PAYROLL_USER, Roles.ACCOUNT_USER],
  },
  {
    component: SalaryEmployeeListOperation,
    isSuccesful: FREEZE_STATE.SUCCESS,
    path: "/payroll-success-operation",
    title: "Salary Employee List Operation",
    exact: true,
    permission: [Roles.PAYROLL_USER, Roles.ACCOUNT_USER],
  },
  {
    component: SalaryEmployeeListOperation,
    isSuccesful: FREEZE_STATE.FAILURE,
    path: "/payroll-error-operation",
    title: "Salary Employee Error List Operation",
    exact: true,
    permission: [Roles.PAYROLL_USER, Roles.ACCOUNT_USER],
  },
];

export default routes;
