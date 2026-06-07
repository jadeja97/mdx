"use client";

import { usePathname, useRouter } from "next/navigation.js";

import type { ComponentProps, JSX, ReactElement } from "react";

/* ============================================================================================= */

export type HeadingTag = keyof Pick<JSX.IntrinsicElements, "h1" | "h2" | "h3" | "h4" | "h5" | "h6">;

export type HeadingsProps = ComponentProps<HeadingTag> & {
  as: HeadingTag;
};

export const Headings = ({
  as: Component,
  ...rest
}: HeadingsProps): ReactElement<HTMLHeadingElement> => {
  //
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = () => {
    //
    if (!rest.id) {
      return;
    }

    // new page navigation must start from top (scroll position `0`)
    router.push(`${pathname}#${rest.id}`, { scroll: true });
  };

  return <Component {...rest} onClick={handleClick} />;
};
