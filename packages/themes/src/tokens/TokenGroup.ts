/**
 * Copyright IBM Corp. 2018, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Token } from './Token';
import type {
  ResolvedToken,
  TokenContext,
  TokenDefinition,
  TokenProperties,
} from './types';

type TokenGroupChild = Token | TokenGroup;

type TokenGroupDefinition = {
  name: string;
  properties?: TokenProperties;
  tokens?: Array<Token | TokenDefinition | TokenGroup | string>;
};

/**
 * A TokenGroup allows us to group up a collection of tokens and nested token
 * groups. A group allows us to colocate related tokens and write information
 * once that applies to the entire collection of tokens. For example, if all the
 * tokens apply to the `border` color property then we can specify this property
 * at the group level
 *
 * A TokenGroup allows us to colocate all this information while also providing
 * ways to get information about the entire group, including properties and
 * states
 */
export class TokenGroup {
  kind: 'TokenGroup';
  name: string;
  properties?: TokenProperties;
  children: TokenGroupChild[];

  static create({ name, properties, tokens = [] }: TokenGroupDefinition) {
    return new TokenGroup(name, tokens, properties);
  }

  constructor(
    name: string,
    tokens: Array<Token | TokenDefinition | TokenGroup | string>,
    properties?: TokenProperties
  ) {
    this.kind = 'TokenGroup';
    this.name = name;

    if (properties) {
      this.properties = properties;
    }

    this.children = tokens.map((child) => {
      if (
        typeof child !== 'string' &&
        'kind' in child &&
        child.kind === 'TokenGroup'
      ) {
        return child;
      }

      return Token.create(child);
    });
  }

  *[Symbol.iterator](): Generator<TokenGroupChild, void, unknown> {
    yield this;

    for (const child of this.children) {
      yield child;

      if (child.kind === 'TokenGroup') {
        yield* child;
      }
    }
  }

  /**
   * Get all the tokens available in every Token Group in this TokenGroup,
   * including itself.
   */
  getTokens(parentContext: TokenContext = {}): ResolvedToken[] {
    const context = {
      ...parentContext,
      groups: parentContext.groups
        ? parentContext.groups.concat(this.name)
        : [this.name],
      properties: this.properties || parentContext.properties,
    };

    return this.children.flatMap((child) => {
      if (child.kind === 'TokenGroup') {
        return child.getTokens(context);
      }

      const token: ResolvedToken = {
        ...context,
        name: child.name,
        properties: child.properties || context.properties,
      };

      if (child.state) {
        token.state = child.state;
      }

      return token;
    });
  }

  /**
   * Get a specific token from the TokenGroup, or form one of its nested
   * TokenGroups
   */
  getToken(tokenOrName: Token | string): Token | null {
    const name =
      typeof tokenOrName === 'string' ? tokenOrName : tokenOrName.name;
    for (const child of this) {
      if (child.kind === 'TokenGroup') {
        continue;
      }

      if (child.name === name) {
        return child;
      }
    }
    return null;
  }

  /**
   * Get all the unique groups in the token group, including this group
   */
  getTokenGroups() {
    const set = new Set<TokenGroup>();

    for (const child of this) {
      if (child.kind !== 'TokenGroup') {
        continue;
      }
      set.add(child);
    }

    return Array.from(set);
  }

  /**
   * Get all the unique properties in the token group, including this group
   */
  getTokenProperties() {
    const set = new Set<string>();

    for (const child of this) {
      if (!Array.isArray(child.properties)) {
        continue;
      }

      for (const property of child.properties) {
        set.add(property);
      }
    }

    return Array.from(set);
  }

  /**
   * Get all the unique states in the token group, including this group
   */
  getTokenStates() {
    const set = new Set<string>();

    for (const child of this) {
      if (child.kind !== 'Token') {
        continue;
      }
      if (child.state) {
        set.add(child.state);
      }
    }

    return Array.from(set);
  }
}
