import get from 'lodash.get';
import { Input } from 'src/Common/Input/Input';
import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import { FormInputProps } from 'src/Common/InputForm/types';
import classes from 'src/Common/InputForm/InputForm.module.css';

export const FormInput = <TFormValues extends Record<string, unknown>>({
  className,
  name,
  register,
  rules,
  errors,
  ...props
}: FormInputProps<TFormValues>): JSX.Element => {
  const errorMessages = get(errors, name);
  const hasError = !!(errors && errorMessages);

  return (
    <div className={className} aria-live='polite'>
      <Input name={name} {...props} {...(register && register(name, rules))} />
      <ErrorMessage
        errors={errors}
        name={name as any}
        render={({ message }) => (
          <div className={classes.inputFormClassName}>{message}</div>
        )}
      />
    </div>
  );
};
