import { FooterObject } from "./Footer";
import { Grid, Paper, Typography, Card } from "@mui/material";
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
      <Grid container columnSpacing={{ xs: 2, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <ActivityCard
            activity={activity}
            location={location}
            description={description}
          />
        </Grid>
      </Grid>
    </div>
  );
}
