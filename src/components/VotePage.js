import {
  Grid,
  Box,
  IconButton,
  Divider,
  Container,
  Paper,
  Button,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { VoterSlide, EventSlide } from "./Slides";
import { FooterObject, VertList, GroupHeader } from "./Footer";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { CountdownTimer, useCountdown } from "./TimerSet";
import backend_url from "../render.json";
import { VoteCard } from "./NoteCards";

export function VotePage({ user }) {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const [activeVote, setActiveVote] = useState(null);
  const [activityList, setActivityList] = useState(null);
  const time = dayjs().toISOString();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/group/${groupId}`)

      .then((res) => {
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
        <h1>Active Votes</h1>
        <GroupHeader />
        <br />
        <Grid container spacing={2}>
          {activeVote.length > 0 ? (
            activeVote.map((v) => (
              <Grid
                item
                xs={12}
                sx={{
                  height: 35,
                  backgroundColor: "primary.main",
                  "&:hover": {
                    backgroundColor: "primary.main",
                    opacity: [0.9, 0.8, 0.7],
                  },
                }}
                onClick={() => navigate(`/group/${groupId}/vote/${v.id}`)}
              >
                {v.title}
              </Grid>
            ))
          ) : (
            <p>No Active Votes</p>
          )}
        </Grid>
        {/* <FooterObject /> */}
      </>
    )
  );
}

// v.activity_list.map((a) => (
//   <VoterSlide activity={a.title} location={a.description} />

// <Grid container spacing={2}>
//           <Grid item xs={10} md={8}>
//             <EventSlide />
//           </Grid>
//           <Grid item xs={2} md={4}>
//             <VertList />
//           </Grid>
//         </Grid>
//         <br />
//         <GroupHeader />
//         <br />
//         <Stack>
//
//         </Stack>
//         <FooterObject />

export function Vote({ user }) {
  const { groupId, eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [group, setGroup] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const countdown = useCountdown(endTime);

  const navigate = useNavigate();

  const handleEvent = (e) => {
    navigate(`/add/${groupId}/${eventId}`);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/event/${eventId}`)
      .then((res) => {
        console.log(res.data.activity_list);
        setEvent(res.data.activity_list);
        setGroup(res.data.group);
        setEndTime(res.data.vote_closing_time);
      });
  }, [eventId]);

  return (
    event && (
      <>
        <h1>{group}</h1>
        <GroupHeader />
        <br />
        <CountdownTimer targetDate={endTime} />
        {event.map((e) => (
          <VoteCard
            activity={e.title}
            // location={e.location}
            description={e.description}
            groupId={groupId}
            eventId={eventId}
            activityId={e.id}
            user={user}
          />
        ))}
        <Button onClick={(e) => handleEvent(e)}>Add an Event</Button>
      </>
    )
  );
}
