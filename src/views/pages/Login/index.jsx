import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { InputItem } from "../../../components/shared/forms";
import { Validation } from "../../../constants/validation/schema";
import { useLoginMutation } from "../../../api/auth";
import { actions } from "../../../redux/store/store";
import { checkForError } from "../../../constants/validation/errorHandlers";
import { sendSuccessMessage } from "../../../constants/validation/sendSuccessMsg";
import { Paper } from "@mui/material";
import "../../../components/shared/modals/style.css";

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
    if (typeof onStopUserQuery === "function") onStopUserQuery(true);

    const data = await login(body);

    if (data?.data?.success) {
      actions.auth.setCurrentUser(data?.data?.result);
      actions.auth.setToken(data?.data?.token);
      localStorage.setItem("token", data?.data?.token);
      actions.auth.setLoading(false);

      if (typeof onStopUserQuery === "function") onStopUserQuery(false);

      sendSuccessMessage("Login Successfully!");

      if (data?.data?.result?.role === "manager") {
        navigate("/home");
      } else {
        navigate("/employee");
      }
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
          width: "40%",
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
          Sign in
        </Typography>
        <Box component="form">
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
      </Paper>
    </Container>
  );
}
