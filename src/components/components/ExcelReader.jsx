import React, { Component } from "react";
import XLSX from "xlsx";
import { make_cols } from "../utils/MakeColumns";
import ncdf from "../utils/normal_dist";
import NormSInv from "../utils/inverse_normal_dist";
import Paper from "@material-ui/core/Paper";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Grid from "@material-ui/core/Grid";
import IconButton from '@material-ui/core/IconButton';
import Dashboard from "./Dashboard";
import InputTable from "./InputTable";
import OutputTable from "./OutputTable";
import InputSummary from "./InputSummary";
import OutputChart from "./OutputChart";
import * as userAction from '../../actions/userActions';
import {connect} from 'react-redux';
import ToastServive from "react-material-toast";

const toast = ToastServive.new({ place: "topRight", duration: 2, maxCount: 8});
class ExcelReader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: {},
            columns: [
              {
                  "title": "Name",
                  "field": "Name",
                  "cellStyle": { "width": "30%", "maxWidth": "30%", "fontSize": 12, "textAlign": "left"},
                  "headerStyle": { "width": "30%", "maxWidth": "30%", "textAlign": "left"}
              },
              {
                  "title": "Exposure",
                  "field": "EAD",
                  "type": "numeric",
                  "cellStyle": { "width": 20, "maxWidth": 20, "fontSize": 12, "textAlign": "left"},
                  "headerStyle": { "width": 50, "maxWidth": 50, "textAlign": "left"}
              },
              {
                  "title": "Def. Prob.",
                  "field": "PD",
                  "type": "numeric",
                  "cellStyle": { "width": 25, "maxWidth": 25, "fontSize": 12, "textAlign": "left"},
                  "headerStyle": { "width": 20, "maxWidth": 20, "textAlign": "left"}
              },
              {
                  "title": "LGD",
                  "field": "LGD",
                  "type": "numeric",
                  "cellStyle": { "width": 20, "maxWidth": 20, "fontSize": 12, "textAlign": "left"},
                  "headerStyle": {"width": 20,"maxWidth": 12,"textAlign": "left"}
              },
              {
                  "title": "Corr",
                  "field": "w",
                  "type": "numeric",
                  "cellStyle": { "width": 20, "maxWidth": 20, "fontSize": 12, "textAlign": "left"},
                  "headerStyle": { "width": 20, "maxWidth": 20, "textAlign": "left"}
              }
            ],
            data: [
              { "Name": "Bank of America","PD": 0.0101,"LGD": 0.5,"EAD": 34000000,"w": 0.2,"tableData": { "id": 0}},
              { "Name": "Goldman Sachs","PD": 0.04946,"LGD": 0.5,"EAD": 24000000,"w": 0.2,"tableData": {"id": 1}},
              { "Name": "NatWest", "PD": 0.015, "LGD": 0.5, "EAD": 21780000, "w": 0.2, "tableData": { "id": 2 }},
              { "Name": "Virgin Bank", "PD": 0.02, "LGD": 0.5, "EAD": 15097828, "w": 0.2, "tableData": {"id": 3}},
              { "Name": "Northern Trust", "PD": 0.03, "LGD": 0.5, "EAD": 14923886, "w": 0.2, "tableData": {"id": 4}}
            ],
            cols: [],
            output: [],
            inputSummary: {},
            outputSummary: {},
        };
        this.handleFile = this.handleFile.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    componentDidMount() {
        const op = this.runComputation(this.state.data);
        const is = this.computeInputSummary(this.state.data);
        const os = this.computeOutputSummary(op);
        this.setState({ outputSummary: os, inputSummary: is, output: op});
      }
      
    componentDidUpdate(prevProps){
      if(this.props.rows === undefined){
        toast.remove("welcome to userpage")
      }else{
        if(this.props.rows !== prevProps.rows){
          this.setState({
            data : this.props.rows
          })
          const op = this.runComputation(this.props.rows);
          const os = this.computeOutputSummary(op);
          const is = this.computeInputSummary(this.props.rows);
          this.setState({ outputSummary: os, inputSummary: is, output: op});
        }
        
      }
    }

    runComputation(data) {
        let outData = [];
        data.forEach(function (d) {
            let ul = computeUL(d.PD, d.LGD, d.EAD, d.w);
            let el = computeEL(d.PD, d.LGD, d.EAD);
            let cvar = Math.round(ul - el);
            outData.push({ Name: d.Name, UL: ul, EL: el, CVAR: cvar });
        });
        return outData;
    }
    computeInputSummary(inputData) {
        let sumEAD = 0;
        let sumPD = 0;
        let noOfCparties = inputData.length;
        let maxPD = 0,
            maxEAD = 0;
        inputData.forEach(function (d) {
            sumEAD += d.EAD;
            sumPD += d.PD;
            if (d.PD > maxPD) maxPD = d.PD;
            if (d.EAD > maxEAD) maxEAD = d.EAD;
        });
        let avgPD = sumPD / noOfCparties;
        let avgEAD = sumEAD / noOfCparties;

        const summary = {
            avgPD: (avgPD * 100).toFixed(2) + "%",
            avgEAD: avgEAD,
            sumEAD: sumEAD,
            noOfCParties: noOfCparties,
            maxPD: (maxPD * 100).toFixed(2) + "%",
            maxEAD: maxEAD,
        };
        return summary;
    }
    computeOutputSummary(outputData) {
        console.log(JSON.parse(JSON.stringify(outputData)),"outputdata");
        if(outputData.length  == 0){
          return this.preventage_error();
        }else{
          let sumEL = outputData.map((d) => d.EL).reduce((prev, next) => prev + next);
          let sumUL = outputData.map((d) => d.UL).reduce((prev, next) => prev + next);
          let sumCVAR = outputData.map((d) => d.CVAR).reduce((prev, next) => prev + next);
          let summary = { sumEL: sumEL, sumUL: sumUL, sumCVAR: sumCVAR };
          return summary;
        }
    }

    preventage_error(){
      toast.error("no data");
      const outputData = [{Name: "Bank of America", UL: 0, EL: 0, CVAR: 0}];
      console.log(outputData);
      let sumEL = outputData.map((d) => d.EL).reduce((prev, next) => prev + next);
      let sumUL = outputData.map((d) => d.UL).reduce((prev, next) => prev + next);
      let sumCVAR = outputData.map((d) => d.CVAR).reduce((prev, next) => prev + next);
      let summary = { sumEL: sumEL, sumUL: sumUL, sumCVAR: sumCVAR };
      return summary;
    }

    handleChange(e) {
      const files = e.target.files;
      if (files && files[0]) {
          this.handleFile(files[0]);
          this.setState({ file: files[0] });
      }
    }

    handleFile(file) {
        /* Boilerplate to set up FileReader */
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
        reader.onload = (e) => {
            /* Parse data */
            try {
                const bstr = e.target.result;
                const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array", bookVBA: true });
                /* Get first worksheet */
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                /* Convert array of arrays */
                const data = XLSX.utils.sheet_to_json(ws);
                /* Update state */
                this.setState({ data: data, cols: make_cols(ws["!ref"]) }, () => {
                    console.log(JSON.stringify(this.state.data, null, 2));
                });
            } catch (error) {
                alert("Wrong Input Format!");
            }
            const op = this.runComputation(this.state.data);
            const is = this.computeInputSummary(this.state.data);
            const os = this.computeOutputSummary(op);

            this.setState({ outputSummary: os, inputSummary: is, output: op });
        };

        if (rABS) {
            reader.readAsBinaryString(file);
        } else {
            reader.readAsArrayBuffer(file);
        }
    }

  dataChange(data){
    console.log(data);
    // this.setState({ data : data })
  }

    render() {
        return (
          <div style={{ marginTop: "30px" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper>
                        <InputSummary summary={this.state.inputSummary} />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper style = {{marginTop : "-8px"}}>
                    <input accept=".csv" id="contained-button-file" type="file" style={{ display: "none" }} onChange={this.handleChange}/>
                    <label htmlFor="contained-button-file" style={{ paddingTop: "", width: "fit-content" }}>
                      <IconButton variant="contained" component="span" color="secondary">
                        <CloudUploadIcon />
                      </IconButton>
                    </label>
                    <InputTable data={this.state.data} that = {this}></InputTable>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper>
                    <OutputChart indata={this.state.data} outData={this.state.output}/>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Paper>
                    <Dashboard data={this.state.output} inputSummary={this.state.inputSummary} outputSummary={this.state.outputSummary}/>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper>
                    <OutputTable data={this.state.output}></OutputTable>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      );
    }
}
function computeUL(pd, lgd, ead, rho) {
  let ul = ead * lgd * ncdf((NormSInv(pd) - rho * NormSInv(1 - 0.995)) / Math.sqrt(1 - rho * rho), 0, 1);
  return Math.round(ul);
}
function computeEL(pd, lgd, ead) {
  return Math.round(pd * lgd * ead);
}

const mapStateToProps = state => ({
   rows  : state.userReducer.addrow
});

export default connect(mapStateToProps,userAction)(ExcelReader);
