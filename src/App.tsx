import { SyntheticEvent, useState } from "react";
import ApiCalendar from "react-google-calendar-api";
import EVENT_DATA from "./mocks/eventData";

function App() {
  const config = {
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID || "",
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY || "",
    scope: "https://www.googleapis.com/auth/calendar",
    discoveryDocs: [
      "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
    ],
  };
  const apiCalendar = new ApiCalendar(config);
  const [events, setEvents] = useState<any[]>([]);
  const [calendars, setCalendars] = useState([]);
  const handleItemClick = (event: SyntheticEvent<any>, name: string): void => {
    if (name === "sign-in") {
      apiCalendar.handleAuthClick();
    } else if (name === "sign-out") {
      apiCalendar.handleSignoutClick();
    }
  };

  return (
    <div>
      <div style={{ padding: "0.5em" }}>
        <button onClick={(e) => handleItemClick(e, "sign-in")}>sign-in</button>
        <button onClick={(e) => handleItemClick(e, "sign-out")}>
          sign-out
        </button>
      </div>
      <div style={{ padding: "0.5em" }}>
        <button
          onClick={(e) => {
            apiCalendar.listCalendars().then(({ result }: any) => {
              console.log(result.items);
              setCalendars(result.items);
            });
          }}
        >
          List calendars
        </button>
        <div>
          <h4>Calendars</h4>
          {calendars.length === 0 && <p>No calendars to show</p>}
          {calendars.map((calendar: any) => (
            <p key={calendar.id}>{JSON.stringify(calendar)}</p>
          ))}
        </div>
      </div>
      <div style={{ padding: "0.5em" }}>
        <button
          onClick={(e) => {
            apiCalendar
              .listEvents({}, process.env.REACT_APP_CALENDAR_ID)
              .then(({ result }: any) => {
                setEvents(result.items);
              });
          }}
        >
          List get test calendar events
        </button>
        <div>
          <h4>Events</h4>
          {events.length === 0 && <p>No events to show</p>}
          {events.map((event: any) => (
            <p key={event.id}>{JSON.stringify(event)}</p>
          ))}
        </div>
      </div>
      <div style={{ padding: "0.5em" }}>
        <button
          onClick={(e) => {
            apiCalendar
              .createEvent(EVENT_DATA, process.env.REACT_APP_CALENDAR_ID)
              .then(({ result }: any) => {
                setEvents((prevEvents) => {
                  return [...prevEvents, result];
                });
              });
          }}
        >
          Create event
        </button>
      </div>
    </div>
  );
}

export default App;
