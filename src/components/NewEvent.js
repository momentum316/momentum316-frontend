import * as React from "react";
import "../App.css";
// General page use
import { Stack, TextField, Button, Grid, Switch } from "@mui/material";
// Footer Nav Bar
import { ButtonGroup } from "@mui/material";
// For Vote Set Switch
import { FormControlLabel } from "@mui/material";
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
import { useState, useEffect } from "react";
import { Route, Routes, Link, UseParams, useNavigate } from "react-router-dom";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs from "dayjs";
import axios from "axios";
import { FooterObject } from "./Footer";
import { SetMeal } from "@mui/icons-material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import NewActivity from "./NewActivity";

export default function NewEvent() {
  const navigate = useNavigate();
  const [event, setEvent] = useState("");
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [group, setGroup] = useState("");
  const [choices, setChoices] = useState(null);
  const [endTime, setEndTime] = useState(dayjs().add(1, "day").toISOString());

  const [createdEvent, setCreatedEvent] = useState("");
  const [vote, setVote] = useState(false);

  const handleChange = (newValue) => {
    var d = new Date(newValue);
    var e = new Date(newValue);
    var date = dayjs(d).format("YYYY-MM-DD");
    setDate(date);
    let end = dayjs(e);
    setEndTime(end.add(1, "day").toISOString());
    console.log(date);
  };

  useEffect(() => {
    axios
      .get(`https://congregate.onrender.com/villeryd/home`)
      .then((res) => setChoices(res.data.group_list));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`https://congregate.onrender.com/new/event/`, {
        title: `${event}`,
        group_id: group,
        voting: vote,
        date: `${date}`,
        vote_closing_time: `${endTime}`,
      })
      .then((res) => {
        console.log(res.data);
        navigate(`/event/${group}/${res.data.event.id}`);
      });
  };

  return (
    choices && (
      <div className='App'>
        <form onSubmit={handleSubmit}>
          <h1>New Event</h1>
          <Stack spacing={4}>
            <TextField
              fullWidth
              label='Event Name'
              value={event}
              required
              onChange={(e) => setEvent(e.target.value)}
            />
          </Stack>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              {/* <TextField
              label='Date'
              variant='outlined'
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              error={!date}
            /> */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                  label='Date'
                  inputFormat='MM/DD/YYYY'
                  value={date}
                  onChange={handleChange}
                  required
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel id='demo-simple-select-helper-label'>
                  Group
                </InputLabel>
                <Select
                  labelId='demo-simple-select-helper-label'
                  id='demo-simple-select-helper'
                  value={group}
                  label='Group'
                  required
                  onChange={(e) => setGroup(e.target.value)}
                >
                  <MenuItem value=''>
                    <em>Select a Group</em>
                  </MenuItem>
                  {choices.map((c) => (
                    <MenuItem value={c.id}>{c.title}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <br />
            {/* <Grid item xs={6}>
            <TextField
              label='Time'
              variant='outlined'
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </Grid> */}
          </Grid>
          <br />
          {/* <Stack spacing={4}>
          <TextField
            fullWidth
            label='Location'
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
        </Stack> */}
          <br />
          <Stack>
            <Button type='submit' fullWidth variant='contained'>
              Submit Event
            </Button>
          </Stack>
        </form>
        {/* Vote Select Switch */}
        <br />
        <Stack>
          <FormControlLabel
            value='end'
            control={<Switch color='primary' onClick={() => setVote(!vote)} />}
            label='Set Vote?'
            labelPlacement='end'
            // onClick={() => setShowActivity(!showActivity)}
          />
          {/* ADD ACTIVITY BUTTON (show only for vote selection) */}

          {vote && (
            <>
              <NewActivity />
            </>
          )}
        </Stack>
        <FooterObject />
      </div>
    )
  );
}
