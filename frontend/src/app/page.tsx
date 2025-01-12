import { Event } from "../components/events/event-item";
import EventList from "../components/events/event-list";
import { fetchAllEvents } from "../services/events";

export type AllEventsResponse = {
  message: string;
  events: Event[];
};

export default async function Home() {
  try {
    const allEvents = (await fetchAllEvents()) as AllEventsResponse;

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
