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

export function VoterSlide({
  activity,
  location,
  eventId,
  groupId,
  activityId,
}) {
  const [voteCount, setVote] = useState(0);

  useEffect(() => {
    axios
      .patch(
        `https://congregate.onrender.com/vote/${activityId}`,
        { username: "villeryd" },
        {
          headers: {
            authorization: `token ${process.env.REACT_APP_API_TOKEN}`,
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
        `https://congregate.onrender.com/vote/${activityId}`,
        { username: "villeryd", vote: 1 },
        {
          headers: {
            authorization: `token ${process.env.REACT_APP_API_TOKEN}`,
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
        `https://congregate.onrender.com/vote/${activityId}`,
        { username: "villeryd", vote: -1 },
        {
          headers: {
            authorization: `token ${process.env.REACT_APP_API_TOKEN}`,
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
        `https://congregate.onrender.com/vote/${activityId}`,
        { username: "villeryd", vote: 0 },
        {
          headers: {
            authorization: `token ${process.env.REACT_APP_API_TOKEN}`,
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

export function ActivitySlide({ name, date, address }) {
  const formattedTime = dayjs(date).format("MMM | ddd DD | YYYY");
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
          <Typography fontSize="larger">{name}</Typography>
          <Typography fontSize="large">{formattedTime}</Typography>
          <Typography fontSize="large">{address}</Typography>
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
