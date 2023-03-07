import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  Avatar,
  Paper,
  Button,
  ButtonGroup,
  List,
  ListItem,
  ImageList,
  ImageListItem,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState, useEffect } from "react";
import axios from "axios";
import { Stack } from "@mui/system";
import LogoImage from "../images/LogoImage.jpg";
import backend_url from "../render.json";
import CameraRollIcon from "@mui/icons-material/CameraRoll";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import dayjs from "dayjs";

// LOGIN LOGO
export function LogoCard() {
  return (
    <div>
      <Grid justifyContent="center" alignItems="center">
        <Card>
          <img src={LogoImage} />
        </Card>
      </Grid>
    </div>
  );
}

// THUMBNAIL LOGO
export function SmallLogo() {
  return (
    <div>
      <Box
        component="img"
        sx={{
          height: 120,
          width: 120,
          maxHeight: { xs: 150, md: 150 },
          maxWidth: { xs: 150, md: 150 },
        }}
        alt="Small Logo"
        src={`${LogoImage}`}
      />
      <Grid justifyContent="center" alignItems="center">
        <Card></Card>
      </Grid>
    </div>
  );
}

// THUMBNAIL LOGO
export function IconLogo() {
  return (
    <div>
      <Box
        component="img"
        sx={{
          height: 60,
          width: 60,
          maxHeight: { xs: 150, md: 150 },
          maxWidth: { xs: 150, md: 150 },
        }}
        alt="Small Logo"
        src={`${LogoImage}`}
      />
      <Grid justifyContent="center" alignItems="center">
        <Card></Card>
      </Grid>
    </div>
  );
}

// EVENT ITEM CARD
export function EventCard({
  event,
  description,
  location,
  startTime,
  endTime,
  groupId,
  eventId,
  group,
  decided,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardHeader
              action={
                <IconButton onClick={() => setIsExpanded(!isExpanded)}>
                  <ExpandMoreIcon />
                </IconButton>
              }
              avatar={
                <Avatar
                  key={groupId}
                  onClick={() => navigate(`/group/${groupId}`)}
                  alt={group}
                  src="/static/images/avatar/1.jpg"
                />
              }
              title={event}
              subheader={group}
            />
            {isExpanded && (
              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  {`Time: ${dayjs(startTime).format("hh:mm a")} - ${dayjs(
                    endTime
                  ).format("hh:mm a")}`}
                  <br />
                  {description}
                </Typography>
                {eventId && decided === true ? (
                  <Button
                    onClick={() => navigate(`/event/${groupId}/${eventId}`)}
                  >
                    Event Page
                  </Button>
                ) : (
                  <Button
                    onClick={() =>
                      navigate(`/group/${groupId}/vote/${eventId}`)
                    }
                  >
                    Vote Page
                  </Button>
                )}
              </CardContent>
            )}
          </Card>
          <Typography gutterBottom></Typography>
        </Grid>
      </Grid>
    </div>
  );
}

// ACTIVITY ITEM CARD
export function ActivityCard({
  activity,
  description,
  location,
  startTime,
  endTime,
  groupId,
  eventId,
  decided,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      <Card elevation={3}>
        <CardHeader
          action={
            <IconButton onClick={() => setIsExpanded(!isExpanded)}>
              <ExpandMoreIcon />
            </IconButton>
          }
          title={activity}
          subheader={`${location}`}
        />
        {isExpanded && (
          <CardContent>
            <Typography variant="body2" color="textSecondary">
              {`Time: ${dayjs(startTime).format("hh:mm a")} - ${dayjs(
                endTime
              ).format("hh:mm a")}`}
              <br />
              {description}
            </Typography>
            {decided === true && (
              <Button onClick={() => navigate(`/event/${groupId}/${eventId}`)}>
                Event Page
              </Button>
            )}
          </CardContent>
        )}
      </Card>
    </div>
  );
}

