import * as Yup from 'yup';

export const validationSchema = {
  profile: Yup.object().shape({
    // aboutMe: Yup.string()
    //   .required('About me field is required')
    //   .min(6, 'About me field must be at least 6 characters'),
    // fullName: Yup.string()
    //   .required('FullName field is required')
    //   .min(1, 'FullName field must be at least 1 characters'),
    // contacts: Yup.object().shape({
    //   facebook: Yup.string()
    //     .required('Facebook is required')
    //     .min(2, 'Facebook field must be at least 2 characters'),
    //   github: Yup.string()
    //     .required('Github is required')
    //     .min(2, 'Github field must be at least 2 characters'),
    // }),
  }),
};
