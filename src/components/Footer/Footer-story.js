import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text } from '@storybook/addon-knobs';
import Footer from '../Footer';

const props = () => ({
  className: text('CSS class name (className)', 'some-class'),
  labelOne: text('Label in the 1st item (labelOne)', 'Need Help?'),
  linkTextOne: text(
    'Link text in the 1st item (linkTextOne)',
    'Contact Bluemix Sales'
  ),
  linkHrefOne: text(
    'Link href in the 1st item (linkHrefOne)',
    'www.google.com'
  ),
  labelTwo: text('Label in the 1st item (labelTwo)', 'Estimate Monthly Cost'),
  linkTextTwo: text('Label in the 1st item (linkTextTwo)', 'Cost Calculator'),
  linkHrefTwo: text(
    'Link href in the 2nd item (linkHrefTwo)',
    'www.google.com'
  ),
  buttonText: text('Button text (buttonText)', 'Create'),
  onClick: action('onClick'),
});

storiesOf('Footer', module)
  .addDecorator(withKnobs)
  .add(
    'Default',
    withInfo({
      text: 'Footer is used on configuration screens.',
    })(() => <Footer {...props()}>{text('Footer text', '')}</Footer>)
  );
