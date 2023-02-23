import { ButtonGroup, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function FooterObject() {
  const navigate = useNavigate();
  return (
    <footer>
      <ButtonGroup fullWidth color="secondary" variant="text">
        <Button>Calendar</Button>
        <Button onClick={() => navigate("/group")}>Groups</Button>
        <Button onClick={() => navigate("/")}>Events</Button>
      </ButtonGroup>
    </footer>
  );
}

export default FooterObject;
