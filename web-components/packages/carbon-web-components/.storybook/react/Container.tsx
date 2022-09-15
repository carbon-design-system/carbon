/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { StrictMode, ReactNode } from 'react';
// Below path will be there when an application installs `carbon-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import BXSkipToContent from 'carbon-web-components/es/components-react/skip-to-content/skip-to-content';
import containerStyles from '../_container.scss'; // eslint-disable-line import/first

/**
 * The content that wraps the story.
 */
const Container = ({ hasMainTag, children }: { hasMainTag?: boolean; children: ReactNode }) => (
  <StrictMode>
    <style>{containerStyles.cssText}</style>
    <BXSkipToContent href="#main-content" />
    <div
      id="main-content"
      data-floating-menu-container
      role={hasMainTag ? 'none' : 'main'}
      className="bx--body bx-ce-demo-devenv--container">
      {children}
    </div>
  </StrictMode>
);

Container.propTypes = {
  /**
   * `true` if the story itself has `<main>` tag.
   */
  hasMainTag: PropTypes.bool,
};

export default Container;
