import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormControl, MenuItem, Paper, Select } from "@mui/material";

import "../../../components/shared/modals/style.css";
import {
  ErrorMessage,
  FormRow,
  InputItem,
  Label,
} from "../../../components/shared/forms";
import { Validation } from "../../../constants/validation/schema";
import { useRegisterMutation } from "../../../api/auth";
import { sendSuccessMessage } from "../../../constants/validation/sendSuccessMsg";
import { checkForError } from "../../../constants/validation/errorHandlers";

export default function SignUp() {
  const navigate = useNavigate();
  const [signup, { isLoading }] = useRegisterMutation();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      gender: "",
      hobbies: "",
      role: "employee",
    },
    resolver: yupResolver(Validation.SIGNUP),
  });

  const { handleSubmit, control } = form;

  const handleSignUp = async (values) => {
    const data = await signup(values);
    if (data?.data?.success) {
      sendSuccessMessage("Register successfully!");
      navigate("/login");
    } else checkForError(data);
  };

  return (
    <Container
      style={{
        margin: "unset",
        width: "100%",
        height: "100vh",
      }}
    >
      <Paper
        className="modal"
        sx={{
          width: "50%",
          p: 2,
          boxShadow: "1px 1px 7px rgba(0.5 0.1 0.1)",
          borderRadius: "10px",
          "&:hover": {
            boxShadow: "8px 8px 15px rgba(0.5 0.5 1)",
          },
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "600" }}
        >
          Sign Up
        </Typography>
        <FormRow>
          <InputItem name="email" type="email" form={form} />
          <InputItem name="password" type="password" form={form} />
        </FormRow>
        <FormRow>
          <InputItem name="firstName" title="First Name" form={form} />
          <InputItem name="lastName" title="Last Name" form={form} />
        </FormRow>

        <FormRow>
          <InputItem name="hobbies" form={form} />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              margin: "5px",
            }}
          >
            <FormControl fullWidth>
              <Label title="Gender" />
              <Controller
                control={control}
                name={"gender"}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <>
                    <Select
                      placeholder="Select Gender"
                      id={"gender"}
                      value={value || ""}
                      onChange={(e) => onChange(e.target.value)}
                    >
                      {genderStatus.map(({ title, value }, index) => (
                        <MenuItem key={index} value={value}>
                          {title}
                        </MenuItem>
                      ))}
                    </Select>
                    {error && (
                      <ErrorMessage error={{ message: error.message }} />
                    )}
                  </>
                )}
              />
            </FormControl>
          </div>
        </FormRow>
        <FormRow>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              margin: "5px",
            }}
          >
            <FormControl fullWidth>
              <Label title="Role" />
              <Controller
                control={control}
                name={"role"}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <>
                    <Select
                      placeholder="Select Role"
                      id={"role"}
                      value={value || ""}
                      onChange={(e) => onChange(e.target.value)}
                      defaultValue="employee"
                    >
                      {rolesArr.map(({ title, value }, index) => (
                        <MenuItem key={index} value={value}>
                          {title}
                        </MenuItem>
                      ))}
                    </Select>
                    {error && (
                      <ErrorMessage error={{ message: error.message }} />
                    )}
                  </>
                )}
              />
            </FormControl>
          </div>
        </FormRow>
        <Button
          disabled={isLoading}
          onClick={handleSubmit(handleSignUp)}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign UP
        </Button>
        <Grid container>
          <Grid item>
            <Link to="/login">{"Already have an account? Login"}</Link>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

const genderStatus = [
  { title: "Male", value: "male" },
  { title: "Female", value: "female" },
  { title: "Other", value: "other" },
];

const rolesArr = [
  { title: "Manager", value: "manager" },
  { title: "Employee", value: "employee" },
];
