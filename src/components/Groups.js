import { Avatar, AvatarGroup, Grid, Button, ButtonGroup } from "@mui/material";
import { IconButton } from "@mui/joy/IconButton";
import { Route, Routes, Link, UseParams, useNavigate } from "react-router-dom";
import FooterObject from "./Footer";

function GroupPage() {
  const navigate = useNavigate();
  return (
    <div>
      <p>Groups Page</p>

      <br />
      <Grid
        container
        spacing={{ xs: 4, md: 4 }}
        columns={{ xs: 12, sm: 8, md: 12 }}
      >
        <Grid item xs={4} sm={4} md={4}>
          <Avatar
            onClick={() => navigate("/")}
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
          />
        </Grid>

        <Grid item xs={4} sm={4} md={4}>
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        </Grid>
        <Grid item xs={4} sm={4} md={4}>
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        </Grid>
        <Grid item xs={4} sm={4} md={4}>
          <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
        </Grid>
        <Grid item xs={4} sm={4} md={4}>
          <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
        </Grid>
        <Grid item xs={4} sm={4} md={4}>
          <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
        </Grid>
        <Grid item xs={4} sm={4} md={4}>
          <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
        </Grid>
        <Grid item xs={4} sm={4} md={4}>
          <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
        </Grid>
        <Grid item xs={4} sm={4} md={4}>
          <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
        </Grid>
      </Grid>
      <FooterObject />
    </div>
  );
}

export default GroupPage;
