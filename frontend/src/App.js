import React from "react";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import MomentUtils from "@date-io/moment";
import CssBaseline from "@material-ui/core/CssBaseline";
import SignUp from "./components/session/SignUp";
import Login from "./components/session/Login";
import Questionnaire from "./components/questionnaire/Questionnaire";
import { login } from "./lib/api";

function App() {
  const handleLogin = () => {
    login();
  };

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
        <Button onClick={handleLogin}>Connect to Car</Button>

        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/questionnaire" component={Questionnaire} />
      </MuiPickersUtilsProvider>
    </BrowserRouter>
  );
}

export default App;
