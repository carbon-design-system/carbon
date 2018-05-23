import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import TextArea from '../TextArea';
import TextAreaSkeleton from '../TextArea/TextArea.Skeleton';

const TextAreaProps = {
  labelText: 'Text Area label',
  className: 'some-class',
  onChange: action('onChange'),
  onClick: action('onClick'),
  placeholder: 'Placeholder text.',
  id: 'test2',
  cols: 50,
  rows: 4,
};

storiesOf('TextArea', module)
  .addWithInfo(
    'enabled',
    `
      Text areas enable the user to interact with and input data. A text area is used when you
      anticipate the user to input more than 1 sentence. The example belows shows an enabled
      Text Area component.
    `,
    () => <TextArea {...TextAreaProps} />
  )
  .addWithInfo(
    'disabled',
    `
      Text areas enable the user to interact with and input data. A text area is used when you
      anticipate the user to input more than 1 sentence. The example belows shows an disabled
      Text Area component.
    `,
    () => <TextArea disabled {...TextAreaProps} placeholder={'Disabled'} />
  )
  .addWithInfo(
    'light',
    `
      Text areas enable the user to interact with and input data. A text area is used when you
      anticipate the user to input more than 1 sentence. The example belows shows an enabled
      Text Area component.
    `,
    () => <TextArea light {...TextAreaProps} />
  )
  .addWithInfo(
    'skeleton',
    `
      Placeholder skeleton state to use when content is loading.
    `,
    () => <TextAreaSkeleton />
  );
