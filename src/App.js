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
import { Login } from "./components/LoginPage";
import { Profile } from "./components/UserProfile";
import { Homepage } from "./components/Homepage";
import { useRadioGroup } from "@mui/material";

function App() {
  const [userToken, setUserToken] = useState(null);
  const [user, setUser] = useState(null);
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<NewEvent />}></Route>
        <Route path='/new/activity' element={<NewActivity />}></Route>
        <Route
          path='/event/:groupId/:eventId'
          element={<PostVoteEvent />}
        ></Route>
        <Route path='/group' element={<GroupPage user={user} />}></Route>
        <Route path='/group/:groupId' element={<Group user={user} />}></Route>
        <Route path='/voting' element={<VotePage user={user} />}></Route>
        <Route
          path='/profile/:username'
          element={<Profile user={user} />}
        ></Route>
        <Route path='/group/:groupId' element={<Group user={user} />}></Route>
        <Route
          path='/group/:groupId/vote'
          element={<VotePage user={user} />}
        ></Route>
        <Route
          path='/group/:groupId/discussion'
          element={<Group user={user} />}
        ></Route>
        <Route
          path='/group/:groupId/events'
          element={<Group user={user} />}
        ></Route>
        <Route
          path='/group/:groupId/vote/:eventId'
          element={<Vote user={user} />}
        ></Route>
        <Route
          path='/login'
          element={<Login setUserToken={setUserToken} setUser={setUser} />}
        ></Route>
        <Route
          path='/home/:username'
          element={<Homepage user={user} />}
        ></Route>
      </Routes>
    </div>
  );
}
export default App;
