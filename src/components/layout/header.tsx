import { cls } from "@/lib";

import type { ComponentProps, ReactElement, ReactNode } from "react";

/* ============================================================================================= */

type HeaderRootProps = {
  children: ReactNode;
} & ComponentProps<"div">;

export const HeaderRoot = ({
  children,
  className,
  ...rest
}: HeaderRootProps): ReactElement<HTMLDivElement> => (
  <div className={cls("header__wrapper", className)} {...rest}>
    {children}
  </div>
);

/* ============================================================================================= */

type HeaderProps = {
  children: ReactNode;
} & ComponentProps<"header">;

export const Header = ({ children, ...rest }: HeaderProps): ReactElement<HTMLDivElement> => (
  <header {...rest}>{children}</header>
);

/* ============================================================================================= */

export default Header;
