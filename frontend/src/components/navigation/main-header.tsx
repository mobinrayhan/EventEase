"use client";

import { useAuth } from "../../app/contexts/auth-ctx";
import Button from "../UI/button";

const menuOptions = [
  {
    role: "All Events",
    slug: "/",
  },
  {
    role: "Dashboard",
    slug: "/dashboard",
  },
];

export default function MainHeader() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-slate-200 py-4">
      <nav className="container mx-auto">
        <ul className="flex">
          <li className="text-2xl tracking-wider">
            <Button href={"/"}>EventEase</Button>
          </li>

          <div className="mx-auto flex gap-10">
            {menuOptions.map((menuOption) => (
              <li key={menuOption.role}>
                <Button href={menuOption.slug}>{menuOption.role}</Button>
              </li>
            ))}

            {user && (
              <li>
                <Button href={"/dashboard/create-event"}>Create Event</Button>
              </li>
            )}
          </div>

          {user ? (
            <li className="ml-auto">
              <Button onClick={logout}>Logout</Button>
            </li>
          ) : (
            <li className="ml-auto">
              <Button href={"/login"}>Login</Button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
