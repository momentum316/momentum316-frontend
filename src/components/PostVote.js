import { Route, Routes, Link, useNavigate, useParams } from "react-router-dom";
import { ActivitySlide } from "./Slides";
import { useEffect, useState } from "react";
import axios from "axios";
import backend_url from "../render.json";
import dayjs from "dayjs";

import {
  Avatar,
  AvatarGroup,
  Stack,
  Grid,
  Button,
  ButtonGroup,
  IconButton,
  Box,
  TextField,
  Divider,
  Container,
} from "@mui/material";
import { FooterObject } from "./Footer";
import { bgcolor } from "@mui/system";
import React from "react";
import { CountdownTimer, useCountdown } from "./TimerSet";

// POST VOTE EVENT PAGE
export default function PostVoteEvent({ user }) {
  const navigate = useNavigate();
  const now = dayjs();
  const { groupId, eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [group, setGroup] = useState(null);
  const [time, setTime] = useState(now.toISOString());

  useEffect(() => {
    axios

      .get(`${process.env.REACT_APP_BACKEND_URL}/group/${groupId}`, {
        headers: {
          Authorization: `token ${user.token}`,
        },
      })
      .then((res) => {
        setGroup(res.data);
      });
  }, [groupId, user.token]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/event/${eventId}`, {
        headers: {
          Authorization: `token ${user.token}`,
        },
      })
      .then((res) => {
        setEvent(res.data);
      });
  }, [eventId, user.token]);

  /* global google */
  const [authToken, setAuthToken] = useState(null);
  const client = google.accounts.oauth2.initTokenClient({
    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    scope: "https://www.googleapis.com/auth/calendar",
    callback: (response) => {
      console.log(response);
      setAuthToken(response);
    },
  });

  const handleCalendar = () => {
    client.requestAccessToken();
    axios
      .post(
        `https://www.googleapis.com/calendar/v3/calendars/${user.user.email}/events`,
        {
          summary: `${event.title}`,
          // location: `${event.activity_list[0].location}`,
          // description: `${event.activity_list[0].description}`,
          start: {
            dateTime: event.date,
            timeZone: "America/New_York",
          },
          end: {
            dateTime: event.vote_closing_time,
            timeZone: "America/New_York",
          },
        },
        {
          headers: {
            Authorization: `Bearer ${authToken.access_token}`,
          },
        }
      )
      .then((res) => console.log(res));
  };

  return (
    event &&
    group && (
      <div>
        <IconButton onClick={() => navigate(`/group/${groupId}`)}>
          <Avatar
            alt={event.group_title}
            src={event.group_avatar}
            sx={{ width: 80, height: 80 }}
          />
        </IconButton>
        {/* Make this a component */}

        {event.decided === false ? (
          <>
            <ActivitySlide event={event} />
            <CountdownTimer targetDate={event.vote_closing_time} />
            <Divider />
            <Button
              onClick={() =>
                navigate(`/group/${event.group_id}/vote/${event.id}`)
              }
            >
              Back To Vote
            </Button>
            <Divider />
          </>
        ) : event.voting === false ? (
          <>
            <ActivitySlide event={event} />
            <Divider />
            <Button onClick={() => handleCalendar()}>
              Add to Google Calendar
            </Button>
            <Divider />
          </>
        ) : (
          <>
            <ActivitySlide event={event.activity_list[0]} />
            <Divider />
            <Button onClick={() => handleCalendar()}>
              Add to Google Calendar
            </Button>
            <Divider />
          </>
        )}
        <Stack textAlign='left'>
          <h6>Location</h6>
        </Stack>
        {event.decided === false ? (
          <>
            <Container>
              {event.location !== null ? (
                event.location
              ) : (
                <p>No Location specified. Ask the group!</p>
              )}
            </Container>
            <br />
            <Divider />
            <Stack textAlign='left'>
              <h6>Description</h6>
            </Stack>
            <Container>
              {event.description !== null ? (
                event.description
              ) : (
                <p>No more details here. Ask the group!</p>
              )}
            </Container>
          </>
        ) : event.voting === false ? (
          <>
            <Container>{event.location}</Container>
            <br />
            <Divider />
            <Stack textAlign='left'>
              <h6>Description</h6>
            </Stack>
            <Container>{event.description}</Container>
          </>
        ) : (
          <>
            <Container>
              {event.activity_list[0] && event.activity_list[0].location}
            </Container>
            <br />
            <Divider />
            <Stack textAlign='left'>
              <h6>Description</h6>
            </Stack>
            <Container>
              {event.activity_list[0] && event.activity_list[0].description}
            </Container>
          </>
        )}

        <br />
        {/* <Stack textAlign="left">
        <h6>Group Membe</h6>
      </Stack> */}
        <Box
          justifyContent='center'
          alignContent='center'
          sx={{ margin: 0.5, height: 20, paddingLeft: 1, bgcolor: "#0093c4" }}
        >
          <Stack
            sx={{ margin: 0.5, height: 8, paddingLeft: 1 }}
            textAlign='left'
          >
            <h6>Group Members</h6>
          </Stack>
          <AvatarGroup max={5} spacing='medium'>
            {group.members.map((g) => (
              <Avatar key={g} alt={g} src='/static/images/avatar/1.jpg' />
            ))}
          </AvatarGroup>
        </Box>
        {/* <FooterObject /> */}
      </div>
    )
  );
}
