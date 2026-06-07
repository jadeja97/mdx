import { Link } from "@/components/link";
import { List } from "@/components/list";

import type { ReactElement } from "react";

import type { FileMeta, FolderMeta, Tree } from "@/types/content";

/* ============================================================================================= */

export interface TopicsProps {
  tree: Tree;
}

export const Topics = ({ tree }: TopicsProps): ReactElement<HTMLDivElement> => (
  <div className="topics">
    {tree.map((branch) => (
      <RenderChild key={branch.label} meta={branch} />
    ))}
  </div>
);

/* ============================================================================================= */

export interface FolderProps {
  meta: FolderMeta;
}

export const Folder = ({ meta }: FolderProps): ReactElement<HTMLDivElement> => (
  <div data-folder={meta.label}>
    <span className="folder__label">{meta.label}</span>

    <List unstyled>
      {meta.childs.map((child) => (
        <li key={child.label}>
          <RenderChild meta={child} />
        </li>
      ))}
    </List>
  </div>
);

/* ============================================================================================= */

export type FolderPageProps = FolderProps;

export const FolderPage = ({ meta }: FolderPageProps): ReactElement<HTMLDivElement> => (
  <div data-folder-page={meta.label}>
    {/*  */}
    <RenderChild meta={{ ...meta, type: "file" }} />

    <List unstyled>
      {meta.childs.map((child) => (
        <li key={child.label}>
          <RenderChild meta={child} />
        </li>
      ))}
    </List>
  </div>
);

/* ============================================================================================= */

export interface RenderChildProps {
  meta: FileMeta | FolderMeta;
}

export const RenderChild = ({
  meta,
}: RenderChildProps): null | ReturnType<typeof Link | typeof Folder | typeof FolderPage> => {
  //

  if (meta.type === "file") {
    return (
      <Link href={meta.url} title={meta.title}>
        {meta.label}
      </Link>
    );
  }

  if (meta.type === "folder") {
    const Component = meta.isPage ? FolderPage : Folder;
    return <Component meta={meta} />;
  }

  return null;
};
