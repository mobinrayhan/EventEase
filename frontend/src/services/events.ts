import { BookNewEvent, EventData, Token } from "../../actions/events";

export const createEvents = async ({
  event,
  token,
}: {
  event: EventData;
  token: Token;
}) => {
  try {
    const response = await fetch("http://localhost:3002/events", {
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
    const response = await fetch(`http://localhost:3002/events/${eventId}`, {
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
    const response = await fetch("http://localhost:3002/events", {
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
    const response = await fetch(`http://localhost:3002/events/${eventId}`, {
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
    const response = await fetch(
      "http://localhost:3002/users/event-registration",
      {
        method: "POST",
        body: JSON.stringify(event),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
        },
      },
    );

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
