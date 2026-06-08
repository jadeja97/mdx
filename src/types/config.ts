import type { NextMDXOptions } from "@next/mdx";
import type { MDXComponents } from "mdx/types";
import type { NextConfig } from "next";
import type { Configuration } from "webpack";

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
  googleAnalytics?: string;

  /**
   * microsoft clarity key
   */
  microsoftClarity?: string;
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
  getNextConfig: (options: { githubPages?: boolean }) => NextConfig;

  getWebpackConfig: (
    config: Configuration,
    options: {
      plugins: Configuration["plugins"];
      alias:
        | {
            /**
             * new request.
             */
            alias: string | false | string[];
            /**
             * request to be redirected.
             */
            name: string;
            /**
             * redirect only exact matching request.
             */
          }[]
        | Record<string, string | false | string[]>;
    },
  ) => Configuration;
}

export type RequiredConstants = Pick<Constants, "DEV" | "PROD" | "SITE_URL" | "VERSION">;
export type OptionalConstants = Partial<Omit<Constants, keyof RequiredConstants>>;

export interface UserConfig {
  analytics?: Partial<Analytics>;
  constants: RequiredConstants & OptionalConstants;
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
