import { cls } from "@/lib";

import type { ComponentProps, ReactElement, ReactNode } from "react";

/* ============================================================================================= */

type FooterRootProps = {
  children: ReactNode;
} & ComponentProps<"div">;

export const FooterRoot = ({
  children,
  className,
  ...rest
}: FooterRootProps): ReactElement<HTMLDivElement> => (
  <div className={cls("footer__wrapper", className)} {...rest}>
    {children}
  </div>
);

/* ============================================================================================= */

type FooterProps = {
  children: ReactNode;
} & ComponentProps<"footer">;

export const Footer = ({ children, ...rest }: FooterProps): ReactElement<HTMLElement> => (
  <footer {...rest}>{children}</footer>
);

/* ============================================================================================= */

export default Footer;
