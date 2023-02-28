import { FooterObject } from "./Footer";
import { Grid, Paper, Typography } from "@mui/material";
import { ActivityCard } from "./NoteCards";
import { useState } from "react";

export function Homepage() {
  return (
    <div>
      <Typography variant="h1" component="h2" gutterBottom>
        🏚️
      </Typography>
      <Grid container columnSpacing={{ xs: 2, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <ActivityCard
            activity={"absolute rager"}
            location={"jerome's house"}
            description={"byob = bring your own bumblebees"}
          />
        </Grid>
      </Grid>
      <FooterObject />
    </div>
  );
}

// Started playing with Paper prop and want to push to play with it on Vote List page
