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
  Divider,
} from "@mui/material";
import CameraRollIcon from "@mui/icons-material/CameraRoll";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useParams } from "react-router-dom";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { SmallLogo, IconLogo } from "./NoteCards";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { useState, useEffect } from "react";

// HOMEPAGE HEADER
export function HomeHeader({ user, setUser, setUserToken }) {
  const navigate = useNavigate();
  const [emptyToken, setEmptyToken] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setUser(null);
    setUserToken(null);
    setEmptyToken(true);
    navigate("/login");
  };
  return (
    <div>
      <Box>
        <Grid container alignItems="center" justifyContent="right">
          <Grid item xs={9}>
            <Card elevation={0}>
              <SmallLogo />
            </Card>
          </Grid>
          <Grid item justifyContent="right">
            <IconButton onClick={handleClick}>
              <MoreVertIcon fontSize="large" />
            </IconButton>
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
        <MenuList>
          <MenuItem onClick={() => navigate("/new/group")}>
            Manage Groups
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}

// GROUPS A USER BELONGS TO PAGE HEADER
export function GroupsHeader({ user }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Box alignItems="center">
        <Grid container alignItems="center" justifyContent="right">
          <Grid item xs={2}>
            <IconLogo />
          </Grid>
          <Grid item xs={8}>
            <Card elevation={0}>
              <CardHeader
                title={`${user.user.first_name}'s`}
                subheader="Groups"
              />
            </Card>
          </Grid>
          <Grid item xs={2}>
            <IconButton onClick={handleClick}>
              <Tooltip title="More Options">
                <MoreVertIcon fontSize="large" />
              </Tooltip>
            </IconButton>
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
        <MenuList>
          <MenuItem onClick={() => navigate("/new/group")}>
            Manage Groups
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>Leave Group</MenuItem>
          <Divider />
          <MenuItem onClick={() => navigate("/logout")}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}

// GROUP MEMBERS PAGE HEADER (WERE YOU CAN LEAVE GROUP)
export function GroupMembersHeader({ user, groupTitle }) {
  const navigate = useNavigate();
  const { groupId } = useParams();
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
          <Grid item xs={2}>
            <IconLogo />
          </Grid>
          <Grid item xs={8}>
            <Card elevation={0}>
              <CardHeader title={`${groupTitle}`} subheader="Members" />
            </Card>
          </Grid>
          <Grid item xs={2}>
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
        <MenuList>
          <MenuItem onClick={() => navigate("/new/group")}>
            Manage Groups
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => navigate(`/leave/${groupId}`)}>
            Leave Group
          </MenuItem>
          <Divider />
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
          <Grid item xs={2}>
            <IconLogo />
          </Grid>
          <Grid item xs={8}>
            <Card elevation={0}>
              <CardHeader
                title={`${user.user.first_name}'s`}
                subheader="Events"
              />
            </Card>
          </Grid>
          <Grid item xs={2}>
            <IconButton onClick={() => navigate("events/new")}>
              <Tooltip title="Add New Event">
                <AddBoxIcon fontSize="large" />
              </Tooltip>
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

// GROUP EVENT LIST HEADER
export function GroupEventsHeader({ user }) {
  const navigate = useNavigate();
  return (
    <div>
      <Box alignItems="center">
        <Grid container alignItems="center" justifyContent="right">
          <Grid item xs={2}>
            <IconLogo />
          </Grid>
          <Grid item xs={8}>
            <Card elevation={0}>
              <CardHeader
                title={`${user.user.first_name}'s`}
                subheader="Events"
              />
            </Card>
          </Grid>
          <Grid item xs={2}>
            <IconButton onClick={() => navigate("../../events/new")}>
              <Tooltip title="Add New Event">
                <AddBoxIcon fontSize="large" />
              </Tooltip>
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

// NEW EVENT HEADER
export function CreateEventHeader({ user }) {
  const [groups, setGroups] = useState(null);
  return (
    <Box>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item>
          <Card elevation={0}>
            <CardHeader title="Create New Event" />
          </Card>
        </Grid>
      </Grid>
      <br />
    </Box>
  );
}
