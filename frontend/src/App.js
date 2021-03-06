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
const VehicleInfo = ({ percentRemaining }) => {
  console.log(percentRemaining);
  return <div>{percentRemaining}</div>;
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      percentRemaining: null
    };
    this.authorize = this.authorize.bind(this);

    this.onComplete = this.onComplete.bind(this);

    this.getVehicleData = this.getVehicleData.bind(this);

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
      testMode: true,
      onComplete: this.onComplete
    });
  }

  onComplete(err, code, status) {
    this.setState({ loading: true });
    return axios
      .get(`api/smartcar/exchange?code=${code}`)
      .then(res => {
        this.setState({ loading: false });
      })
      .catch(e => console.log(e));
  }

  getVehicleData() {
    return axios
      .get(`api/smartcar/vehicles`)
      .then(res => {
        const vid = res.data.vehicles[0];
        return axios.get(`api/smartcar/vehicles/${vid}/battery`);
      })
      .then(res => {
        console.log(res.data.data.percentRemaining);
        this.setState({ percentRemaining: res.data.data.percentRemaining });
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
          {this.state.loading ? null : (
            <Button>
              <Link to="/vehicle-info">VehicleInfo</Link>
            </Button>
          )}

          <Button onClick={this.authorize}>Connect to Car</Button>
          {this.state.loading ? null : (
            <Button onClick={this.getVehicleData}>Get Vehicle Info</Button>
          )}

          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/questionnaire" component={Questionnaire} />
          <Route
            path="/vehicle-info"
            component={() => (
              <VehicleInfo percentRemaining={this.state.percentRemaining} />
            )}
          />
        </MuiPickersUtilsProvider>
      </BrowserRouter>
    );
  }
}

export default App;
