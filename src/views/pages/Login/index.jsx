import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { InputItem } from "../../../components/shared/forms";
import { Validation } from "../../../constants/validation/schema";
import { useLoginMutation } from "../../../api/auth";
import { actions } from "../../../redux/store/store";
import { checkForError } from "../../../constants/validation/errorHandlers";
import { sendSuccessMessage } from "../../../constants/validation/sendSuccessMsg";

const theme = createTheme();

export default function Login(props) {
  const { onStopUserQuery } = props;
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const form = useForm({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(Validation.LOGIN),
  });

  const { handleSubmit } = form;

  /* `
   * Login API Body : {email, password}
   `*/
  const handleLogin = async (body) => {
    const data = await login(body);
    if (data?.data?.success) {
      onStopUserQuery(false);
      actions.auth.setCurrentUser(data?.data?.result);
      actions.auth.setLoading(false);
      actions.auth.setToken(data?.data?.token);
      localStorage.setItem("token", data?.data?.token);
      sendSuccessMessage("Login Successfully!");
      data?.data?.result?.role === "manager"
        ? navigate("/home")
        : navigate("/employee");
    } else checkForError(data);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <InputItem name="email" type="email" form={form} />
            <InputItem name="password" type="password" form={form} />
            <Button
              disabled={isLoading}
              onClick={handleSubmit(handleLogin)}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
