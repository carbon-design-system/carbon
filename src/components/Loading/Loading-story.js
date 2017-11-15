import React from 'react';
import { storiesOf } from '@storybook/react';
import Loading from '../Loading';

const loadingProps = {
  active: true,
  className: 'some-class',
};

storiesOf('Loading', module)
  .addWithInfo(
    'Loading with overlay',
    `
      Loading spinners are used when retrieving data or performing slow computations,
      and help to notify users that loading is underway. The 'active' property is true by default;
      set to false to end the animation.
    `,
    () => <Loading {...loadingProps} />
  )
  .addWithInfo(
    'Loading without overlay',
    `
      Loading spinners are used when retrieving data or performing slow computations,
      and help to notify users that loading is underway. The 'active' property is true by default;
      set to false to end the animation.
    `,
    () => <Loading {...loadingProps} withOverlay={false} />
  )
  .addWithInfo(
    'Small loading',
    `
      Loading spinners are used when retrieving data or performing slow computations,
      and help to notify users that loading is underway. The 'active' property is true by default;
      set to false to end the animation.
    `,
    () => <Loading {...loadingProps} small={true} withOverlay={false} />
  );
