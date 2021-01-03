import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer.js';
import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

const store = createStore(rootReducer, applyMiddleware(thunk));

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark navstyle" style = {{fontFamily : "initial",textTransform:"uppercase"}}>
            <Link to={"/"} className="navbar-brand">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSoaCzoUbMTgxT-lUaiIE6AZ1m2Lmem-9grXg&usqp=CAU" alt="Girl in a jacket" width="500" height="600" height = "20px" width = "90px"></img>
            </Link>
            <div className="navbar-nav mr-auto" style  = {{marginTop : "15px"}}>
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  {/* <i className="fa fa-home" style  = {{fontSize : "32px",marginTop : "20px"}}></i> */}Home
                </Link>
              </li>

              {showModeratorBoard && (
                <li className="nav-item">
                  <Link to={"/mod"} className="nav-link">
                    Moderator Board
                  </Link>
                </li>
              )}

              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Admin Board
                  </Link>
                </li>
              )}

              {currentUser && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    statistics
                  </Link>
                </li>
              )}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    <div id = "container">
                      <div id = "name">
                        {(currentUser.username).charAt(0)}
                      </div>
                    </div>
                  </Link>
                </li>
                <li className="nav-item" style = {{marginTop: "10px"}}>
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    <i className="fa fa-sign-out" style  = {{fontSize : "32px"}}></i>
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    <i className="fa fa-sign-in" style  = {{fontSize : "32px"}}></i>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    <i className="fa fa-user" style  = {{fontSize : "32px"}}></i>
                  </Link>
                </li>
              </div>
            )}
          </nav>

          <Provider store={store}>
              <React.Suspense>
                <div className="AppStyle">
                  <Switch>
                    <Route exact path={["/", "/home"]} component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/profile" component={Profile} />
                    <Route path="/user" component={BoardUser} />
                    <Route path="/mod" component={BoardModerator} />
                    <Route path="/admin" component={BoardAdmin} />
                  </Switch>
                </div>
              </React.Suspense>
          </Provider>
          {/* <div className = "middle-section">
              <div className = "container">
                <p style = {{padding : "50px 0", color : "white"}}>CAAP (Internal Capital Adequacy Assessment Process), part of Pillar 2 within the Basel Framework, represents a financial institution’s own assessment of the capital needed to run the business. This capital may differ from the minimum regulatory capital requirement since, for instance, a financial institution may include risks that are not formally subject to the minimum regulatory capital (e.g. liquidity risk, reputational risk, business risk or interest rate risk in the banking book) or may use different parameters or methodologies for credit risk, market risk or operational risk.<br />Economic capital can be expressed as capital needed against unexpected future losses at a selected confidence level for a certain time horizon. It is a measure of risk, usually in a currency and relates capital to any entity specific risk, regardless of the existence of assets. Economic capital is a forward-looking measure of capital adequacy based on a probabilistic assessment of potential future losses. The development and implementation of a well-functioning economic capital model can make bank management better equipped to anticipate potential problems. The primary value of economic is its application to decision making and risk management.<br />The use of such models can contribute to a more comprehensive pricing system that covers expected and unexpected losses, assist in the evaluation of the adequacy of capital in relation to the bank's overall risk profile, develop risk-adjusted performance measures that provide for better evaluation of returns and the volatility of returns and enhance risk management efforts by providing a common currency for risk.<br />By creating awareness of potential weaknesses in the financial risk management strategy, frameworks and processes as well as in the risk mitigation methods we can assist in designing and implementing solutions which can be taken to avoid unexpected or surprising losses.</p>
              </div>
          </div> */}
          {/* <footer></footer> */}
        </div>
      </Router>
    );
  }
}

export default App;
