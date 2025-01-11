import Input from "../../../components/UI/input";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">Sign Up</h1>
        <form>
          <Input
            label="Enter Your Name"
            id="name"
            className="mb-4 w-full rounded border p-3 focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Name"
            required
          />
          <Input
            label="Enter Email"
            id="email"
            className="mb-4 w-full rounded border p-3 focus:ring-2 focus:ring-blue-500"
            type="email"
            required
            placeholder="Email"
          />
          <Input
            label="Enter password"
            id="password"
            className="mb-4 w-full rounded border p-3 focus:ring-2 focus:ring-blue-500"
            type="password"
            min={6}
            max={32}
            placeholder="Password"
            required
          />
          <button className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
