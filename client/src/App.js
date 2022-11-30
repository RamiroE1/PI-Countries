import './App.css';
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home";
import ActivityCreate from "./components/ActivityCreate";
import Detail from "./components/Detail/Detail";


function App() {
  return (
    <BrowserRouter>
    <React.Fragment>
    <div className="App">
      
      <Route exact path= '/' component={LandingPage}/>
      <Route exact path= '/home' component={Home}/>
      <Route exact path= '/activities' component={ActivityCreate}/>
      <Route exact path= '/home/:id' component={Detail}/>

    </div>
    </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