// VOTE CARD INCLUDING ARROW BLOCK (includes logic)
export function VoteCard({
  activity,
  description,
  location,
  groupId,
  eventId,
  activityId,
  user,
  startTime,
  endTime,
}) {
  const [voteCount, setVote] = useState(0);
  const [voteId, setVoteId] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/activity/${activityId}`, {
        headers: { authorization: `token ${user.token}` },
      })
      .then((res) => {
        let voter = res.data.vote_list.filter(
          (voter) => voter.voter === user.user.username
        );
        setVoteId(voter[0].id);
        setVote(voter[0].vote);
      });
  }, [activityId]);

  const handleUp = (e) => {
    if (voteCount === 1) {
      handleZero();
      return;
    }

    axios
      .patch(
        `${process.env.REACT_APP_BACKEND_URL}/vote/${voteId}`,
        { vote: 1 },
        {
          headers: {
            authorization: `token ${user.token}`,
          },
        }
      )
      .then((res) => {
        setVote(res.data.vote);
      });
  };

  const handleDown = (e) => {
    if (voteCount === -1) {
      handleZero();
      return;
    }

    axios
      .patch(
        `${process.env.REACT_APP_BACKEND_URL}/vote/${voteId}`,
        { vote: -1 },
        {
          headers: {
            authorization: `token ${user.token}`,
          },
        }
      )
      .then((res) => {
        setVote(res.data.vote);
      });
  };
  const handleZero = (e) => {
    axios
      .patch(
        `${process.env.REACT_APP_BACKEND_URL}/vote/${voteId}`,
        { vote: 0 },
        {
          headers: {
            authorization: `token ${user.token}`,
          },
        }
      )
      .then((res) => {
        setVote(res.data.vote);
      });
  };
  return (
    <div>
      <Grid container>
        <Grid item xs={2}>
          <Stack alignItems="center" justifyContent="center">
            <KeyboardArrowUpIcon
              onClick={(e) => handleUp(e)}
              color={voteCount === 1 ? "warning" : ""}
            />
            {/* {voteCount} */}
            <br />
            <KeyboardArrowDownIcon
              onClick={(e) => handleDown(e)}
              color={voteCount === -1 ? "warning" : ""}
            />
          </Stack>
        </Grid>
        <Grid item xs={10}>
          <ActivityCard
            activity={activity}
            location={location}
            startTime={startTime}
            endTime={endTime}
            description={description}
          />
        </Grid>
      </Grid>
    </div>
  );
}

// 3 ITEM HEADER FOR VOTING, DISCUSSION, AND EVENT
export function GroupTabs() {
  let { groupId } = useParams();
  const navigate = useNavigate();
  return (
    <div className="header-wrapper">
      <ButtonGroup fullWidth size="large" variant="outlined">
        <Button onClick={() => navigate(`/group/${groupId}/vote`)}>
          Voting
        </Button>
        <Button onClick={() => navigate(`/group/${groupId}/members`)}>
          Members
        </Button>
        <Button onClick={() => navigate(`/group/${groupId}/events`)}>
          Events
        </Button>
      </ButtonGroup>
    </div>
  );
}

// ACTIVE VOTE EVENTS FOR USER
export function ActiveVotesForUser({
  user,
  activity,
  description,
  location,
  startTime,
  endTime,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeVote, setActiveVote] = useState(null);
  const [groups, setGroups] = useState(null);
  const [time, setTime] = useState(dayjs().toISOString());
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/${user.user.username}/home`, {
        headers: {
          Authorization: `token ${user.token}`,
        },
      })

      .then((res) => {
        // let votesInProgress = res.data.event_list.filter(
        //   (event) => event.voting === true && event.vote_closing_time > time
        // );
        // setActiveVote(votesInProgress);
        // console.log(votesInProgress);
        console.log(res.data.group_list);
        setGroups(res.data.group_list);
        setLoading(false);
      });
  }, [user.user.username, user.token]);

  if (loading === true) {
    return <p>Loading</p>;
  }

  return (
    groups && (
      <div>
        {groups.map((group) => {
          let votesInProgress = group.event_list.filter(
            (event) => event.voting === true && event.vote_closing_time > time
          );
          console.log(votesInProgress);
          return (
            votesInProgress.length > 0 &&
            votesInProgress.map((e) => (
              <EventCard
                user={user}
                event={e.title}
                group={e.group_title}
                groupId={e.group_id}
                startTime={e.date}
                endTime={e.vote_closing_time}
                eventId={e.id}
                decided={e.decided}
              />
            ))
          );
        })}
      </div>
    )
  );
}

export function UpcomingEventsForUser({
  user,
  activity,
  description,
  location,
  startTime,
  endTime,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeVote, setActiveVote] = useState(null);
  const [groups, setGroups] = useState(null);
  const [time, setTime] = useState(dayjs().toISOString());
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/${user.user.username}/home`, {
        headers: {
          Authorization: `token ${user.token}`,
        },
      })

      .then((res) => {
        // let votesInProgress = res.data.event_list.filter(
        //   (event) => event.voting === true && event.vote_closing_time > time
        // );
        // setActiveVote(votesInProgress);
        // console.log(votesInProgress);
        console.log(res.data.group_list);
        setGroups(res.data.group_list);
        setLoading(false);
      });
  }, [user.user.username, user.token]);

  if (loading === true) {
    return <p>Loading</p>;
  }

  return (
    groups && (
      <div>
        {groups.map((group) => {
          let votesInProgress = group.event_list.filter(
            (event) => event.decided === true
          );
          console.log(votesInProgress);
          return (
            votesInProgress.length > 0 &&
            votesInProgress.map((e) => (
              <EventCard
                user={user}
                event={e.title}
                group={e.group_title}
                groupId={e.group_id}
                startTime={e.date}
                endTime={e.vote_closing_time}
                eventId={e.id}
                decided={e.decided}
              />
            ))
          );
        })}
      </div>
    )
  );
}

// LIST OF USER'S GROUPS ONLY OCCURRING ON HOMEPAGE
export function UserGroups({ user }) {
  const [groups, setGroups] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      // need to change this to dynamic username once login page is ready
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/${user.user.username}/groups`,
        {
          headers: {
            Authorization: `token ${user.token}`,
          },
        }
      )
      .then((response) => setGroups(response.data));
  }, [user.user.username, user.token]);

  return (
    groups && (
      <>
        <Grid
          container
          spacing={2}
          direction="row"
          columns={{ xs: 6, sm: 6, md: 12 }}
          alignItems="center"
          justify="center"
        >
          {groups.map((g) => (
            <Grid item xs={3}>
              <ImageList
                sx={{
                  gridAutoFlow: "column",
                  gridTemplateColumns:
                    "repeat(auto-fill,minmax(160px,1fr)) !important",
                  gridAutoColumns: "minmax(160px, 1fr)",
                }}
              >
                <ImageListItem>
                  <Card elevation={3}>
                    <CardHeader
                      title={
                        <Avatar
                          key={g.id}
                          onClick={() => navigate(`/group/${g.id}`)}
                          alt={g.title}
                          src="/static/images/avatar/1.jpg"
                        />
                      }
                      subheader={g.title}
                    />
                  </Card>
                </ImageListItem>
              </ImageList>
            </Grid>
          ))}
        </Grid>
      </>
    )
  );
}
