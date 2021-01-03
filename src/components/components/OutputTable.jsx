import React, {useState} from "react";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import SaveAlt from "@material-ui/icons/SaveAlt";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Add from "@material-ui/icons/Add";
import Check from "@material-ui/icons/Check";
import FilterList from "@material-ui/icons/FilterList";
import Remove from "@material-ui/icons/Remove";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import MaterialTable from "material-table";
import DataService from "../../services/data.service";
import ToastServive from "react-material-toast";

const toast = ToastServive.new({ place : "topLeft", duration : 2, maxCount : 8,})

export default function OutputTable(props) {
    const [column] = useState([
      {
          title: "Name",
          field: "Name",
          cellStyle: { width: "30%", maxWidth: "30%", fontSize: 12, textAlign: "left"},
          headerStyle: { width: "30%", maxWidth: "30%", textAlign: "left"}
      },
      {
          title: "Expected Loss",
          field: "EL",
          type: "numeric",
          cellStyle: { width: 20, maxWidth: 20, fontSize: 12, textAlign: "left"},
          headerStyle: { width: 50, maxWidth: 50, textAlign: "left"}
      },
      {
          title: "Unexpected Loss",
          field: "UL",
          type: "numeric",
          cellStyle: { width: 25, maxWidth: 25, fontSize: 12, textAlign: "left"},
          headerStyle: { width: 20, maxWidth: 20, textAlign: "left"},
      },
      {
          title: "CVaR",
          field: "CVAR",
          type: "numeric",
          cellStyle: { width: 20, maxWidth: 20, fontSize: 12, textAlign: "left"},
          headerStyle: { width: 20, maxWidth: 20, textAlign: "left"},
      }
    ]);

    const [tData, setTdata] = useState(props.data);

    var tableData = JSON.parse(JSON.stringify(props.data));

    for (var i = 0; i < tableData.length; i++) {
      for(var j in tableData[i])
      {
          if(typeof tableData[i][j] == 'number')
          {
            tableData[i][j] = tableData[i][j].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
          }
      }
    }

    return (
      <div style={{ padding: "0 0" }}>
        <MaterialTable
          icons={{
            Check: Check,
            DetailPanel: ChevronRight,
            Delete: DeleteOutline,
            Export: SaveAlt,
            Filter: FilterList,
            FirstPage: FirstPage,
            LastPage: LastPage,
            NextPage: ChevronRight,
            PreviousPage: ChevronLeft,
            Search: Search,
            ThirdStateCheck: Remove,
            Add: Add,
            SortArrow: ArrowDownward,
            Clear: Clear,
            Edit: Edit,
            ViewColumn: ViewColumn,
            ResetSearch: Clear,
          }}
          options={{
            actionsColumnIndex: -1,
            headerStyle: { fontSize: 12, fontWeight: "bold", backgroundColor: "white", color: "black"},
            rowStyle: { backgroundColor: "#eeeeee", height: "50px"},
            showTitle: true,
            sorting: false,
            search: true,
            padding: "dense",
            pageSize: 10,
            exportButton: true,
            paginationType: "stepped"
          }}
          title="C'Party Default Risk"
          columns={column}
          data={tableData}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  let new_Data = (JSON.parse(JSON.stringify(newData)));
                  setTdata([...tData, new_Data]);
                  DataService.addRow(tData).then((response) => {
                    toast.success(response.data.message);
                  });
                  resolve();
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  const dataUpdate = [...tData];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  setTdata([...dataUpdate]);
                  DataService.updaterow().then((response) => {
                    toast.success(response.data.message);
                  })
                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  const dataDelete = [...tData];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  setTdata([...dataDelete]);
                  DataService.deleterow().then((response) => {
                    toast.success(response.data.message);
                  })
                  resolve();
                }, 600);
              }),
          }}
        />
      </div>
    );
}
