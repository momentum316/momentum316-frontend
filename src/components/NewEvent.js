import * as React from "react";
import "../App.css";
// General page use
import {
  Stack,
  TextField,
  Button,
  Grid,
  Switch,
  Typography,
} from "@mui/material";
// For Vote Set Switch
import { FormControlLabel } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs from "dayjs";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { NewActivity } from "./NewActivity";
import { CreateEventHeader, EventsHeader } from "./Headers";
import { ActiveVotesForUser } from "./NoteCards";
import { VoterSlide } from "./Slides";

// CREATE NEW EVENT PAGE
export function NewEvent({ user }) {
  const navigate = useNavigate();
  const [event, setEvent] = useState("");
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [group, setGroup] = useState("");
  const [choices, setChoices] = useState(null);
  const [endTime, setEndTime] = useState(dayjs().add(1, "day").toISOString());

  const [createdEvent, setCreatedEvent] = useState("");
  const [vote, setVote] = useState(false);
  const [activity, setActivity] = useState(false);

  const handleChange = (newValue) => {
    var d = new Date(newValue);
    var e = new Date(newValue);
    var date = dayjs(d).format("YYYY-MM-DD");
    setDate(date);
    let end = dayjs(e);
    setEndTime(end.add(1, "day").toISOString());
    console.log(date);
  };

  //  GRAB GROUP NAMES FOR DROPDOWN MENU ON NEW EVENT
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/${user.user.username}/home`, {
        headers: {
          Authorization: `token ${user.token}`,
        },
      })
      .then((res) => setChoices(res.data.group_list));
  }, [user.user.username, user.token]);

  // SUBMITS EVENT
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/new/event/`,
        {
          title: `${event}`,
          group_id: group,
          voting: vote,
          date: `${date}`,
          vote_closing_time: `${endTime}`,
        },
        {
          headers: {
            Authorization: `token ${user.token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        navigate(`/event/${group}/${res.data.id}`);
      });
  };

  return (
    choices && (
      <div className="App">
        <form onSubmit={handleSubmit}>
          <CreateEventHeader />
          <Grid container spacing={2} xs={12}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Event Name"
                value={event}
                required
                onChange={(e) => setEvent(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                  label="Date"
                  inputFormat="MM/DD/YYYY"
                  value={date}
                  onChange={handleChange}
                  required
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <FormControl sx={{ minWidth: 150, maxWidth: 150 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Group
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={group}
                  label="Group"
                  required
                  onChange={(e) => setGroup(e.target.value)}
                >
                  <MenuItem value="">
                    <em>Select a Group</em>
                  </MenuItem>
                  {choices.map((c) => (
                    <MenuItem value={c.id}>{c.title}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <br />
          </Grid>
          <br />

          <Stack>
            <FormControlLabel
              value="end"
              control={
                <Switch color="primary" onClick={() => setVote(!vote)} />
              }
              label="Set Vote"
              labelPlacement="end"
            />{" "}
            {vote && (
              <>
                <FormControlLabel
                  value="end"
                  control={
                    <Switch
                      color="primary"
                      onClick={() => setActivity(!activity)}
                    />
                  }
                  label="Add Activity"
                  labelPlacement="end"
                />
                {activity && <NewActivity />}
              </>
            )}
          </Stack>
          <br />
          <Stack>
            <Button
              onClick={(e) => handleSubmit(e)}
              fullWidth
              variant="contained"
            >
              Submit Event
            </Button>
          </Stack>
        </form>
        <br />
      </div>
    )
  );
}

// EVENTS LIST
export function Event({ user }) {
  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <EventsHeader user={user} />
        </Grid>
        <br />
        <Grid item>
          <Typography variant="h6" gutterBottom>
            Live Votes
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ActiveVotesForUser user={user} />
        </Grid>
        <br />
        <Grid item>
          <Typography variant="h6" gutterBottom>
            Upcoming Events
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
