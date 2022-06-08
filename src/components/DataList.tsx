import React, { FC, Dispatch, SetStateAction,useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: "task",
      headerName: 'Task',
      width: 150,
      editable: true,
    },
    {
      field: "createAt",
      headerName: "Create At",
      type: "dateTime",
      width: 200,
      editable: true,
    },
    {
      field: "deadline",
      headerName: "Deadline",
      type: "dateTime",
      width: 200,
      editable: true,
    },
    {
      field: "toDeadline",
      headerName: "To Deadline",
      type: "dateTime",
      width: 150,
      editable: true,
    },
    {
      field: "progress",
      headerName: "Progress",
      type: "number",
      width: 140,
      editable: true,
    },
]



export const ControlledSelectionGrid = ({rows, setRows}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [buttonActivate, setButtonActivate] = useState<boolean>(false);
        
  const deleteData: () => void = () => {
      const deleteRows = [];
      for (const selectedRow of selectedRows) {
          deleteRows.push(selectedRow)
      }
      const newRow = rows.filter((row) => {
        return ! deleteRows.includes(row);
      });
      setRows(newRow)
  }

  
    
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRows = rows.filter(
              (row) => selectedIDs.has(row.id)
              );
          setSelectedRows(selectedRows);
        }}
        sx={{
          marginBottom: "50px"
        }}
      />
      {/* <pre style={{ fontSize: 10 }}>
        {
          JSON.stringify(selectedRows, null, 4)
        }        
      </pre> */}
      <button type='button' onClick={deleteData}>delete</button>
    </div>
  );
}
