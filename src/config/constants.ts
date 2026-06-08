import type { Constants } from "@/types";

/* ============================================================================================= */

/**
 * constants used for configuration
 */
export const constants: Constants = {
  /**
   * version from `package.json`
   *
   * keep this updated to invalidate old search index cache
   */
  VERSION: "0.0.0",

  /**
   * the site url (domain)
   */
  SITE_URL: "",

  /**
   * used for creating search index filename
   *
   * @default "search-index"
   */
  SEARCH_INDEX_KEY: "search-index",

  /**
   * a full path of search index file. this will be stored in public folder.
   *
   * dev: `/${SEARCH_INDEX_KEY}-v-dev.json`
   *
   * prod: `/${SEARCH_INDEX_KEY}-v-${VERSION}.json`
   */
  // oxlint-disable node/no-process-env
  SEARCH_INDEX_PATH: `/search-index-v-${process.env.NODE_ENV === "development" ? "dev" : "0.0.0"}.json`,

  /**
   * `true` if environment is "development"
   */
  // oxlint-disable node/no-process-env
  DEV: process.env.NODE_ENV === "development",

  /**
   * `true` if environment is "production"
   */
  // oxlint-disable node/no-process-env
  PROD: process.env.NODE_ENV === "production",

  /**
   * fields for search indexing
   */
  SEARCH_INDEX_FIELDS: [
    "title",
    "label",
    "url",
    "content",
    "metaTitle",
    "metaDescription",
    "metaKeywords",
  ],

  /**
   * search index result fields
   */
  SEARCH_INDEX_RETURN_FIELDS: ["title", "label", "url", "metaTitle", "metaDescription"],
};
