import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import axios from "axios";
import Smartcar from "@smartcar/auth";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import MomentUtils from "@date-io/moment";
import CssBaseline from "@material-ui/core/CssBaseline";
import SignUp from "./components/session/SignUp";
import Login from "./components/session/Login";
import Questionnaire from "./components/questionnaire/Questionnaire";
import { login } from "./lib/api";

class App extends Component {
  constructor(props) {
    super(props);
    this.authorize = this.authorize.bind(this);

    this.onComplete = this.onComplete.bind(this);

    this.smartcar = new Smartcar({
      clientId: "2ea2b139-4ca0-47c5-a977-899d127e3acf",
      redirectUri:
        "https://javascript-sdk.smartcar.com/v2/redirect?app_origin=http://localhost:3000",
      scope: [
        "read_vehicle_info",
        "read_location",
        "read_odometer",
        "control_security",
        "read_fuel",
        "read_charge",
        "read_battery",
        "control_security",
        "control_security:unlock",
        "control_security:lock"
      ],
      // testMode: true,
      onComplete: this.onComplete
    });
  }

  onComplete(err, code, status) {
    return axios
      .get(`api/smartcar/exchange?code=${code}`)
      .then(res => {
        // return axios.get(`${process.env.REACT_APP_SERVER}/vehicle`);
        console.log(res);
      })
      .then(res => {
        // this.setState({vehicle: res.data});
      });
  }

  authorize() {
    this.smartcar.openDialog({ forcePrompt: true });
  }

  render() {
    return (
      <BrowserRouter>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <CssBaseline />
          <Button>
            <Link to="/signup">Sign Up</Link>
          </Button>
          <Button>
            <Link to="/login">Login</Link>
          </Button>
          <Button>
            <Link to="/questionnaire">Questionnaire</Link>
          </Button>
          <Button onClick={this.authorize}>Connect to Car</Button>

          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/questionnaire" component={Questionnaire} />
        </MuiPickersUtilsProvider>
      </BrowserRouter>
    );
  }
}

export default App;
