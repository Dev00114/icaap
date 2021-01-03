import React, { Component } from "react";
import ExcelReader from "./components/ExcelReader";
import Grid from "@material-ui/core/Grid";
import * as userAction from '../actions/userActions';
import {connect} from 'react-redux';

class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount(){
    this.props.login("qweqweqweqwe");
  }

  render() {
    return (
      <Grid container spacing = {3}>
        <ExcelReader />
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  user : state
});

export default connect(mapStateToProps,userAction)(BoardUser);