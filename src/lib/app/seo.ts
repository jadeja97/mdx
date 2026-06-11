import { articleJSON_LD, websiteJSON_LD } from "@/lib/app/json-ld";
import { websiteOG } from "@/lib/app/og";

import type { Metadata } from "next";

import type { App, DocsConfig } from "@/types/config";
import type { FrontMatter, Paths } from "@/types/content";

/* ============================================================================================= */

export interface GetPageSEOOptions {
  authors: Partial<DocsConfig["authors"]>;
  app: App;
  url: string;
  SITE_URL: DocsConfig["constants"]["SITE_URL"];
  canonicalURL: string;
  frontMatter: FrontMatter;
  filePath: Paths["path"];
  markdown?: `https://${string}`;
}

export const getPageSEO = ({
  authors,
  SITE_URL,
  app,
  url,
  markdown,
  canonicalURL,
  frontMatter,
}: GetPageSEOOptions): Metadata => {
  //
  // oxlint-disable-next-line typescript/no-non-null-assertion
  const owner = authors[frontMatter.authors[0]]!;

  return {
    title: frontMatter.title,
    description: frontMatter.description,
    keywords: frontMatter.keywords,

    authors: frontMatter.authors.map((author) => {
      return {
        name: authors[author]?.name,
        url: authors[author]?.link,
      };
    }),

    alternates: {
      canonical: canonicalURL,
      types: {
        ...(markdown && { "text/markdown": markdown }),
      },
    },

    openGraph: {
      title: frontMatter.title,
      description: frontMatter.description,
      url,
      type: "article",
      publishedTime: `${frontMatter.publishedAt.split(".")[0]}Z`,
      modifiedTime: `${frontMatter.lastModifiedAt.split(".")[0]}Z`,
      authors: owner.name,
      siteName: app.name,
      locale: app.locale,
      countryName: app.country,
      images: [app.images.og],
    },

    twitter: {
      title: frontMatter.title,
      description: frontMatter.description,
      card: "summary_large_image",
      images: [app.images.og.url],
      site: app.x.site,
      siteId: app.x.siteId,
      creator: owner.x.creator,
      creatorId: owner.x.creatorId,
    },

    other: {
      "application/ld+json": JSON.stringify(
        articleJSON_LD({ author: owner, SITE_URL, url, frontMatter }),
      ),
    },
  };
};

/* ============================================================================================= */

export interface GetHomePageSEOOptions {
  SITE_URL: string;
  app: App;
  authors: DocsConfig["authors"];
  frontMatter: FrontMatter;
  trailingSlash: boolean | undefined;
}

export const getHomePageSEO = ({
  SITE_URL,
  app,
  authors,
  frontMatter,
  trailingSlash = false,
}: GetHomePageSEOOptions): Metadata => {
  //
  const owner = authors[frontMatter.authors[0]];

  return {
    metadataBase: new URL(SITE_URL),
    applicationName: app.name,
    publisher: app.publisher,
    creator: app.creator,

    title: app.home.title,
    description: app.description,
    keywords: app.keywords,

    alternates: app.home.alternates,

    authors: frontMatter.authors.map((author) => {
      return {
        name: authors[author]?.name,
        url: authors[author]?.link,
      };
    }),

    openGraph: websiteOG({ app, SITE_URL, trailingSlash, frontMatter }),

    twitter: {
      title: frontMatter.title,
      description: frontMatter.description,
      card: "summary_large_image",
      images: [app.images.og.url],
      site: app.x.site,
      siteId: app.x.siteId,
      creator: owner.x.creator,
      creatorId: owner.x.creatorId,
    },

    other: {
      "application/ld+json": JSON.stringify(
        websiteJSON_LD({ author: owner, SITE_URL, appName: app.name }),
      ),
    },
  };
};
