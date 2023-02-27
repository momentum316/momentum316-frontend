import { useState } from "react";
import {
  Grid,
  Button,
  Stack,
  ButtonGroup,
  Box,
  Container,
  Divider,
  Typography,
  IconButton,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";


export function VoterSlide({ activity, location }) {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Box
            sx={{
              height: 35,
              backgroundColor: "primary.dark",
              "&:hover": {
                backgroundColor: "primary.main",
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          >
            <Container onClick={() => console.log("up")}>^</Container>
            <Divider />
            <Container onClick={() => console.log("down")}>⌄</Container>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Box
            sx={{
              height: 35,
              backgroundColor: "primary.dark",
              "&:hover": {
                backgroundColor: "primary.main",
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          >
            <Container>
              {activity}
              <br />
              {location}
            </Container>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export function ActivitySlide() {
  return (
    <>
      <Box
        sx={{
          height: 35,
          backgroundColor: "primary.dark",
          "&:hover": {
            backgroundColor: "primary.main",
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        <Container>Some Active Dope Shit</Container>
      </Box>
    </>
  );
}

export function EventSlide() {
  return (
    <>
      <Box>
        <Stack container sx={{ height: 80, backgroundColor: "primary.light" }}>
          <Typography fontSize='3vh'>Event Name</Typography>
          <item>Date Decided</item>
          <item>Location</item>
        </Stack>
      </Box>
    </>
  );
}
