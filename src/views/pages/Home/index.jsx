import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import {
  useDeleteDepartmentMutation,
  useGetDepartmentListQuery,
} from "../../../api/department";
import DisplayTable from "../../../components/shared/Table";
import { isArray } from "../../../constants/validation/errorHandlers";
import { Button, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actions } from "../../../redux/store/store";
import { handleFormData } from "../../../constants/validation/handleFormData";
import isSuccess from "../../../constants/validation/responseHandler";

const Home = () => {
  const navigate = useNavigate();
  const queryObj = useSelector((state) => state?.query?.query);
  const { currentUser } = useSelector((state) => state.auth);
  if (currentUser?.role === "employee") navigate("/employee"); //Temporary Auth

  const { data, isFetching } = useGetDepartmentListQuery(
    { ...queryObj },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const [deleteDept, deleteReq] = useDeleteDepartmentMutation();
  const [departmentData, setDepartmentData] = useState([]);

  useEffect(() => {
    if (!data || !data?.data || !isArray(data?.data)) return;
    setDepartmentData(data?.data);
  }, [data]);

  const handleSingleDelete = async (item) => {
    if (window.confirm("Are You sure")) {
      const response = await deleteDept(item?._id);
      isSuccess(response, "Department removed successfully!");
    }
  };

  const column = [
    { name: "departmentName", label: "Department Name" },
    { name: "categoryName", label: "Category Name" },
    { name: "location", label: "Location" },
    { name: "salary", label: "Salary" },
    { name: "employeeId", label: "Employees" },
    {
      name: "actions",
      label: "Actions",
      renderer: (item) => {
        return (
          <>
            <Button
              disabled={deleteReq?.isLoading}
              variant="contained"
              onClick={() => handleEditItem(item)}
              style={{ marginRight: "3px" }}
            >
              Edit
            </Button>
            <Button
              disabled={deleteReq?.isLoading}
              variant="contained"
              color="error"
              onClick={() => handleSingleDelete(item)}
            >
              Delete
            </Button>
          </>
        );
      },
    },
  ];
  return (
    currentUser?.role === "manager" && (
      <div>
        <MenuAppBar />
        <Paper sx={{ m: 2, w: 100 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "10px",
            }}
          >
            <Button variant="contained" onClick={() => handleOpen()}>
              Add Department
            </Button>
          </Typography>

          <DisplayTable
            data={departmentData}
            column={column}
            isLoading={isFetching}
            count={data?.count}
          />
        </Paper>
      </div>
    )
  );
};

export default Home;

export function MenuAppBar() {
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
            Home
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

const handleOpen = () => actions.modal.openDepartment();

/**
 * - ( @handleFormData = remove all empty OR "-"
 *     fields from object and returns object with values only )
 */
const handleEditItem = (item) => {
  actions.modal.openDepartment(handleFormData(item));
};
