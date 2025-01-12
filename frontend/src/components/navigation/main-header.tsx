"use client";

import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  return (
    <header className="bg-slate-200 py-4">
      <nav className="container mx-auto">
        <ul className="flex">
          <li className="text-2xl tracking-wider">
            <Button href={"/"}>EventEase</Button>
          </li>

          <div className="mx-auto flex items-center gap-10">
            {menuOptions.map((menuOption) => (
              <li key={menuOption.role}>
                <Button
                  href={menuOption.slug}
                  className={`hover:text-blue-600 ${pathname === menuOption.slug ? "text-blue-600" : ""}`}
                >
                  {menuOption.role}
                </Button>
              </li>
            ))}

            {user && (
              <li>
                <Button
                  href={"/dashboard/create-event"}
                  className={`hover:text-blue-600 ${pathname === "/dashboard/create-event" ? "text-blue-600" : ""}`}
                >
                  Create Event
                </Button>
              </li>
            )}
          </div>

          {user ? (
            <li className="ml-auto">
              Welcome back{" "}
              <strong className="capitalize">{user.user.email}</strong>
              {",  "}
              <Button onClick={logout} className="hover:text-blue-600">
                Logout
              </Button>
            </li>
          ) : (
            <li className="ml-auto">
              <Button
                href={"/login"}
                className={`hover:text-blue-600 ${pathname === "/login" ? "text-blue-600" : ""}`}
              >
                Login
              </Button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
