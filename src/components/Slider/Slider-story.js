import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Slider from '../Slider';

const mock = action('onChange');

storiesOf('Slider', module)
  .addWithInfo(
    'default',
    `
      Sliders provide a visual indication of adjustable content, where the user can move the handle along a horizontal track to increase or decrease the value.
    `,
    () => (
      <div style={{ marginTop: '2rem' }}>
        <Slider
          id="slider"
          value={50}
          min={0}
          max={100}
          step={1}
          labelText="Slider Label"
          onChange={action('onChange')}
        />
      </div>
    )
  )
  .addWithInfo(
    'without TextInput',
    `
      This example shows the Slider without it's accompanying TextInput. This is an exception and the majority of the time the default state should be used.
    `,
    () => (
      <div style={{ marginTop: '2rem' }}>
        <Slider
          id="slider"
          value={50}
          min={0}
          max={100}
          step={1}
          labelText="Slider Label"
          hideTextInput={true}
          onChange={mock}
        />
      </div>
    )
  )
  .addWithInfo(
    'disabled',
    `
      This example shows the disabled state of the Slider
    `,
    () => (
      <div style={{ marginTop: '2rem' }}>
        <Slider
          id="slider"
          value={50}
          min={0}
          max={100}
          step={1}
          labelText="Slider Label"
          onChange={mock}
          disabled
        />
      </div>
    )
  );
