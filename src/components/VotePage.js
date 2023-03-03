import { Grid, Button } from "@mui/material";
import { GroupTabs } from "./NoteCards";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { CountdownTimer, useCountdown } from "./TimerSet";
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
      .get(`${process.env.REACT_APP_BACKEND_URL}/group/${groupId}`, {
        headers: {
          Authorization: `token ${user.token}`,
        },
      })

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
      .get(`${process.env.REACT_APP_BACKEND_URL}/event/${eventId}`, {
        headers: {
          Authorization: `token ${user.token}`,
        },
      })
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
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <h1>{group}</h1>
            <CountdownTimer targetDate={endTime} />
            <GroupTabs />
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
              />
            ))}
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={(e) => handleEvent(e)}>
              Add an Activity
            </Button>
          </Grid>
        </Grid>
      </>
    )
  );
}
