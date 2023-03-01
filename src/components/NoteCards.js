import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  Avatar,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState, useEffect } from "react";
import axios from "axios";
import { Stack } from "@mui/system";
import LogoImage from "../images/LogoImage.jpg";
import backend_url from "../render.json";

export function LogoCard() {
  return (
    <div>
      <Grid container xs={12} justifyContent="center" alignItems="center">
        <Grid item>
          <Card elevation={0}>
            <img src={LogoImage} />
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export function ActivityCard({ activity, description, location }) {
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
  user,
}) {
  const [voteCount, setVote] = useState(0);

  useEffect(() => {
    axios
      .patch(
        `${backend_url.backend_url}/vote/${activityId}`,
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
        `${backend_url.backend_url}/vote/${activityId}`,
        { username: user.user.username, vote: 1 },
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
        `${backend_url.backend_url}/vote/${activityId}`,
        { username: user.user.username, vote: -1 },
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
        `${backend_url.backend_url}/vote/${activityId}`,
        { username: user.user.username, vote: 0 },
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
          <ActivityCard
            activity={activity}
            location={location}
            description={description}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export function HomepageCard({ user }) {
  return (
    <Card elevation={10}>
      <CardHeader
        title={
          <Avatar
            key={user.user.username}
            alt={user.user.first_name}
            src="/static/images/avatar/1.jpg"
          />
        }
        subheader={user}
      />
    </Card>
  );
}
