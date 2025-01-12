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
    const socket = io("http://localhost:3002");

    const handleCreate = (data: { event: Event }) => {
      setUpdatedEvents((prevEvents) => {
        if (prevEvents?.some((event) => event._id === data.event._id)) {
          return prevEvents;
        }
        return prevEvents && [...prevEvents, data.event];
      });
    };

    const handleUpdate = (data: { event: Event }) => {
      setUpdatedEvents(
        (prevEvents) =>
          prevEvents &&
          prevEvents.map((event) =>
            event._id === data.event._id ? data.event : event,
          ),
      );
    };

    const handleDelete = (data: { id: string }) => {
      setUpdatedEvents(
        (prevEvents) =>
          prevEvents && prevEvents.filter((event) => event._id !== data.id),
      );
    };

    socket.on("create", handleCreate);
    socket.on("update", handleUpdate);
    socket.on("delete", handleDelete);

    return () => {
      socket.off("create", handleCreate);
      socket.off("update", handleUpdate);
      socket.off("delete", handleDelete);
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
