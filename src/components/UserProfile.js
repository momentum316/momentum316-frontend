import { FooterObject } from "./Footer";

export function Profile({ user }) {
  return (
    <div>
      <h1>{user.user.username}</h1>
      <FooterObject />
    </div>
  );
}
