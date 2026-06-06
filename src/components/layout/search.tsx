// oxlint-disable eslint/max-lines

"use client";

/* ============================================================================================= */

import { debounce } from "@jadeja/ts/lib";
import { useState, useEffect, startTransition, useRef } from "react";

import Button from "@/components/button";
import { DialogClose } from "@/components/dialog";
import Link from "@/components/link";
import List from "@/components/list";
import AlienLife from "@/components/loaders/alien-life";
import ZZZZ from "@/components/loaders/zzzz";
import useSearch from "@/hooks/use-search";
import { cls } from "@/lib";

import type { SearchResult as SearchResultItem } from "minisearch";
import type { ComponentProps, ReactElement, ReactNode } from "react";

import type { DialogCloseProps } from "@/components/dialog";
import type { SearchQueryResult } from "@/hooks/use-search";

/* ============================================================================================= */

interface SearchChildParams {
  search: string;
  ready: boolean;
  handleSearch: (text: string) => void;
  error: {
    message: string;
    reason: unknown;
  } | null;
  result: SearchQueryResult | undefined;
}

type SearchProps = {
  children: (options: SearchChildParams) => ReactNode;
} & ComponentProps<"div">;

export const Search = ({
  children,
  className,
  ...rest
}: SearchProps): ReactElement<HTMLDivElement> => {
  //
  const { initialize, ready, error, query } = useSearch();

  const [search, setSearch] = useState("");
  const [result, setResult] = useState<SearchQueryResult>();

  useEffect(() => {
    if (!ready) {
      // oxlint-disable typescript/no-floating-promises
      initialize();
    }
  }, [ready, initialize]);

  const handleSearch = (text: string) => {
    setSearch(text);
    setResult(undefined);

    startTransition(() => {
      //
      debounce(() => {
        const fn = async () => {
          const queryResult = await query(text);
          setResult(queryResult);
        };
        // oxlint-disable typescript/no-floating-promises
        fn();
      });
    });
  };

  return (
    <div className={cls("search", className)} {...rest}>
      {children({ search, ready, handleSearch, error, result })}
    </div>
  );
};

/* ============================================================================================= */

type SearchErrorProps = {
  message: string;
  children: (params: { message: string }) => ReactNode;
} & ComponentProps<"div">;

export const SearchError = ({
  message,
  className,
  children,
  ...rest
}: SearchErrorProps): ReactElement<HTMLDivElement> => (
  <div className={cls("search-error", className)} {...rest}>
    {children({ message })}
  </div>
);

/* ============================================================================================= */

type SearchErrorMessageProps = {
  message: string;
} & ComponentProps<"p">;

export const SearchErrorMessage = ({
  message,
  className,
  ...rest
}: SearchErrorMessageProps): ReactElement<HTMLParagraphElement> => (
  <p className={cls("search-error__message", className)} {...rest}>
    {message || "Something went wrong!"}
  </p>
);

/* ============================================================================================= */

type SearchInputProps = Pick<SearchChildParams, "ready" | "search" | "handleSearch"> &
  ComponentProps<"div"> & {
    input?: ComponentProps<"input">;
  };

export const SearchInput = ({
  ready,
  search,
  handleSearch,
  className,
  input,
  ...rest
}: SearchInputProps): ReactElement<HTMLDivElement> => {
  //
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ready) {
      inputRef.current?.focus();
    }
  }, [ready]);

  return (
    <div className={cls("search__input", className)} {...rest}>
      <input
        type="text"
        name="search"
        ref={inputRef}
        placeholder="Search docs..."
        autoComplete="off"
        disabled={!ready}
        value={search}
        onChange={(event) => {
          handleSearch(event.target.value);
        }}
        {...input}
      />
    </div>
  );
};

/* ============================================================================================= */

type SearchResultProps = Pick<SearchChildParams, "result"> & {
  children: (params: Pick<SearchChildParams, "result">) => ReactNode;
} & ComponentProps<"div">;

export const SearchResult = ({
  result,
  className,
  children,
  ...rest
}: SearchResultProps): ReactElement<HTMLDivElement> => (
  <div className={cls("search-result", className)} {...rest}>
    {children({ result })}
  </div>
);

