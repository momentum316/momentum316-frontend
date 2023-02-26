import * as React from "react";
import "../App.css";
// General page use
import {
  Stack,
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// Footer Nav Bar
import { ButtonGroup, Container } from "@mui/material";
// Needed for Error on Date entry and we'll use it a lot
import { useState } from "react";

import { Route, Routes, Link, UseParams, useNavigate } from "react-router-dom";
import NewEvent from "./NewEvent";
import dayjs from "dayjs";
import { FooterObject } from "./Footer";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function NewActivity() {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startValue, setStartValue] = useState(null);
  const [endValue, setEndValue] = useState(null);
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

  const handleTime = () => {
    setStartValue(null);
    setEndValue(null);
    setShowDateTime(!showDateTime);
  };
  const [showDateTime, setShowDateTime] = useState(false);

  return (
    <div className="App">
      <Container>
        <br />
        <Stack>
          <FormControlLabel
            value="end"
            control={<Switch color="primary" onClick={() => handleTime()} />}
            label="Set Time"
          />
          {/* Time Field dayjs needs to be finished*/}
          {showDateTime && (
            <>
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
            </>
          )}
        </Stack>

        <br />
        {/* Location (w/google maps?) */}
        <br />
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
          <Button
            onClick={() => navigate("/voting")}
            fullWidth
            variant="contained"
          >
            Add Item to Vote!
          </Button>
        </Stack>
      </Container>
    </div>
  );
}
