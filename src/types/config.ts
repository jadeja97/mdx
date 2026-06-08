import type { NextMDXOptions } from "@next/mdx";
import type { MDXComponents } from "mdx/types";
import type { NextConfig } from "next";
import type { Configuration } from "webpack";

import type { SVGEl, SVGProps } from "@/components/svg";

/* ============================================================================================= */

export interface Constants {
  /**
   * version from `package.json`
   *
   * keep this updated to invalidate old search index cache
   */
  VERSION: `${number}.${number}.${number}${`-${string}.${number}` | ""}` | number;

  /**
   * the site url (domain)
   */
  SITE_URL: string;

  /**
   * used for creating search index filename
   *
   * @default "search-index"
   */
  SEARCH_INDEX_KEY: string;

  /**
   * a full path of search index file. this will be stored in public folder.
   *
   * dev: `/${SEARCH_INDEX_KEY}-v-dev.json`
   *
   * prod: `/${SEARCH_INDEX_KEY}-v-${VERSION}.json`
   */
  SEARCH_INDEX_PATH: `/${string}-v-${`${number}.${number}.${number}${`-${string}.${number}` | ""}` | ("dev" | number)}.json`;

  /**
   * `true` if environment is "development"
   */
  DEV: boolean;

  /**
   * `true` if environment is "production"
   */
  PROD: boolean;

  /**
   * fields for search indexing
   */
  SEARCH_INDEX_FIELDS: string[];

  /**
   * search index result fields
   */
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
