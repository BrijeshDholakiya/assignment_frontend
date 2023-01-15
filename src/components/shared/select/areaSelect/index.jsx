import { forwardRef, useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useGetAllAreaQuery } from "../../../api/area";
import { errorStyle, inputs_style } from "../../../styles/mui_styles/styles";

const AreaSelect = forwardRef(({ isError, disabled, ...props }, ref) => {
  const { data: areas, isFetching } = useGetAllAreaQuery(null, {
    refetchOnFocus: true,
  });

  const [areaList, setAreaList] = useState([]);

  const styleObj = isError ? { ...errorStyle } : { ...inputs_style };

  useEffect(() => {
    if (isFetching || !areas) return;
    const area =
      Array.isArray(areas?.result) && areas?.result?.map(({ area }) => area);
    area && setAreaList(["", ...area]);
  }, [areas, isFetching]);

  return (
    <Autocomplete
      sx={{
        ...styleObj,
      }}
      disabled={disabled}
      defaultValue={""}
      options={Array.isArray(areaList) && areaList}
      blurOnSelect={true}
      ref={ref}
      {...props}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Select Area"
          inputProps={{
            ...params.inputProps,
          }}
        />
      )}
    />
  );
});

export default AreaSelect;
