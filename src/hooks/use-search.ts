import { sleep } from "@jadeja/ts/lib";
import MiniSearch from "minisearch";
import { useRef, useEffect, useState } from "react";

import type { AsPlainObject, SearchResult } from "minisearch";

import type { DocsConfig } from "@/types";

/* ============================================================================================= */

// to improve UX (if not added, the results will be snappy)
export const QUERY_ARTIFICIAL_DELAY = 250;

/* ============================================================================================= */

export interface SearchQueryResult {
  count: number;
  time: number;
  data: SearchResult[];
}

export type UseSearchOptions = Pick<
  DocsConfig["constants"],
  "DEV" | "SEARCH_INDEX_PATH" | "SEARCH_INDEX_FIELDS" | "SEARCH_INDEX_RETURN_FIELDS"
>;

/**
 * load the search index and a method to query
 *
 * @param options - options for search hook
 * @param options.DEV - is current environment is "development"
 * @param options.SEARCH_INDEX_FIELDS - fields for search indexing
 * @param options.SEARCH_INDEX_PATH - file path of indexed search data
 * @param options.SEARCH_INDEX_RETURN_FIELDS - result fields from search index data
 */
export const useSearch = ({
  DEV,
  SEARCH_INDEX_FIELDS,
  SEARCH_INDEX_PATH,
  SEARCH_INDEX_RETURN_FIELDS,
}: UseSearchOptions) => {
  //
  const instance = useRef<MiniSearch>(null);
  const abortController = useRef<AbortController>(null);

  const [ready, setReady] = useState(false);
  const [searchError, setSearchError] = useState<{
    message: string;
    reason: unknown;
  } | null>(null);

  // load search index
  // for production, it will be force cached
  // cache will be auto refreshed when new version is deployed
  // api path: `/${SEARCH_INDEX_KEY}-v-${DEV ? "dev" : packageJSON.version}.json`
  const initialize = async () => {
    //
    setSearchError(null);

    // abort the previous request if any
    abortController.current?.abort();

    if (instance.current || ready) {
      return;
    }

    try {
      //
      abortController.current = new AbortController();

      const res = await fetch(SEARCH_INDEX_PATH, {
        signal: abortController.current.signal,
        cache: DEV ? "no-store" : "force-cache",
      });

      // oxlint-disable typescript/no-unsafe-assignment
      const data = await res.json();

      // oxlint-disable typescript/no-unsafe-member-access
      instance.current = MiniSearch.loadJS(data.index as AsPlainObject, {
        fields: SEARCH_INDEX_FIELDS,
        storeFields: SEARCH_INDEX_RETURN_FIELDS,
      });

      // adding artificial delay
      await sleep(1000);

      setReady(true);

      // oxlint-disable typescript/no-explicit-any
    } catch (error: any) {
      // oxlint-disable typescript/no-unsafe-member-access
      if (error.name === "AbortError") {
        return;
      }
      //
      setSearchError({
        message: "Failed to initialize the search!",
        reason: error,
      });
    }
  };

  // query the search index
  const query = async (searchQuery: string): Promise<SearchQueryResult | undefined> => {
    //
    if (searchQuery.trim()) {
      //
      const start = performance.now();

      let data: SearchQueryResult["data"] = [];

      try {
        // adding artificial delay
        await sleep(QUERY_ARTIFICIAL_DELAY);

        data =
          instance.current?.search(searchQuery, {
            prefix: true,
            fuzzy: 0.2,
            boost: {
              metaTitle: 4,
              metaDescription: 4,
              metaKeywords: 4,
              title: 3,
              url: 3,
              label: 2,
              content: 2,
            },
          }) ?? [];
        //
      } catch (error) {
        //
        setSearchError({
          message: `Search failed for ${searchQuery}`,
          reason: error,
        });
        //
      }

      return {
        count: data?.length || 0,
        // remove artificial delay
        time: performance.now() - start - QUERY_ARTIFICIAL_DELAY,
        data,
      };
    }

    // oxlint-disable eslint/no-useless-return, typescript/consistent-return
    return;
  };

  // abort the search index request on unmount
  useEffect(
    () => () => {
      abortController.current?.abort();
    },
    [],
  );

  return {
    initialize,
    ready,
    error: searchError,
    query,
  };
};
