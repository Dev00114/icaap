import React, { useState, useEffect } from 'react';
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
import ToastServive from "react-material-toast";
import DataService from "../../services/data.service";
import * as userAction from '../../actions/userActions';
import {connect} from 'react-redux';

const toast = ToastServive.new({ place: "topRight", duration: 2, maxCount: 8});

function InputTable(props) {
    const [columns] = useState([
        {
          title: "Name",
          field: "Name",
          cellStyle: { width: "15%", maxWidth: "15%", fontSize: 12},
          headerStyle: { width: "15%", maxWidth: "15%"},
        },
        {
          title: "Exposure",
          field: "EAD",
          cellStyle: { width: "20%", maxWidth: "20%", fontSize: 12, textAlign: "left"},
          headerStyle: { width: "20%", maxWidth: "20%", textAlign: "left"},
        },
        {
          title: "Def. Prob.",
          field: "PD",
          cellStyle: { width: "25%", maxWidth: "25%", fontSize: 12, textAlign: "left"},
          headerStyle: { width: "25%", maxWidth: "25%", textAlign: "left"},
        },
        {
          title: "LGD",
          field: "LGD",
          cellStyle: { width: "30px", maxWidth: "30px", fontSize: 12, textAlign: "left"},
          headerStyle: { width: 20, maxWidth: 12, textAlign: "left"},
        },
        {
          title: "Corr",
          field: "w",
          cellStyle: { width: 20, maxWidth: 20, fontSize: 12, textAlign: "left"},
        },
      ]);
    const [data, setData] = useState(props.data);
    return (
      <div style={{fontSize: 10, maxWidth: "100%", margin: "auto", padding: "0 0"}}>
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
            rowStyle: { color: "black", backgroundColor: "#eeeeee", height: "50px"},
            actionsCellStyle: { fontSize: "small"},
            showTitle: true,
            search: true,
            padding: "dense",
            exportButton: true,
          }}
          title="Editable Preview"
          columns={columns}
          data={data}
          editable={{
            onBulkEditRow: (changes) => {console.log(changes)},
            onBulkUpdate: (changes) => new Promise((resolve, reject) => { setTimeout(() => { resolve(); }, 1000)}),
            onRowAddCancelled: (rowData) => toast.info("Row adding cancelled"),
            onRowUpdateCancelled: (rowData) =>toast.info("Row editing cancelled"),
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  var verifiedData  = {
                    Name : newData.Name,
                    PD   : parseFloat(newData.PD),
                    LGD  : parseFloat(newData.LGD),
                    EAD  : parseFloat(newData.EAD),
                    w    : parseFloat(newData.w)
                  }
                  let new_Data = verifiedData;
                  setData([...data, new_Data]);
                  var propsData = data;
                  propsData.push(new_Data);
                  props.that.dataChange(propsData);
                  props.addrow(propsData);
                  DataService.addRow(data).then((response) => {
                    toast.success(response.data.message);
                  })
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...data];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  setData([...dataUpdate]);
                  props.addrow(dataUpdate);
                  DataService.updaterow().then((response) => {
                    toast.success(response.data.message);
                  })
                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataDelete = [...data];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  setData([...dataDelete]);
                  props.addrow(dataDelete);
                  console.log(dataDelete);
                  DataService.deleterow().then((response) => {
                    toast.success(response.data.message);
                  })
                  resolve();
                }, 1000);
              }),
          }}
        />
      </div>
    );
}

const mapStateToProps = state => ({
  addrow  : state
});

export default connect(mapStateToProps,userAction)(InputTable);