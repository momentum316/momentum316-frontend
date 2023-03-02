// HOMEPAGE HEADER W/ CAMERA, GREETING, OPTION LIST ICON
import React from "react";
import {
  IconButton,
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

// HOMEPAGE HEADER
export function HomeHeader({ user }) {
  return (
    <div>
      <Grid container spacing={8} justifyContent="center" alignItems="center">
        <Grid item>
          <CameraRollIcon fontSize="large" />
        </Grid>
        <Grid item>
          <Card elevation={0}>
            {/* <LogoCard /> */}
            <Typography variant="h3" component="h2">
              {user.user.first_name}
            </Typography>
            <Typography variant="h2" component="h2">
              🏠
            </Typography>
          </Card>
        </Grid>
        <Grid item>
          <MoreVertIcon fontSize="large" />
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
  return (
    <div>
      <Grid container spacing={12} alignItems="center" justifyContent="center">
        <Grid item xs={6}>
          <Card elevation={0}>
            <CardHeader
              title={`${user.user.first_name}'s`}
              subheader="Groups"
            />
          </Card>
        </Grid>
        <Grid item xs={2}>
          <IconButton>
            <AddIcon fontSize="large" color="black" />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
}
