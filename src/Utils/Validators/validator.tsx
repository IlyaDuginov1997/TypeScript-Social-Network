import React from 'react';

export const requiredField = (value: string) => {
    if (value) return undefined;
    return 'Field is required';
};

export const maxLengthCreator = (maxValue: number) => {
    return (value: string) => {
        if (value.length && value.length > maxValue) return `Max length is ${maxValue} symbols`;
        return undefined;
    };
};