import * as React from "react";
import "./App.css";
import NewEvent from "./components/NewEvent";
import NewActivity from "./components/NewActivity";
import { useState } from "react";
import { Route, Routes, Link, UseParams, useNavigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NewEvent />}></Route>
        <Route path="/new/activity" element={<NewActivity />}></Route>
      </Routes>
    </div>
  );
}
export default App;
