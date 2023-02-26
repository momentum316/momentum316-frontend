import { ButtonGroup, Button, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export function FooterObject() {
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
          <Button>Functions</Button>
          <Button onClick={() => navigate("/group")}>Groups</Button>
          <Button onClick={() => navigate("/")}>Events</Button>
        </ButtonGroup>
      </footer>
    </div>
  );
}

export function VertList() {
  return (
    <div>
      <MoreVertIcon fontSize="large" />
    </div>
  );
}
