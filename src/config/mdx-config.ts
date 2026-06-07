/* remark plugins */
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

import { remarkCodeMeta } from "@/markdown/plugins/remark-code-meta";
import { remarkTOC } from "@/markdown/plugins/remark-toc";

/* rehype plugins */
import rehypeSlug from "rehype-slug";

import type { NextMDXOptions } from "@next/mdx";

/* ============================================================================================= */

/**
 * mdx processing configurations (`@next/mdx`)
 */
export const mdxConfig: NextMDXOptions = {
  options: {
    /* process markdown */
    remarkPlugins: [
      remarkFrontmatter,
      // named export `metadata` from `.mdx` files
      [remarkMdxFrontmatter, { name: "metadata" }],
      remarkGfm,
      remarkCodeMeta,
      remarkTOC,
    ],

    /* process html */
    rehypePlugins: [rehypeSlug],
  },
};
