import React, { forwardRef, useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";

import "./style.scss";
import { useGetStoresQuery } from "../../../api/stores";
import { autocomplete } from "../orderHelper/styles";
import { Box } from "@mui/system";
import { sortArrOfData } from "../../../constants/sorting";
import { useSelector } from "react-redux";

const HubSelect = forwardRef(({ isError, isLoading, ...props }, ref) => {
  const { data: stores, isFetching: storesLoadingStatus } = useGetStoresQuery(
    null,
    { refetchOnMountOrArgChange: false }
  );
  const currentUser = useSelector((state) => state.auth.currentUser);

  const [hubList, setHubList] = useState([]);

  useEffect(() => {
    if (!stores) return;
    const hubs = sortArrOfData(stores, "name");
    hubs && setHubList([{ name: "", id: "" }, ...hubs]);
  }, [stores, storesLoadingStatus, currentUser]);

  return (
    <Autocomplete
      disabled={isLoading}
      noOptionsText={"Select Hub"}
      options={hubList}
      value={stores?.name}
      getOptionLabel={(option) => option?.name}
      sx={{
        width: 300,
        ...autocomplete,
      }}
      blurOnSelect={true}
      ref={ref}
      {...props}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          {option.name}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Select Hub"
          inputProps={{
            ...params.inputProps,
          }}
          required={false}
        />
      )}
    />
  );
});

export default HubSelect;
