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
      <Grid container justifyContent="center" alignItems="center">
        <Card elevation={0}>
          <CardContent align="center">
            <Typography variant="h5">{event.group_title}</Typography>
            <Typography variant="h6">{event.title}</Typography>
            <Typography fontSize="large">{formattedTime}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}

export function EventSlide({ event }) {
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
