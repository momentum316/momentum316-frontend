import { FooterObject } from "./Footer";
import { Grid, Paper } from "@mui/material";

export function Homepage() {
  return (
    <div>
      <h1>It Happened?</h1>
      <Grid container>
        <Grid item xs={12}>
          <Paper>1</Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>2</Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>3</Paper>
        </Grid>
      </Grid>
      <FooterObject />
    </div>
  );
}

// Started playing with Paper prop and want to push to play with it on Vote List page
