import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import * as userAction from '../../actions/userActions';
import {connect} from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: "flex",
        fontSize: 42,
        fontWeight: "bold",
        flexGrow: 1,
    },
    plus: {
        fontSize: 36,
        fontWeight: "lighter",
        flexGrow: 1,
        color: "green",
    },
    navbar: {
        backgroundColor: "#67a014d1",
    },
}));

function Navbar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar className={classes.navbar} position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                    ></IconButton>
                    <Typography variant="h5" className={classes.title}>
                        ICAAP
                        <sup>
                            <div className={classes.plus}>+</div>
                        </sup>
                    </Typography>

                    <Button color="inherit">About Us</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}


const mapStateToProps = state => ({
});

export default connect(mapStateToProps,userAction)(Navbar);