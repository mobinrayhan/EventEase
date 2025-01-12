"use client";

import { useActionState } from "react";
import { bookNewEvent } from "../../../actions/events";
import Button from "../UI/button";
import Input from "../UI/input";

export default function CreateEventForm({
  queryParams,
}: {
  queryParams: { [key: string]: string | string[] | undefined };
}) {
  const [state, formAction, pending] = useActionState(bookNewEvent, {
    success: false,
    errors: undefined,
  });

  return (
    <form className="space-y-6" action={formAction}>
      <Input
        type="text"
        id="eventName"
        name="eventName"
        className="w-full rounded border p-3 focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-80"
        placeholder="Enter your full name"
        required
        label="Event Name"
        defaultValue={queryParams?.eventName}
        disabled={pending}
      />

      <Input
        type="text"
        id="name"
        name="name"
        className="w-full rounded border p-3 focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-80"
        placeholder="Enter your full name"
        required
        label="Full Name"
        disabled={pending}
      />

      <Input
        label="Email Address"
        type="email"
        id="email"
        name="email"
        className="w-full rounded border p-3 focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-80"
        placeholder="Enter your email address"
        required
        disabled={pending}
      />

      <input type="hidden" value={queryParams.eventId} name="eventId" />

      <Button
        type="submit"
        disabled={pending}
        className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-80"
      >
        Register
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
