"use client";

import { useEffect, useState } from "react";
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

  return (
    <main className="container mx-auto">
      <h1 className="mb-6 text-center text-2xl font-bold">My Events</h1>
      <EventList events={events?.events} />
    </main>
  );
}
