/**
 * Copyright IBM Corp. 2023, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * For "as" props.  Creates an "as" property that supports native html tags such as 'span', 'a', 'button' as well as custom functional components
 * All native props for the supplied html tag/component are inferred as part of the base component props, allowing us to use props like `href` on an 'a' element etc
 */
export type PolymorphicProps<Element extends React.ElementType, Props> = Props &
  Omit<React.ComponentProps<Element>, 'as'> & {
    as?: Element;
  };

export interface TranslateWithId<MID = string, ARGS = Record<string, unknown>> {
  /**
   * Translates component strings using your i18n tool.
   *
   * @param messageId - The translation ID for the string to translate.
   * @param [args] - Arguments for string interpolation.
   * @returns The translated string.
   */
  translateWithId?(messageId: MID, args?: ARGS): string;
}

export type TFunc<K, A = Record<string, unknown>> = NonNullable<
  TranslateWithId<K, A>['translateWithId']
>;
