import { Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { MenuAppBar } from "../../../components/shared/Navbar";

const Employee = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);

  return (
    <div>
      <MenuAppBar />
      <Paper sx={{ m: 2, w: 100, height: "50vh" }}>
        <Typography
          variant="h5"
          component="div"
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <b>Employee Details</b>
        </Typography>

        <Typography
          variant="span"
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <b> Name : </b> {currentUser?.firstName} {currentUser?.lastName}
        </Typography>

        <Typography
          variant="span"
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <b> Email : </b> {currentUser?.email}
        </Typography>

        <Typography
          variant="span"
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <b> Gender : </b>
          {currentUser?.gender}
        </Typography>
        <Typography
          variant="span"
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <b> Hobbies : </b> {currentUser?.hobbies}
        </Typography>

        <Typography
          variant="span"
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <b> Department : </b> {currentUser?.departments || "-"}
        </Typography>
      </Paper>
    </div>
  );
};

export default Employee;
