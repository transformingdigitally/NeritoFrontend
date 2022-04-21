export const getOrganizations = /* GraphQL */ `
  query ListOrganizations(
    $Id: String!
    $SK: String!
    $limit: Int
    $nextToken: String
  ) {
    getOrganizationsData(
      Id: $Id
      SK: $SK
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        Id
        SK
        OrgName
        RFC
        OrgDetails
        Email
        Status
        PayrollUsers
        PayrollDisbursement
        EmployeeEnrollmentDate
        FiscalInfo
        AccountUsers
        TransferTo
        FreezeYear
        FreezeMonth
        SalaryFreezeMonth
        SalaryFreezeYear
        Config
        FileValidation
        OriginAccount
      }
      nextToken
    }
  }
`;

export const listOrganizationsData = /* GraphQL */ `
  query ListOrganizations($Type: String!, $limit: Int, $nextToken: String) {
    listOrganizationsData(Type: $Type, limit: $limit, nextToken: $nextToken) {
      items {
        Id
        SK
        OrgName
        RFC
        OrgDetails
        Email
        Status
        PayrollUsers
        PayrollDisbursement
        EmployeeEnrollmentDate
        FiscalInfo
        AccountUsers
        TransferTo
        FreezeYear
        FreezeMonth
        Config
        FileValidation
        OriginAccount
      }
      nextToken
    }
  }
`;

export const getOrganizationsData = /* GraphQL */ `
  query ListOrganizations(
    $Id: String!
    $SK: String!
    $filter: TableOrganizationsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getOrganizationsData(
      Id: $Id
      SK: $SK
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        Id
        SK
        RFC
        CompanyId
        OperationType
        Name
        Email
        Status
        PhoneNumber
        Contact
        AccountType
        BankId
        AccountClabe
        Currency
        Month
        Year
        Operation
        OriginAccount
        UserName
        DestinationAccount
        ImportAmount
        ReferenceDate
        Description
        OriginCurrency
        DestinationCurrency
        IVA
        Email
        ApplicationDate
        PaymentInstructions
        ResponseMessage
      }
      nextToken
    }
  }
`;

export const getNeritoConfig = /* GraphQL */ `
  query listNeritoConfigs(
    $filter: TableNeritoConfigFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNeritoConfigs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        Type
        Config
      }
      nextToken
    }
  }
`;

export const getUserNeritoConfig = /* GraphQL */ `
  query listUsers(
    $filter: TableUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        Name
        Email
        Group
        Id
        OrganizationId
      }
      nextToken
    }
  }
`;

export const getListEmployeesByOrganization = /* GraphQL */ `
  query listEmployeesByOrganization(
    $SK: String!
    $limit: Int
    $nextToken: String
  ) {
    listEmployeesByOrganization(SK: $SK, limit: $limit, nextToken: $nextToken) {
      items {
        Id
        SK
        Status
        Name
        Email
        RFC
        PhoneNumber
        AccountType
        BankId
        AccountClabe
        Month
        Year
        CompanyId
        OperationType
        Contact
        Currency
        State
        ResponseMessage
        ApplicationDate
        AccountHolder
      }
      nextToken
    }
  }
`;

export const getListPayrollsByOrganization = /* GraphQL */ `
  query listPayrollsByOrganization(
    $SK: String!
    $limit: Int
    $nextToken: String
  ) {
    listPayrollsByOrganization(SK: $SK, limit: $limit, nextToken: $nextToken) {
      items {
        Id
        SK
        CompanyId
        Email
        RFC
        Status
        Month
        Year
        OriginAccount
        Operation
        UserName
        DestinationAccount
        ImportAmount
        ReferenceDate
        Description
        OriginCurrency
        DestinationCurrency
        IVA
        ApplicationDate
        PaymentInstructions
        State
        ResponseMessage
        ExecutionDate
        TrackingID
        MovementNumber
        AccountHolder
      }
      nextToken
    }
  }
`;
