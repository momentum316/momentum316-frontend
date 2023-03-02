import {
  ButtonGroup,
  Button,
  Typography,
  Grid,
  Card,
  Paper,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

export function FooterObject({ user }) {
  const navigate = useNavigate();
  return (
    <div className="footer-wrapper">
      <footer>
        <ButtonGroup
          fullWidth
          size="large"
          color="secondary"
          variant="contained"
        >
          <Button onClick={() => navigate(`/home/${user.user.username}`)}>
            Home
          </Button>
          <Button onClick={() => navigate("/group")}>Groups</Button>
          <Button onClick={() => navigate("/")}>Events</Button>
        </ButtonGroup>
      </footer>
    </div>
  );
}
export function GroupHeader() {
  let { groupId } = useParams();
  const navigate = useNavigate();
  return (
    <div className="header-wrapper">
      <ButtonGroup fullWidth size="large" variant="outlined">
        <Button onClick={() => navigate(`/group/${groupId}/vote`)}>
          Voting
        </Button>
        <Button onClick={() => navigate(`/group/${groupId}/discussion`)}>
          Discussion
        </Button>
        <Button onClick={() => navigate(`/group/${groupId}/events`)}>
          Events
        </Button>
      </ButtonGroup>
    </div>
  );
}
