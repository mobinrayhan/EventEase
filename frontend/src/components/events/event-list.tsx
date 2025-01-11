import EventItem, { Event } from "./event-item";

type EventListProps = {
  events: Event[];
};

export default function EventList({ events }: EventListProps) {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventItem event={event} key={event.id} />
      ))}
    </ul>
  );
}
