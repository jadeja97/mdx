import type { Constants } from "@/types";

/* ============================================================================================= */

/**
 * constants used for configuration
 */
export const constants: Constants = {
  /**
   * site version from `package.json`
   */
  VERSION: "0.0.0",

  /**
   * site url
   */
  SITE_URL: "",

  /**
   * search index will be stored in `public` directory
   */
  SEARCH_INDEX_KEY: "search-index",

  /**
   * search index path
   */
  // oxlint-disable node/no-process-env
  SEARCH_INDEX_PATH: `/search-index-v-${process.env.NODE_ENV === "development" ? "dev" : "0.0.0"}.json`,

  /**
   * true if environment is development
   */
  // oxlint-disable node/no-process-env
  DEV: process.env.NODE_ENV === "development",

  /**
   * true if environment is production
   */
  // oxlint-disable node/no-process-env
  PROD: process.env.NODE_ENV === "production",

  /**
   * search index fields
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
