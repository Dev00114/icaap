import React, {useEffect} from "react";
import DonutChart from "./DonutChart";
import Paper from "@material-ui/core/Paper";
import { CardContent } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import * as userAction from '../../actions/userActions';
import {connect} from 'react-redux';

const useStyles = makeStyles({
    summary: {
        display: "flex",
        flexWrap: "wrap",
		height : "150px",
    },
    root: {
        width: "22%",
        height: 80,
        margin: "5px",
    },
    bullet: {
        display: "inline-block",
        margin: "2 2px",
        transform: "scale(0.8)",
    },
    title: {
        fontSize: 16,
    },
    subTitle: {
        fontSize: 16
    },
    pos: {
        marginBottom: 12,
    },
});



function Dashboard(props) {
    const classes = useStyles();
    return (
      <Paper>
        <br />
        <div
          style={{
            marginLeft: "30px",
			fontSize: "23px",
			display: "flex",
			justifyContent: "left",
			fontFamily: "inherit",
          }}
        >
          C'Party Default Risk
        </div>
        <DonutChart data={props.data}></DonutChart>
		<div className={classes.summary}>
                <CardContent className={classes.root}>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {<br />}
                    </Typography>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Sum
                    </Typography>
                    <Typography className={classes.title}>% of the portfolio</Typography>
                </CardContent>
                <CardContent className={classes.root}>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        EXPECTED LOSS
                    </Typography>
                    <Typography className={classes.subTitle}>
                        {Math.round(props.outputSummary.sumEL).toLocaleString() || 0}
                    </Typography>
                    <Typography className={classes.subTitle}>
                        {props.outputSummary.sumEL == 0? 0 + "%" : ((props.outputSummary.sumEL / props.inputSummary.sumEAD) * 100).toFixed(2)+"%" || 0}
                    </Typography>
                </CardContent>
                <CardContent className={classes.root}>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        UNEXPECTED LOSS
                    </Typography>
                    <Typography className={classes.subTitle}>
                        {Math.round(props.outputSummary.sumUL).toLocaleString() || 0}
                    </Typography>
                    <Typography className={classes.subTitle}>
                        {props.outputSummary.sumUL == 0 ? 0 + "%" : ((props.outputSummary.sumUL / props.inputSummary.sumEAD) * 100).toFixed(2) + "%" || 0}
                    </Typography>
                </CardContent>
                <CardContent className={classes.root}>
                    <Typography className={classes.title} color="textSecondary" gutterBottom >
                        CVaR
                    </Typography>
                    <Typography className={classes.subTitle}>
                        {Math.round(props.outputSummary.sumCVAR).toLocaleString() || 0}
                    </Typography>
                    <Typography className={classes.subTitle}>
                        {props.outputSummary.sumCVAR == 0 ? 0 + "%" : ((props.outputSummary.sumCVAR / props.inputSummary.sumEAD) * 100).toFixed(2) + "%" || 0}
                    </Typography>
                </CardContent>
            </div>
      </Paper>
    );
}

const mapStateToProps = state => ({
   rows  : state.userReducer.addrow
});

export default connect(mapStateToProps,userAction)(Dashboard);