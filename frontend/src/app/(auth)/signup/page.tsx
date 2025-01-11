"use client";

import { useActionState } from "react";
import { createUser } from "../../../../actions/auth";
import Button from "../../../components/UI/button";
import Input from "../../../components/UI/input";

export type RegistrationCredentials = {
  name: string;
  email: string;
  password: string;
};

export default function SignupPage() {
  const [state, formAction, pending] = useActionState(createUser, {
    success: false,
    errors: undefined,
  });

  console.log(state);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">Sign Up</h1>
        <form action={formAction}>
          <Input
            label="Enter Your Name"
            id="name"
            className="mb-4 w-full rounded border p-3 focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-80"
            type="text"
            placeholder="Name"
            required
            disabled={pending}
          />
          <Input
            label="Enter Email"
            id="email"
            className="mb-4 w-full rounded border p-3 focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-80"
            type="email"
            required
            placeholder="Email"
            disabled={pending}
          />
          <Input
            label="Enter password"
            id="password"
            className="mb-4 w-full rounded border p-3 focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-80"
            type="password"
            min={6}
            max={32}
            placeholder="Password"
            disabled={pending}
            required
          />
          <Button
            className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-80"
            disabled={pending}
            type="submit"
          >
            Sign Up
          </Button>

          <span className="mt-3 block text-center">
            Already have an account?{" "}
            <Button href={"/login"} className="text-blue-600 underline">
              {" "}
              Log In
            </Button>
          </span>

          {state.success && (
            <div className="mt-4 rounded bg-green-100 p-3 text-green-700">
              <p>Account created successfully!</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
