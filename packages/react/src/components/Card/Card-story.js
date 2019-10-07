/* eslint-disable no-console */

import { storiesOf } from '@storybook/react';
import readme from './README.md';
import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs';
import { withReadme } from 'storybook-readme';
const readmeURL = 'https://bit.ly/2Z9PGsC';
const props = () => ({
  default: () => {
    return {
      onClick: action('onClick'),
      onFocus: action('onFocus'),
      className: text('class name', 'some-class'),
      // iconName: text('icon name', 'Add16'),
      description: text('description', 'description'),
    };
  },
});

storiesOf('Card', module)
  .addDecorator(withKnobs)
  .add(
    'card',
    withReadme(readme, () => require('./stories/default').default(props())),
    {
      info: {
        /* eslint-disable no-useless-escape */
        text: `
        Cards provide an at-a glance preview of the content they link to and frequently contain
        easily-consumable content. The example below shows an empty card. Create Card Content, Card Footer,
        Card Status and Card Actions components to add content to your card.
          You can find more detailed information surrounding usage of this component
          at the following url: ${readmeURL}
        `,
        /* eslint-enable no-useless-escape */
      },
    }
  );
