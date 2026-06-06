import { cls } from "@/lib";

import type { ComponentProps, ReactElement } from "react";

/* ============================================================================================= */

type LiveStarProps = ComponentProps<"div">;

/*
	author: narmesh_sah
	link: https://uiverse.io/narmesh_sah/hungry-pig-40
*/
const LiveStar = ({ className, ...rest }: LiveStarProps): ReactElement<HTMLDivElement> => (
  <div className={cls("live-star__wrapper", className)} {...rest}>
    <div className="live-star">
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

/* ============================================================================================= */

export default LiveStar;
