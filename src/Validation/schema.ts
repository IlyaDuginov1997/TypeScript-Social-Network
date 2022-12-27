import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First Name is required')
    .min(6, 'First Name must be at least 6 characters'),
  // username: Yup.string()
  //   .required('Username is required')
  //   .min(6, 'Username must be at least 6 characters')
  //   .max(20, 'Username must not exceed 20 characters'),
  // email: Yup.string()
  //   .required('Email is required')
  //   .email('Email is invalid'),
  // password: Yup.string()
  //   .required('Password is required')
  //   .min(6, 'Password must be at least 6 characters')
  //   .max(40, 'Password must not exceed 40 characters'),
  // confirmPassword: Yup.string()
  //   .required('Confirm Password is required')
  //   .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
  // acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
});