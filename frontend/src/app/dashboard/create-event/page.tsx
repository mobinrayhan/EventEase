import Button from "../../../components/UI/button";
import Input from "../../../components/UI/input";

export default function CreateEventPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">Create Event</h1>
        <form>
          <Input
            label="Event Name"
            id="eventName"
            className="mb-4 w-full rounded border p-3 focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Event Name"
            required
          />
          <Input
            label="Event Date"
            required
            id="date"
            className="mb-4 w-full rounded border p-3 focus:ring-2 focus:ring-blue-500"
            type="date"
          />
          <Input
            label="Location"
            required
            id="location"
            className="mb-4 w-full rounded border p-3 focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Event location"
          />{" "}
          <Input
            label="Maximum Number of Attendees"
            id="maxAttendees"
            className="mb-4 w-full rounded border p-3 focus:ring-2 focus:ring-blue-500"
            type="number"
            placeholder="Attendees"
            required
          />{" "}
          <Input
            label="Organizer Name"
            id="createdBy"
            className="mb-4 w-full rounded border p-3 focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Event location"
            required
          />
          <Button
            type="submit"
            className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Create Event
          </Button>
        </form>
      </div>
    </main>
  );
}
