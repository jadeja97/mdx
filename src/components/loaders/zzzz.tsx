import { cls } from "@/lib";

import type { ComponentProps, ReactElement } from "react";

/* ============================================================================================= */

type ZZZZProps = ComponentProps<"div">;

/*
	author: necatimertmetin
	link: https://uiverse.io/necatimertmetin/quiet-bulldog-16
*/
const ZZZZ = ({ className, ...rest }: ZZZZProps): ReactElement<HTMLDivElement> => (
  <div className={cls("zzzz", className)} {...rest}>
    <div>z</div>
    <div>z</div>
    <div>z</div>
    <div>z</div>
  </div>
);

/* ============================================================================================= */

export default ZZZZ;
