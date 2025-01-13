import { BookNewEvent, EventData, Token } from "../../actions/events";

const apiURL = process.env.API_URL;

console.log(apiURL);

export const createEvents = async ({
  event,
  token,
}: {
  event: EventData;
  token: Token;
}) => {
  try {
    const response = await fetch(`${apiURL}/events`, {
      method: "POST",
      body: JSON.stringify(event),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    });

    if (!response.ok) {
      const data = (await response?.json()) || "Something went wrong!";
      throw new Error(data.message);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const updateExistingEvent = async ({
  event,
  token,
  eventId,
}: {
  event: EventData;
  token: Token;
  eventId: string;
}) => {
  try {
    const response = await fetch(`${apiURL}/events/${eventId}`, {
      method: "PUT",
      body: JSON.stringify({ ...event }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    });

    if (!response.ok) {
      const data = (await response?.json()) || "Something went wrong!";
      throw new Error(data.message);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const fetchAllEvents = async () => {
  try {
    const response = await fetch(`${apiURL}/events`, {
      cache: "no-store",
    });

    if (!response.ok) {
      const data = (await response?.json()) || "Something went wrong!";
      throw new Error(data.message);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const getEvent = async (eventId: string) => {
  try {
    const response = await fetch(`${apiURL}/events/${eventId}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      const data = (await response?.json()) || "Something went wrong!";
      throw new Error(data.message);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export async function registerNewEvents({
  token,
  event,
}: {
  token: Token;
  event: BookNewEvent;
}) {
  try {
    const response = await fetch(`${apiURL}/users/event-registration`, {
      method: "POST",
      body: JSON.stringify(event),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    });

    if (!response.ok) {
      const data = (await response?.json()) || "Something went wrong!";
      throw new Error(data.message);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export async function deleteEventAc(eventId: string, token: string) {
  try {
    const response = await fetch(`${apiURL}/events/${eventId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const data = (await response?.json()) || "Something went wrong!";
      throw new Error(data.message);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
