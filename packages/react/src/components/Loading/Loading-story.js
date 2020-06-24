/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import Loading from '../Loading';

const props = () => ({
  active: boolean('Active (active)', true),
  withOverlay: boolean('With overlay (withOverlay)', false),
  small: boolean('Small (small)', false),
  description: text('Description (description)', 'Active loading indicator'),
});

storiesOf('Loading', module)
  .addDecorator(withKnobs)
  .add(
    'Default',
    () => {
      return <Loading {...props()} className={'some-class'} />;
    },
    {
      info: {
        text: `
            Loading spinners are used when retrieving data or performing slow computations,
            and help to notify users that loading is underway. The 'active' property is true by default;
            set to false to end the animation.
          `,
      },
    }
  );
