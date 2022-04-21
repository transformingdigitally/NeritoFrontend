import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Tooltip } from "@mui/material";

// Grid view for the error list for both the users AC/PP.
export const SALARY_COLUMNS = [
  {
    Header: "",
    accessor: "errorMessage",
    Cell: (props) => {
      return (
        <>
          <Tooltip
            title={
              <h1 style={{ color: "lightblue" }}>
                {props.row.original.errorMessage
                  .split("@@@@@@@@")
                  .map((val) => {
                    if (val) {
                      return <p> {val}</p>;
                    }
                    return "";
                  })}
              </h1>
            }
          >
            <ErrorOutlineIcon className="redIcon" color="red" />
          </Tooltip>
        </>
      );
    },
  },
  {
    Header: "userName",
    accessor: "userName",
  },
  {
    Header: "destinationAccount",
    accessor: "destinationAccount",
  },
  {
    Header: "importAmount",
    accessor: "importAmount",
  },
  {
    Header: "reference",
    accessor: "reference",
  },
  {
    Header: "description",
    accessor: "description",
  },
  {
    Header: "iva",
    accessor: "iva",
  },
  {
    Header: "beneficiaryEmail",
    accessor: "beneficiaryEmail",
  },
  {
    Header: "applicationDate",
    accessor: "applicationDate",
  },
  {
    Header: "paymentInstructions",
    accessor: "paymentInstructions",
  },
];

export const EMPLOYEE_COLUMNS = [
  {
    Header: "",
    accessor: "errorMessage",
    Cell: (props) => {
      return (
        <>
          <Tooltip
            title={
              <h1 style={{ color: "lightblue" }}>
                {props.row.original.errorMessage
                  .split("@@@@@@@@")
                  .map((val) => {
                    if (val) {
                      return <p> {val}</p>;
                    }
                    return "";
                  })}
              </h1>
            }
          >
            <ErrorOutlineIcon className="redIcon" color="red" />
          </Tooltip>
        </>
      );
    },
  },
  {
    Header: "phoneNumber",
    accessor: "phoneNumber",
  },
  {
    Header: "name",
    accessor: "name",
  },
  {
    Header: "email",
    accessor: "email",
  },
  {
    Header: "contact",
    accessor: "contact",
  },
  {
    Header: "rfc",
    accessor: "rfc",
  },
  {
    Header: "typeAccount",
    accessor: "typeAccount",
  },
  {
    Header: "bankId",
    accessor: "bankId",
  },
  {
    Header: "accountClabe",
    accessor: "accountClabe",
  },
];
