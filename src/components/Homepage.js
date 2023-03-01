import { FooterObject } from "./Footer";
import { Grid, Paper, Typography, Card } from "@mui/material";
import { ActivityCard } from "./NoteCards";
import { useState } from "react";
import userEvent from "@testing-library/user-event";
import { HomepageCard } from "./NoteCards";

export function Homepage({ user }) {
  return (
    <div>
      {/* <HomepageCard /> */}
      <Grid container justifyContent="center">
        <Grid item>
          <Card elevation={1}>
            <Typography variant="h3" component="h2" color="green">
              Hi {user.user.first_name}
            </Typography>
            <Typography variant="h2" component="h2">
              🛖
            </Typography>
          </Card>
        </Grid>
      </Grid>
      <Grid item>
        <div></div>
      </Grid>
      <Grid container columnSpacing={{ xs: 2, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <ActivityCard
            activity={"absolute rager"}
            location={"jerome's house"}
            description={"byob = bring your own bumblebees"}
          />
        </Grid>
      </Grid>
      {/* <FooterObject /> */}
    </div>
  );
}

// Started playing with Paper prop and want to push to play with it on Vote List page
