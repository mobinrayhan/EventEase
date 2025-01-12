"use client";

import { useActionState } from "react";
import { deleteEvent } from "../../../actions/events";
import { useAuth } from "../../app/contexts/auth-ctx";
import Button from "../UI/button";

type EventRegButtonProps = {
  maxAttendees: number;
  registeredAttendees: number;
  eventId: string;
  name: string;
  creatorId: string;
};
export default function EventRegButton({
  registeredAttendees,
  maxAttendees,
  eventId,
  name,
  creatorId,
}: EventRegButtonProps) {
  const { user } = useAuth();
  const [state, formAction, pending] = useActionState(deleteEvent, {
    success: false,
    errors: undefined,
  });

  if (user?.user._id === creatorId) {
    return (
      <div className="flex items-center justify-center gap-3 py-3">
        <form action={formAction}>
          <Button
            className="rounded-sm bg-blue-500 p-2 text-white disabled:cursor-not-allowed disabled:opacity-80"
            disabled={pending}
            type="submit"
          >
            Delete
          </Button>
          <input type="hidden" value={eventId} name="eventId" />
          <input type="hidden" value={user.token} name="token" />
        </form>
        <Button
          href={`/dashboard/create-event?isEditMode=${true}&eventId=${eventId}`}
          className="rounded-sm bg-blue-500 p-2 text-white"
        >
          Update
        </Button>

        {state.errors && (
          <div className="mt-4 rounded bg-red-100 p-3 text-red-700">
            <p>{Object.values(state.errors)[0] || "Something Went Wrong!"}</p>
          </div>
        )}
      </div>
    );
  } else {
    return registeredAttendees >= maxAttendees ? (
      <p className="mt-4 font-bold text-red-500">Registration Closed</p>
    ) : (
      <Button
        href={`/dashboard/registration-event?eventId=${eventId}&eventName=${name}`}
        className="mt-4 inline-block rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
      >
        Register Now
      </Button>
    );
  }
}
