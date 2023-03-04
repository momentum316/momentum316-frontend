import { useState, useEffect } from "react";
import {
  Grid,
  Button,
  Stack,
  ButtonGroup,
  Box,
  Container,
  Divider,
  Typography,
  IconButton,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import axios from "axios";
import dayjs from "dayjs";
import backend_url from "../render.json";

export function ActivitySlide({ event }) {
  const formattedTime = dayjs(event.date).format("MMM | ddd DD | YYYY");
  console.log(event);
  return (
    <>
      <Box
        sx={{
          height: 80,
          backgroundColor: "primary.main",
          "&:hover": {
            backgroundColor: "primary.dark",
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        <Stack>
          <Typography fontSize="larger">{event.title}</Typography>
          <Typography fontSize="large">{formattedTime}</Typography>
          <Typography fontSize="large">{event.address}</Typography>
        </Stack>
      </Box>
    </>
  );
}

export function EventSlide() {
  return (
    <>
      <Box>
        <Stack container sx={{ height: 80, backgroundColor: "primary.light" }}>
          <Typography fontSize="3vh">Event Name</Typography>
          <item>Date Decided</item>
          <item>Location</item>
        </Stack>
      </Box>
    </>
  );
}
