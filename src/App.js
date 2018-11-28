import React, { Component } from 'react';
import logo from './logo.svg';
import LoginScreen from "./pages/LoginScreen";
import AddCampaign from "./pages/AddCampigns";
import VotingScreen from "./pages/VotingScreen";
import ListCampaigns from "./pages/ListCampaigns";
import ViewScreen from "./pages/ViewScreen";
import LoginScreenToView from "./pages/LoginScreenToView";
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  render() {
    return (
      <div>
        <BrowserRouter>
        <Switch>
          <Route path="/login" component={LoginScreen} />
          <Route path="/add-campaign" component={AddCampaign} />
          <Route path="/voting-screen" component={VotingScreen} />
          <Route path="/list-campaigns" component={ListCampaigns}/>
          <Route path="/view-screen" component={ViewScreen}/>
          <Route path="/login-view" component={LoginScreenToView}/>
        </Switch>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
