import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";

//Import Navbar
import { MainNavigation } from "./components/navigation/Navbar";
//Import Statemanager + Context
import GlobalState from "./context/GlobalState";
import { Routes } from "./pages/routing";
import { Footer } from "./components/navigation/Footer";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <GlobalState>
            <MainNavigation />
            <main className="main-content">
              <Routes />
            </main>
            <Footer />
          </GlobalState>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
