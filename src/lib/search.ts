import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";

import MiniSearch from "minisearch";

import { Singleton } from "@/lib/singleton";

import type { DocsConfig } from "@/types";

/* ============================================================================================= */

export type CreateSearchInstanceOptions = Pick<
  DocsConfig["constants"],
  "SEARCH_INDEX_FIELDS" | "SEARCH_INDEX_RETURN_FIELDS" | "SEARCH_INDEX_PATH"
>;

/**
 * builds and manages the static search index for documentation content
 *
 * exposes:
 *
 * - `instance.ingest`
 */
export class Search {
  //
  private miniSearchInstance!: MiniSearch;
  private searchOptions!: CreateSearchInstanceOptions;

  public static create(path: string, searchOptions: CreateSearchInstanceOptions) {
    return new this().init(`search:${path}`, searchOptions);
  }

  private init(path: string, searchOptions: CreateSearchInstanceOptions) {
    //
    const instance = Singleton.get<Search & Singleton>(path);

    const registerMethods = instance.registerMethods.bind(instance, this);

    registerMethods(["createSearchInstance", "ingest"]);

    if (!instance.searchOptions) {
      instance.searchOptions = searchOptions;
    }

    if (!instance.miniSearchInstance) {
      instance.miniSearchInstance = instance.createSearchInstance();
    }

    return instance;
  }

  /* =========================
		BUILD TIME
	========================= */

  private createSearchInstance() {
    return new MiniSearch({
      fields: this.searchOptions.SEARCH_INDEX_FIELDS,
      storeFields: this.searchOptions.SEARCH_INDEX_RETURN_FIELDS,
    });
  }

  public ingest<T>(documents: T[]) {
    //
    this.miniSearchInstance.addAll(documents);

    const searchIndexPath = join(cwd(), `public${this.searchOptions.SEARCH_INDEX_PATH}`);
    const serachContent = {
      index: this.miniSearchInstance.toJSON(),
      documents,
    };

    writeFileSync(searchIndexPath, JSON.stringify(serachContent));
  }
}
