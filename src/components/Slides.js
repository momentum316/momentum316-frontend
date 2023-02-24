import { useState } from "react";
import {
  Grid,
  Button,
  Stack,
  ButtonGroup,
  Box,
  Container,
  Divider,
} from "@mui/material";

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
            <Container>Some Other Dope Shit</Container>
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
