import { Event } from "../components/events/event-item";
import EventList from "../components/events/event-list";
import { fetchAllEvents } from "../services/events";

export type EventResponseData = {
  bookings: Array<unknown>;
  creator: string;
} & Event;

type AllEventsResponse = {
  message: string;
  events: EventResponseData[];
};

export default async function Home() {
  try {
    const allEvents = (await fetchAllEvents()) as AllEventsResponse;

    console.log(allEvents);

    return (
      <main className="container mx-auto">
        <h1 className="mb-6 text-center text-2xl font-bold">All Events</h1>
        <EventList events={allEvents.events} />
      </main>
    );
  } catch (error) {
    if (error instanceof Error) {
      return (
        <main className="container mx-auto">
          <h1 className="mb-6 text-center text-2xl font-bold">All Events</h1>
          <p>{error.message}</p>
        </main>
      );
    }
  }
}
