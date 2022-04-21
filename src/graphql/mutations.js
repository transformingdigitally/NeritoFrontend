export const createOrganizations = `
  mutation createOrganizations($input: CreateOrganizationsInput!) {
    createOrganizations(input: $input){
      Id
    }
  }
`;

export const deleteOrganizations = `
  mutation deleteOrganizations($input: DeleteOrganizationsInput!) {
    deleteOrganizations(input: $input) {
      Id
    }
  }
`;

export const deleteEmployees = `
  mutation deleteEmployees($input: DeleteEmployeesInput!) {
    deleteEmployees(input: $input) {
      Id
    }
  }
`;

export const deletePayrolls = `
  mutation deletePayrolls($input: DeletePayrollsInput!) {
    deletePayrolls(input: $input) {
      Id
    }
  }
`;

export const updateSalaryEmployee = `
  mutation updatePayrolls($input: UpdatePayrollsInput!) {
    updatePayrolls(input: $input) {
      Id
      SK
    }
  }
`;

export const updateOrganizations = `
  mutation updateOrganizations($input: UpdateOrganizationsInput!) {
    updateOrganizations(input: $input) {
      Id
      SK
      Month
      Year
      FreezeMonth
      FreezeYear
    }
  }
`;

export const updateEmployees = `
  mutation updateEmployees($input: UpdateEmployeesInput!) {
    updateEmployees(input: $input) {
      Id
      SK
      Month
      Year
    }
  }
`;

export const updateUser = `
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      Name
      Id
      Group
      Email
    }
  }
`;
