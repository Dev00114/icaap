import React, { Component } from "react";
import ToastServive from "react-material-toast";
import UserService from "../services/user.service";

const toast = ToastServive.new({
  place: "topRight",
  duration: 2,
  maxCount: 8,
});

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: []
    };

    this.boxchange.bind(this);
  }

  componentDidMount() {
    UserService.getAdminBoard().then(
      response => {
        const changeData = response.data.user;
        console.log(changeData);
        this.setState({
          content: changeData
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }


  boxchange(e){
    const username = e.target.getAttribute("username");
    if(username === "mustafa"){
      toast.error("Can't control about Admin!");
      return;
    }
    if(e.target.checked === true){
      UserService.setAllowed(username).then(response => {
        toast.success(response.data.message);  
      })
      .catch(err => {
        // toast.error(err);
      })
    }else{
      if(e.target.checked ===false){
        UserService.setUnallowed(username).then(response => {
          toast.success(response.data.message)
        }).catch(err => {
          // toast.error(err);
        })
      }
    }
  }

  render() {
    return (
      <div className="userlist">
        <h3>User list</h3>
        <table className= "table table-dark table-hover">
            <thead>
              <tr>
                <th>User Id</th>
                <th>User Name</th>
                <th>User Email</th>
                <th>User Roles</th>
                <th>User State</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.content.map((row) => {
                  return (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>{row.name}</td>
                      <td>{row.email}</td>
                      <td>{row.name === "mustafa"?"Admin":"User"}</td>
                      <td>
                        <input type = "checkbox" username = {row.name} onChange = {this.boxchange} defaultChecked = {row.allowed === 1 ? true:false}></input>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
            <tfoot></tfoot>
          </table>
      </div>
    );
  }
}
