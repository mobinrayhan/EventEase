import CreateNewEveForm from "../../../components/events/create-new-eve-form";
import { Event } from "../../../components/events/event-item";
import { getEvent } from "../../../services/events";

type EventRes = {
  message: string;
  event: Event;
};

export default async function CreateEventPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const isEditMode = params.isEditMode === "true";

  if (isEditMode && params.eventId) {
    const data = (await getEvent(params.eventId as string)) as EventRes;
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
          <h1 className="mb-6 text-center text-2xl font-bold">
            {isEditMode ? "Edit Event" : "Create Event"}
          </h1>
          <CreateNewEveForm isEditMode={true} fetchedEvent={data.event} />
        </div>
      </main>
    );
  } else {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
          <h1 className="mb-6 text-center text-2xl font-bold">
            {isEditMode ? "Edit Event" : "Create Event"}
          </h1>
          <CreateNewEveForm isEditMode={false} />
        </div>
      </main>
    );
  }
}
