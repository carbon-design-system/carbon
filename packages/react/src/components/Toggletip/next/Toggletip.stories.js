/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Information16 } from '@carbon/icons-react';
import React from 'react';
import { IconButton } from '../../IconButton';
import { Toggletip, ToggletipButton, ToggletipContent } from '../../Toggletip';
import mdx from './Toggletip.mdx';

export default {
  title: 'Components/Toggletip',
  component: Toggletip,
  subcomponents: {
    ToggletipButton,
    ToggletipContent,
  },
  argTypes: {
    as: {
      table: {
        disable: true,
      },
    },
    children: {
      table: {
        disable: true,
      },
    },
    className: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => {
  return (
    <Toggletip>
      <ToggletipButton>
        <IconButton>
          <Information16 />
        </IconButton>
      </ToggletipButton>
      <ToggletipContent>Test content</ToggletipContent>
    </Toggletip>
  );
};
