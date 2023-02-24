import { ButtonGroup, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function FooterObject() {
  const navigate = useNavigate();
  return (
    <div className="footer-wrapper">
      <footer>
        <ButtonGroup fullWidth color="secondary" variant="text">
          <Button>Functions</Button>
          <Button onClick={() => navigate("/group")}>Groups</Button>
          <Button onClick={() => navigate("/")}>Events</Button>
        </ButtonGroup>
      </footer>
    </div>
  );
}
