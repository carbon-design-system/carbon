/**
 * Copyright IBM Corp. 2018, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * A token set is a collection of tokens which should be along with each other.
 * For example, we have tokens that correspond to a layer level in a UI. A
 * token set allows us to group these tokens together in a way that's different
 * than their token group.
 */
import { Token } from './Token';

type TokenSetChild = Token | TokenSet;

type TokenSetDefinition = {
  name: string;
  tokens?: TokenSetChild[];
};

export class TokenSet {
  kind: 'TokenSet';
  name: string;
  children: TokenSetChild[];

  static create({ name, tokens = [] }: TokenSetDefinition) {
    return new TokenSet(name, tokens);
  }

  constructor(name: string, tokens: TokenSetChild[]) {
    this.kind = 'TokenSet';
    this.name = name;
    this.children = tokens;
  }

  *[Symbol.iterator](): Generator<TokenSetChild, void, unknown> {
    for (const child of this.children) {
      yield child;

      if (child.kind === 'TokenSet') {
        yield* child;
      }
    }
  }

  getTokenSets(): TokenSet[] {
    const children = this.children
      .filter((child) => {
        return child.kind === 'TokenSet';
      })
      .flatMap((child) => {
        return child.getTokenSets();
      });

    return [this, ...children];
  }

  getTokenSet(name: string) {
    for (const child of this) {
      // TODO: Is this code necessary given the old code was invalid?
      if (child.kind !== 'TokenSet') {
        continue;
      }

      if (child.name === name) {
        return child;
      }
    }

    return null;
  }

  hasToken(tokenOrName: Token | string) {
    const name =
      typeof tokenOrName === 'string' ? tokenOrName : tokenOrName.name;

    for (const child of this) {
      if (child.kind === 'TokenSet') {
        continue;
      }

      if (child.name === name) {
        return true;
      }
    }

    return false;
  }
}
