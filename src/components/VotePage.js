import { VoterSlide, EventSlide } from "./Slides";
import { FooterObject, VertList } from "./Footer";

export default function VotePage() {
  return (
    <>
      <EventSlide />
      <VertList />
      <br />
      <VoterSlide />
      <FooterObject />
    </>
  );
}
