import * as React from "react";
import "../App.css";
// General page use
import { Stack, TextField, Button, Grid } from "@mui/material";
// Footer Nav Bar
import { ButtonGroup } from "@mui/material";
// Group Select dropdown
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
// Group select icon
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// Needed for Error on Date entry and we'll use it a lot
import { useState } from "react";
import { Route, Routes, Link, UseParams, useNavigate } from "react-router-dom";

import axios from "axios";

function NewEvent() {
  const [event, setEvent] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [endTime, setEndTime] = useState("");
  const [attendees, setAttendees] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(event);
  };
  return (
    <div className='App'>
      <form onSubmit={handleSubmit}>
        <h1>New Event</h1>
        <Grid spacing={4}>
          <TextField
            fullWidth
            label='Event Name'
            value={event}
            onChange={(e) => setEvent(e.target.value)}
          />
        </Grid>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label='Date'
              variant='outlined'
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              error={!date}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label='Time'
              variant='outlined'
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </Grid>
        </Grid>
        <br />
        <Grid>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Select Group</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Create New +</Typography>
              <Typography>Placeholder</Typography>
              <Typography>Placeholder</Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <br />
        <Stack spacing={4}>
          <TextField
            fullWidth
            label='Enter Address'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <TextField
            id='description-box'
            label='Description'
            multiline
            rows={4}
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Stack>
        <br />
        <Stack>
          <Button fullWidth variant='outlined' rows={2}>
            Add Activity to Event +
          </Button>
        </Stack>
        <br />
        <Stack>
          <Button type='submit' fullWidth variant='contained'>
            Submit Event
          </Button>
        </Stack>
      </form>
      <footer>
        <ButtonGroup fullWidth color='secondary' variant='text'>
          <Button>Calendar</Button>
          <Button>Groups</Button>
          <Button>Events</Button>
        </ButtonGroup>
      </footer>
    </div>
  );
}

export default NewEvent;
