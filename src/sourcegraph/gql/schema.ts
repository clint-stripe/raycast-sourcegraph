

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetNotebooks
// ====================================================

export interface GetNotebooks_notebooks_nodes_stars {
  totalCount: number;  // The total number of notebook stars in the connection.
}

export interface GetNotebooks_notebooks_nodes_creator {
  username: string;            // The user's username.
  displayName: string | null;  // The display name chosen by the user.
}

export interface GetNotebooks_notebooks_nodes_blocks_SymbolBlock {
  __typename: "SymbolBlock" | "ComputeBlock";
}

export interface GetNotebooks_notebooks_nodes_blocks_MarkdownBlock {
  __typename: "MarkdownBlock";
  markdownInput: string;  // Markdown formatted input string.
}

export interface GetNotebooks_notebooks_nodes_blocks_QueryBlock {
  __typename: "QueryBlock";
  queryInput: string;  // A Sourcegraph search query string.
}

export interface GetNotebooks_notebooks_nodes_blocks_FileBlock_fileInput {
  repositoryName: string;  // Name of the repository, e.g. "github.com/sourcegraph/sourcegraph".
  filePath: string;        // Path within the repository, e.g. "client/web/file.tsx".
}

export interface GetNotebooks_notebooks_nodes_blocks_FileBlock {
  __typename: "FileBlock";
  fileInput: GetNotebooks_notebooks_nodes_blocks_FileBlock_fileInput;  // File block input.
}

export type GetNotebooks_notebooks_nodes_blocks = GetNotebooks_notebooks_nodes_blocks_SymbolBlock | GetNotebooks_notebooks_nodes_blocks_MarkdownBlock | GetNotebooks_notebooks_nodes_blocks_QueryBlock | GetNotebooks_notebooks_nodes_blocks_FileBlock;

export interface GetNotebooks_notebooks_nodes {
  id: string;                                            // The unique id of the notebook.
  title: string;                                         // The title of the notebook.
  viewerHasStarred: boolean;                             // If current viewer has starred the notebook.
  public: boolean;                                       // Public property controls the visibility of the notebook. A public notebook is available to any user on the instance. Private notebooks are only available to their creators.
  stars: GetNotebooks_notebooks_nodes_stars;             // Notebook stars.
  creator: GetNotebooks_notebooks_nodes_creator | null;  // User that created the notebook or null if the user was removed.
  blocks: GetNotebooks_notebooks_nodes_blocks[];         // Array of notebook blocks.
  createdAt: any;                                        // Date and time the notebook was created.
  updatedAt: any;                                        // Date and time the notebook was last updated.
}

export interface GetNotebooks_notebooks {
  nodes: GetNotebooks_notebooks_nodes[];  // A list of notebooks.
}

export interface GetNotebooks {
  notebooks: GetNotebooks_notebooks;  // All available notebooks.
}

