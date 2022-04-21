import React from "react";
import "../../assets/scss/global-inner-layout.scss";
import { useSelector } from "react-redux";
import { SALARY_COLUMNS } from "../../constants/errorGridView";

import ErrorList from "../../common/GridViewError";

// Display the field validation record.
function SalaryErrorList() {
  const csvList = useSelector((state) => state.salaryEmployee.csvList);

  return <ErrorList csvList={csvList} columns={SALARY_COLUMNS} />;
}

export default SalaryErrorList;
