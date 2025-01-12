"use server";

type EventData = {
  eventName: string;
  date: string;
  location: string;
  maxAttendees: string;
  createdBy: string;
};

type EventErrors = {
  eventName?: string;
  date?: string;
  location?: string;
  maxAttendees?: string;
  createdBy?: string;
  general?: string;
};

export const createEvent = async (
  _: unknown,
  formData: FormData,
): Promise<{ success: boolean; errors?: EventErrors }> => {
  const errors: Partial<EventErrors> = {};

  const data = Object.fromEntries(formData) as EventData;

  if (!data.eventName || data.eventName.trim().length === 0) {
    errors.eventName = "Event name is required.";
  }
  if (!data.date || isNaN(Date.parse(data.date))) {
    errors.date = "A valid date is required.";
  }
  if (!data.location || data.location.trim().length === 0) {
    errors.location = "Location is required.";
  }
  if (
    !data.maxAttendees ||
    isNaN(Number(data.maxAttendees)) ||
    Number(data.maxAttendees) <= 0
  ) {
    errors.maxAttendees = "Max attendees must be a positive number.";
  }
  if (!data.createdBy || data.createdBy.trim().length === 0) {
    errors.createdBy = "Organizer name is required.";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors: errors as EventErrors };
  }

  try {
    const eventData = {
      ...data,
      maxAttendees: +data.maxAttendees,
    };
    console.log("Creating event:", eventData);
    return { success: true };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return {
      success: false,
      errors: { general: "An error occurred while creating the event." },
    };
  }
};
