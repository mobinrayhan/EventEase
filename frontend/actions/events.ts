"use server";

import {
  createEvents,
  registerNewEvents,
  updateExistingEvent,
} from "../src/services/events";

export type Token = { token: string };

export type EventData = {
  eventName: string;
  date: string;
  location: string;
  maxAttendees: string | number;
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

  const data = Object.fromEntries(formData) as EventData & Token;

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

    await createEvents({
      token: { token: data.token },
      event: {
        createdBy: eventData.createdBy,
        date: eventData.date,
        eventName: eventData.eventName,
        location: eventData.location,
        maxAttendees: eventData.maxAttendees,
      },
    });

    return { success: true };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return {
      success: false,
      errors: { general: "An error occurred while creating the event." },
    };
  }
};
export const updateEvent = async (
  _: unknown,
  formData: FormData,
): Promise<{ success: boolean; errors?: EventErrors }> => {
  const errors: Partial<EventErrors> = {};

  const data = Object.fromEntries(formData) as EventData &
    Token & { eventId: string };

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
  if (!data.eventId?.trim()) {
    errors.general = "Event id is required.";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors: errors as EventErrors };
  }

  try {
    const eventData = {
      ...data,
      maxAttendees: +data.maxAttendees,
    };

    await updateExistingEvent({
      token: { token: data.token },
      event: {
        createdBy: eventData.createdBy,
        date: eventData.date,
        eventName: eventData.eventName,
        location: eventData.location,
        maxAttendees: eventData.maxAttendees,
      },
      eventId: data.eventId,
    });

    return { success: true };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return {
      success: false,
      errors: { general: "An error occurred while updating the event." },
    };
  }
};

export type BookNewEvent = {
  eventName: string;
  eventId: string;
  email: string;
  name: string;
};

type BookEventErrors = {
  eventName?: string;
  eventId?: string;
  email?: string;
  name?: string;
  general?: string;
};

export const bookNewEvent = async (
  _: unknown,
  formData: FormData,
): Promise<{ success: boolean; errors?: BookEventErrors }> => {
  const errors: Partial<BookEventErrors> = {};
  const data = Object.fromEntries(formData) as BookNewEvent & Token;

  if (!data.eventName.trim()) {
    errors.eventName = "Event Name is required.";
  }

  if (!data.eventId.trim()) {
    errors.eventId = "Event ID is required.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!emailRegex.test(data.email)) {
    errors.email = "Invalid email format.";
  }

  if (!data.name.trim()) {
    errors.name = "Name is required.";
  } else if (data.name.length < 2) {
    errors.name = "Name must be at least 2 characters long.";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors: errors as EventErrors };
  }

  try {
    await registerNewEvents({
      event: {
        email: data.email,
        eventId: data.eventId,
        eventName: data.eventName,
        name: data.name,
      },
      token: { token: data.token },
    });

    return { success: true };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return {
      success: false,
      errors: { general: "An error occurred while creating the event." },
    };
  }
};
