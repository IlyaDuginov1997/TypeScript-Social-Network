import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { FormInput } from 'src/Common/InputForm/InputForm';
import { validationSchema } from 'src/Validation/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProfileFormPropsType } from 'src/Components/Profile/ProfileInfo/ProfileForm/types';
import { GetProfileType } from 'src/Components/Profile/ProfileContainer';

export type ProfileFormFields = Omit<GetProfileType, 'userId' | 'photos'> & {
  notRegisteredInput: string;
};

export const ProfileForm: FC<ProfileFormPropsType> = ({
  profile,
  isOwner,
  editModeOff,
  updateProfileDataThunk,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ProfileFormFields>({
    resolver: yupResolver(validationSchema.profile),
    defaultValues: {...profile}
  });

  const onSubmit = handleSubmit(async data => {
    const errorMessages = await updateProfileDataThunk(data);

    if (errorMessages) {
      console.log('we have some errors: ', errorMessages);
      setError('notRegisteredInput', { type: 'custom', message: 'Something go wrong' });
    } else {
      editModeOff();
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <FormInput<ProfileFormFields>
        id={'aboutMe'}
        label={'aboutMe'}
        register={register}
        name={'aboutMe'}
        errors={errors}
      />

      <FormInput<ProfileFormFields>
        id={'fullName'}
        label={'fullName'}
        register={register}
        name={'fullName'}
        errors={errors}
      />

      <FormInput<ProfileFormFields>
        id={'lookingForAJobDescription'}
        label={'lookingForAJobDescription'}
        register={register}
        name={'lookingForAJobDescription'}
        errors={errors}
      />

      <FormInput<ProfileFormFields>
        id={'lookingForAJob'}
        label={'lookingForAJob'}
        register={register}
        name={'lookingForAJob'}
        errors={errors}
        type={'checkbox'}
      />

      {Object.keys(profile.contacts).map(title => {
        return (
          <FormInput<ProfileFormFields>
            key={title}
            id={title}
            label={title}
            register={register}
            //@ts-ignore
            name={`contacts.${title}`}
            errors={errors}
          />
        );
      })}

      {errors.notRegisteredInput?.message && <div>{errors.notRegisteredInput?.message}</div>}

      <button className='some' type='submit'>
        Submit
      </button>

      <button type='button' onClick={() => editModeOff()}>
        Go back
      </button>
    </form>
  );
};
