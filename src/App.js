import * as React from "react";
import backend_url from "./render.json";
import "./App.css";
import NewEvent from "./components/NewEvent";
import NewActivity from "./components/NewActivity";
import { VotePage, Vote } from "./components/VotePage";
import { GroupPage, Group } from "./components/Groups";
import { useState } from "react";
import { Route, Routes, Link, UseParams, useNavigate } from "react-router-dom";
import PostVoteEvent from "./components/PostVote";
import Login from "./components/LoginPage";
import { Profile } from "./components/UserProfile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NewEvent />}></Route>
        <Route path="/new/activity" element={<NewActivity />}></Route>
        <Route
          path="/event/:groupId/:eventId"
          element={<PostVoteEvent />}
        ></Route>
        <Route path="/group" element={<GroupPage />}></Route>
        <Route path="/group/:groupId" element={<Group />}></Route>
        <Route path="/voting" element={<VotePage />}></Route>
        <Route path="/profile/:username" element={<Profile />}></Route>
        <Route path="/group/:groupId" element={<Group />}></Route>
        <Route path="/group/:groupId/vote" element={<VotePage />}></Route>
        <Route path="/group/:groupId/discussion" element={<Group />}></Route>
        <Route path="/group/:groupId/events" element={<Group />}></Route>
        <Route path="/group/:groupId/vote/:eventId" element={<Vote />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}
export default App;