export interface GetNotebooksVariables {
  query: string;
  orderBy?: NotebooksOrderBy | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetBatchChanges
// ====================================================

export interface GetBatchChanges_batchChanges_nodes_namespace {
  id: string;             // The globally unique ID of this namespace.
  namespaceName: string;  // The name of this namespace's component. For a user, this is the username. For an organization, this is the organization name.
}

export interface GetBatchChanges_batchChanges_nodes_creator {
  username: string;            // The user's username.
  displayName: string | null;  // The display name chosen by the user.
}

export interface GetBatchChanges_batchChanges_nodes_changesetsStats {
  total: number;   // The count of all changesets.
  merged: number;  // The count of merged changesets.
  open: number;    // The count of open changesets.
  closed: number;  // The count of closed changesets.
  failed: number;  // The count of changesets in failed state.
}

export interface GetBatchChanges_batchChanges_nodes {
  id: string;                                                           // The unique ID for the batch change.
  url: string;                                                          // The URL to this batch change.
  namespace: GetBatchChanges_batchChanges_nodes_namespace;              // The namespace where this batch change is defined.
  name: string;                                                         // The name of the batch change.
  description: string | null;                                           // The description (as Markdown).
  creator: GetBatchChanges_batchChanges_nodes_creator | null;           // The user who created the batch change, or null if the user was deleted.
  state: BatchChangeState;                                              // The state of the batch change.
  updatedAt: any;                                                       // The date and time when the batch change was updated. That can be by applying a spec, or by an internal process. For reading the time the batch change spec was changed last, see lastAppliedAt.
  changesetsStats: GetBatchChanges_batchChanges_nodes_changesetsStats;  // Stats on all the changesets that are tracked in this batch change.
}

export interface GetBatchChanges_batchChanges {
  nodes: GetBatchChanges_batchChanges_nodes[];  // A list of batch changes.
}

export interface GetBatchChanges {
  batchChanges: GetBatchChanges_batchChanges;  // A list of batch changes.
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetChangesets
// ====================================================

export interface GetChangesets_batchChange_changesets_nodes_HiddenExternalChangeset {
  __typename: "HiddenExternalChangeset";
  id: string;             // The unique ID for the changeset.
  state: ChangesetState;  // The state of the changeset.
  updatedAt: any;         // The date and time when the changeset was updated.
}

export interface GetChangesets_batchChange_changesets_nodes_ExternalChangeset_repository {
  name: string;  // The repository's name, as a path with one or more components. It conventionally consists of the repository's hostname and path (joined by "/"), minus any suffixes (such as ".git"). Examples: - github.com/foo/bar - my-code-host.example.com/myrepo - myrepo
}

export interface GetChangesets_batchChange_changesets_nodes_ExternalChangeset_externalURL {
  url: string;                              // The URL to the resource.
  serviceKind: ExternalServiceKind | null;  // The kind of external service, such as "GITHUB", or null if unknown/unrecognized. This is used solely for displaying an icon that represents the service.
}

export interface GetChangesets_batchChange_changesets_nodes_ExternalChangeset {
  __typename: "ExternalChangeset";
  id: string;                                                                                    // The unique ID for the changeset.
  state: ChangesetState;                                                                         // The state of the changeset.
  updatedAt: any;                                                                                // The date and time when the changeset was updated.
  repository: GetChangesets_batchChange_changesets_nodes_ExternalChangeset_repository;           // The repository changed by this changeset.
  externalURL: GetChangesets_batchChange_changesets_nodes_ExternalChangeset_externalURL | null;  // The external URL of the changeset on the code host. Not set when changeset state is UNPUBLISHED, externalState is DELETED, or the changeset's data hasn't been synced yet.
  externalID: string | null;                                                                     // The external ID that uniquely identifies this ExternalChangeset on the code host. For example, on GitHub this is the pull request number. This is only set once the changeset is published on the code host.
  title: string | null;                                                                          // The title of the changeset, or null if the data hasn't been synced from the code host yet.
  reviewState: ChangesetReviewState | null;                                                      // The review state of this changeset. This is only set once the changeset is published on the code host.
  checkState: ChangesetCheckState | null;                                                        // The state of the checks (e.g., for continuous integration) on this changeset, or null if no checks have been configured.
}

export type GetChangesets_batchChange_changesets_nodes = GetChangesets_batchChange_changesets_nodes_HiddenExternalChangeset | GetChangesets_batchChange_changesets_nodes_ExternalChangeset;

export interface GetChangesets_batchChange_changesets {
  nodes: GetChangesets_batchChange_changesets_nodes[];  // A list of changesets.
}

export interface GetChangesets_batchChange {
  changesets: GetChangesets_batchChange_changesets;  // The changesets in this batch change that already exist on the code host.
}

export interface GetChangesets {
  batchChange: GetChangesets_batchChange | null;  // Looks up a batch change by namespace and name.
}

export interface GetChangesetsVariables {
  namespace: string;
  name: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SearchNotebookFields
// ====================================================

export interface SearchNotebookFields_stars {
  totalCount: number;  // The total number of notebook stars in the connection.
}

export interface SearchNotebookFields_creator {
  username: string;            // The user's username.
  displayName: string | null;  // The display name chosen by the user.
}

export interface SearchNotebookFields_blocks_SymbolBlock {
  __typename: "SymbolBlock" | "ComputeBlock";
}

export interface SearchNotebookFields_blocks_MarkdownBlock {
  __typename: "MarkdownBlock";
  markdownInput: string;  // Markdown formatted input string.
}

export interface SearchNotebookFields_blocks_QueryBlock {
  __typename: "QueryBlock";
  queryInput: string;  // A Sourcegraph search query string.
}

export interface SearchNotebookFields_blocks_FileBlock_fileInput {
  repositoryName: string;  // Name of the repository, e.g. "github.com/sourcegraph/sourcegraph".
  filePath: string;        // Path within the repository, e.g. "client/web/file.tsx".
}

export interface SearchNotebookFields_blocks_FileBlock {
  __typename: "FileBlock";
  fileInput: SearchNotebookFields_blocks_FileBlock_fileInput;  // File block input.
}

export type SearchNotebookFields_blocks = SearchNotebookFields_blocks_SymbolBlock | SearchNotebookFields_blocks_MarkdownBlock | SearchNotebookFields_blocks_QueryBlock | SearchNotebookFields_blocks_FileBlock;

export interface SearchNotebookFields {
  id: string;                                    // The unique id of the notebook.
  title: string;                                 // The title of the notebook.
  viewerHasStarred: boolean;                     // If current viewer has starred the notebook.
  public: boolean;                               // Public property controls the visibility of the notebook. A public notebook is available to any user on the instance. Private notebooks are only available to their creators.
  stars: SearchNotebookFields_stars;             // Notebook stars.
  creator: SearchNotebookFields_creator | null;  // User that created the notebook or null if the user was removed.
  blocks: SearchNotebookFields_blocks[];         // Array of notebook blocks.
  createdAt: any;                                // Date and time the notebook was created.
  updatedAt: any;                                // Date and time the notebook was last updated.
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BatchChangeFields
// ====================================================

export interface BatchChangeFields_namespace {
  id: string;             // The globally unique ID of this namespace.
  namespaceName: string;  // The name of this namespace's component. For a user, this is the username. For an organization, this is the organization name.
}

export interface BatchChangeFields_creator {
  username: string;            // The user's username.
  displayName: string | null;  // The display name chosen by the user.
}

export interface BatchChangeFields_changesetsStats {
  total: number;   // The count of all changesets.
  merged: number;  // The count of merged changesets.
  open: number;    // The count of open changesets.
  closed: number;  // The count of closed changesets.
  failed: number;  // The count of changesets in failed state.
}

export interface BatchChangeFields {
  id: string;                                          // The unique ID for the batch change.
  url: string;                                         // The URL to this batch change.
  namespace: BatchChangeFields_namespace;              // The namespace where this batch change is defined.
  name: string;                                        // The name of the batch change.
  description: string | null;                          // The description (as Markdown).
  creator: BatchChangeFields_creator | null;           // The user who created the batch change, or null if the user was deleted.
  state: BatchChangeState;                             // The state of the batch change.
  updatedAt: any;                                      // The date and time when the batch change was updated. That can be by applying a spec, or by an internal process. For reading the time the batch change spec was changed last, see lastAppliedAt.
  changesetsStats: BatchChangeFields_changesetsStats;  // Stats on all the changesets that are tracked in this batch change.
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ChangesetFields
// ====================================================

export interface ChangesetFields_HiddenExternalChangeset {
  __typename: "HiddenExternalChangeset";
  id: string;             // The unique ID for the changeset.
  state: ChangesetState;  // The state of the changeset.
  updatedAt: any;         // The date and time when the changeset was updated.
}

export interface ChangesetFields_ExternalChangeset_repository {
  name: string;  // The repository's name, as a path with one or more components. It conventionally consists of the repository's hostname and path (joined by "/"), minus any suffixes (such as ".git"). Examples: - github.com/foo/bar - my-code-host.example.com/myrepo - myrepo
}

export interface ChangesetFields_ExternalChangeset_externalURL {
  url: string;                              // The URL to the resource.
  serviceKind: ExternalServiceKind | null;  // The kind of external service, such as "GITHUB", or null if unknown/unrecognized. This is used solely for displaying an icon that represents the service.
}

export interface ChangesetFields_ExternalChangeset {
  __typename: "ExternalChangeset";
  id: string;                                                         // The unique ID for the changeset.
  state: ChangesetState;                                              // The state of the changeset.
  updatedAt: any;                                                     // The date and time when the changeset was updated.
  repository: ChangesetFields_ExternalChangeset_repository;           // The repository changed by this changeset.
  externalURL: ChangesetFields_ExternalChangeset_externalURL | null;  // The external URL of the changeset on the code host. Not set when changeset state is UNPUBLISHED, externalState is DELETED, or the changeset's data hasn't been synced yet.
  externalID: string | null;                                          // The external ID that uniquely identifies this ExternalChangeset on the code host. For example, on GitHub this is the pull request number. This is only set once the changeset is published on the code host.
  title: string | null;                                               // The title of the changeset, or null if the data hasn't been synced from the code host yet.
  reviewState: ChangesetReviewState | null;                           // The review state of this changeset. This is only set once the changeset is published on the code host.
  checkState: ChangesetCheckState | null;                             // The state of the checks (e.g., for continuous integration) on this changeset, or null if no checks have been configured.
}

export type ChangesetFields = ChangesetFields_HiddenExternalChangeset | ChangesetFields_ExternalChangeset;

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

// NotebooksOrderBy enumerates the ways notebooks can be ordered.
export enum NotebooksOrderBy {
  NOTEBOOK_CREATED_AT = "NOTEBOOK_CREATED_AT",
  NOTEBOOK_STAR_COUNT = "NOTEBOOK_STAR_COUNT",
  NOTEBOOK_UPDATED_AT = "NOTEBOOK_UPDATED_AT",
}

// The state of the batch change.
export enum BatchChangeState {
  CLOSED = "CLOSED",
  DRAFT = "DRAFT",
  OPEN = "OPEN",
}

// The visual state a changeset is currently in.
export enum ChangesetState {
  CLOSED = "CLOSED",
  DELETED = "DELETED",
  DRAFT = "DRAFT",
  FAILED = "FAILED",
  MERGED = "MERGED",
  OPEN = "OPEN",
  PROCESSING = "PROCESSING",
  RETRYING = "RETRYING",
  SCHEDULED = "SCHEDULED",
  UNPUBLISHED = "UNPUBLISHED",
}

// A specific kind of external service.
export enum ExternalServiceKind {
  AWSCODECOMMIT = "AWSCODECOMMIT",
  BITBUCKETCLOUD = "BITBUCKETCLOUD",
  BITBUCKETSERVER = "BITBUCKETSERVER",
  GITHUB = "GITHUB",
  GITLAB = "GITLAB",
  GITOLITE = "GITOLITE",
  JVMPACKAGES = "JVMPACKAGES",
  NPMPACKAGES = "NPMPACKAGES",
  OTHER = "OTHER",
  PAGURE = "PAGURE",
  PERFORCE = "PERFORCE",
  PHABRICATOR = "PHABRICATOR",
}

// The review state of a changeset.
export enum ChangesetReviewState {
  APPROVED = "APPROVED",
  CHANGES_REQUESTED = "CHANGES_REQUESTED",
  COMMENTED = "COMMENTED",
  DISMISSED = "DISMISSED",
  PENDING = "PENDING",
}

// The state of checks (e.g., for continuous integration) on a changeset.
export enum ChangesetCheckState {
  FAILED = "FAILED",
  PASSED = "PASSED",
  PENDING = "PENDING",
}

//==============================================================
// END Enums and Input Objects
//==============================================================