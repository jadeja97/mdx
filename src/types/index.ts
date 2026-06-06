export interface JumpScroll {
  container?: Element | null;
  element?: Element | null;
}

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

export interface DocsConfig {
  analytics?: Analytics;
  constants: Constants;
  fonts: Record<"display" | "body" | "code", unknown> & Record<string, unknown>;
  trailingSlash?: boolean;
}
