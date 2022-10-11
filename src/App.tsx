import { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import { calendar_v3 } from "googleapis";

import Event from "./components/Event";
import EVENT_DATA from "./mocks/eventDate";

function App() {
  const [events, setEvents] = useState<calendar_v3.Schema$Events[]>([]);
  const calendarID = process.env.REACT_APP_CALENDAR_ID;
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const accessToken = process.env.REACT_APP_GOOGLE_ACCESS_TOKEN;

  const getEvents = (calendarID: string, apiKey: string) => {
    const initiate = async () => {
      try {
        const response = await gapi.client.request({
          path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
          params: {
            key: apiKey,
          },
        });

        const events = response.result.items as calendar_v3.Schema$Events[];
        setEvents(events);
      } catch (error) {
        console.log(error);
        return [false, error];
      }
    };

    gapi.load("client", initiate);
  };

  const addEvent = (calendarID: string, event: calendar_v3.Schema$Events) => {
    const initiate = async () => {
      try {
        const response = await gapi.client.request({
          path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
          method: "POST",
          body: event,
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setEvents((prevEvents: any) => {
          return [...prevEvents, response.result];
        });

        return [true, response];
      } catch (error) {
        console.log(error);
        return [false, error];
      }
    };

    gapi.load("client", initiate);
  };

  const handleClick = () => {
    if (!calendarID) return;

    addEvent(calendarID, EVENT_DATA);
  };

  useEffect(() => {
    if (!calendarID || !apiKey) return;

    getEvents(calendarID, apiKey);
  }, [apiKey, calendarID]);

  return (
    <div className="App py-8 flex flex-col justify-center">
      <h1 className="text-2xl font-bold mb-4">
        React App with Google Calendar API!
      </h1>
      <ul>
        {events?.map((event: any) => (
          <li key={event.id} className="flex justify-center">
            <Event description={event.summary} />
          </li>
        ))}
        <button
          className="mt-4 w-1/4 p-1 shadow-xl bg-gradient-to-r from-blue-500 via-navy-500 to-purple-500 rounded-2xl"
          onClick={handleClick}
        >
          Add Mock Event
        </button>
      </ul>
    </div>
  );
}

export default App;
