import { cleanURL } from "@/lib/dom/utils";

import type { App, Author } from "@/types/config";
import type { FrontMatter } from "@/types/content";

/* ============================================================================================= */

export interface ArticleOGOptions {
  owner: Author;
  app: App;
  url: string;
  frontMatter: FrontMatter;
}

export const articleOG = ({ owner, app, url, frontMatter }: ArticleOGOptions) => {
  return {
    title: frontMatter.title,
    description: frontMatter.description,
    url,
    type: "article",
    publishedTime: `${frontMatter.publishedAt.split(".")[0]}Z`,
    modifiedTime: `${frontMatter.lastModifiedAt.split(".")[0]}Z`,
    authors: owner.name,
    siteName: app.name,
    locale: app.locale,
    images: [app.images.og],
  };
};

/* ============================================================================================= */

export interface WebsiteOGOptions {
  app: App;
  SITE_URL: string;
  frontMatter: FrontMatter;
  trailingSlash: boolean | undefined;
}

export const websiteOG = ({ app, SITE_URL, trailingSlash, frontMatter }: WebsiteOGOptions) => {
  return {
    title: frontMatter.title,
    description: frontMatter.description,
    url: cleanURL(SITE_URL, "", trailingSlash),
    type: "website",
    siteName: app.name,
    locale: app.locale,
    countryName: app.country,
    images: [app.images.og],
  };
};
