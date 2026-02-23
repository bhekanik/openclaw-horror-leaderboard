/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as admin from "../admin.js";
import type * as auth from "../auth.js";
import type * as commentVotes from "../commentVotes.js";
import type * as comments from "../comments.js";
import type * as http from "../http.js";
import type * as lib_badges from "../lib/badges.js";
import type * as lib_moderation from "../lib/moderation.js";
import type * as lib_scoring from "../lib/scoring.js";
import type * as receipts from "../receipts.js";
import type * as reports from "../reports.js";
import type * as seed from "../seed.js";
import type * as stories from "../stories.js";
import type * as users from "../users.js";
import type * as votes from "../votes.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  admin: typeof admin;
  auth: typeof auth;
  commentVotes: typeof commentVotes;
  comments: typeof comments;
  http: typeof http;
  "lib/badges": typeof lib_badges;
  "lib/moderation": typeof lib_moderation;
  "lib/scoring": typeof lib_scoring;
  receipts: typeof receipts;
  reports: typeof reports;
  seed: typeof seed;
  stories: typeof stories;
  users: typeof users;
  votes: typeof votes;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
