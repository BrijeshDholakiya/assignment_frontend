import { CircularProgress } from "@mui/material";

import "./style.css";

export const Loader = ({ height }) => {
  return (
    <div className="loader_container" style={{ height }}>
      <CircularProgress />
    </div>
  );
};
