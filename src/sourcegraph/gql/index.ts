import fetch from "node-fetch";

import { Sourcegraph } from "..";

export class AuthError extends Error {
  message: string;
  constructor(message: string) {
    super();
    this.message = message;
  }
}

async function doGQLRequest<T>(abort: AbortSignal, src: Sourcegraph, body: string): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (src.token) {
    headers["Authorization"] = `token ${src.token}`;
  }
  return new Promise<T>((resolve, reject) => {
    fetch(`${src.instance}/.api/graphql`, {
      method: "POST",
      headers: headers,
      body,
      signal: abort,
    })
      .then((r) => {
        if (r.status == 401 || r.status == 403) {
          return reject(new AuthError(`${r.status} ${r.statusText}`));
        } else if (r.status >= 400) {
          return r
            .text()
            .then((t) => {
              return reject(new Error(`${r.status} ${r.statusText}: ${t}`));
            })
            .catch((e) => {
              return reject(new Error(`${r.status} ${r.statusText}: ${e}`));
            });
        }

        return r.json();
      })
      .then((data) => {
        const resp = data as { data?: T; errors?: { message: string }[] };
        if (resp?.data) {
          resolve(resp.data as T);
        } else if (resp?.errors) {
          reject(resp.errors.map((e) => e.message).join("\n\n"));
        } else {
          reject(`Unknown in response: ${JSON.stringify(resp)}`);
        }
      });
  });
}

async function doQuery<T>(abort: AbortSignal, src: Sourcegraph, name: string, query: string): Promise<T> {
  return doGQLRequest<T>(abort, src, JSON.stringify({ query: `query raycastSourcegraph${name} ${query}` }));
}

async function doMutation<T>(abort: AbortSignal, src: Sourcegraph, name: string, mutation: string): Promise<T> {
  return doGQLRequest<T>(abort, src, JSON.stringify({ query: `mutation raycastSourcegraph${name} ${mutation}` }));
}

export async function checkAuth(abort: AbortSignal, src: Sourcegraph) {
  const q = `{ currentUser { username, id } }`;
  return doQuery<{ currentUser: { username: string; id: string } }>(abort, src, "CheckAuth", q);
}

export interface NotebookMarkdownBlock {
  markdownInput?: string;
}

export interface NotebookQueryBlock {
  queryInput?: string;
}

export interface NotebookFileBlock {
  fileInput?: {
    repositoryName: string;
    filePath: string;
  };
}

export interface User {
  username: string;
  displayName?: string;
}

export interface BatchChange {
  id: string;
  url: string;
  namespace: { id: string; namespaceName: string };
  name: string;
  description: string;
  creator: User;
  state: "OPEN" | "CLOSED" | "DRAFT";
  updatedAt: string;
  changesetsStats: {
    total: number;
    merged: number;
    open: number;
    closed: number;
    failed: number;
  };
}

export async function getBatchChanges(abort: AbortSignal, src: Sourcegraph) {
  const q = `{
    batchChanges(first:100) {
      nodes {
        id
        url
        namespace {
          id
          namespaceName
        }
        name
        description
        creator {
          username
          displayName
        }
        state
        updatedAt
        changesetsStats {
          total
          merged
          open
          closed
          failed
        }
      }
    }
  }`;
  return doQuery<{ batchChanges?: { nodes?: BatchChange[] } }>(abort, src, "GetBatchChanges", q);
}

export type ChangesetState = "OPEN" | "MERGED" | "CLOSED" | "FAILED" | "UNPUBLISHED" | "PROCESSING" | "RETRYING";

export type ChangesetReviewState = "APPROVED" | "CHANGES_REQUESTED";

export type ChangesetCheckState = "PENDING" | "PASSED" | "FAILED";

export interface Changeset {
  id: string;
  state: ChangesetState;
  updatedAt: string;

  repository: {
    name: string;
  };
  externalURL?: {
    url: string;
    serviceKind: string;
  };
  externalID?: string;
  title: string;
  reviewState?: ChangesetReviewState;
  checkState?: ChangesetCheckState;
}

export async function getChangesets(abort: AbortSignal, src: Sourcegraph, namespace: string, name: string) {
  const q = `{
    batchChange(namespace:"${namespace}",name:"${name}") {
      changesets {
        nodes {
          id
          state
          updatedAt

          __typename
          ...on ExternalChangeset {
            repository {
              name
            }
            externalURL {
              url
              serviceKind
            }
            externalID
            title
            reviewState
            checkState
          }
        }
      }
    }
  }`;
  return doQuery<{ batchChange?: { changesets?: { nodes: Changeset[] } } }>(abort, src, "GetChangesets", q);
}

export async function publishChangeset(abort: AbortSignal, src: Sourcegraph, batchChange: string, changeset: string) {
  const m = `{
    publishChangesets(batchChange:"${batchChange}",changesets:["${changeset}"]) {
      id
    }
  }`;
  return doMutation<{ publishChangesets?: { id: string } }>(abort, src, "PublishChangeset", m);
}

export async function reenqueueChangeset(abort: AbortSignal, src: Sourcegraph, changeset: string) {
  const m = `{
    reenqueueChangeset(changeset:"${changeset}") {
      id
    }
  }`;
  return doMutation<{ reenqueueChangeset?: { id: string } }>(abort, src, "ReenqueueChangeset", m);
}

export async function mergeChangeset(
  abort: AbortSignal,
  src: Sourcegraph,
  batchChange: string,
  changeset: string,
  squash: boolean
) {
  const m = `{
    mergeChangesets(batchChange:"${batchChange}",changesets:["${changeset}"],squash:${JSON.stringify(squash)}) {
      id
    }
  }`;
  return doMutation<{ mergeChangesets?: { id: string } }>(abort, src, "MergeChangeset", m);
}
