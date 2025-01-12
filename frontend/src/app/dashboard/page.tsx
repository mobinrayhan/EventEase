"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import EventList from "../../components/events/event-list";
import { useAuth } from "../contexts/auth-ctx";
import { AllEventsResponse } from "../page";

export default function Dashboard() {
  const [events, setEvents] = useState<AllEventsResponse>();
  const { user } = useAuth();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`/api/events`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch events.");
        }

        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchEvents();
  }, [user?.token]);

  useEffect(() => {
    const socket = io("http://localhost:3002");

    socket.on("connect", () => {
      console.log("Connected to the WebSocket server");
    });

    socket.on("create", (data) => {
      setEvents((prevEvents) => {
        return (
          prevEvents && {
            ...prevEvents,
            events: [...prevEvents.events, data.event],
          }
        );
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <main className="container mx-auto">
      <h1 className="mb-6 text-center text-2xl font-bold">My Events</h1>
      <EventList events={events?.events || []} />
    </main>
  );
}
