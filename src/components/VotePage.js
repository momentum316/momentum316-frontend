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
import { GroupTabs } from "./NoteCards";

import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { CountdownTimer, useCountdown } from "./TimerSet";
import backend_url from "../render.json";
import { VoteCard } from "./NoteCards";

// LIST OF ACTIVE VOTES PAGE
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
        <GroupTabs />
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

// VOTING PAGE
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
        // console.log(res.data.activity_list);
        setEvent(res.data.activity_list);
        setGroup(res.data.group);
        setEndTime(res.data.vote_closing_time);
      });
  }, [eventId]);

  return (
    event && (
      <>
        <h1>{group}</h1>
        <GroupTabs />
        <br />
        <CountdownTimer targetDate={endTime} />
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
          />
        ))}
        <Button onClick={(e) => handleEvent(e)}>Add an Activity</Button>
      </>
    )
  );
}
