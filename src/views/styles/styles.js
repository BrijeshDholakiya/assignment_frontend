export const inputs_style = {
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#00B3FF",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#00B3FF",
  },
  "& .MuiInputAdornment-root": {
    marginRight: "0px",
    fontFamily: "Inter",
    fontWeight: "500",
    fontSize: "16px",
    color: "#34485C",
  },
  "&.MuiButton-outlined": {
    width: "147px",
    height: "48px",
    marginRight: "20px",
    textTransform: "none",

    border: "1px solid #34485C",
    color: "#34485C",
    fontSize: "16px",
    fontWeight: "500",
    "&:hover": {
      borderColor: "#00B3FF",
    },
  },
  "&.MuiButton-contained": {
    width: "147px",
    height: "48px",
    textTransform: "none",
    backgroundColor: "#00B3FF",
    outline: "none",
    borderRadius: "5px",
    color: "#FFFFFF",
    fontSize: "20px",
    fontWeight: "500",
    "&:hover": {
      borderColor: "#00B3FF",
    },
    "&:focus": {
      outline: "none",
    },
  },
};

export const cursor_none = {
  "& .MuiOutlinedInput-input": {
    cursor: "not-allowed",
  },
};

export const errorStyle = {
  ".MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
    {
      border: "2px solid red",
    },
  "&:hover .MuiOutlinedInput-notchedOutline ,.MuiButton-outlined, .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
    {
      borderColor: "red",
    },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "red",
  },
  "&.MuiButton-contained": {
    width: "147px",
    height: "48px",
    textTransform: "none",
    backgroundColor: "red",
    borderRadius: "5px",
    color: "#FFFFFF",
    fontSize: "20px",
    fontWeight: "500",
    border: "none",
    "&:hover": {
      borderColor: "#00B3FF",
    },
    "&:focus": {
      borderColor: "#00B3FF",
      outline: "none",
    },
  },
};
