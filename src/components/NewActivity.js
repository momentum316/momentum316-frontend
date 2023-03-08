import * as React from "react";
import "../App.css";
// General page use
import { Stack, TextField, Button, Card, CardHeader } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// Footer Nav Bar
import { Container } from "@mui/material";
// Needed for Error on Date entry and we'll use it a lot
import { useState } from "react";

import { useParams, useNavigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";

export function NewActivity({
  groupId,
  eventId,
  user,
  setActivityTitleFromEvent,
  setActivityLocation,
  setActivityDescription,
}) {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startValue, setStartValue] = useState(null);
  const [endValue, setEndValue] = useState(null);
  const [activityTitle, setActivityTitle] = useState("");
  const handleStart = (newValue) => {
    var d = new Date(newValue);
    var date = d.toISOString();
    setStartValue(date);
  };
  const handleEnd = (newValue) => {
    var d = new Date(newValue);
    var date = d.toISOString();
    setEndValue(date);
  };

  const handleAdd = (e) => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/new/activity/`,
        {
          title: activityTitle,
          event_id: eventId,
          description: description,
          location: location,
          start_time: startValue,
          end_time: endValue,
        },
        {
          headers: {
            Authorization: `token ${user.token}`,
          },
        }
      )
      .then((res) => navigate(`/group/${groupId}/vote/${eventId}`));
  };

  return (
    <div>
      <Card elevation={0}>
        <CardHeader
          variant="h5"
          align="center"
          title="Add Activity to Event"
        ></CardHeader>
      </Card>
      <br />
      <TextField
        id="activity-title"
        label="Activity Title"
        fullWidth
        value={activityTitle}
        onChange={(e) => {
          setActivityTitle(e.target.value);
          setActivityTitleFromEvent(e.target.value);
        }}
      ></TextField>
      <Stack>
        <br />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Start Time"
            value={startValue}
            onChange={handleStart}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <br />
          <TimePicker
            label="End Time"
            value={endValue}
            onChange={handleEnd}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <br />
      </Stack>
      <br />
      <Stack spacing={4}>
        <TextField
          fullWidth
          label="Location"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
            setActivityLocation(e.target.value);
          }}
        />
        <TextField
          id="description-box"
          label="Description"
          multiline
          rows={4}
          fullWidth
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setActivityDescription(e.target.value);
          }}
        />
      </Stack>
      {/* CANCEL BUTTON (clear fields or back to event?)*/}
      <br />
      <Stack>
        <Button onClick={() => navigate("/")} fullWidth variant="contained">
          Cancel
        </Button>
      </Stack>
    </div>
  );
}

export function AddActivity({ user }) {
  const { groupId, eventId } = useParams();
  return <NewActivity user={user} groupId={groupId} eventId={eventId} />;
}
