import { VoterSlide, EventSlide } from "./Slides";
import { FooterObject, VertList } from "./Footer";
import { Grid } from "@mui/material";

export default function VotePage() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={10} md={8}>
          <EventSlide />
        </Grid>
        <Grid item xs={2} md={4}>
          <VertList />
        </Grid>
      </Grid>
      <br />
      <VoterSlide />
      <FooterObject />
    </>
  );
}
