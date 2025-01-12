import EventList from "../components/events/event-list";

const events = [
  {
    id: 1,
    name: "Tech Conference 2025",
    date: "2025-02-15",
    location: "Dhaka, Bangladesh",
    maxAttendees: 200,
    registeredAttendees: 100,
    createdBy: "James Prince",
  },
  {
    id: 2,
    name: "Music Fest",
    date: "2025-03-10",
    location: "Chittagong, Bangladesh",
    maxAttendees: 500,
    registeredAttendees: 450,
    createdBy: "Alex Johnson",
  },
  {
    id: 3,
    name: "Art Workshop",
    date: "2025-04-20",
    location: "Sylhet, Bangladesh",
    maxAttendees: 50,
    registeredAttendees: 50,
    createdBy: "Sarah Lee",
  },
];

export default function Home() {
  return (
    <main className="container mx-auto">
      <h1 className="mb-6 text-center text-2xl font-bold">All Events</h1>
      <EventList events={events} />
    </main>
  );
}
