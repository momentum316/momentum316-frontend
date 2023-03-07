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
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import axios from "axios";
import dayjs from "dayjs";
import backend_url from "../render.json";

export function ActivitySlide({ event }) {
  const formattedTime = dayjs(event.date).format("MMM | ddd DD | YYYY");
  return (
    <>
      <Card elevation={3}>
        <CardContent>
          <Typography fontSize="larger">{event.title}</Typography>
          <Typography fontSize="large">{formattedTime}</Typography>
          <Typography fontSize="large">{event.location}</Typography>
        </CardContent>
      </Card>
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
