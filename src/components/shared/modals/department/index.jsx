import { useCallback, memo } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Modal } from "@mui/material";

import "../style.css";
import { MuiBtn } from "../../buttons";
import { FormColumn, FormRow, HeaderTitle, InputItem } from "../../forms";
import { useForm } from "react-hook-form";
import { Validation } from "../../../../constants/validation/schema";
import { actions } from "../../../../redux/store/store";
import {
  useAddDepartmentMutation,
  useUpdateDepartmentMutation,
} from "../../../../api/department";
import isSuccess from "../../../../constants/validation/responseHandler";
// import isSuccess from "../../../../constants/validation/responseHandler";
const defaultValues = {
  departmentName: "",
  categoryName: "",
  location: "",
  salary: null,
};

const UPDATED = "Department updated successfully!";
const CREATED = "Department created successfully!";

const DepartmentModal = memo((props) => {
  const { _id, id, createdAt, users, __v, ...rest } = props?.data || {};

  const [addDepartment, addReq] = useAddDepartmentMutation();
  const [updateDepartment, updateReq] = useUpdateDepartmentMutation();

  const form = useForm({
    defaultValues: _id ? { ...rest } : { ...defaultValues },
    resolver: yupResolver(Validation.DEPARTMENT),
  });

  const {
    handleSubmit,
    formState: { isDirty },
  } = form;

  const onSubmit = useCallback(
    async (data) => {
      let response = _id
        ? await updateDepartment({ ...data, _id })
        : await addDepartment(data);

      isSuccess(response, _id ? UPDATED : CREATED);
      actions.modal.closeDepartment();
    },
    [updateDepartment, addDepartment, _id]
  );

  const onCancel = useCallback(() => {
    if (!isDirty || window.confirm("Are you sure"))
      actions.modal.closeDepartment();
  }, [isDirty]);

  return (
    <Modal open onClose={onCancel}>
      <div className={`modal`}>
        <div className="modal__header">
          <HeaderTitle
            variant={"h2"}
            title={_id ? "Edit Department" : "Add Department"}
          />
        </div>

        <div className="modal__body">
          <form>
            <FormRow>
              <FormColumn>
                <InputItem
                  name={"departmentName"}
                  title="Department Name"
                  form={form}
                />
              </FormColumn>

              <FormColumn>
                <InputItem
                  name={"categoryName"}
                  form={form}
                  title="Category Name"
                />
              </FormColumn>
            </FormRow>

            <FormRow>
              <FormColumn>
                <InputItem name={"location"} form={form} />
              </FormColumn>

              <FormColumn>
                <InputItem name={"salary"} form={form} type="number" />
              </FormColumn>
            </FormRow>
          </form>
        </div>
        <div className="modal__footer">
          <MuiBtn onClick={onCancel}>Cancel</MuiBtn>
          <MuiBtn
            type="submit"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            isLoading={addReq?.isLoading || updateReq.isLoading}
          >
            Save
          </MuiBtn>
        </div>
      </div>
    </Modal>
  );
});

export default DepartmentModal;
