import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, boolean, number, text } from '@storybook/addon-knobs';
import InlineLoading from '../InlineLoading';

const props = () => ({
  success: boolean('Loading successful state (success)', false),
  description: text(
    'Loading progress description (description)',
    'Loading data...'
  ),
  successDelay: number(
    'The duration for successful state before `onSuccess` fires (successDelay)',
    1500
  ),
  onSuccess: action('onSuccess'),
});

storiesOf('InlineLoading', module)
  .addDecorator(withKnobs)
  .add(
    'Inline loading',
    withInfo({
      text: `
        Inline Loading spinners are used when create, updating, or deleting an item.
        They help notify users that their change is underway. Inline Loading has three states, LOADING, SUCCESS.
      `,
    })(() => (
      <div>
        <InlineLoading {...props()} />
      </div>
    ))
  );
