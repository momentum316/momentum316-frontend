import { Avatar, AvatarGroup, Grid, Button, ButtonGroup } from "@mui/material";
import { Route, Routes, Link, UseParams, useNavigate } from "react-router-dom";
import FooterObject from "./Footer";
import axios from "axios";

import { useState, useEffect } from "react";

export default function GroupPage() {
  const [groups, setGroups] = useState(null);
  useEffect(() => {
    axios
      // need to change this to dynamic username once login page is ready
      .get("https://congregate.onrender.com/villeryd/groups")
      .then((response) => setGroups(response.data));
  }, []);

  const navigate = useNavigate();
  return (
    groups && (
      <div>
        <p>Groups Page</p>

        <br />
        <div className='group-grid'>
          <Grid
            container
            direction='columns'
            spacing={3}
            columns={{ xs: 12, sm: 8, md: 12 }}
          >
            {groups.map((g) => (
              <Grid item xs={4} sm={4} md={4}>
                <Avatar
                  key={g.id}
                  onClick={() => navigate(`/group/${g.id}`)}
                  alt={g.title}
                  src='/static/images/avatar/1.jpg'
                />
                <p>{g.title}</p>
              </Grid>
            ))}
          </Grid>
        </div>
        <FooterObject />
      </div>
    )
  );
}
