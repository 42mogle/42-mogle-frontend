import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";

import apiManager from "@api/apiManager";

const columns = [
  { field: "intraId", headerName: "인트라 ID", width: 200 },
  { field: "isOperator", headerName: "오퍼레이터 권한", width: 200 },
];

const CustomDataGrid = styled(DataGrid)(({ theme }) => ({
  "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer":
    {
      display: "none",
    },
}));

function OperatorTable(props) {
  const { data } = props;
  const [selectionModel, setSelectionModel] = useState([]);

  const handleCellClick = async (event) => {
    const body = { intraId: event.id };
    if (event.field === "__check__") {
      if (event.value === false) {
        try {
          const response = await apiManager.post("operator/add-operator", body);
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const response = await apiManager.post(
            "operator/delete-operator",
            body
          );
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  useEffect(() => {
    setSelectionModel(
      data
        .filter((row) => {
          if (row.isOperator === "✅") {
            return row;
          }
        })
        .map((row) => row.intraId)
    );
  }, [data]);

  return (
    <>
      <Alert severity="warning">
        오퍼레이터 권한 제거 시, 자기 자신은 가장 마지막에 제거하시기 바랍니다.
      </Alert>
      <Box sx={{ mt: 1, height: 700, width: "100%" }}>
        <CustomDataGrid
          rows={data}
          columns={columns}
          getRowId={(row) => row.intraId}
          initialState={{
            sorting: { sortModel: [{ field: "isOperator", sort: "asc" }] },
          }}
          checkboxSelection
          disableSelectionOnClick
          onCellClick={handleCellClick}
          selectionModel={selectionModel}
          onSelectionModelChange={(event) => {
            setSelectionModel(event);
          }}
        />
      </Box>
    </>
  );
}

export default OperatorTable;
