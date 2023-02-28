import { FooterObject } from "./Footer";
import { Grid, Paper, Typography } from "@mui/material";
import NoteCard from "./NoteCard";
import { useState } from "react";

export function Homepage() {
  const [activeVote, setActiveVote] = useState(null);
  return (
    <div>
      <Typography variant="h1" component="h2" gutterBottom>
        🏚️
      </Typography>
      <Grid container>
        <Grid item xs={12}>
          <Paper>Paper Item</Paper>
        </Grid>
      </Grid>
      <FooterObject />
    </div>
  );
}

// Started playing with Paper prop and want to push to play with it on Vote List page
