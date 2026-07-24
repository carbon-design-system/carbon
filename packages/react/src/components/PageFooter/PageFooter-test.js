/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import Button from '../Button';
import { PageFooter as PageFooterDirect } from './';
import { preview_PageFooter as PageFooter } from '../../';

describe('PageFooter', () => {
  it('supports rendering buttons through the `children` prop', () => {
    render(
      <PageFooter>
        <Button>Continue</Button>
      </PageFooter>
    );

    expect(
      screen.getByRole('button', { name: 'Continue' })
    ).toBeInTheDocument();
  });

  it('renders an action group with the page footer and 2xl layout classes', () => {
    render(<PageFooter aria-label="Creation flow actions" />);

    expect(
      screen.getByRole('group', { name: 'Creation flow actions' })
    ).toHaveClass('cds--page-footer', 'cds--layout--size-2xl');
  });

  it('uses a fluid button set for responsive action layout', () => {
    const { container } = render(<PageFooter />);

    expect(
      container.querySelector('.cds--page-footer__button-set')
    ).toHaveClass('cds--btn-set--fluid');
  });

  it('supports a custom className on the outermost element', () => {
    render(<PageFooter className="custom-class" aria-label="Actions" />);

    expect(screen.getByRole('group', { name: 'Actions' })).toHaveClass(
      'custom-class'
    );
  });

  it('spreads additional props onto the outermost element', () => {
    render(<PageFooter data-testid="page-footer" />);

    expect(screen.getByTestId('page-footer')).toBeInTheDocument();
  });

  it('forwards a ref to the outermost element', () => {
    const ref = React.createRef();
    render(<PageFooter ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current.tagName).toBe('DIV');
  });

  it('is exported from the main entrypoint as a preview component', () => {
    expect(PageFooter).toBe(PageFooterDirect);
  });
});
