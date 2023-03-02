import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  Avatar,
  Paper,
  Button,
  ButtonGroup,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState, useEffect } from "react";
import axios from "axios";
import { Stack } from "@mui/system";
import LogoImage from "../images/LogoImage.jpg";

export function LogoCard() {
  return (
    <div>
      <Grid justifyContent="center" alignItems="center">
        <Card>
          <img src={LogoImage} />
        </Card>
      </Grid>
    </div>
  );
}

// ACTIVITY ITEM CARD
export function ActivityCard({
  activity,
  description,
  location,
  startTime,
  endTime,
}) {
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
          subheader={`${location}, ${startTime}, ${endTime}`}
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

// VOTE CARD INCLUDING ARROW BLOCK (includes logic)
export function VoteCard({
  activity,
  description,
  location,
  groupId,
  eventId,
  activityId,
  user,
  startTime,
  endTime,
}) {
  const [voteCount, setVote] = useState(0);

  useEffect(() => {
    axios
      .patch(
        `${process.env.REACT_APP_BACKEND_URL}/vote/${activityId}`,
        { username: user.user.username },
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
        `${process.env.REACT_APP_BACKEND_URL}/vote/${activityId}`,
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
            startTime={startTime}
            endTime={endTime}
            description={description}
          />
        </Grid>
      </Grid>
    </div>
  );
}

// GROUP CARD FOR USER'S GROUP LIST
export function GroupCard() {
  let { groupId } = useParams();
  const navigate = useNavigate();
  return (
    <div className="header-wrapper">
      <ButtonGroup fullWidth size="large" variant="outlined">
        <Button onClick={() => navigate(`/group/${groupId}/vote`)}>
          Voting
        </Button>
        <Button onClick={() => navigate(`/group/${groupId}/discussion`)}>
          Discussion
        </Button>
        <Button onClick={() => navigate(`/group/${groupId}/events`)}>
          Events
        </Button>
      </ButtonGroup>
    </div>
  );
}
