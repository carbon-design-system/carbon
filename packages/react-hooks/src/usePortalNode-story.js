/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { storiesOf } from '@storybook/react';
import React from 'react';
import { createPortal } from 'react-dom';
import { usePortalNode } from './';

storiesOf('usePortalNode', module)
  .add('default', () => {
    function DemoComponent() {
      const node = usePortalNode();
      return node && createPortal('Inside a portal!', node);
    }

    return <DemoComponent />;
  })
  .add('with id', () => {
    function DemoComponent() {
      const node = usePortalNode('portal-root');
      return (
        node &&
        createPortal(
          <>
            Inside a portal with id <code>#portal-root</code>
          </>,
          node
        )
      );
    }

    return <DemoComponent />;
  });
