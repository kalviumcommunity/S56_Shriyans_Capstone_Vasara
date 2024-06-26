import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import EditIcon from '@mui/icons-material/Edit';
import BlockModal from "./BlockModal";
import axios from "axios";
import EditModal from "./EditModal";

const columns = [
  {id:"Sr.No", label: "Sr.No", minWidth: 80, align: "left"},
  { id: "Name", label: "Name", minWidth: 170 },
  { id: "age", label: "Age", minWidth: 60 },
  { id: "gender", label: "Gender", minWidth: 60 },
  { id: "role", label: "Role", minWidth: 60, align: "right" },
  { id: "email", label: "Email", minWidth: 170, align: "right" },
  { id: "actions", label: "Action", minWidth: 100, align: "right" }, 
];

const StickyHeadTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [rows, setRows] = useState([]);
  useEffect(() => {
    axios.get(`${API_URI}/getallusers`).then((res) => {
      setRows(res.data);
    });
  }, []);

  const handleEdit = (id) => {
    console.log(id)
  }
  return (
    <Paper sx={{ width: "100%"}}>
      <TableContainer sx={{ height:'82vh'}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,i) => (
              <TableRow hover key={row.id || i}>
                {columns.map((column) => {
                  if (column.id === 'actions') {
                    return (
                      <TableCell key={column.id} align={column.align} sx={{display:"flex", alignItems:"center"}}>
                        <BlockModal props={{id:row._id,delete:'blockuser' }} />
                          <EditModal props={row._id} />
                      </TableCell>
                    );
                  } else if(column.id === 'Sr.No') {
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {i+1}
                      </TableCell>
                    );
                  }
                  else if(column.id === 'Name') {
                    return (
                      <TableCell key={column.id} align={column.align} sx={{textTransform: 'capitalize'}}>
                        {row.firstName} {row.lastName}
                      </TableCell>
                    );
                  }
                   else {
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {row[column.id]}
                      </TableCell>
                    );
                  }
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ height: 50, position: "absolute", bottom: 0, right: 0, backgroundColor: "white", width: "100%"}}
      />
    </Paper>
  );
};

export default StickyHeadTable;
