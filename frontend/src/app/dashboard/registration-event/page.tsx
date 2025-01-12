import CreateEventForm from "../../../components/events/create-event-form";

export default async function RegisterEventPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const queryParams = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-3xl font-bold">
          Register for Event
        </h1>
        <CreateEventForm queryParams={queryParams} />
      </div>
    </main>
  );
}
