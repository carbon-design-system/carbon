import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import Tour from '../Tour';
import Button from '../Button';

const targets = (
  <>
    <div
      id="one"
      style={{
        position: 'absolute',
        left: 20,
        top: 20,
        background: 'magenta',
        width: 40,
        height: 40,
      }}
    />

    <Button id="two" style={{ position: 'relative', left: 200 }}>
      I am a button!
    </Button>

    <div
      id="three"
      style={{
        position: 'absolute',
        left: 20,
        top: 1800,
        background: 'orange',
        width: 40,
        height: 40,
      }}
    />
  </>
);

const steps = {
  default: () => [
    {
      selector: '#one',
      title: 'Welcome To The Tour',
      description: 'Use this component to point out new or important features.',
    },
    {
      selector: '#two',
      movingTarget: true,
      description: 'You can interact with the elements being highlighted.',
    },
  ],
  scroll: () => [
    {
      selector: '#one',
      title: 'Welcome To The Tour',
      description: 'Use this component to point out new or important features.',
    },
    {
      selector: '#three',
      description: 'You can scroll to ofscreen elements',
    },
  ],
};

storiesOf('Tour', module)
  .add('default', () => (
    <>
      {targets}
      <Tour steps={steps.default()} />
    </>
  ))
  .add('no mask', () => (
    <>
      {targets}
      <Tour steps={steps.default()} disableMask />
    </>
  ))
  .addDecorator(withKnobs)
  .add('with scrolling', () => (
    <>
      {targets}
      <Tour
        steps={steps.scroll()}
        disableAutoScroll={boolean('disable auto scroll', false)}
        disableSmoothScroll={boolean('disable smooth scroll', false)}
      />
    </>
  ))
  .add('hide buttons', () => (
    <>
      {targets}
      <Tour steps={steps.default()} hideClose hidePrev hideNext />
    </>
  ));
