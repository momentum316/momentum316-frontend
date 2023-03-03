// HOMEPAGE HEADER W/ CAMERA, GREETING, OPTION LIST ICON
import React from "react";
import {
  IconButton,
  Box,
  Grid,
  Card,
  CardHeader,
  Typography,
  Avatar,
  Paper,
} from "@mui/material";
import CameraRollIcon from "@mui/icons-material/CameraRoll";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { SmallLogo } from "./NoteCards";

// HOMEPAGE HEADER
export function HomeHeader({ user }) {
  return (
    <div>
      <Grid container spacing={8} justifyContent="center" alignItems="center">
        <Grid item>
          <IconButton>
            <CameraRollIcon fontSize="large" />
          </IconButton>
        </Grid>
        <Grid item>
          <Card elevation={0}>
            {/* <LogoCard /> */}
            <SmallLogo />
          </Card>
        </Grid>
        <Grid item>
          <IconButton>
            <MoreVertIcon fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
    </div>

    // <Card elevation={10}>
    //   <CardHeader
    //     title={
    //       <Avatar
    //         key={user.user.username}
    //         alt={user.user.first_name}
    //         src='/static/images/avatar/1.jpg'
    //       />
    //     }
    //     subheader={user}
    //   />
    // </Card>
  );
}

// GROUPS PAGE HEADER
export function GroupsHeader({ user }) {
  const navigate = useNavigate();
  return (
    <div>
      <Box alignItems="center">
        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={8}>
            <Card elevation={0}>
              <CardHeader
                title={`${user.user.first_name}'s`}
                subheader="Groups"
              />
            </Card>
          </Grid>
          <Grid item>
            <IconButton onClick={() => navigate("/new/group")}>
              <GroupAddIcon fontSize="large" color="black" />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

// EVENT LIST HEADER
export function EventsHeader({ user }) {
  const navigate = useNavigate();
  return (
    <div>
      <Box alignItems="center">
        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={8}>
            <Card elevation={0}>
              <CardHeader
                title={`${user.user.first_name}'s`}
                subheader="Events"
              />
            </Card>
          </Grid>
          <Grid item>
            <IconButton onClick={() => navigate("events/new")}>
              <AddBoxIcon fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
export function CreateEventHeader() {
  return (
    <Box>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item>
          <Card>
            <CardHeader title="New Event Page" />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
