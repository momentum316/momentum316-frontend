import * as React from "react";
import "../App.css";
// General page use
import { Stack, TextField, Button, Grid } from "@mui/material";
// Footer Nav Bar
import { ButtonGroup } from "@mui/material";
// Group Select dropdown
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
// Group select icon
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// Needed for Error on Date entry and we'll use it a lot
import { useState } from "react";

function NewEvent() {
  const [value, setValue] = useState("");
  return (
    <div className="App">
      <Grid>
        <h1>New Event</h1>
        <Grid spacing={4}>
          <TextField fullWidth label="Event Name" />
        </Grid>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Date"
              variant="outlined"
              required
              value={value}
              onChange={(e) => setValue(e.target.value)}
              error={!value}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Time" variant="outlined" />
          </Grid>
        </Grid>
        <br />
        <Grid>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Select Group</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Create New +</Typography>
              <Typography>Placeholder</Typography>
              <Typography>Placeholder</Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <br />
        <Stack spacing={4}>
          <TextField fullWidth label="Enter Address" />
          <TextField
            id="description-box"
            label="Description"
            multiline
            rows={4}
            fullWidth
          ></TextField>
        </Stack>
        <br />
        <Stack>
          <Button fullWidth variant="outlined" rows={2}>
            Add Option to Event +
          </Button>
        </Stack>
      </Grid>
      <footer>
        <ButtonGroup fullWidth color="secondary" variant="text">
          <Button>Calendar</Button>
          <Button>Groups</Button>
          <Button>Events</Button>
        </ButtonGroup>
      </footer>
    </div>
  );
}
// New event/Description box
{
  /* <div className="App">
<h1>New Event </h1>
<div>
  <h4>Description</h4>
  <TextField size="large" label="Description" variant="outlined" />
</div>
</div> */
}

// IconButton avatar
// <p>
//   {/* This IconButton will hold the link to group */}
//   <IconButton>
//     <AccountCircleIcon />
//   </IconButton>
// </p>
export default NewEvent;
