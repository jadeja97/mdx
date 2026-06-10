import { execSync } from "node:child_process";
import { resolve } from "node:path";

/* ============================================================================================= */

export const getLastModified = (filePath: string): string => {
  try {
    // get the last commit date for the specific file in ISO format
    const date = execSync(`git log -1 --format=%cI ${resolve(filePath)}`)
      .toString()
      .trim();
    return new Date(date).toISOString();
  } catch (error) {
    // oxlint-disable-next-line no-console
    console.error("Could not get git date, falling back to current time", error);
    return new Date().toISOString();
  }
};
