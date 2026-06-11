import { cleanURL } from "@/lib/dom/utils";

import type { App, Author, DocsConfig } from "@/types/config";
import type { FrontMatter } from "@/types/content";

/* ============================================================================================= */

export type AuthorJSON_LDOptions = Author;

export const getAuthorJSON_LD = ({
  name,
  jobTitle,
  link,
  location,
  socials,
}: AuthorJSON_LDOptions) => {
  return {
    "@type": "Person",
    name,
    jobTitle,
    url: link,
    sameAs: Object.values(socials).map((handle) => {
      return handle.link;
    }),
    homeLocation: {
      "@type": "Place",
      name: location,
    },
  };
};

/* ============================================================================================= */

export interface ArticleJSON_LDOptions {
  author: Author;
  SITE_URL: DocsConfig["constants"]["SITE_URL"];
  url: string;
  frontMatter: FrontMatter;
}

export const articleJSON_LD = ({ author, SITE_URL, url, frontMatter }: ArticleJSON_LDOptions) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    url: cleanURL(SITE_URL, url, false),
    headline: frontMatter.title,
    description: frontMatter.description,
    datePublished: `${frontMatter.publishedAt.split(".")[0]}Z`,
    dateModified: `${frontMatter.lastModifiedAt.split(".")[0]}Z`,
    author: getAuthorJSON_LD(author),
  };
};

/* ============================================================================================= */

export interface WebsiteJSON_LDOptions {
  author: Author;
  SITE_URL: DocsConfig["constants"]["SITE_URL"];
  appName: App["name"];
}

export const websiteJSON_LD = ({ author, SITE_URL, appName }: WebsiteJSON_LDOptions) => {
  return {
    "@context": "https://schema.org",
    "@type": "Website",
    url: cleanURL(SITE_URL, "", false),
    name: appName,
    author: getAuthorJSON_LD(author),
  };
};
