"use server";

import { RegistrationCredentials } from "../src/app/(auth)/signup/page";
import { registrationNewUser } from "../src/helper/auth";

type Errors = { name: string; email: string; password: string };

export async function createUser(
  _: unknown,
  formData: FormData,
): Promise<{
  success: boolean;
  errors?: Errors;
}> {
  const data = Object.fromEntries(formData) as RegistrationCredentials;

  const errors: Partial<Errors> = {};

  if (!data.name || data.name.trim().length === 0) {
    errors.name = "Name is required.";
  }
  if (!data.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
    errors.email = "A valid email is required.";
  }
  if (!data.password || data.password.length < 6 || data.password.length > 32) {
    errors.password = "Password must be between 6 and 32 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors: errors as Errors };
  }

  try {
    const user = await registrationNewUser(data);
    console.log(user);
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false };
    }
    return { success: false };
  }
}
