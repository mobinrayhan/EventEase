import EventRegButton from "./event-reg-button";

export type Event = {
  _id: string;
  eventName: string;
  date: string;
  location: string;
  maxAttendees: number;

  createdBy: string;
  creatorId: string;
  bookings: [];
};

type EventItemProps = {
  event: Event;
};

export default function EventItem({ event }: EventItemProps) {
  return (
    <li
      key={event._id}
      className="rounded-lg bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl"
    >
      <h2 className="mb-2 text-xl font-semibold text-gray-800">
        {event.eventName}
      </h2>
      <p className="text-sm text-gray-500">
        <span className="font-bold">Date:</span> {event.date}
      </p>
      <p className="text-sm text-gray-500">
        <span className="font-bold">Location:</span> {event.location}
      </p>
      <p className="text-sm text-gray-500">
        <span className="font-bold">Max Attendees:</span> {event.maxAttendees}{" "}
      </p>
      <p className="text-sm text-gray-500">
        <span className="font-bold">Registered Attendees:</span>{" "}
        {event.bookings.length}
      </p>
      <p className="text-sm text-gray-500">
        <span className="font-bold">Created By:</span> {event.createdBy}
      </p>

      <EventRegButton
        creatorId={event.creatorId}
        eventId={event._id}
        maxAttendees={event.maxAttendees}
        name={event.eventName}
        registeredAttendees={event.bookings.length}
      />
    </li>
  );
}
