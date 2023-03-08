import { FooterObject } from "./Footer";
import { Grid, Paper, Typography, Card, Divider, List } from "@mui/material";
import { ActivityCard } from "./NoteCards";
import { useState } from "react";
import userEvent from "@testing-library/user-event";
import { HomepageCard } from "./NoteCards";
import { HomeHeader } from "./Headers";
import {
  ActiveVotesForUser,
  UpcomingEventsForUser,
  UserGroups,
} from "./NoteCards";
import { FixedSizeList } from "react-window";

export function Homepage({
  user,
  activity,
  description,
  location,
  startTime,
  endTime,
}) {
  return (
    <div>
      <HomeHeader user={user} />
      <br />
      <Grid container spacing={2}>
        <Grid item>
          <Typography variant='h5'>Live Votes</Typography>
        </Grid>
        <Grid item xs={12} sx={{ maxHeight: 240 }}>
          <List style={{ maxHeight: "100%", overflow: "auto" }}>
            <ActiveVotesForUser user={user} />
          </List>
        </Grid>

        <Grid item>
          <Typography variant='h5' fullWidth>
            Upcoming Events
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ maxHeight: 240 }}>
          <List style={{ maxHeight: "100%", overflow: "auto" }}>
            <UpcomingEventsForUser user={user} />
          </List>
        </Grid>
      </Grid>
    </div>
  );
}
