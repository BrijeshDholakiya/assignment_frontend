import React, { useState, memo, Fragment } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
} from "@mui/material";

import "./style.css";
import { Loader } from "../../shared/loading/Loader";
import { isArray } from "../../../constants/validation/errorHandlers";
import { useSelector } from "react-redux";
import { actions } from "../../../redux/store/store";

const DisplayTable = memo((props) => {
  const { data, column, isLoading, count } = props;

  const queryObj = useSelector((state) => state?.query?.query);
  const [page, setPage] = useState(queryObj?.page);
  //   const [rowsPerPage, setRowsPerPage] = useState(queryObj?.limit);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
    actions.query.selectQuery({ page: newPage });
  };

  return (
    <Fragment>
      <TableContainer>
        {isLoading ? (
          <Loader height={"60vh"} />
        ) : !isArray(data) || !data?.length ? (
          <NoResult tabHeight={"60vh"} />
        ) : (
          <Table>
            <TableHead>
              <TableRow style={{ background: "#dadada" }}>
                {column?.map((item, headIdx) => {
                  return (
                    <TableCell style={{ fontWeight: "600" }} key={headIdx}>
                      {item?.label}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {isArray(data) &&
                data?.map((row, index) => {
                  const { _id } = row || {};
                  return (
                    <TableRow key={_id} hover>
                      {column?.map((columnData, colIdx) => {
                        const { name, renderer, className } = columnData || {};
                        return (
                          <TableCell
                            className={className || ""}
                            key={`${index}__${colIdx}`}
                          >
                            {renderer
                              ? renderer(row, index) || "-"
                              : row[name] || "-"}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              {/* {<EmptyRows emptyRows={emptyRows} />} */}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      {!isLoading && (
        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={count < 5 ? queryObj?.page * 5 + data?.length : -1}
          rowsPerPage={5}
          page={page}
          onPageChange={handleChangePage}
          //   onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Fragment>
  );
});

export default DisplayTable;

export const NoResult = ({ tabHeight }) => (
  <div className={"no_results"} style={{ height: tabHeight || "inherit" }}>
    <p>No Results Found!</p>
  </div>
);

/*
 *   For Changing limit Uncomment this function.
 */
//   const handleChangeRowsPerPage = ({ target: { value } }) => {
//     setRowsPerPage(parseInt(value, 10));
//     setPage(0);
//   };

//   const emptyRows =
//     page > 0 ? Math.max(0, (1 + page) * 5 - data?.length) * 53 : 0;

// const EmptyRows = memo(({ emptyRows }) => {
//   return (
//     emptyRows > 0 && (
//       <TableRow
//         style={{
//           height: emptyRows,
//         }}
//       >
//         <TableCell colSpan={12} />
//       </TableRow>
//     )
//   );
// });
