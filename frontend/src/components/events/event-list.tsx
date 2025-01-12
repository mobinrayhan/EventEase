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
      console.log("Connected to Socket.IO server with ID:", socket.id);
    });

    const handleCreate = (data: { event: Event }) => {
      setUpdatedEvents((prevEvents) => {
        if (prevEvents?.some((event) => event._id === data.event._id)) {
          return prevEvents;
        }
        return prevEvents && [...prevEvents, data.event];
      });
    };

    const handleUpdate = (data: { event: Event }) => {
      setUpdatedEvents((prevEvents) => {
        const updateEve =
          prevEvents &&
          prevEvents.map((eve) =>
            eve._id === data.event._id ? { ...eve, ...data.event } : eve,
          );

        console.log(updateEve);

        return updateEve;
      });
    };

    const handleDelete = (data: { deletedId: string }) => {
      setUpdatedEvents(
        (prevEvents) =>
          prevEvents &&
          prevEvents.filter((event) => event._id !== data.deletedId),
      );
    };

    socket.on("update", handleUpdate);
    socket.on("create", handleCreate);
    socket.on("delete", handleDelete);

    return () => {
      socket.off("update", handleUpdate);
      socket.off("create", handleCreate);
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
