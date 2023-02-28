import { Avatar, AvatarGroup, Grid, Button, ButtonGroup } from "@mui/material";
import { Route, Routes, Link, useParams, useNavigate } from "react-router-dom";
import { FooterObject, GroupHeader } from "./Footer";
import axios from "axios";
import backend_url from "../render.json";

import { useState, useEffect } from "react";

export function GroupPage() {
  const [groups, setGroups] = useState(null);
  useEffect(() => {
    axios
      // need to change this to dynamic username once login page is ready
      .get(`${backend_url.backend_url}/villeryd/groups`)
      .then((response) => setGroups(response.data));
  }, []);

  const navigate = useNavigate();
  return (
    groups && (
      <div>
        <h1>Groups Page</h1>

        <br />
        <div className="group-grid">
          <Grid
            container
            direction="columns"
            spacing={4}
            columns={{ xs: 12, sm: 8, md: 12 }}
          >
            {groups.map((g) => (
              <Grid item xs={2} sm={2} md={2}>
                <Avatar
                  key={g.id}
                  onClick={() => navigate(`/group/${g.id}`)}
                  alt={g.title}
                  src="/static/images/avatar/1.jpg"
                />
                <Grid item xs={1} sm={1} md={1}>
                  {g.title}
                </Grid>
              </Grid>
            ))}
          </Grid>
        </div>
        <FooterObject />
      </div>
    )
  );
}

export function Group() {
  let { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      // need to change this to dynamic username once login page is ready
      .get(`${backend_url.backend_url}/group/${groupId}`)
      .then((response) => setGroup(response.data));
  }, [groupId]);
  return (
    group && (
      <div>
        <h1>{group.title}</h1>
        <GroupHeader />
        <br />
        <div className="group-grid">
          <Grid
            container
            direction="columns"
            spacing={3}
            columnSpacing={{ xs: 2, sm: 8, md: 4 }}
          >
            {group.members.map((g) => (
              <Grid item xs={4} sm={4} md={4}>
                <Avatar
                  key={g}
                  onClick={() => navigate(`/profile/${g}`)}
                  alt={g}
                  src={g}
                />
                <Grid item xs={4} sm={4} md={4}>
                  {g}
                </Grid>
              </Grid>
            ))}
          </Grid>
        </div>
        <FooterObject />
      </div>
    )
  );
}
