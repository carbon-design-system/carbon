/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export type TokenProperties = string[];

export type TokenDefinition = {
  name: string;
  properties?: TokenProperties;
  state?: string;
};

export type TokenContext = {
  groups?: string[];
  properties?: TokenProperties;
};

export type ResolvedToken = TokenDefinition & {
  groups: string[];
};

export type TokenMetadata = {
  name: string;
  type: 'color' | 'layout' | 'type';
};
