import { LoadingButton } from "@mui/lab";
import { errorStyle, inputs_style } from "../../../views/styles/styles";

export const MuiBtn = (props) => {
  const { onClick, children, variant, type, color, isLoading, startIcon } =
    props || {};
  return (
    <LoadingButton
      sx={color === "error" ? errorStyle : inputs_style}
      color={color || "primary"}
      loadingPosition="start"
      startIcon={startIcon || <></>}
      variant={variant || "outlined"}
      loading={isLoading}
      disabled={isLoading}
      type={type || "button"}
      onClick={() => onClick()}
    >
      {children}
    </LoadingButton>
  );
};
