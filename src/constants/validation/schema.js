import * as Yup from "yup";

export const MSG = {
  REQUIRED: "This Field is required",
  VALID_STR: "Please Enter Valid Text",
  VALID_COUNT: "Please Enter Valid Count",
  VALID_URL: "Please Enter valid URL",
};

// const str = Yup.string().trim(MSG.VALID_STR);
const required_str = Yup.string().trim(MSG.REQUIRED).required(MSG.REQUIRED);
const num = Yup.number()
  .min(1, MSG.VALID_COUNT)
  .typeError(MSG.VALID_COUNT)
  .nullable();

export const Validation = {
  LOGIN: Yup.object().shape({
    email: required_str.email("Enter Valid Email"),
    password: required_str
      .min(8, "Password must be 8 Characters long")
      .max(20, "Password is too long!"),
  }),
  SIGNUP: Yup.object().shape({
    email: required_str.email("Enter Valid Email"),
    password: required_str
      .min(8, "Password must be 8 Characters long")
      .max(20, "Password is too long!"),
    firstName: required_str,
    lastName: required_str,
    gender: required_str,
    hobbies: required_str,
    role: required_str,
  }),
  DEPARTMENT: Yup.object().shape({
    departmentName: required_str,
    categoryName: required_str,
    location: required_str,
    salary: num.required(MSG.REQUIRED),
  }),
};
