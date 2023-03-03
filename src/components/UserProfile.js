import { FooterObject } from "./Footer";
import { useParams } from "react-router-dom";

export function Profile({ user }) {
  const { username } = useParams();
  return (
    <div>
      <h1>{username}</h1>
      {/* <FooterObject /> */}
    </div>
  );
}
