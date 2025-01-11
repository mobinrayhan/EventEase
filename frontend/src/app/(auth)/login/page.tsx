import Button from "../../../components/UI/button";
import Input from "../../../components/UI/input";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">Login</h1>
        <form>
          <Input
            id="email"
            required
            label="Enter Your E-mail"
            className="mb-4 w-full rounded border p-3 focus:ring-2 focus:ring-blue-500"
            type="email"
            placeholder="Email"
          />
          <Input
            id="password"
            required
            label="Enter Your Password"
            className="mb-4 w-full rounded border p-3 focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Password"
          />
          <Button className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
            Login In
          </Button>

          <span className="mt-3 block text-center">
            Don&apos;t have an account?
            <Button href={"/signup"} className="text-blue-600 underline">
              {" "}
              Sign up
            </Button>
          </span>
        </form>
      </div>
    </div>
  );
}
