import { Grid, Box, IconButton, Divider, Container } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { VoterSlide, EventSlide } from "./Slides";
import { FooterObject, VertList, GroupHeader } from "./Footer";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

export default function VotePage() {
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
        {activeVote.map((v) =>
          v.activity_list.map((a) => (
            <VoterSlide activity={a.title} location={a.description} />
          ))
        )}
        <FooterObject />
      </>
    )
  );
}

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
//           <VoterSlide activity={"bowling"} location={"bowl america"} />
//         </Stack>
//         <FooterObject />
