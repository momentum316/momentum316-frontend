import {
  Grid,
  Button,
  Card,
  CardHeader,
  Box,
  Tooltip,
  IconButton,
  Typography,
  Avatar,
} from "@mui/material";
import { GroupTabs } from "./NoteCards";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { CountdownTimer, useCountdown } from "./TimerSet";
import { VoteCard, EventCard } from "./NoteCards";
import React from "react";
import { IconLogo } from "./NoteCards";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ActivitySlide } from "./Slides";

// LIST OF ACTIVE VOTES PAGE
export function VotePage({ user }) {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const [activeVote, setActiveVote] = useState(null);
  const [group, setGroup] = useState(null);
  const time = dayjs().toISOString();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/group/${groupId}`, {
        headers: {
          Authorization: `token ${user.token}`,
        },
      })

      .then((res) => {
        setGroup(res.data.title);
        let votesInProgress = res.data.event_list.filter(
          (event) => event.voting === true && event.vote_closing_time > time
        );

        setActiveVote(votesInProgress);

        console.log(votesInProgress);
      });
  }, [groupId]);
  return (
    activeVote && (
      <>
        {/* <ActivitySlide user={user} /> */}
        <Box alignItems='center'>
          <Grid container alignItems='center' justifyContent='right'>
            <Grid item xs={2}>
              <IconLogo />
            </Grid>
            <Grid item xs={8}>
              <Card elevation={0}>
                <CardHeader title={`${group}`} subheader='Open Vote Events' />
              </Card>
            </Grid>
            <Grid item xs={2}>
              <Tooltip title='More Options'>
                <IconButton>
                  <MoreVertIcon fontSize='large' />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Box>
        <GroupTabs />
        <br />
        <Grid container spacing={2}>
          {activeVote.length > 0 ? (
            activeVote.map((v) => (
              <Grid item xs={12}>
                <EventCard
                  onClick={() => navigate(`/group/${v.group_id}/vote/${v.id}`)}
                  user={user}
                  event={v.title}
                  group={v.group_title}
                  groupId={v.group_id}
                  eventId={v.id}
                />
              </Grid>
            ))
          ) : (
            <Grid item>
              <Typography variant='h5'>No Active Votes</Typography>
            </Grid>
          )}
        </Grid>
      </>
    )
  );
}

// VOTING PAGE
export function Vote({ user }) {
  const { groupId, eventId } = useParams();
  const [eventParent, setEventParent] = useState(null);
  const [event, setEvent] = useState(null);
  const [group, setGroup] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [eventVoter, setEventVoter] = useState(null);
  const countdown = useCountdown(endTime);

  const navigate = useNavigate();

  const handleEvent = (e) => {
    navigate(`/add/${groupId}/${eventId}`);
  };

  const handleVoteSubmit = (e) => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/submit-vote/`,
        { username: user.user.username, event_id: eventId },
        {
          headers: {
            Authorization: `token ${user.token}`,
          },
        }
      )
      .then((res) => {
        setEventVoter(true);
      });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/event/${eventId}`, {
        headers: {
          Authorization: `token ${user.token}`,
        },
      })
      .then((res) => {
        setEventParent(res.data);
        setEvent(res.data.activity_list);
        setGroup(res.data.group_title);
        setEndTime(res.data.vote_closing_time);
        setEventVoter(res.data.event_voter.includes(user.user.username));
      });
  }, [eventId]);

  return (
    event && (
      <>
        <IconButton onClick={() => navigate(`/group/${groupId}`)}>
          <Avatar
            alt={eventParent.group_title}
            src={eventParent.group_avatar}
            sx={{ width: 80, height: 80 }}
          />
        </IconButton>
        <Box
          onClick={() =>
            navigate(`/event/${eventParent.group_id}/${eventParent.id}`)
          }
        >
          <ActivitySlide event={eventParent} />
        </Box>
        <Grid container spacing={2} justifyContent='center' alignItems='center'>
          <Grid item xs={12}>
            <GroupTabs />
          </Grid>
          <Grid item xs={12}>
            <CountdownTimer targetDate={endTime} />
          </Grid>
          <Grid item xs={12}>
            {event.map((e) => (
              <VoteCard
                activity={e.title}
                location={e.location}
                description={e.description}
                groupId={groupId}
                eventId={eventId}
                activityId={e.id}
                user={user}
                startTime={e.start_time}
                endTime={e.end_time}
                eventVoter={eventVoter}
              />
            ))}
          </Grid>
          <Grid item xs={12}>
            {!eventVoter && (
              <Button
                fullWidth
                variant='contained'
                onClick={(e) => handleEvent(e)}
              >
                Add an Activity
              </Button>
            )}
          </Grid>
          <Grid item xs={12}>
            {!eventVoter && (
              <Button
                fullWidth
                variant='contained'
                onClick={(e) => handleVoteSubmit(e)}
              >
                Lock Your Votes
              </Button>
            )}
          </Grid>
        </Grid>
      </>
    )
  );
}
