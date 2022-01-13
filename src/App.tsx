import React from 'react';
import './App.css';
import FilePanel from './components/FilePanel/FilePanel';
import OptionsPanel from './components/OptionsPanel/OptionsPanel';

const App: React.FunctionComponent = (): JSX.Element => (
  <div className="App">
    <OptionsPanel />
    <FilePanel />
  </div>
);

export default App;
