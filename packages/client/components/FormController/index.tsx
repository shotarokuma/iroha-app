import React from "react";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";

interface Props {
  name: string;
  control: any;
  label: string;
  defaultValue?: string;
  readOnly?: boolean;
  fullWidth?: boolean;
  type?: "password" | "number";
}

const FormController: React.FC<Props> = ({
  name,
  control,
  label,
  defaultValue = "",
  readOnly = false,
  fullWidth = false,
  type = "text",
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextField
          variant="outlined"
          required
          autoFocus
          type={type}
          onChange={onChange}
          value={value}
          label={label}
          fullWidth={fullWidth}
          defaultValue={defaultValue}
          inputProps={{ readOnly }}
        />
      )}
    />
  );
};

export default FormController;
