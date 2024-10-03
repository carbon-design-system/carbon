/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { StaticNotification } from '../../Notification';
import { Link } from '../../Link';
import { CodeSnippet } from '../../CodeSnippet';
import mdx from './StaticNotification.mdx';

export default {
  title: 'Experimental/unstable__StaticNotification',
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => (
  <>
    <StaticNotification title="StaticNotification has been renamed to Callout" />

    <div style={{ marginLeft: '.5rem', marginTop: '2rem' }}>
      <p style={{ marginBottom: '1rem' }}>
        Run the following codemod to automatically update usages in your
        project:
      </p>
      <CodeSnippet type="single" feedback="Copied to clipboard">
        npx @carbon/upgrade migrate refactor-to-callout --write
      </CodeSnippet>
    </div>
  </>
);
