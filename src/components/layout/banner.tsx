import { cls } from "@/lib";

import type { ComponentProps, ReactElement, ReactNode } from "react";

/* ============================================================================================= */

type BannerRootProps = {
  children: ReactNode;
} & ComponentProps<"div">;

export const BannerRoot = ({
  children,
  className,
  ...rest
}: BannerRootProps): ReactElement<HTMLDivElement> => (
  <div className={cls("banner__wrapper", className)} {...rest}>
    {children}
  </div>
);

/* ============================================================================================= */

type BannerProps = {
  children: ReactNode;
} & ComponentProps<"div">;

export const Banner = ({
  children,
  className,
  ...rest
}: BannerProps): ReactElement<HTMLDivElement> => (
  <div className={cls("banner", className)} {...rest}>
    {children}
  </div>
);
