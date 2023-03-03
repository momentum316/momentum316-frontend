import * as React from "react";
import backend_url from "./render.json";
import "./App.css";
import { NewEvent, Event } from "./components/NewEvent";
import { NewActivity, AddActivity } from "./components/NewActivity";
import { VotePage, Vote } from "./components/VotePage";
import { GroupPage, Group, NewGroup, AddToGroup } from "./components/Groups";
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
    <div className='App'>
      <Routes>
        <Route
          path='/login'
          element={<Login setUserToken={setUserToken} setUser={setUser} />}
        ></Route>

        <Route
          path='/'
          element={
            <PrivateRoute
              setUserToken={setUserToken}
              setUser={setUser}
              user={user}
            >
              <Event user={user} />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path='/events/new'
          element={
            <PrivateRoute
              setUserToken={setUserToken}
              setUser={setUser}
              user={user}
            >
              <NewEvent user={user} />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path='/new/activity'
          element={
            <PrivateRoute
              setUserToken={setUserToken}
              setUser={setUser}
              user={user}
            >
              <NewActivity user={user} />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path='/event/:groupId/:eventId'
          element={
            <PrivateRoute
              setUserToken={setUserToken}
              setUser={setUser}
              user={user}
            >
              <PostVoteEvent user={user} />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path='/group'
          element={
            <PrivateRoute
              setUserToken={setUserToken}
              setUser={setUser}
              user={user}
            >
              <GroupPage user={user} />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path='/group/:groupId'
          element={
            <PrivateRoute
              setUserToken={setUserToken}
              setUser={setUser}
              user={user}
            >
              <Group user={user} />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path='/voting'
          element={
            <PrivateRoute
              setUserToken={setUserToken}
              setUser={setUser}
              user={user}
            >
              <VotePage user={user} />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path='/profile/:username'
          element={
            <PrivateRoute
              setUserToken={setUserToken}
              setUser={setUser}
              user={user}
            >
              <Profile user={user} />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path='/group/:groupId'
          element={
            <PrivateRoute
              setUserToken={setUserToken}
              setUser={setUser}
              user={user}
            >
              <Group user={user} />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path='/group/:groupId/vote'
          element={
            <PrivateRoute
              setUserToken={setUserToken}
              setUser={setUser}
              user={user}
            >
              <VotePage user={user} />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path='/group/:groupId/discussion'
          element={
            <PrivateRoute
              setUserToken={setUserToken}
              setUser={setUser}
              user={user}
            >
              <Group user={user} />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path='/group/:groupId/events'
          element={
            <PrivateRoute
              setUserToken={setUserToken}
              setUser={setUser}
              user={user}
            >
              <Group user={user} />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path='/group/:groupId/vote/:eventId'
          element={
            <PrivateRoute
              setUserToken={setUserToken}
              setUser={setUser}
              user={user}
            >
              <Vote user={user} />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path='/home/:username'
          element={
            <PrivateRoute
              setUserToken={setUserToken}
              setUser={setUser}
              user={user}
            >
              <Homepage user={user} />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path='/new/group'
          element={
            <PrivateRoute
              setUserToken={setUserToken}
              setUser={setUser}
              user={user}
            >
              <NewGroup user={user} />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path='/new/group/:groupId'
          element={
            <PrivateRoute
              setUserToken={setUserToken}
              setUser={setUser}
              user={user}
            >
              <AddToGroup user={user} />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path='/logout'
          element={
            <PrivateRoute
              setUserToken={setUserToken}
              setUser={setUser}
              user={user}
            >
              <Logout setUserToken={setUserToken} setUser={setUser} />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path='/add/:groupId/:eventId'
          element={
            <PrivateRoute
              setUserToken={setUserToken}
              setUser={setUser}
              user={user}
            >
              <AddActivity user={user} />
            </PrivateRoute>
          }
        ></Route>
      </Routes>
      {user && <FooterObject user={user} />}
    </div>
  );
}
export default App;
