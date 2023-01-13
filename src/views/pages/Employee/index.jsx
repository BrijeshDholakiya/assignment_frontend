import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actions } from "../../../redux/store/store";

const Employee = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.currentUser);
  if (currentUser?.role === "manager") navigate("/home"); // Temporary Auth

  return (
    currentUser?.role === "employee" && (
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
            Employee Details
          </Typography>

          <Typography
            variant="span"
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            Name : {currentUser?.firstName} {currentUser?.lastName}
          </Typography>

          <Typography
            variant="span"
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            Email : {currentUser?.email}
          </Typography>

          <Typography
            variant="span"
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            Gender : {currentUser?.gender}
          </Typography>
          <Typography
            variant="span"
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            Hobbies : {currentUser?.hobbies}
          </Typography>

          <Typography
            variant="span"
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            Department : {currentUser?.departments || "-"}
          </Typography>
        </Paper>
      </div>
    )
  );
};

export default Employee;

function MenuAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    actions.auth.setCurrentUser(null);
    actions.auth.setLoading(false);
    actions.auth.setToken(null);
    navigate("/login");
    handleClose();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Employee
          </Typography>
          {
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                MENU
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleSignOut}>Logout</MenuItem>
              </Menu>
            </div>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
