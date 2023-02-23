import * as React from "react";
import "../App.css";
// General page use
import { Stack, TextField, Button, Grid, Box } from "@mui/material";
// Footer Nav Bar
import { ButtonGroup, Container } from "@mui/material";
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
import NewEvent from "./NewEvent";

const activityList = ["Activity 1", "Activity 2", "Activity 3"];
function NewActivity() {
  return (
    <div className="App">
      <Container>
        <Typography
          variant="h4"
          sx={{ my: 4, textAlign: "left", color: "primary.main" }}
        >
          New Activity
        </Typography>
        <Typography variant="h6" textAlign="left">
          To NewEvent
          <br />
          w/ GroupName
        </Typography>
        <Typography variant="h8">Activities</Typography>
      </Container>
    </div>
  );
}
export default NewActivity;
