import {
  DeepMap,
  FieldError, FieldErrors,
  Path,
  RegisterOptions,
  UnPackAsyncDefaultValues,
  UseFormRegister,
} from 'react-hook-form';
import { InputProps } from 'src/Common/Input/types';

export type FormInputProps<TFormValues> = {
  name: Path<UnPackAsyncDefaultValues<TFormValues>>;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
  // errors?: Partial<DeepMap<TFormValues, FieldError>>;
  errors?: FieldErrors;
} & Omit<InputProps, 'name'>;