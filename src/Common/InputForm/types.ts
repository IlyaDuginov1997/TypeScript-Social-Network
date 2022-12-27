import {
  DeepMap,
  FieldError,
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
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
} & Omit<InputProps, 'name'>;