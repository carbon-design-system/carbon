/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import { sampleDecorator } from '../decorator';

describe('story decorator', () => {
  it('should render a story decorator utility', () => {
    render(sampleDecorator(1));
    expect(screen.getByText('AI Explained'));
    expect(screen.getByLabelText('AI Show information')).toBeInTheDocument();
  });
  it('should render default toggle tip', () => {
    render(sampleDecorator(2));
    expect(screen.getByLabelText('Additional information')).toBeInTheDocument();
  });
  it("should not return anything if an option isn't provided", () => {
    const { container } = render(sampleDecorator());
    expect(container.firstChild).toBeNull();
  });
});
