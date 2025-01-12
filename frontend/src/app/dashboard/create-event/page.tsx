"use client";

import { useActionState } from "react";
import { createEvent } from "../../../../actions/events";
import Button from "../../../components/UI/button";
import Input from "../../../components/UI/input";

export default function CreateEventPage() {
  const [state, formAction, pending] = useActionState(createEvent, {
    success: false,
    errors: undefined,
  });

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">Create Event</h1>
        <form action={formAction}>
          <Input
            label="Event Name"
            id="eventName"
            className="mb-4 w-full rounded border p-3 focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-80"
            type="text"
            placeholder="Event Name"
            required
            disabled={pending}
          />
          <Input
            label="Event Date"
            required
            id="date"
            className="mb-4 w-full rounded border p-3 focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-80"
            type="date"
            disabled={pending}
          />
          <Input
            label="Location"
            required
            id="location"
            className="mb-4 w-full rounded border p-3 focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-80"
            type="text"
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
          />
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
      </div>
    </main>
  );
}
