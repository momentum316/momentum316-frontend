import { FooterObject } from "./Footer";
import { Grid, Paper, Typography, Card, Divider } from "@mui/material";
import { ActivityCard } from "./NoteCards";
import { useState } from "react";
import userEvent from "@testing-library/user-event";
import { HomepageCard } from "./NoteCards";
import { HomeHeader } from "./Headers";

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
        <Grid item xs={2}>
          <Typography variant="h5" gutterBottom>
            Live Votes
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ActivityCard
            activity={activity}
            location={location}
            description={description}
          />
        </Grid>
        <Grid item xs={12}>
          <ActivityCard
            activity={activity}
            location={location}
            description={description}
          />
        </Grid>
        <br />
        <Grid item>
          <br />
          <Typography variant="h5" fullWidth gutterBottom>
            Upcoming Events
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ActivityCard
            activity={activity}
            location={location}
            description={description}
          />
        </Grid>
        <Grid item xs={12}>
          <ActivityCard
            activity={activity}
            location={location}
            description={description}
          />
        </Grid>
        <Grid item>
          <br />
          <Typography variant="h5" fullWidth gutterBottom>
            Your Groups
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
