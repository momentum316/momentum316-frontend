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
          <Button onClick={() => navigate("/")}>Event List</Button>
        </ButtonGroup>
      </footer>
    </div>
  );
}
