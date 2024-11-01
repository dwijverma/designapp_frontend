import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Brainstorming from "./components/Brainstorming";
import DesignCritique from "./components/DesignCritique";
import ColorSchemes from "./components/colorPalette/ColorSchemes.js";
import FontPairingsComponent from "./components/fontPairing/FontGenerator.js";
import ProjectPlanner from "./components/ProjectPlanning/ProjectPlanner";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={LandingPage()} />
          <Route path="/brainstorming" element={Brainstorming()} />
          <Route path="/design-critique" element={DesignCritique()} />
          <Route path="/color-schemes" element={ColorSchemes()} />
          <Route path="/font-generator" element={FontPairingsComponent()} />
          <Route path="/project-planner" element={ProjectPlanner()} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
