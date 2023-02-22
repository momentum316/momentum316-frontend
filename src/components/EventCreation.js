import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";

/*global google*/
function EventCreation() {
  const [userCredential, setUserCredential] = useState(null);

  const handleCredentialResponse = (cred) => {
    setUserCredential(jwtDecode(cred.credential));
  };

  window.onload = function () {
    google.accounts.id.initialize({
      client_id:
        "810551053192-v4k0609k7muia96p5smtg2hqmbfijakt.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });
    google.accounts.id.prompt();
  };

  // x
  const [authToken, setAuthToken] = useState(null);
  const client = google.accounts.oauth2.initTokenClient({
    client_id:
      "810551053192-v4k0609k7muia96p5smtg2hqmbfijakt.apps.googleusercontent.com",
    scope: "https://www.googleapis.com/auth/calendar",
    callback: (response) => {
      console.log(response);
      setAuthToken(response);
    },
  });
  const [event, setEvent] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [attendees, setAttendees] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(authToken.access_token);
    console.log(userCredential.email);
    axios.post(
      `https://www.googleapis.com/calendar/v3/calendars/${userCredential.email}/events`,
      {
        summary: `${event}`,
        location: `${location}`,
        description: `${description}`,
        start: {
          dateTime: "2023-02-23T09:00:00-09:00:00",
          timeZone: "America/Los_Angeles",
        },
        end: {
          dateTime: "2023-02-23T09:00:00-09:00:00",
          timeZone: "America/Los_Angeles",
        },
        attendees: [
          { email: `${userCredential.email}` },
          { email: "capelhoworth@gmail.com" },
          { email: "coxjerome24@gmail.com" },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${authToken.access_token}`,
        },
      }
    );
  };

  return (
    <div>
      <div
        id='g_id_onload'
        data-client_id='810551053192-v4k0609k7muia96p5smtg2hqmbfijakt.apps.googleusercontent.com'
        data-context='signin'
        data-ux_mode='popup'
        data-login_uri=''
        data-nonce=''
        data-auto_prompt='false'
      ></div>
      <div
        class='g_id_signin'
        data-type='standard'
        data-shape='rectangular'
        data-theme='outline'
        data-text='signin_with'
        data-size='large'
        data-logo_alignment='left'
      ></div>
      <button onClick={() => client.requestAccessToken()}>
        Authorize with Google
      </button>
      <br />
      {userCredential && authToken && (
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={event}
            onChange={(e) => setEvent(e.target.value)}
            placeholder='event'
          />
          <input
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='description'
          />
          <input
            type='text'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder='location'
          />
          <input
            type='text'
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            placeholder='startTime'
          />
          <input
            type='text'
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            placeholder='endTime'
          />
          <input
            type='text'
            value={attendees}
            onChange={(e) => setAttendees(e.target.value)}
            placeholder='attendees'
          />
          <button>submit</button>
        </form>
      )}
    </div>
  );
}
