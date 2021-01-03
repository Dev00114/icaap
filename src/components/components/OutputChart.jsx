import React, { Component } from "react";
import Chart from "react-apexcharts";


const NUMBER_OF_COMPANIES = 10;

class OutputChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            series: [
                {
                    name: "Exposures",
                    type: "bar",
                    data: [],
                },
                {
                    name: "Unexpected Loss",
                    type: "bar",
                    data: [],
                },
                {
                    name: "PDs",
                    type: "line",
                    data: [],
                },
            ],
            options: {
                chart     : {type: "bar",height : 350,stacked: false},
                dataLabels: {enabled: false},
                stroke    : {width: [1, 1, 2]},
            },
        };
    }

    componentDidMount(){
        console.log(this.props.indata,"+++")
    }

   

    static getDerivedStateFromProps(props, state) {
        return {
            series: [
                {
                    name: "Exposures",
                    type: "bar",
                    data: props.indata.map((d) => d.EAD).slice(0, NUMBER_OF_COMPANIES),
                },
                {
                    name: "Unexpected Loss",
                    type: "bar",
                    data: props.outData.map((d) => d.UL).slice(0, NUMBER_OF_COMPANIES),
                },
                {
                    name: "PDs",
                    type: "line",
                    data: props.indata.map((d) => d.PD).slice(0, NUMBER_OF_COMPANIES),
                },
            ],
            options: {
                chart: {type: "bar", stacked: false, height:350 },
                dataLabels: {enabled: false},
                stroke: {width: [1, 1, 2]},
                plotOptions: {bar: {columnWidth: '45%'}},
                title: {
                    text: "Exposures, PDs, and C'Party Risk",
                    align: "center",
                    offsetX: 15,
                    offsetY: 20,
                    style: {
                        fontSize: "20px",
                        fontWeight: "normal",
                    },
                },
                colors: ["#767676", "#54a1c9", "#27709b"],
                xaxis: {
                    categories: props.indata.map((d) => d.Name).slice(0, NUMBER_OF_COMPANIES),
                },
                yaxis: [
                    {
                        axisTicks: {
                            show: false,
                        },
                        axisBorder: {
                            show: true,
                            color: "#437373",
                        },
                        labels: {
                            style: {
                                colors: "#537373",
                            },
                            formatter: function (value) {
                                return value / 1000000;
                            },
                        },
                        title: {
                            text: "Exposure (million)",
                            style: {
                                color: "#737373",
                            },
                        },
                        tooltip: {
                            enabled: true,
                        },
                    },
                    {
                        seriesName: "Income",
                        opposite: true,
                        axisTicks: {
                            show: true,
                        },
                        axisBorder: {
                            show: true,
                            color: "#737373",
                        },
                        labels: {
                            style: {
                                colors: "#737373",
                            },
                            formatter: function (value) {
                                return value / 1000000;
                            },
                        },
                        title: {
                            text: "Unexpected Loss (millions)",
                            style: {
                                color: "#737373",
                            },
                        },
                    },
                    {
                        seriesName: "PDs",
                        opposite: true,
                        axisTicks: {
                            show: true,
                        },
                        axisBorder: {
                            show: true,
                            color: "#737373",
                        },
                        labels: {
                            style: {
                                colors: "#737373",
                            },
                            formatter: function (value) {
                                return value.toFixed(2) * 100 + " %";
                            },
                        },
                        title: {
                            text: "PD",
                            style: {
                                color: "#737373",
                            },
                        },
                    },
                ],
                tooltip: {
                    float: {
                        enabled: true,
                        position: "topLeft",
                        offsetY: 30,
                        offsetX: 150,
                    },
                    style: {
                        fontSize: "8px",
                        fontFamily: "initial",
                    },
                    x: {
                        show: true,
                        formatter: undefined,
                    },
                    y: [
                        {
                            formatter: function (y) {
                                if (typeof y !== "undefined") {
                                    return y.toLocaleString();
                                }
                                return y;
                            },
                        },
                        {
                            formatter: function (y) {
                                if (typeof y !== "undefined") {
                                    return y.toLocaleString();
                                }
                                return y;
                            },
                        },
                        {
                            formatter: function (y) {
                                if (typeof y !== "undefined") {
                                    return y.toFixed(4) * 100 + " %";
                                }
                                return y;
                            },
                        },
                    ],
                },
                legend: {
                    horizontalAlign: "right",
                    offsetX: 40,
                },
            },
        };
    }
    render() {
        return (
            <Chart options={this.state.options} series={this.state.series} type="bar"/>
        );
    }
}

export default OutputChart;
