/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import 'carbon-components/scss/components/link/_link.scss';
import { Download16 } from '@carbon/icons-react';

import React from 'react';
import { mount } from '@cypress/react';
import Link from '../Link';

describe('Link', () => {
  beforeEach(() => {
    mount(
      <>
        <Link href="http://www.carbondesignsystem.com">Link</Link>
        <Link href="http://www.carbondesignsystem.com" renderIcon={Download16}>
          Download
        </Link>
      </>
    );
  });

  it('should render', () => {
    cy.findByText(/Link/).should('be.visible');

    // snapshots should always be taken _after_ an assertion that
    // a element/component should be visible. This is to ensure
    // the DOM has settled and the element has fully loaded.
    cy.percySnapshot();
  });
});
