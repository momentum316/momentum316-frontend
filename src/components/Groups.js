import {
  Avatar,
  Grid,
  Button,
  Card,
  CardHeader,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { Route, Routes, Link, useParams, useNavigate } from "react-router-dom";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import { GroupTabs, SmallLogo, ActivityCard } from "./NoteCards";
import { GroupsHeader, GroupEventsHeader } from "./Headers";
import axios from "axios";
import backend_url from "../render.json";

import { useState, useEffect } from "react";
import { CopyAll } from "@mui/icons-material";
import { GroupMembersHeader } from "./Headers";

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
        <div className='group-grid'>
          <Grid
            container
            spacing={2}
            direction='columns'
            columns={{ xs: 6, sm: 6, md: 12 }}
            alignItems='center'
            justify='center'
          >
            {groups.map((g) => (
              <Grid item xs={3}>
                <Card elevation={3}>
                  <CardHeader
                    title={
                      <Avatar
                        key={g.id}
                        onClick={() => navigate(`/group/${g.id}`)}
                        alt={g.title}
                        src={g.avatar}
                      />
                    }
                    subheader={g.title}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    )
  );
}

//USERS WITHIN A GROUP
export function Group({ user }) {
  const { groupId } = useParams();
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
      .then((response) => {
        setGroup(response.data);
        console.log(response.data);
      });
  }, [groupId]);
  return (
    group && (
      <div>
        <GroupMembersHeader user={user} groupTitle={group.title} />
        <GroupTabs />
        <br />
        <div className='group-grid'>
          <Grid
            container
            spacing={2}
            direction='columns'
            columns={{ xs: 6, sm: 6, md: 12 }}
            alignItems='center'
            justify='center'
          >
            {group.members.map((g) => (
              <Grid item xs={3}>
                <Card
                  elevation={3}
                  sx={{ width: 160, height: 100 }}
                  onClick={() => navigate(`/profile/${g}`)}
                >
                  <CardHeader
                    title={<Avatar key={g} alt={g} src={g} />}
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

// CREATE NEW GROUP OR COPY LINK TO GROUP INVITE PAGE
export function NewGroup({ user }) {
  let NewGroup = "create";
  const [groups, setGroups] = useState(NewGroup);
  const [choices, setChoices] = useState(null);
  const [groupName, setGroupName] = useState(null);
  const navigate = useNavigate();

  const [groupLink, setGroupLink] = useState(null);

  const link = `https://main--fanciful-pothos-f7e454.netlify.app/new/group/`;

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

  const handleChange = (e) => {
    let groupId = e.target.value;
    setGroups(groupId);
    setGroupLink(`${link}${groupId}`);
    console.log(groupId);
    console.log(`${link}${groupId}`);
  };
  return (
    choices && (
      <>
        <SmallLogo />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel id='demo-simple-select-helper-label' alt='Group name'>
                Group
              </InputLabel>
              <Select
                labelId='demo-simple-select-helper-label'
                id='demo-simple-select-helper'
                value={groups}
                label='Group'
                required
                onChange={(e) => handleChange(e)}
              >
                <MenuItem value={NewGroup}>Create New Group</MenuItem>
                {choices.map((c) => (
                  <MenuItem value={c.id}>{c.title}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {groups === NewGroup ? (
            <>
              <Grid item xs={12}>
                <TextField
                  id='groupName'
                  label='Group Name'
                  fullWidth
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <Button
                  onClick={() => handleSubmit(groupName)}
                  fullWidth
                  variant='contained'
                >
                  Create Group
                </Button>
              </Grid>
            </>
          ) : (
            <>
              <br />
              <Grid item xs={10}>
                <TextField
                  id='groupName'
                  label='Group Link'
                  fullWidth
                  value={groupLink}
                ></TextField>
              </Grid>
              <Grid item xs={2}>
                <IconButton>
                  <Tooltip title='Copy to Clipboard'>
                    <ContentPasteIcon
                      onClick={() => navigator.clipboard.writeText(groupLink)}
                    ></ContentPasteIcon>
                  </Tooltip>
                </IconButton>
              </Grid>
            </>
          )}
        </Grid>
      </>
    )
  );
}

// LOGIC FOR LINK TO ADD TO GROUP
export function AddToGroup({ user }) {
  const { groupId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .patch(
        `${process.env.REACT_APP_BACKEND_URL}/join/${groupId}`,
        {
          username: user.user.username,
        },
        {
          headers: {
            authorization: `token ${user.token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        navigate(`/group/${groupId}`);
      });
  });
}

// A GROUP'S EVENT LIST
export function GroupEvents({ user }) {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [events, setEvents] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/group/${groupId}`, {
        headers: {
          authorization: `token ${user.token}`,
        },
      })
      .then((res) => {
        setEvents(res.data);
      });
  }, [groupId, user.token]);

  return (
    events && (
      <Grid container spacing={2} alignItems='center' justifyContent='left'>
        <Grid item xs={12}>
          <GroupEventsHeader user={user} />
        </Grid>
        <Grid item xs={12}>
          <GroupTabs />
        </Grid>
        {events.event_list.length > 0 ? (
          events.event_list.map((e) => {
            console.log(e.activity_list[0]);
            return (
              e.activity_list[0] && (
                <Grid item xs={12}>
                  <ActivityCard
                    activity={e.activity_list[0].title}
                    location={e.activity_list[0].title}
                    description={e.activity_list[0].title}
                    groupId={groupId}
                    eventId={events.id}
                    onClick={() => navigate(`/event/${groupId}/${events.id}`)}
                    decided={true}
                  />
                </Grid>
              )
            );
          })
        ) : (
          <Grid item>
            <Typography align='left' variant='h5'>
              No Scheduled Events
            </Typography>
          </Grid>
        )}
      </Grid>
    )
  );
}

// LOGIC FOR LINK TO LEAVE A GROUP
export function LeaveGroup({ user }) {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const handleLeave = () => {
    axios
      .patch(
        `${process.env.REACT_APP_BACKEND_URL}/leave/${groupId}`,
        {
          username: user.user.username,
        },
        {
          headers: {
            authorization: `token ${user.token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        navigate("/group");
      });
  };
  return (
    <div>
      <br />
      <Grid container spacing={2} justifyContent='center' alignItems='center'>
        <Grid item>
          <Typography variant='h4' gutterBottom>
            Are you sure you want to leave this group?
          </Typography>
        </Grid>
        <Grid item>
          <Button variant='contained' onClick={(e) => handleLeave(e)}>
            YES
          </Button>
        </Grid>
        <Grid item>
          <Button variant='contained' onClick={() => navigate(-1)}>
            NO
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
