import { EventResponseData } from "../../app/page";
import EventItem from "./event-item";

type EventListProps = {
  events: EventResponseData[];
};

export default function EventList({ events }: EventListProps) {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventItem event={{ ...event }} key={event._id} />
      ))}
    </ul>
  );
}
