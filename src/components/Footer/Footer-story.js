import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Footer from '../Footer';

const additionalProps = {
  onClick: action('onClick'),
  className: 'some-class',
  labelOne: 'Need Help?',
  linkTextOne: 'Contact Bluemix Sales',
  linkHrefOne: 'www.google.com',
  labelTwo: 'Estimate Monthly Cost',
  linkTextTwo: 'Cost Calculator',
  linkHrefTwo: 'www.google.com',
  buttonText: 'Create',
};

storiesOf('Footer', module)
  .addWithInfo(
    'Default',
    `
      Footer is used on configuration screens.
    `,
    () => <Footer {...additionalProps} />
  )
  .addWithInfo(
    'Custom',
    `
      This footer allows custom elements to be placed inside.
    `,
    () => <Footer className="some-class">This is a test Footer.</Footer>
  );
