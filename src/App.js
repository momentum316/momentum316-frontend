import * as React from "react";
import "./App.css";
import NewEvent from "./components/NewEvent";
import NewActivity from "./components/NewActivity";
import GroupPage from "./components/Groups";
import { useState } from "react";
import { Route, Routes, Link, UseParams, useNavigate } from "react-router-dom";
import PostVoteEvent from "./components/PostVote";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NewEvent />}></Route>
        <Route path="/new/activity" element={<NewActivity />}></Route>
        <Route path="/event/:eventId" element={<PostVoteEvent />}></Route>
        <Route path="/group" element={<GroupPage />}></Route>
        <Route path="/group/:groupId" element={<NewActivity />}></Route>
      </Routes>
    </div>
  );
}
export default App;
