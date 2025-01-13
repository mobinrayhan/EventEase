import { LoginCredentials } from "../app/(auth)/login/page";
import { RegistrationCredentials } from "../app/(auth)/signup/page";

const apiURL = process.env.API_URL;

export const loginUser = async (loginCred: LoginCredentials) => {
  try {
    const response = await fetch(`${apiURL}/auth/login`, {
      method: "POST",
      body: JSON.stringify(loginCred),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const data = await response.json();
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
export const registrationNewUser = async (
  regCredentials: RegistrationCredentials,
) => {
  try {
    const response = await fetch(`${apiURL}/auth/registration`, {
      method: "POST",
      body: JSON.stringify(regCredentials),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const data = await response.json();
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
