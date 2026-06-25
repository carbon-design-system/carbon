/**
 * Copyright IBM Corp. 2023, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useEffect } from '@storybook/preview-api';
import { PARAM_KEY } from '../constants';

export const withCarbonTheme = (StoryFn, context) => {
  const { globals, parameters } = context;

  const globalCarbonTheme = globals[PARAM_KEY];
  const storyCarbonTheme = parameters[PARAM_KEY];

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const selector =
      context.viewMode === 'docs'
        ? `.sbdocs-preview .docs-story`
        : '.sb-show-main';

    const rootElements = document.querySelectorAll(selector);
    rootElements.forEach((rootElement) => {
      rootElement.setAttribute(
        'data-carbon-theme',
        globalCarbonTheme ?? storyCarbonTheme
      );
    });
  }, [context.id, context.viewMode, globalCarbonTheme, storyCarbonTheme]);

  return StoryFn();
};
