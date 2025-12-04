/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { IdPrefix } from '.';
import { useIdPrefix } from '../../internal/useIdPrefix';
import mdx from './IdPrefix.mdx';

export default {
  title: 'Components/IdPrefix',
  component: IdPrefix,
  parameters: {
    docs: {
      page: mdx,
    },
  },
  args: {
    theme: 'g10',
  },
  argTypes: {
    theme: {
      options: ['white', 'g10', 'g90', 'g100'],
      control: { type: 'select' },
      description: 'The theme to apply to the component.',
    },
  },
};

export const Default = () => {
  function ExampleComponent() {
    const idPrefix = useIdPrefix();
    return <p>The current id prefix is: {idPrefix}</p>;
  }

  return (
    <>
      <ExampleComponent />
      <IdPrefix prefix="custom">
        <ExampleComponent />
      </IdPrefix>
    </>
  );
};
