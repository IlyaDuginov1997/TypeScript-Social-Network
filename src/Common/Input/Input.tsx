import React, { forwardRef } from 'react';
import { InputProps } from 'src/Common/Input/types';

// @ts-ignore
export const Input: React.FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  ({ id, name, label, type = 'text', className = '', placeholder, ...props }, ref) => {
    return (
      <div>
        {label && <label htmlFor='name'>{label}</label>}
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
      </div>
    );
  },
);
