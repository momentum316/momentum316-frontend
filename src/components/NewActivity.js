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

console.log("welcome");
function NewActivity() {
  return (
    <div>
      <h1>Add your Activity Bro</h1>
    </div>
  );
}
export default NewActivity;
