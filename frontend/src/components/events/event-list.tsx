"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { BookNewEvent } from "../../../actions/events";
import { useAuth } from "../../app/contexts/auth-ctx";
import { notificationFromData } from "../../util/notification";
import EventItem, { Event } from "./event-item";

const apiURL = process.env.API_URL;

type EventListProps = {
  events?: Event[];
};

export default function EventList({ events }: EventListProps) {
  const { user } = useAuth();
  const [updateEvents, setUpdatedEvents] = useState<Event[] | undefined>(
    events,
  );

  useEffect(() => {
    setUpdatedEvents(events);
  }, [events]);

  useEffect(() => {
    const socket = io(apiURL, {
      query: { userId: user?.user._id }, // Send userId during connection
    });

    socket.on("connect", () => {
      socket.emit("registerOwner", {
        socketId: socket.id,
        userId: user?.user._id,
      });
    });

    socket.on("newRegistration", (data) => {
      notificationFromData(data);
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
        return updateEve;
      });
    };

    const registrationNewEve = (data: { event: BookNewEvent }) => {
      setUpdatedEvents((prevEvents) => {
        const updateEve =
          prevEvents &&
          prevEvents.map((eve) =>
            eve._id === data.event.eventId
              ? { ...eve, bookings: [...eve.bookings, data.event] }
              : eve,
          );
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

    const handleNewEventCreated = () => {};

    socket?.on("update", handleUpdate);
    socket?.on("create", handleCreate);
    socket?.on("eventRegistration", registrationNewEve);
    socket?.on("newEventCreated", handleNewEventCreated);
    socket?.on("delete", handleDelete);

    return () => {
      socket?.off("update", handleUpdate);
      socket?.off("create", handleCreate);
      socket?.off("eventRegistration", handleDelete);
      socket?.off("newEventCreated", handleNewEventCreated);
      socket?.off("delete", handleDelete);
      socket?.disconnect();
    };
  }, [user?.user._id]);

  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {updateEvents?.map((event) => (
        <EventItem event={{ ...event }} key={event._id} />
      ))}
    </ul>
  );
}
