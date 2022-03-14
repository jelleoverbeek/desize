import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import FilePanel from '../components/FilePanel/FilePanel';
import OptionsPanel from '../components/OptionsPanel/OptionsPanel';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <OptionsPanel />
              <FilePanel />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}
