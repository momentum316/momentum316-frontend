import { Grid, Box, IconButton, Divider, Container } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { VoterSlide, EventSlide } from "./Slides";
import { FooterObject, VertList, GroupHeader } from "./Footer";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

export function VotePage() {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const [activeVote, setActiveVote] = useState(null);
  const [activityList, setActivityList] = useState(null);
  const time = dayjs().toISOString();
  const endTime = "2023-02-27T20:16:17.618000Z";

  console.log(time < endTime);

  useEffect(() => {
    axios
      .get(`https://congregate.onrender.com/group/${groupId}`)

      .then((res) => {
        let votesInProgress = res.data.event_list.filter(
          (event) => event.voting === true && event.vote_closing_time > time
        );

        setActiveVote(votesInProgress);

        // setActivityList(votesInProgress.activity_list[0]);
        console.log(votesInProgress[0].activity_list[0].title);
      });
  }, [groupId]);
  return (
    activeVote && (
      <>
        <h1>Active Votes</h1>
        <GroupHeader />
        <br />
        <Grid container spacing={2}>
          {activeVote.map((v) => (
            <Grid item xs={12}>
              <Box
                onClick={() => navigate(`/group/${groupId}/vote/${v.id}`)}
                sx={{
                  height: 35,
                  backgroundColor: "primary.main",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                    opacity: [0.9, 0.8, 0.7],
                  },
                }}
              >
                <Container>
                  {v.title}
                  <br />
                </Container>
              </Box>
            </Grid>
          ))}
        </Grid>
        <FooterObject />
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

export function Vote() {
  const { groupId, eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [group, setGroup] = useState(null);
  console.log(groupId);
  console.log(eventId);

  useEffect(() => {
    axios
      .get(`https://congregate.onrender.com/event/${eventId}`)
      .then((res) => {
        console.log(res.data.activity_list);
        setEvent(res.data.activity_list);
        setGroup(res.data.group);
      });
  }, [eventId]);

  return (
    event && (
      <>
        <h1>{group}</h1>
        <GroupHeader />
        <br />
        {event.map((e) => (
          <VoterSlide
            activity={e.title}
            location={e.description}
            groupId={groupId}
            eventId={eventId}
            activityId={e.id}
          />
        ))}
        <FooterObject />
      </>
    )
  );
}
