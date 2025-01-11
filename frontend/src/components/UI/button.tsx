import Link, { LinkProps } from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonAnchorProps = { href: string; children: ReactNode } & LinkProps;
type ButtonProps = {
  href?: never;
  children: ReactNode;
} & ComponentPropsWithoutRef<"button">;

const isAnchorElement = (
  props: ButtonAnchorProps | ButtonProps
): props is ButtonAnchorProps => {
  return "href" in props;
};

export default function Button(props: ButtonAnchorProps | ButtonProps) {
  if (isAnchorElement(props)) {
    return <Link {...props}>{props.children}</Link>;
  }

  return <button {...props}>{props.children}</button>;
}
