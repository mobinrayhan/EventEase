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
          </div>

          <li className="ml-auto">
            <Button href={"/login"}>Login</Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
