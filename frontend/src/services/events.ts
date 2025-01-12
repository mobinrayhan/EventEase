import { EventData, Token } from "../../actions/events";

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

export const fetchAllEvents = async () => {
  try {
    const response = await fetch("http://localhost:3002/events");

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
