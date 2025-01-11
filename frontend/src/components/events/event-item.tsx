import Button from "../UI/button";

export type Event = {
  id: number;
  name: string;
  date: string;
  location: string;
  maxAttendees: number;
  registeredAttendees: number;
  createdBy: string;
};
type EventItemProps = {
  event: Event;
};

export default function EventItem({ event }: EventItemProps) {
  return (
    <li
      key={event.id}
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

      {event.registeredAttendees >= event.maxAttendees ? (
        <p className="mt-4 font-bold text-red-500">Registration Closed</p>
      ) : (
        <Button
          href={`/dashboard/registration-event?eventId=${event.id}&eventName=${event.name}`}
          className="mt-4 inline-block rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
        >
          Register Now
        </Button>
      )}
    </li>
  );
}
