import Button from "../UI/button";
import Input from "../UI/input";

export default function CreateEventForm({
  queryParams,
}: {
  queryParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <form className="space-y-6">
      <Input
        type="text"
        id="name"
        name="name"
        className="w-full rounded border p-3 focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your full name"
        required
        label="Event Name"
        defaultValue={queryParams?.eventName}
      />

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
  );
}
