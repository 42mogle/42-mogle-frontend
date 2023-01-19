import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import apiManager from "api/apiManager";

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
  console.log(data);
  const [selectionModel, setSelectionModel] = useState([]);

  const handleCellClick = async (event) => {
    if (event.field === "__check__") {
      const body = {};
      if (event.value === false) {
        try {
          //TODO: 오퍼레이터 추가 API로 변경
          const response = await apiManager.post("operator/operator-add", body);
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          //TODO: 오퍼레이터 제거 API로 변경
          const response = await apiManager.post(
            "operator/operator-delete",
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
            return (row);
          }
        })
        .map((row) => row.intraId)
    );
  }, [data]);

  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            오퍼레이터 권한 수정
          </Typography>
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
        </CardContent>
      </Card>
    </Grid>
  );
}

export default OperatorTable;
