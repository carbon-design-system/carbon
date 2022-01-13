/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Tag } from 'carbon-components-react';

export default {
  title: 'Components/Tag',
  parameters: {
    component: Tag,
  },
};

export const Default = () => {
  return (
    <>
      <Tag className="some-class" type="red" size="sm" title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="magenta" size="sm" title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="purple" size="sm" title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="blue" size="sm" title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="cyan" size="sm" title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="teal" size="sm" title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="green" size="sm" title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="gray" size="sm" title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag
        className="some-class"
        type="cool-gray"
        size="sm"
        title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag
        className="some-class"
        type="warm-gray"
        size="sm"
        title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag
        className="some-class"
        type="high-contrast"
        size="sm"
        title="Clear Filter">
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="outline" size="sm" title="Clear Filter">
        {'Tag content'}
      </Tag>
    </>
  );
};
