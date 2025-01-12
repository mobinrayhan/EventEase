"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Button from "../../../components/UI/button";
import Input from "../../../components/UI/input";
import { loginUser } from "../../../helper/auth";
import { useAuth } from "../../contexts/auth-ctx";

export type LoginCredentials = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const route = useRouter();
  const { login } = useAuth();

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formEle = event.currentTarget;
    const formData = new FormData(formEle);
    const datas = Object.fromEntries(formData) as LoginCredentials;

    setError("");
    setIsLoading(true);
    try {
      const user = await loginUser(datas);
      login(user);

      formEle.reset();

      route.push("/dashboard");

      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">Login</h1>
        <form onSubmit={handleLogin}>
          <Input
            id="email"
            required
            label="Enter Your E-mail"
            className="mb-4 w-full rounded border p-3 focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-80"
            type="email"
            placeholder="Email"
            disabled={isLoading}
          />
          <Input
            id="password"
            required
            label="Enter Your Password"
            className="mb-4 w-full rounded border p-3 focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-80"
            type="password"
            placeholder="Password"
            disabled={isLoading}
          />
          <Button
            className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-80"
            disabled={isLoading}
          >
            {isLoading ? "Login..." : "Login In"}
          </Button>

          <span className="mt-3 block text-center">
            Don&apos;t have an account?
            <Button href={"/signup"} className="text-blue-600 underline">
              {" "}
              Sign up
            </Button>
          </span>

          {error && <p className="pt-4 text-center text-red-500">{error}</p>}
        </form>
      </div>
    </main>
  );
}
