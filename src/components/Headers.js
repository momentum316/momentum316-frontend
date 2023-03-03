// HOMEPAGE HEADER W/ CAMERA, GREETING, OPTION LIST ICON
import React from "react";
import axios from "axios";
import {
  IconButton,
  Box,
  Grid,
  Card,
  CardHeader,
  Typography,
  Avatar,
  Paper,
  Tooltip,
  Menu,
  MenuList,
  MenuItem,
} from "@mui/material";
import CameraRollIcon from "@mui/icons-material/CameraRoll";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useParams } from "react-router-dom";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { SmallLogo } from "./NoteCards";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { useState, useEffect } from "react";

// HOMEPAGE HEADER
export function HomeHeader({ user }) {
  return (
    <div>
      <Grid container spacing={6} justifyContent="center" alignItems="center">
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
          <IconButton onClick="expand">
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
        <Grid container alignItems="center" justifyContent="right">
          <Grid item xs={4}>
            <Card elevation={0}>
              <CardHeader
                title={`${user.user.first_name}'s`}
                subheader="Groups"
              />
            </Card>
          </Grid>
          <Grid item xs={4}>
            <IconButton onClick={() => navigate("/new/group")}>
              <MoreVertIcon fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

// GROUP MEMBERS PAGE HEADER (WERE YOU CAN LEAVE GROUP)
export function GroupMembersHeader({ user, groupTitle }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // useEffect(() =>
  // axios
  // .delete(`${process.env.REACT_APP_BACKEND_URL}/leave/${groupId}`)
  // .then((response) => )
  // .catch(onClick => {

  // })

  return (
    <div>
      <Box alignItems="center">
        <Grid container alignItems="center" justifyContent="right">
          <Grid item xs={4}>
            <Card elevation={0}>
              <CardHeader title={`${groupTitle}`} subheader="Members" />
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Tooltip title="More Options">
              <IconButton onClick={handleClick}>
                <MoreVertIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
          },
        }}
      >
        <MenuList
          autoFocusItem={open}
          id="composition-menu"
          aria-labelledby="composition-button"
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}

// EVENT LIST HEADER
export function EventsHeader({ user }) {
  const navigate = useNavigate();
  return (
    <div>
      <Box alignItems="center">
        <Grid container alignItems="center" justifyContent="right">
          <Grid item xs={4}>
            <Card elevation={0}>
              <CardHeader
                title={`${user.user.first_name}'s`}
                subheader="Events"
              />
            </Card>
          </Grid>
          <Grid item xs={4}>
            <IconButton onClick={() => navigate("events/new")}>
              <AddBoxIcon fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

// NEW EVENT HEADER
export function CreateEventHeader({ user }) {
  return (
    <Box>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item>
          <Card columns>
            <CardHeader avatar={<Avatar> NE </Avatar>} subheader="New Event" />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
