/**
 * @license
 *
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { generateBreadcrumbs } from '../../../examples/set-of-breadcrumbs/src/example-data';
import '../../../examples/set-of-breadcrumbs/src';
import styles from './story-styles.scss?lit';

const argTypes = {
  breadcrumbsCount: {
    control: { type: 'number' },
    description: 'Number of breadcrumbs to display',
  },
};

const defaultProps = {
  breadcrumbsCount: 7,
};

const renderBreadcrumbsTemplate = (args) => {
  const { breadcrumbsCount } = args;
  const breadcrumbsData = generateBreadcrumbs({
    count: breadcrumbsCount,
  });

  return html`
    <style>
      ${styles}
    </style>
    <div class="example">
      <div class="annotation parent">
        <div class="annotation__label">Parent container</div>
        <div class="annotation__content">
          <set-of-breadcrumbs
            .breadcrumbsData=${breadcrumbsData}
          ></set-of-breadcrumbs>
        </div>
      </div>
    </div>
  `;
};

export const SetOfBreadcrumbs = {
  args: {
    ...defaultProps,
  },
  argTypes,
  render: renderBreadcrumbsTemplate,
};

const meta = {
  title: 'Patterns/Item overflow',
};

export default meta;
