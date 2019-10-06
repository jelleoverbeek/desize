import React from "react";
import "./App.css";
import FilePanel from "./components/FilePanel/FilePanel";
import OptionsPanel from "./components/OptionsPanel/OptionsPanel";

const App: React.FC = () => {
  return (
    <div className="App">
      <FilePanel />
      <OptionsPanel />
    </div>
  );
};

export default App;
