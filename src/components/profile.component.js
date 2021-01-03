import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div className="profileCard">
        <h3 style = {{textAlign: "center",textTransform:"capitalize",color:"green"}}>{currentUser.username}</h3>
        {(this.state.userReady) ?
        <div className = "row">
          <div className = "col-md-6" style = {{color : "red"}}>
              <p style = {{display:"flex",justifyContent:"space-between"}}><strong>Token </strong><strong>:</strong></p>
              <p style = {{display:"flex",justifyContent:"space-between"}}><strong>Id </strong><strong>:</strong></p>
              <p style = {{display:"flex",justifyContent:"space-between"}}><strong>Email </strong><strong>:</strong></p>
              <p style = {{display:"flex",justifyContent:"space-between"}}><strong>Auth </strong><strong>:</strong></p>
          </div>
          <div className = "col-md-6">
              <p>{currentUser.accessToken.substring(0, 10)} ...{" "}</p>
              <p>{currentUser.id}</p>
              <p>{currentUser.email}</p>
              <p>{currentUser.roles &&currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}</p>
          </div>
      </div>: null}
      </div>
    );
  }
}
