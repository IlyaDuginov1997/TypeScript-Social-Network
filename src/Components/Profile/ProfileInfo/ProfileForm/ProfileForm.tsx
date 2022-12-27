import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { FormInput } from 'src/Common/InputForm/InputForm';
import { validationSchema } from 'src/Validation/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProfileFormPropsType } from 'src/Components/Profile/ProfileInfo/ProfileForm/types';

export type RegistrationFormFields = {
  firstName: string;
};

export const ProfileForm: FC<ProfileFormPropsType> = ({
  profile,
  isOwner,
  editModeOff,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormFields>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = handleSubmit(data => {
    console.log('submitting...');
    console.log('data', data);
    editModeOff();
  });

  return (
    <form onSubmit={onSubmit}>
      <FormInput<RegistrationFormFields>
        id='firstName'
        type='text'
        name='firstName'
        label='First Name'
        placeholder='First Name'
        className='mb-2'
        register={register}
        // rules={{ required: 'You must enter your first name.' }}
        errors={errors}
      />
      <button className='some' type='submit'>
        Submit
      </button>
    </form>
  );
};
