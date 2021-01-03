import React, { Component } from "react";
import Chart from "react-apexcharts";
import * as userAction from '../../actions/userActions';
import {connect} from 'react-redux';


class DonutChart extends Component {
    constructor(props) {
      super(props);
      this.state = {
        series: [],
        options: {
          labels: ["UNEXPECTED LOSS", "CVaR", "EXPECTED LOSS"],
          chart: { width: 300, type: 'donut'},
          dataLabels: {enabled: true},
          legend: {formatter: function (val, opts) {return val}},
		      colors: ["#3690c0", "#fdcdac", "#a6611a"],
          responsive: [{breakpoint: 480,options: {chart: {width: 300},legend: {position: 'bottom'}}}]
        }
      };
    }

    componentDidUpdate(){
      console.log(this.props.rows)
    }

    static getDerivedStateFromProps(props, state) {
        if (props.data.length > 0) {
            const sumUL = props.data.map((d) => d.UL).reduce((prev, next) => prev + next);
            const sumEL = props.data.map((d) => d.EL).reduce((prev, next) => prev + next);
            const sumCVAR = props.data.map((d) => d.CVAR).reduce((prev, next) => prev + next);
            const labels = Object.keys(props.data[0]);
            return {
                series: [sumUL, sumCVAR, sumEL],
                labels: labels
            };
        }
        return state;
    }
    render() {
        return (
          <div  id="chart" style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
            <Chart options={this.state.options} series={this.state.series} type="donut" width="400"/>
          </div>
        );
    }
}

const mapStateToProps = state => ({
   rows  : state.userReducer.addrow
});

export default connect(mapStateToProps,userAction)(DonutChart);