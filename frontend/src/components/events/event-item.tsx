import EventRegButton from "./event-reg-button";

export type Event = {
  _id: string;
  name: string;
  date: string;
  location: string;
  maxAttendees: number;
  registeredAttendees: number;
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
      <h2 className="mb-2 text-xl font-semibold text-gray-800">{event.name}</h2>
      <p className="text-sm text-gray-500">
        <span className="font-bold">Date:</span> {event.date}
      </p>
      <p className="text-sm text-gray-500">
        <span className="font-bold">Location:</span> {event.location}
      </p>
      <p className="text-sm text-gray-500">
        <span className="font-bold">Max Attendees:</span> {event.maxAttendees}
      </p>
      <p className="text-sm text-gray-500">
        <span className="font-bold">Registered Attendees:</span>{" "}
        {event.registeredAttendees}
      </p>
      <p className="text-sm text-gray-500">
        <span className="font-bold">Created By:</span> {event.createdBy}
      </p>

      <EventRegButton
        creatorId={event.creatorId}
        eventId={event._id}
        maxAttendees={event.maxAttendees}
        name={event.name}
        registeredAttendees={event.registeredAttendees}
      />
    </li>
  );
}
