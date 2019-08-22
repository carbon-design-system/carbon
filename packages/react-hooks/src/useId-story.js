/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { storiesOf } from '@storybook/react';
import React from 'react';
import { useId } from './';

storiesOf('useId', module)
  .add('default', () => {
    function DemoComponent() {
      const id = useId();
      return (
        <div id={id}>
          This node has an <code>id</code> of {id}
        </div>
      );
    }
    return <DemoComponent />;
  })
  .add('with prefix', () => {
    function List({ children }) {
      const id = useId('list');
      return <ul id={id}>{children}</ul>;
    }

    function ListItem() {
      const id = useId('list-item');
      return (
        <li id={id}>
          List item <code>{id}</code>
        </li>
      );
    }

    return (
      <List>
        <ListItem />
        <ListItem />
        <ListItem />
      </List>
    );
  });
