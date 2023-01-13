import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  ErrorMessage,
  InputItem,
  Label,
} from "../../../components/shared/forms";
import { yupResolver } from "@hookform/resolvers/yup";
import { Validation } from "../../../constants/validation/schema";
import { FormControl, MenuItem, Select } from "@mui/material";
import { useRegisterMutation } from "../../../api/auth";
// import { actions } from "../../../redux/store/store";
import { sendSuccessMessage } from "../../../constants/validation/sendSuccessMsg";
import { checkForError } from "../../../constants/validation/errorHandlers";

const theme = createTheme();

const genderStatus = [
  { title: "Male", value: "male" },
  { title: "Female", value: "female" },
  { title: "Other", value: "other" },
];

const rolesArr = [
  { title: "Manager", value: "manager" },
  { title: "Employee", value: "employee" },
];

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
    } else {
      checkForError(data);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" color="text.secondary" align="center">
            SignUP
          </Typography>
          <InputItem name="email" type="email" form={form} />
          <InputItem name="password" type="password" form={form} />
          <InputItem name="firstName" title="First Name" form={form} />
          <InputItem name="lastName" title="Last Name" form={form} />
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
        </Box>
      </Container>
    </ThemeProvider>
  );
}
