import { LoginInput } from '../../../graphql/client';
import React from 'react';
import { Controller, Control, FieldValues } from 'react-hook-form';
import TextField from '@mui/material/TextField';

type Props = {
  name: string;
  control: Control<FieldValues | LoginInput, object>;
  label: string;
  defaultValue?: string;
  readOnly?: boolean;
  fullWidth?:boolean;
};

const FormController: React.FC<Props> = ({
  name,
  control,
  label,
  defaultValue = '',
  readOnly = false,
  fullWidth = false
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
          onChange={onChange}
          value={value}
          label={label}
          fullWidth={fullWidth}
          defaultValue={defaultValue} 
          inputProps={
            { readOnly: readOnly, }
          } />
      )}
    />
  )
};


export default FormController;