import * as React from "react";
import "./App.css";
import { Stack, TextField, Button, Grid } from "@mui/material";
import { ButtonGroup } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AccountCircleIcon, SearchIcon } from "@mui/icons-material";
import { useState } from "react";

function App() {
  const [value, setValue] = useState("");
  return (
    <div className="App">
      <h1>New Event</h1>
      <Stack spacing={4}>
        <TextField fullWidth label="Event Name" />
      </Stack>
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
      <Button fullWidth variant="outlined">
        Add Option to Event +
      </Button>
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
export default App;
