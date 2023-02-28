import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState, useEffect } from "react";
import axios from "axios";
import { Stack } from "@mui/system";

export function NoteCard({ activity, description, location }) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div>
      <Card elevation={3}>
        <CardHeader
          action={
            <IconButton onClick={() => setIsExpanded(!isExpanded)}>
              <ExpandMoreIcon />
            </IconButton>
          }
          title={activity}
          subheader={location}
        />
        {isExpanded && (
          <CardContent>
            <Typography variant="body2" color="textSecondary">
              {description}
            </Typography>
          </CardContent>
        )}
      </Card>
    </div>
  );
}

export function VoteCard({
  activity,
  description,
  location,
  groupId,
  eventId,
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
    <div>
      <Grid container xs={12}>
        <Grid item xs={2}>
          <Stack alignItems="center" justifyContent="center">
            <KeyboardArrowUpIcon
              onClick={(e) => handleUp(e)}
              color={voteCount === 1 ? "warning" : ""}
            />
            {/* {voteCount} */}
            <br />
            <KeyboardArrowDownIcon
              onClick={(e) => handleDown(e)}
              color={voteCount === -1 ? "warning" : ""}
            />
          </Stack>
        </Grid>
        <Grid item xs={10}>
          <NoteCard
            activity={activity}
            location={location}
            description={description}
          />
        </Grid>
      </Grid>
    </div>
  );
}
