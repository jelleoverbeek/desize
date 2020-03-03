import React, { Component } from "react";
import "./App.css";
import FilePanel from "./components/FilePanel/FilePanel";
import OptionsPanel from "./components/OptionsPanel/OptionsPanel";

class App extends Component {
  render() {
    return (
      <div className="App">
        <OptionsPanel />
        <FilePanel />
      </div>
    );
  }
}

export default App;
