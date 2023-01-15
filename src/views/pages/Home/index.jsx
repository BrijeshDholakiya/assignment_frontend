import { useEffect, useState } from "react";

import {
  useDeleteDepartmentMutation,
  useGetDepartmentListQuery,
} from "../../../api/department";
import DisplayTable from "../../../components/shared/Table";
import { isArray } from "../../../constants/validation/errorHandlers";
import { Button, Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { actions } from "../../../redux/store/store";
import { handleFormData } from "../../../constants/validation/handleFormData";
import isSuccess from "../../../constants/validation/responseHandler";
import { MenuAppBar } from "../../../components/shared/Navbar";

const Home = () => {
  const queryObj = useSelector((state) => state?.query?.query);
  const { currentUser } = useSelector((state) => state.auth);

  const { data, isFetching } = useGetDepartmentListQuery(
    { ...queryObj },
    {
      refetchOnMountOrArgChange: true,
      skip: !currentUser || currentUser?.role !== "manager",
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
  );
};

export default Home;

const handleOpen = () => actions.modal.openDepartment();

/**
 * - ( @handleFormData = remove all empty OR "-"
 *     fields from object and returns object with values only )
 */
const handleEditItem = (item) => {
  actions.modal.openDepartment(handleFormData(item));
};
