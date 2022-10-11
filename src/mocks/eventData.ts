const EVENT_DATA = {
  summary: "Hello World",
  location: "회의실3",
  start: {
    dateTime: "2022-10-12T15:30:00+09:00",
    timeZone: "Asia/Seoul",
  },
  end: {
    dateTime: "2022-10-12T16:30:00+09:00",
    timeZone: "Asia/Seoul",
  },
  attendees: [],
  reminders: {
    useDefault: false,
    overrides: [
      { method: "email", minutes: 24 * 60 },
      { method: "popup", minutes: 10 },
    ],
  },
};

export default EVENT_DATA;
