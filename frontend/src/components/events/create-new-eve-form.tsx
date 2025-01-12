"use client";

import { useActionState, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { createEvent, updateEvent } from "../../../actions/events";
import { useAuth } from "../../app/contexts/auth-ctx";
import Button from "../UI/button";
import Input from "../UI/input";
import { Event } from "./event-item";

export default function CreateNewEveForm({
  fetchedEvent,
  isEditMode,
}: {
  isEditMode: boolean;
  fetchedEvent?: Event;
}) {
  const [updatedEvent, setUpdatedEvent] = useState(fetchedEvent);

  const { user } = useAuth();
  const [state, formAction, pending] = useActionState(
    isEditMode ? updateEvent : createEvent,
    {
      success: false,
      errors: undefined,
    },
  );

  useEffect(() => {
    const socket = io("http://localhost:3002");

    function handleUpdate(data: { event: Event }) {
      setUpdatedEvent(data.event);
    }

    socket.on("update", handleUpdate);

    return () => {
      io().disconnect();
      socket.off("update", handleUpdate);
    };
  }, []);

  return (
    <form action={formAction}>
      <Input
        label="Event Name"
        id="eventName"
        className="mb-4 w-full rounded border p-3 focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-80"
        type="text"
        placeholder="Event Name"
        defaultValue={updatedEvent?.eventName}
        required
        disabled={pending}
      />
      <Input
        label="Event Date"
        required
        id="date"
        className="mb-4 w-full rounded border p-3 focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-80"
        type="date"
        defaultValue={updatedEvent?.date}
        disabled={pending}
      />
      <Input
        label="Location"
        required
        id="location"
        className="mb-4 w-full rounded border p-3 focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-80"
        type="text"
        defaultValue={updatedEvent?.location}
        placeholder="Event location"
        disabled={pending}
      />{" "}
      <Input
        label="Maximum Number of Attendees"
        id="maxAttendees"
        className="mb-4 w-full rounded border p-3 focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-80"
        type="number"
        placeholder="Attendees"
        required
        defaultValue={updatedEvent?.maxAttendees}
        disabled={pending}
      />{" "}
      <Input
        label="Organizer Name"
        id="createdBy"
        className="mb-4 w-full rounded border p-3 focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-80"
        type="text"
        placeholder="Event location"
        required
        disabled={pending}
        defaultValue={updatedEvent?.createdBy}
      />
      <input type="hidden" name="token" value={user?.token} />
      {isEditMode && (
        <input type="hidden" name="eventId" value={updatedEvent?._id} />
      )}
      {/* <input type="hidden" name="userId" value={user?.user._id} /> */}
      <Button
        type="submit"
        disabled={pending}
        className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-80"
      >
        {isEditMode ? "Update Event" : "Create Event"}
      </Button>
      {state.success && (
        <div className="mt-4 rounded bg-green-100 p-3 text-green-700">
          <p>Event {isEditMode ? "Edited" : "created"} successfully!</p>
        </div>
      )}
      {state.errors && (
        <div className="mt-4 rounded bg-red-100 p-3 text-red-700">
          <p>{Object.values(state.errors)[0] || "Something Went Wrong!"}</p>
        </div>
      )}
    </form>
  );
}
