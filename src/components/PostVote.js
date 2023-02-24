import { Route, Routes, Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Grid,
  Button,
  ButtonGroup,
  IconButton,
  Box,
  TextField,
} from "@mui/material";
import FooterObject from "./Footer";

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
      <h4>Event Name</h4>
      <div></div>

      <FooterObject />
    </div>
  );
}
