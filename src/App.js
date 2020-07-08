import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import RSVP from "./pages/RSVP/RSVPWrapper";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/rsvp">
          <RSVP />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
