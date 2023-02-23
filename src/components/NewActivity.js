import * as React from "react";
import "../App.css";
// General page use
import { Stack, TextField, Button, Grid, Box, Typography } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// Footer Nav Bar
import { ButtonGroup, Container } from "@mui/material";
// Needed for Error on Date entry and we'll use it a lot
import { useState } from "react";

import { Route, Routes, Link, UseParams, useNavigate } from "react-router-dom";
import NewEvent from "./NewEvent";
import dayjs from "dayjs";

function NewActivity() {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [value, setValue] = useState(dayjs());
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <div className="App">
      <Container>
        <Container
          variant="h4"
          sx={{ my: 4, textAlign: "left", color: "primary.main" }}
        >
          New Activity
        </Container>
        <Typography variant="h6" textAlign="left">
          To NewEvent on '$EventDate'
          <br />
          w/ GroupName
        </Typography>
        <br />
        <Stack>
          <Typography variant="h8" textAlign="left">
            Activity Details
          </Typography>
          <br />
          {/* Time Field dayjs needs to be finished*/}
          <TextField
            alignItems="left"
            label="Start Time"
            variant="outlined"
            value={value}
            onChange={handleChange}
          />
          <br />
          <TextField
            alignItems="Left"
            label="End Time"
            variant="outlined"
            value={value}
            onChange={handleChange}
          />
        </Stack>
        <br />
        {/* Location (w/google maps?) */}
        <Stack spacing={4}>
          <TextField
            fullWidth
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          {/* description box */}
          <TextField
            id="description-box"
            label="Description"
            multiline
            rows={4}
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Stack>
        {/* CANCEL BUTTON (clear fields or back to event?)*/}
        <br />
        <Stack>
          <Button onClick={() => navigate("/")} fullWidth variant="contained">
            Cancel
          </Button>
        </Stack>
        {/* POST TO EVENT BUTTON (carry to db)*/}
        <br />
        <Stack>
          <Button onClick={() => navigate("/")} fullWidth variant="contained">
            Post to Event
          </Button>
        </Stack>
        <footer>
          <ButtonGroup fullWidth color="secondary" variant="text">
            <Button>Calendar</Button>
            <Button>Groups</Button>
            <Button>Events</Button>
          </ButtonGroup>
        </footer>
      </Container>
    </div>
  );
}
export default NewActivity;
