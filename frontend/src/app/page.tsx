import Button from "../components/UI/button";
import Input from "../components/UI/input";

export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
      <Input label="My Name" id="myName" direction="flex-col" />
    </div>
  );
}
