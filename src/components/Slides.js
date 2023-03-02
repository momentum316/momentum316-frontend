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

export function VoterSlide({
  activity,
  location,
  eventId,
  groupId,
  activityId,
  user,
}) {
  const [voteCount, setVote] = useState(0);

  useEffect(() => {
    axios
      .patch(
        `${process.env.REACT_APP_BACKEND_URL}/vote/${activityId}`,
        { username: user.user.username },
        {
          headers: {
            authorization: `token ${user.token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setVote(res.data.vote);
      });
  }, [activityId]);

  const handleUp = (e) => {
    if (voteCount === 1) {
      handleZero();
      return;
    }
    console.log("up");
    axios
      .patch(
        `${process.env.REACT_APP_BACKEND_URL}/vote/${activityId}`,
        { username: user.user.username, vote: 1 },
        {
          headers: {
            authorization: `token ${user.token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setVote(res.data.vote);
      });
  };

  const handleDown = (e) => {
    if (voteCount === -1) {
      handleZero();
      return;
    }
    console.log("down");
    axios
      .patch(
        ` ${process.env.REACT_APP_BACKEND_URL}/vote/${activityId}`,
        { username: user.user.username, vote: -1 },
        {
          headers: {
            authorization: `token ${user.token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setVote(res.data.vote);
      });
  };
  const handleZero = (e) => {
    console.log("zero");
    axios
      .patch(
        `${process.env.REACT_APP_BACKEND_URL}/vote/${activityId}`,
        { username: user.user.username, vote: 0 },
        {
          headers: {
            authorization: `token ${user.token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setVote(res.data.vote);
      });
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Box
            sx={{
              height: 60,
              backgroundColor: "primary.main",
              "&:hover": {
                backgroundColor: "primary.dark",
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          >
            <Container onClick={() => handleUp()}>
              <KeyboardArrowUpIcon />
            </Container>
            {voteCount}
            <Container onClick={() => handleDown()}>
              <KeyboardArrowDownIcon />
            </Container>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Box
            sx={{
              height: 60,
              backgroundColor: "primary.main",
              "&:hover": {
                backgroundColor: "primary.dark",
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          >
            <Container>
              {activity}
              <br />
              {location}
            </Container>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

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
