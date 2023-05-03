/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { ClassPrefix } from '../ClassPrefix';
import { usePrefix } from '../../internal/usePrefix';
import mdx from './ClassPrefix.mdx';

export default {
  title: 'Components/ClassPrefix',
  component: ClassPrefix,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => {
  function ExampleComponent() {
    const prefix = usePrefix();
    return <p>The current prefix is: {prefix}</p>;
  }

  return (
    <>
      <ExampleComponent />
      <ClassPrefix prefix="custom">
        <ExampleComponent />
      </ClassPrefix>
    </>
  );
};
