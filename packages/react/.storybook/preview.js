/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { addDecorator, addParameters } from '@storybook/react';
import addons from '@storybook/addons';
import { themes } from '@storybook/theming';
import { configureActions } from '@storybook/addon-actions';
import { CARBON_CURRENT_THEME, CARBON_TYPE_TOKEN } from './shared';
import Container from './Container';
import carbonTheme from './theme';

const customPropertyPrefix = 'cds';

addParameters({
  options: {
    theme: carbonTheme,
    showRoots: true,
    /**
     * We sort our stories by default alphabetically, however there are specific
     * keywords that will be sorted further down the sidebar, including
     * "playground" and "unstable" stories.
     */
    storySort: (storyA, storyB) => {
      // By default, sort by the story "kind". The "kind" refers to the
      // top-level title of the story, either through Component Story Format
      // with the default export, or the `storiesOf('kind', module)` format
      if (storyA[1].kind !== storyB[1].kind) {
        return storyA[1].kind.localeCompare(storyB[1].kind);
      }

      const idA = storyA[0];
      const idB = storyB[0];

      // To story the stories, we first build up a list of matches based on
      // keywords. Each keyword has a specific weight that will be used to
      // determine order later on.
      const UNKNOWN_KEYWORD = 3;
      const keywords = new Map([
        ['welcome', 0],
        ['default', 1],
        ['usage', 2],
        ['playground', 4],
        ['development', 5],
        ['deprecated', 6],
        ['unstable', 7],
      ]);
      const matches = new Map();

      // We use this list of keywords to determine a collection of matches. By
      // default, we will look for the greatest valued matched
      for (const [keyword, weight] of keywords) {
        // If we already have a match for a given id that is greater than the
        // specific keyword we're looking for, break early
        if (matches.get(idA) > weight || matches.get(idB) > weight) {
          break;
        }

        // If we don't have a match already for either id, we check to see if
        // the id includes the keyword and assigns the relevant weight, if so
        if (idA.includes(keyword)) {
          matches.set(idA, weight);
        }

        if (idB.includes(keyword)) {
          matches.set(idB, weight);
        }
      }

      // If we have matches for either id, then we will compare the ids based on
      // the weight assigned to the matching keyword
      if (matches.size > 0) {
        const weightA = matches.get(idA) ?? UNKNOWN_KEYWORD;
        const weightB = matches.get(idB) ?? UNKNOWN_KEYWORD;
        // If we have the same weight for the ids, then we should compare them
        // using locale compare instead of by weight
        if (weightA === weightB) {
          return idA.localeCompare(idB);
        }
        return weightA - weightB;
      }

      // By default, if we have no matches we'll do a locale compare between the
      // two ids
      return idA.localeCompare(idB);
    },
  },
});

configureActions({
  depth: 3,
  limit: 10,
});

addDecorator((story, i) => {
  return (
    <Container id={`container-${story().type?.displayName}`} story={story} />
  );
});

addons.getChannel().on(CARBON_CURRENT_THEME, (theme) => {
  document.documentElement.setAttribute('storybook-carbon-theme', theme);
});

addons.getChannel().on(CARBON_TYPE_TOKEN, ({ tokenName, tokenValue }) => {
  const root = document.documentElement;
  const [fontSize, lineHeight] = tokenValue.split('-');
  const rem = (px) =>
    `${
      px / parseFloat(getComputedStyle(document.documentElement).fontSize)
    }rem`;
  root.style.setProperty(
    `--${customPropertyPrefix}-${tokenName}-font-size`,
    rem(fontSize)
  );
  root.style.setProperty(
    `--${customPropertyPrefix}-${tokenName}-line-height`,
    rem(lineHeight)
  );
});
