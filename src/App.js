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
import { Login, Logout } from "./components/LoginPage";
import { Profile } from "./components/UserProfile";
import { Homepage } from "./components/Homepage";
import { useRadioGroup } from "@mui/material";
import { FooterObject } from "./components/Footer";
import useLocalStorageState from "use-local-storage-state";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [userToken, setUserToken] = useState(null);
  const [user, setUser] = useLocalStorageState("CongregateToken", "");

  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={<Login setUserToken={setUserToken} setUser={setUser} />}
        ></Route>

        <Route
          path="/"
          element={
            <PrivateRoute>
              <NewEvent user={user} />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/new/activity"
          element={
            <PrivateRoute>
              <NewActivity user={user} />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/event/:groupId/:eventId"
          element={
            <PrivateRoute>
              <PostVoteEvent user={user} />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/group"
          element={
            <PrivateRoute>
              <GroupPage user={user} />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/group/:groupId"
          element={
            <PrivateRoute>
              <Group user={user} />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/voting"
          element={
            <PrivateRoute>
              <VotePage user={user} />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/profile/:username"
          element={
            <PrivateRoute>
              <Profile user={user} />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/group/:groupId"
          element={
            <PrivateRoute>
              <Group user={user} />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/group/:groupId/vote"
          element={
            <PrivateRoute>
              <VotePage user={user} />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/group/:groupId/discussion"
          element={
            <PrivateRoute>
              <Group user={user} />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/group/:groupId/events"
          element={
            <PrivateRoute>
              <Group user={user} />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/group/:groupId/vote/:eventId"
          element={
            <PrivateRoute>
              <Vote user={user} />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/home/:username"
          element={
            <PrivateRoute>
              <Homepage user={user} />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/logout"
          element={
            <PrivateRoute>
              <Logout setUserToken={setUserToken} setUser={setUser} />
            </PrivateRoute>
          }
        ></Route>
      </Routes>
      {user && <FooterObject user={user} />}
    </div>
  );
}
export default App;
