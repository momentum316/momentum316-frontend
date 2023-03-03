import {
  Avatar,
  AvatarGroup,
  Grid,
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  Container,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { Route, Routes, Link, useParams, useNavigate } from "react-router-dom";
import { GroupTabs } from "./NoteCards";
import { GroupsHeader } from "./Headers";
import axios from "axios";
import backend_url from "../render.json";

import { useState, useEffect } from "react";

// LIST OF USER'S GROUPS
export function GroupPage({ user }) {
  const [groups, setGroups] = useState(null);
  useEffect(() => {
    axios
      // need to change this to dynamic username once login page is ready
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/${user.user.username}/groups`,
        {
          headers: {
            Authorization: `token ${user.token}`,
          },
        }
      )
      .then((response) => setGroups(response.data));
  }, [user.user.username, user.token]);

  const navigate = useNavigate();
  return (
    groups && (
      <div>
        <GroupsHeader user={user} />
        <br />
        <div className="group-grid">
          <Grid
            container
            spacing={2}
            direction="columns"
            columns={{ xs: 6, sm: 6, md: 12 }}
            alignItems="center"
            justify="center"
          >
            {groups.map((g) => (
              <Grid item xs={3}>
                <Card elevation={10}>
                  <CardHeader
                    title={
                      <Avatar
                        key={g.id}
                        onClick={() => navigate(`/group/${g.id}`)}
                        alt={g.title}
                        src="/static/images/avatar/1.jpg"
                      />
                    }
                    subheader={g.title}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
        {/* <FooterObject /> */}
      </div>
    )
  );
}

//USERS WITHIN A GROUP
export function Group({ user }) {
  let { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      // need to change this to dynamic username once login page is ready
      .get(`${process.env.REACT_APP_BACKEND_URL}/group/${groupId}`, {
        headers: {
          Authorization: `token ${user.token}`,
        },
      })
      .then((response) => setGroup(response.data));
  }, [groupId]);
  return (
    group && (
      <div>
        <h1>{group.title}</h1>
        <GroupTabs />
        <br />
        <div className="group-grid">
          <Grid
            container
            direction="columns"
            spacing={3}
            columnSpacing={{ xs: 2, sm: 8, md: 4 }}
          >
            {group.members.map((g) => (
              <Grid item>
                <Card elevation={10}>
                  <CardHeader
                    title={
                      <Avatar
                        key={g}
                        onClick={() => navigate(`/profile/${g}`)}
                        alt={g}
                        src={g}
                      />
                    }
                    subheader={g}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
        {/* <FooterObject /> */}
      </div>
    )
  );
}

export function NewGroup({ user }) {
  const [groups, setGroups] = useState("");
  const [choices, setChoices] = useState(null);
  const [groupName, setGroupName] = useState(null);
  let NewGroup = "create";
  const navigate = useNavigate();

  useEffect(() => {
    axios
      // need to change this to dynamic username once login page is ready
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/${user.user.username}/groups`,
        {
          headers: {
            Authorization: `token ${user.token}`,
          },
        }
      )
      .then((response) => setChoices(response.data));
  }, [user.user.username, user.token]);

  console.log(user);

  const handleSubmit = (groupName) => {
    console.log(groupName);
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/new/group/`,
        { title: groupName },
        {
          headers: {
            Authorization: `token ${user.token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        navigate("/group");
      });
  };
  return (
    choices && (
      <>
        <Grid container>
          <Grid item xs={12}>
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel id="demo-simple-select-helper-label">
                Group
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={groups}
                label="Group"
                required
                onChange={(e) => setGroups(e.target.value)}
              >
                <MenuItem value="">
                  <em>Select a Group</em>
                </MenuItem>
                {choices.map((c) => (
                  <MenuItem value={c.id}>{c.title}</MenuItem>
                ))}
                <MenuItem value={NewGroup}>Create New Group</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <br />
          {groups === NewGroup && (
            <Grid item xs={12}>
              <TextField
                id="groupName"
                label="Group Name"
                fullWidth
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              ></TextField>
              <Stack>
                <Button
                  onClick={() => handleSubmit(groupName)}
                  fullWidth
                  variant="contained"
                >
                  Create Group
                </Button>
              </Stack>
            </Grid>
          )}
        </Grid>
      </>
    )
  );
}
