"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import EventItem, { Event } from "./event-item";

type EventListProps = {
  events?: Event[];
};

export default function EventList({ events }: EventListProps) {
  const [updateEvents, setUpdatedEvents] = useState<Event[] | undefined>(
    events,
  );

  useEffect(() => {
    setUpdatedEvents(events);
  }, [events]);

  useEffect(() => {
    const socket = io("http://localhost:3002");

    socket.on("connect", () => {
      console.log("Connected to the WebSocket server");
    });

    socket.on("create", (data) => {
      setUpdatedEvents((prevEvents) => {
        if (prevEvents?.some((event) => event._id === data.event._id)) {
          return prevEvents;
        }

        if (prevEvents) {
          return [...prevEvents, data.event];
        }
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {updateEvents?.map((event) => (
        <EventItem event={{ ...event }} key={event._id} />
      ))}
    </ul>
  );
}
