/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { DisplayBox } from '../DisplayBox';

const content = 'default content';
const DefaultStory = () => <div>{content}</div>;
describe('DisplayBox', () => {
  it('should render default display box', () => {
    const { container } = render(
      <DisplayBox>
        <DefaultStory />
      </DisplayBox>
    );
    const blockClass = 'ccs-sb--display-box';
    expect(container.firstChild).toHaveClass(blockClass);
    screen.getByText(/width available to component/);
    screen.getByText(/use containerWidth control to adjust/);
  });
  it('should render message if provided', () => {
    const message = 'Custom message';
    render(
      <DisplayBox msg={message}>
        <DefaultStory />
      </DisplayBox>
    );
    screen.getByText(message);
  });
});
