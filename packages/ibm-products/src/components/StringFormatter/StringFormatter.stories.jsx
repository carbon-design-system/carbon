/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
// TODO: import action to handle events if required.
// import { action } from 'storybook/actions';

import { StringFormatter } from '.';
import mdx from './StringFormatter.mdx';

import styles from './_storybook-styles.scss?inline';
import { Wrap } from '../../global/js/utils/Wrap';
import { Annotation } from '../../../.storybook/Annotation';

export default {
  title: 'Deprecated/StringFormatter',
  component: StringFormatter,
  tags: ['autodocs'],
  // TODO: Define argTypes for props not represented by standard JS types.
  argTypes: {
    element: {
      description:
        'this is a story only prop to showcase the usage of this component in various html tags',
      options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      control: { type: 'select' },
    },
  },
  parameters: {
    styles,
    chromatic: { disableSnapshot: true },
    docs: {
      page: mdx,
    },
    layout: 'fullscreen',
  },
  decorators: [
    (story) => (
      <div>
        <Annotation
          type="deprecation-notice"
          text={
            <div>
              This component is deprecated and will be removed in the next major
              version. Please migrate to {/* cspell:disable-next-line */}
              <a href="/?path=/docs/utilities-truncatedtext--overview">
                TruncatedText
              </a>
              .
            </div>
          }
        >
          {story()}
        </Annotation>
      </div>
    ),
  ],
};

/**
 * TODO: Declare template(s) for one or more scenarios.
 */
const Template = ({ element, ...stringFormatterProps }) => {
  return (
    <Wrap element={element}>
      <StringFormatter
        className="storyStringFormatter"
        // TODO: handle events with action or local handler.
        // onTodo={action('onTodo log action')}
        {...stringFormatterProps}
      />
    </Wrap>
  );
};

const valueStr =
  'Buttons are used to initialize an action, either in the background or foreground of an experience. There are several kinds of buttons. Primary buttons should be used for the principle call to action on the page. Secondary buttons should be used for secondary actions on each page. Danger buttons should be used for a negative action (such as Delete) on the page. Modify the behavior of the button by changing its event properties. Small buttons may be used when there is not enough space for a regular sized button. This issue is most found in tables. Small button should have three words or less. When words are not enough, icons can be used in buttons to better communicate what the button does. Icons are always paired with text.';

/**
 * TODO: Declare one or more stories, generally one per design scenario.
 * NB no need for a 'Playground' because all stories have all controls anyway.
 */
export const stringFormatter = Template.bind({});
stringFormatter.args = {
  autoAlign: false,
  lines: 1,
  truncate: true,
  value: valueStr,
  width: '200px',
  tooltipDirection: 'bottom-left',
  element: 'p',
};
