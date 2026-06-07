import type { NextMDXOptions } from "@next/mdx";
import type { MDXComponents } from "mdx/types";

import type { SVGEl, SVGProps } from "@/components/svg";

/* ============================================================================================= */

export interface Constants {
  VERSION: string;
  SITE_URL: string;
  SEARCH_INDEX_KEY: string;
  SEARCH_INDEX_PATH: string;
  DEV: boolean;
  PROD: boolean;
  SEARCH_INDEX_FIELDS: string[];
  SEARCH_INDEX_RETURN_FIELDS: string[];
}

export interface Analytics {
  /**
   * google analytics key
   */
  google?: string;

  /**
   * microsoft clarity key
   */
  msClarity?: string;
}

export type NavLinks = Record<
  string,
  {
    label: string;
    url: string;
    icon?: (props: SVGProps) => SVGEl;
    title?: string;
  }
>;

export type SocialLinks = Record<
  string,
  {
    label: string;
    url: string;
    icon?: (props: SVGProps) => SVGEl;
    title?: string;
  }
>;

export type AuthorLinks = Record<
  string,
  {
    name: string;
    url: string;
  }
>;

export interface DocsConfig {
  analytics?: Analytics;
  constants: Constants;
  links: {
    navigations: NavLinks;
    socials: SocialLinks;
    authors: AuthorLinks;
  };
  mdxConfig: NextMDXOptions;
  mdxComponents?: {
    HTMLElements?: MDXComponents;
    TSXComponents?: MDXComponents;
  };
}

export interface UserConfig {
  analytics?: Partial<Analytics>;
  constants: Partial<Constants>;
  links: {
    navigations: NavLinks;
    socials: SocialLinks;
    authors: AuthorLinks;
  };
  mdxConfig?: NextMDXOptions;
  mdxComponents?: {
    HTMLElements?: MDXComponents;
    TSXComponents?: MDXComponents;
  };
}
