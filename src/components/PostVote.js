import { Route, Routes, Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  AvatarGroup,
  Stack,
  Grid,
  Button,
  ButtonGroup,
  IconButton,
  Box,
  TextField,
  Divider,
  Container,
} from "@mui/material";
import FooterObject from "./Footer";
import { bgcolor } from "@mui/system";

export default function PostVoteEvent() {
  const navigate = useNavigate();
  return (
    <div>
      <IconButton>
        <Avatar
          alt="Travis Howard"
          src="/static/images/avatar/2.jpg"
          sx={{ width: 90, height: 90 }}
        />
      </IconButton>
      {/* Make this a component */}
      <Stack>
        <h4>Event Name</h4>
        <span>Date</span>
        <span>Time</span>
      </Stack>
      <Divider />
      <Stack textAlign="left">
        <h6>Address Line</h6>
      </Stack>
      <Container>
        <Box sx={{ bgcolor: "#cfe8fc", height: "20vh" }}>
          Location on Google Map
        </Box>
      </Container>
      <br />
      <Divider />
      <Stack textAlign="left">
        <h6>Description</h6>
      </Stack>
      <Container>
        <Box sx={{ bgcolor: "#cfe8fc", height: "15vh" }}>
          Carried over description. But also editable?
        </Box>
      </Container>
      <br />
      {/* <Stack textAlign="left">
        <h6>Group Membe</h6>
      </Stack> */}
      <Box
        justifyContent="center"
        alignContent="center"
        sx={{ margin: 0.5, height: 20, paddingLeft: 1, bgcolor: "#0093c4" }}
      >
        <Stack sx={{ margin: 0.5, height: 8, paddingLeft: 1 }} textAlign="left">
          <h6>Group Members</h6>
        </Stack>
        <AvatarGroup max={5} spacing="medium">
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
          <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
        </AvatarGroup>
      </Box>
      <FooterObject />
    </div>
  );
}
