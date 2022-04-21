import React from 'react';
import {
  SelectValidator,
} from "react-material-ui-form-validator";
import { InputLabel, MenuItem, OutlinedInput } from '@mui/material';

const MultiSelectInput = ({ showSaveUser, newUserList, saveUserList, handleDropDownValue, t, inputName }) => {
  return (
    <>
      {
        showSaveUser.length === 0 && (
          <InputLabel id="" className="select-lbl">
            {[t.PLEASE_SELECT]}
          </InputLabel>
        )
      }
      <SelectValidator
        name={inputName}
        size="small"
        fullWidth
        id="demo-multiple-name"
        value={showSaveUser}
        onChange={(e, key) =>
          handleDropDownValue(e, inputName)
        }
        input={<OutlinedInput />}
        SelectProps={{ multiple: true }}
        className="cl-selectfield"
        validators={["required"]}
        errorMessages={
          [
            t.PLEASE_FILL_REQUIRED_FIELD,
          ]}
      >
        <MenuItem disabled value="">
          {[t.PLEASE_SELECT]}
        </MenuItem>
        {
          newUserList.map((name) => (
            <MenuItem
              key={name.Id}
              value={name.Id + "#" + name.Name}
            >
              {name.Name}
            </MenuItem>
          ))
        }
        {
          saveUserList.length > 0 && saveUserList.map(data => {
            const val = data.split('#');
            return (<MenuItem
              key={val[0]}
              value={data}
            >
              {val[1]}
            </MenuItem>)
          })
        }
      </SelectValidator >
    </>
  )
}

export default MultiSelectInput;