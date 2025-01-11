import Button from "../components/UI/button";

const events = [
  {
    id: 1,
    name: "Tech Conference 2025",
    date: "2025-02-15",
    location: "Dhaka, Bangladesh",
    maxAttendees: 200,
    registeredAttendees: 200,
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
    <div className="p-6">
      <h1 className="mb-6 text-center text-2xl font-bold">All Events</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="rounded-lg bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl"
          >
            <h2 className="mb-2 text-xl font-semibold text-gray-800">
              {event.name}
            </h2>
            <p className="text-sm text-gray-500">
              <span className="font-bold">Date:</span> {event.date}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-bold">Location:</span> {event.location}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-bold">Max Attendees:</span>{" "}
              {event.maxAttendees}
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
                href={"/dashboard/registration-event"}
                className="mt-4 inline-block rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
              >
                Register Now
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
