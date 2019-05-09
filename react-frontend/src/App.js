import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";

//Import Navbar
//import { MainNavigation } from "./components/navigation/Navbar";
//Import Statemanager + Context
import GlobalState from "./context/GlobalState";
import { Routes } from "./pages/routing";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <GlobalState>
            {/* <MainNavigation /> */}
            <main className="main-content">
              <Routes />
            </main>
          </GlobalState>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
