import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export type InputProps = {
  id: string;
  name: string;
  label: string;
  type?: string;
  className?: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
