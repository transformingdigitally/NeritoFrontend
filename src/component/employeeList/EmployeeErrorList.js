import React from "react";
import "../../assets/scss/global-inner-layout.scss";
import { useSelector } from "react-redux";
import { EMPLOYEE_COLUMNS } from "../../constants/errorGridView";

import ErrorList from "../../common/GridViewError";

// Display the field validation record.
function EmployeeErrorList() {
  const csvList = useSelector((state) => state.employee.csvList);

  return <ErrorList csvList={csvList} columns={EMPLOYEE_COLUMNS} />;
}

export default EmployeeErrorList;
