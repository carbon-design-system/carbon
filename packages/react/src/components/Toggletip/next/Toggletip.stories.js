/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Information16 } from '@carbon/icons-react';
import React from 'react';
import { IconButton } from '../../IconButton';
import {
  Toggletip,
  ToggletipButton,
  ToggletipContent,
  useToggletip,
} from '../../Toggletip';
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
      table: { disable: true },
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
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Toggletip defaultOpen>
        <ToggletipButton>
          <IconButton>
            <Information16 />
          </IconButton>
        </ToggletipButton>
        <ToggletipContent>
          <p>
            Ipsum voluptatum mollitia mollitia nobis cupiditate quaerat eum?
            Quam impedit a culpa minus necessitatibus.
          </p>
          <div className="cds--toggletip-actions">
            <a href="#">Link</a>
            <button>Button</button>
          </div>
        </ToggletipContent>
      </Toggletip>
    </div>
  );
};

export const ProfileMenu = () => {
  return 'TODO';
};

export const InlineEdit = () => {
  return 'TODO';
};

export const FilterMenu = () => {
  return 'TODO';
};

export const Hook = () => {
  function Example() {
    const { buttonProps, contentProps, state } = useToggletip({
      defaultOpen: true,
    });

    return (
      <>
        <button type="button" {...buttonProps}>
          Info
        </button>
        <div hidden={!state.open} {...contentProps}>
          <div style={{ border: '1px solid black' }}>
            Content
            <button>inner</button>
          </div>
        </div>
        <button>Outside</button>
      </>
    );
  }

  return <Example />;
};