/* ============================================================================================= */

type SearchResultStatesProps = Pick<SearchChildParams, "result"> & ComponentProps<"div">;

export const SearchResultStates = ({
  result,
}: SearchResultStatesProps): ReactElement<HTMLDivElement> => (
  <div className="search-result__states">
    <span>
      Found {result?.count ?? 0} results in {((result?.time ?? 0) / 10).toFixed(2)} seconds
    </span>{" "}
    <br />
    <span>Search isn&apos;t perfect. some results may be unrelated.</span>
  </div>
);

/* ============================================================================================= */

type SearchResultContainerProps = Pick<SearchChildParams, "result"> & {
  children: (params: Pick<SearchChildParams, "result">) => ReactNode;
  scrollFade?: boolean;
} & ComponentProps<"div">;

export const SearchResultContainer = ({
  result,
  scrollFade = true,
  children,
  className,
}: SearchResultContainerProps): ReactElement<HTMLDivElement> => (
  <div className={cls("search-result__container", { "scroll-fade": scrollFade }, className)}>
    {children({ result })}
  </div>
);

/* ============================================================================================= */

type SearchResultNoContentProps = Pick<SearchChildParams, "result"> & {
  children: ReactNode;
} & ComponentProps<"p">;

export const SearchResultNoContent = ({
  result,
  children,
  className,
}: SearchResultNoContentProps): ReactElement<HTMLParagraphElement> | null => {
  //

  if ((result?.count ?? 0) > 0) {
    return null;
  }

  return (
    <p className={cls("search-result__no-content", className)}>
      {children ?? "Data not available."}
    </p>
  );
};

/* ============================================================================================= */

type SearchResultListProps = Pick<SearchChildParams, "result"> & {
  children?: (params: { data: SearchResultItem }) => ReactNode;
} & ComponentProps<"ul">;

export const SearchResultList = ({
  result,
  children,
  className,
  ...rest
}: SearchResultListProps): ReturnType<typeof List> | null => {
  //

  if ((result?.count ?? 0) === 0) {
    return null;
  }

  return (
    <List unstyled className={cls("search-result__list", className)} {...rest}>
      {result?.data?.map((data) => (
        /* oxlint-disable typescript/no-unsafe-assignment */
        <li key={data.id}>
          {children?.({ data }) ?? (
            <DialogClose isWrapper hideFocus>
              {/* oxlint-disable typescript/no-unsafe-assignment */}
              <Link href={data.url} title={data.title}>
                <span className="link__label">{data.metaTitle ?? data.label}</span>
                <span className="link__url">{data.url}</span>
                <span className="link__confidence">Confidence: {data.score.toFixed(2)}%</span>
              </Link>
            </DialogClose>
          )}
        </li>
      ))}
    </List>
  );
};

/* ============================================================================================= */

type SearchCloseButtonProps = {
  children: ReactNode;
} & DialogCloseProps;

export const SearchCloseButton = ({
  children,
  ...rest
}: SearchCloseButtonProps): ReturnType<typeof DialogClose> => (
  <DialogClose hideCloseButton={false} render={<Button variant="ghost" />} {...rest}>
    {children}
    <span className="screen-reader">close search popup</span>
  </DialogClose>
);

/* ============================================================================================= */

type SearchLoaderRootProps = Pick<SearchChildParams, "ready" | "search"> & {
  children: (params: Pick<SearchChildParams, "ready" | "search">) => ReactNode;
} & ComponentProps<"div">;

export const SearchLoaderRoot = ({
  search,
  ready,
  children,
}: SearchLoaderRootProps): ReactElement<HTMLDivElement> => (
  <div className="search-loader__wrapper">{children({ search, ready })}</div>
);

/* ============================================================================================= */

type SearchLoadersProps = Pick<SearchChildParams, "ready" | "search"> & ComponentProps<"div">;

export const SearchLoaders = ({
  search,
  ready,
  ...rest
}: SearchLoadersProps): ReactElement<HTMLDivElement> => {
  //

  /* 1. no input */
  if (!search.trim() && ready) {
    return <ZZZZ {...rest} />;
  }

  /* 2. fetching search index or results */
  return <AlienLife {...rest} />;
};
