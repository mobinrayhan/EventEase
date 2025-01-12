import EventList from "../../components/events/event-list";

const myEvents = [
  {
    id: 2,
    name: "Music Fest",
    date: "2025-03-10",
    location: "Chittagong, Bangladesh",
    maxAttendees: 500,
    registeredAttendees: 450,
    createdBy: "Alex Johnson",
  },
];

export default function Dashboard() {
  return (
    <main className="p-6">
      <h1 className="mb-6 text-center text-2xl font-bold">My Events</h1>
      <EventList events={myEvents} />
    </main>
  );
}
