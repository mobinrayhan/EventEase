"use client";

import { useActionState } from "react";
import { createEvent } from "../../../actions/events";
import { useAuth } from "../../app/contexts/auth-ctx";
import Button from "../UI/button";
import Input from "../UI/input";
import { Event } from "./event-item";

export default function CreateNewEveForm({
  isEditMode,
  fetchedEvent,
}: {
  isEditMode: boolean;
  fetchedEvent?: Event;
}) {
  const { user } = useAuth();
  const [state, formAction, pending] = useActionState(createEvent, {
    success: false,
    errors: undefined,
  });

  return (
    <form action={formAction}>
      <Input
        label="Event Name"
        id="eventName"
        className="mb-4 w-full rounded border p-3 focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-80"
        type="text"
        placeholder="Event Name"
        defaultValue={fetchedEvent?.eventName}
        required
        disabled={pending}
      />
      <Input
        label="Event Date"
        required
        id="date"
        className="mb-4 w-full rounded border p-3 focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-80"
        type="date"
        defaultValue={fetchedEvent?.date}
        disabled={pending}
      />
      <Input
        label="Location"
        required
        id="location"
        className="mb-4 w-full rounded border p-3 focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-80"
        type="text"
        defaultValue={fetchedEvent?.location}
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
        defaultValue={fetchedEvent?.maxAttendees}
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
        defaultValue={fetchedEvent?.createdBy}
      />
      <input type="hidden" name="token" value={user?.token} />
      {/* <input type="hidden" name="userId" value={user?.user._id} /> */}
      <Button
        type="submit"
        disabled={pending}
        className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-80"
      >
        Create Event
      </Button>
      {state.success && (
        <div className="mt-4 rounded bg-green-100 p-3 text-green-700">
          <p>Event created successfully!</p>
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
