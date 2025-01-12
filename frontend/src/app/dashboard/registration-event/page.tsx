import Button from "../../../components/UI/button";
import Input from "../../../components/UI/input";

export default async function RegisterEventPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const queryParams = await searchParams;
  console.log(queryParams);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-3xl font-bold">
          Register for Event
        </h1>
        <form className="space-y-6">
          <div>
            <label
              htmlFor="event"
              className="block text-sm font-medium text-gray-700"
            >
              Select Event
            </label>
            <select
              id="event"
              name="event"
              className="w-full rounded border p-3 focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Choose an event</option>
              <option value="coding-workshop">Coding Workshop</option>
              <option value="film-making">Film Making</option>
              <option value="tech-conference">Tech Conference</option>
            </select>
          </div>

          <Input
            type="text"
            id="name"
            name="name"
            className="w-full rounded border p-3 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your full name"
            required
            label="Full Name"
          />
          <Input
            label="Email Address"
            type="email"
            id="email"
            name="email"
            className="w-full rounded border p-3 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email address"
            required
          />

          <Button
            type="submit"
            className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Register
          </Button>
        </form>
      </div>
    </main>
  );
}
