import { EventSlide } from "./Slides";
import { FooterObject, VertList } from "./Footer";
import { Grid, Box, IconButton, Divider, Container } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

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
      // Start VotingSlide
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Box
            sx={{
              height: 70,
              backgroundColor: "primary.dark",
              "&:hover": {
                backgroundColor: "primary.main",
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          >
            <IconButton onClick={() => console.log("up")}>
              <KeyboardArrowUpIcon />
            </IconButton>
            <Divider />
            <IconButton onClick={() => console.log("down")}>
              <KeyboardArrowDownIcon sx={{ fontWeight: "bold" }} />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Box
            sx={{
              height: 70,
              backgroundColor: "primary.dark",
              "&:hover": {
                backgroundColor: "primary.main",
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          >
            <Container>Some Other Dope Shit</Container>
          </Box>
        </Grid>
      </Grid>
      <FooterObject />
    </>
  );
}
