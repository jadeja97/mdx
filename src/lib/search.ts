import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";

import MiniSearch from "minisearch";

import Singleton from "@/lib/singleton";
import getConfig from "@/main";

/* ============================================================================================= */

const { SEARCH_INDEX_FIELDS, SEARCH_INDEX_PATH, SEARCH_INDEX_RETURN_FIELDS } =
  getConfig().constants;

/* ============================================================================================= */

/**
 * builds and manages the static search index for documentation content
 *
 * exposes:
 *
 * - `instance.ingest`
 */
class Search {
  //
  private miniSearchInstance!: MiniSearch;

  public static create(path: string) {
    return new this().init(`search:${path}`);
  }

  private init(path: string) {
    //
    const instance = Singleton.get<Search & Singleton>(path);

    const registerMethods = instance.registerMethods.bind(instance, this);

    registerMethods(["createSearchInstance", "ingest"]);

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
      fields: SEARCH_INDEX_FIELDS,
      storeFields: SEARCH_INDEX_RETURN_FIELDS,
    });
  }

  public ingest<T>(documents: T[]) {
    //
    this.miniSearchInstance.addAll(documents);

    const searchIndexPath = join(cwd(), `public${SEARCH_INDEX_PATH}`);
    const serachContent = {
      index: this.miniSearchInstance.toJSON(),
      documents,
    };

    writeFileSync(searchIndexPath, JSON.stringify(serachContent));
  }
}

/* ============================================================================================= */

export default Search;
