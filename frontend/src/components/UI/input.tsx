import type { ComponentPropsWithoutRef } from "react";

type InputProps = {
  label: string;
  id: string;
  direction?: "flex-col" | "flex-row";
} & ComponentPropsWithoutRef<"input">;

export default function Input({
  label,
  id,
  direction = "flex-col",
  ...othersProps
}: InputProps) {
  return (
    <div className={`flex ${direction} gap-2`}>
      <label htmlFor={id}>{label} : </label>
      <input {...othersProps} name={id} id={id} />
    </div>
  );
}
