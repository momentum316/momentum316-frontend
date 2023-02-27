import { Route, Routes, Link, useNavigate, useParams } from "react-router-dom";
import { ActivitySlide } from "./Slides";
import { useEffect, useState } from "react";
import axios from "axios";
import backend_url from "../render.json";

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
import { FooterObject } from "./Footer";
import { bgcolor } from "@mui/system";
import React from "react";

export default function PostVoteEvent() {
  const navigate = useNavigate();
  const { groupId, eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    axios.get(`${backend_url.backend_url}/event/${eventId}`).then((res) => {
      console.log(res.data);
      setEvent(res.data);
    });
  }, [eventId]);

  return (
    event && (
      <div>
        <IconButton onClick={() => navigate(`/group/${groupId}`)}>
          <Avatar
            onClick={() => navigate(`/group/${groupId}`)}
            alt={event.group}
            src="/static/images/avatar/2.jpg"
            sx={{ width: 90, height: 90 }}
          />
        </IconButton>
        {/* Make this a component */}
        <ActivitySlide name={event.title} date={event.date} />
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
          <Stack
            sx={{ margin: 0.5, height: 8, paddingLeft: 1 }}
            textAlign="left"
          >
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
    )
  );
}
