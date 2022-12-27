import React, { forwardRef } from 'react';
import { InputProps } from 'src/Common/Input/types';

// @ts-ignore
export const Input: React.FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  ({ id, name, label, type = 'text', className = '', placeholder, ...props }, ref) => {

    console.log('id', id);
    console.log('name', name);
    console.log('label', label);
    console.log('type', type);
    console.log('other props', { ...props });

    return (
      <input
        id={id}
        ref={ref}
        name={name}
        type={type}
        aria-label={label}
        placeholder={placeholder}
        // className={'some'}
        {...props}
      />
    );
  },
);
