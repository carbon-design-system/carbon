/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { VStack } from '../Stack';
import Toggle from '../Toggle';

export default {
  title: 'Components/Toggle',
  component: Toggle,
};

const CarbonBuilderLink = () => {
  return (
    <>
      <a href="https://builder.carbondesignsystem.com/from-json/%7B%22id%22%3A%22ToggleFragment%22%2C%22title%22%3A%22New%20fragment%22%2C%22data%22%3A%7B%22items%22%3A[%7B%22type%22%3A%22toggle%22%2C%22header%22%3A%22Toggle%22%2C%22offText%22%3A%22Off%22%2C%22onText%22%3A%22On%22%2C%22disabled%22%3Afalse%2C%22checked%22%3Afalse%2C%22size%22%3A%22md%22%2C%22id%22%3A%222%22%2C%22codeContext%22%3A%7B%22name%22%3A%22toggle-2%22%7D%7D]%2C%22id%22%3A1%7D%2C%22allCssClasses%22%3A[]%7D" target="_blank" rel="noreferrer">
        Edit on Carbon UI Builder 
      </a>
      <br></br>
      <br></br>
    </>
  );
};

export const Default = () => (
  <>
    <CarbonBuilderLink></CarbonBuilderLink>
    <Toggle
      labelText="Toggle element label"
      labelA="Off"
      labelB="On"
      defaultToggled
      id="toggle-1"
    />
  </>
);

export const SmallToggle = () => (
  <>
    <CarbonBuilderLink></CarbonBuilderLink>
    <Toggle
      size="sm"
      labelText="Toggle element label"
      labelA="Off"
      labelB="On"
      defaultToggled
      id="toggle-2"
    />
  </>
);

export const Playground = (args) => (
  <><CarbonBuilderLink></CarbonBuilderLink><Toggle labelA="Off" labelB="On" defaultToggled id="toggle-3" {...args} /></>
);

Playground.argTypes = {
  className: {
    control: false,
  },
  defaultToggled: {
    control: false,
  },
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  hideLabel: {
    control: {
      type: 'boolean',
    },
  },
  id: {
    control: false,
  },
  labelA: {
    control: false,
  },
  labelB: {
    control: false,
  },
  labelText: {
    control: false,
  },
  onClick: {
    control: false,
  },
  onToggle: {
    control: false,
  },
  size: {
    size: {
      options: ['sm', 'md'],
      control: { type: 'select' },
    },
  },
};

export const WithAcessibleLabels = () => (
  <>
    <CarbonBuilderLink></CarbonBuilderLink>
    <VStack gap={7}>
      <Toggle id="toggle-4" labelText="Toggle label" />

      <Toggle id="toggle-5" labelText="Toggle label" hideLabel />

      <div>
        <div id="toggle-6-label" style={{ marginBlockEnd: '0.5rem' }}>
          External toggle label
        </div>
        <Toggle id="toggle-6" aria-labelledby="toggle-6-label" hideLabel />
      </div>

      <div>
        <label
          htmlFor="toggle-7"
          style={{ display: 'block', marginBlockEnd: '0.5rem' }}>
          External toggle label
        </label>
        <Toggle id="toggle-7" hideLabel />
      </div>
    </VStack>
  </>
);
