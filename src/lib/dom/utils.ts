export { default as cls } from "clsx";

/* ============================================================================================= */

export { cva } from "class-variance-authority";

export type { VariantProps } from "class-variance-authority";

/* ============================================================================================= */

export const sanitizePathname = (path: string, base: string) => {
  //
  const { pathname } = new URL(path, base);

  return (
    pathname
      // remove traversal
      .replaceAll("..", "")
      // collapse slashes
      .replaceAll(/\/+/g, "/") || "/"
  );
};
