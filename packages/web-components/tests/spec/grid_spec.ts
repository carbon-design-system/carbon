/**
 * Copyright IBM Corp. 2019, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit';
import { Default } from '../../src/components/grid/grid.stories';

const template = (props?) =>
  Default({
    ...props,
  });

describe('cds-grid', () => {
  describe('Rendering', () => {
    it('Should render with minimum attributes', async () => {
      render(template({}), document.body);
      await Promise.resolve();
      const grid = document.body.querySelector('cds-grid');
      expect(grid).toBeTruthy();
    });

    it('Should render with condensed mode', async () => {
      render(
        template({
          condensed: true,
        }),
        document.body
      );
      await Promise.resolve();
      const grid = document.body.querySelector('cds-grid');
      expect(grid?.hasAttribute('condensed')).toBe(true);
    });

    it('Should render with narrow mode', async () => {
      render(
        template({
          narrow: true,
        }),
        document.body
      );
      await Promise.resolve();
      const grid = document.body.querySelector('cds-grid');
      expect(grid?.hasAttribute('narrow')).toBe(true);
    });

    it('Should render with full-width mode', async () => {
      render(
        template({
          fullWidth: true,
        }),
        document.body
      );
      await Promise.resolve();
      const grid = document.body.querySelector('cds-grid');
      expect(grid?.hasAttribute('full-width')).toBe(true);
    });
  });

  describe('V12 Feature Flag', () => {
    it('Should render with no-row-gap attribute', async () => {
      render(
        html`
          <feature-flags enable-css-grid-v12>
            <cds-grid no-row-gap>
              <cds-column sm="4"></cds-column>
              <cds-column sm="4"></cds-column>
            </cds-grid>
          </feature-flags>
        `,
        document.body
      );
      await Promise.resolve();
      const grid = document.body.querySelector('cds-grid');
      expect(grid?.hasAttribute('no-row-gap')).toBe(true);
    });

    it('Should apply v12 class when feature flag is enabled', async () => {
      render(
        html`
          <feature-flags enable-css-grid-v12>
            <cds-grid>
              <cds-column sm="4"></cds-column>
            </cds-grid>
          </feature-flags>
        `,
        document.body
      );
      await Promise.resolve();
      const grid = document.body.querySelector('cds-grid');
      expect(grid?.classList.contains('cds--css-grid--v12')).toBe(true);
    });

    it('Should apply no-row-gap class when attribute is set', async () => {
      render(
        html`
          <feature-flags enable-css-grid-v12>
            <cds-grid no-row-gap>
              <cds-column sm="4"></cds-column>
            </cds-grid>
          </feature-flags>
        `,
        document.body
      );
      await Promise.resolve();
      const grid = document.body.querySelector('cds-grid');
      expect(grid?.classList.contains('cds--css-grid--v12--no-row-gap')).toBe(
        true
      );
    });

    it('Should work with narrow mode in v12', async () => {
      render(
        html`
          <feature-flags enable-css-grid-v12>
            <cds-grid narrow>
              <cds-column sm="4"></cds-column>
            </cds-grid>
          </feature-flags>
        `,
        document.body
      );
      await Promise.resolve();
      const grid = document.body.querySelector('cds-grid');
      expect(grid?.classList.contains('cds--css-grid--v12')).toBe(true);
      expect(grid?.classList.contains('cds--css-grid--narrow')).toBe(true);
    });

    it('Should work with condensed mode in v12', async () => {
      render(
        html`
          <feature-flags enable-css-grid-v12>
            <cds-grid condensed>
              <cds-column sm="4"></cds-column>
            </cds-grid>
          </feature-flags>
        `,
        document.body
      );
      await Promise.resolve();
      const grid = document.body.querySelector('cds-grid');
      expect(grid?.classList.contains('cds--css-grid--v12')).toBe(true);
      expect(grid?.classList.contains('cds--css-grid--condensed')).toBe(true);
    });
  });

  describe('Column rendering', () => {
    it('Should render columns with span attributes', async () => {
      render(
        html`
          <cds-grid>
            <cds-column sm="2" md="4" lg="6"></cds-column>
            <cds-column sm="2" md="4" lg="10"></cds-column>
          </cds-grid>
        `,
        document.body
      );
      await Promise.resolve();
      const columns = document.body.querySelectorAll('cds-column');
      expect(columns.length).toBe(2);
      expect(columns[0].getAttribute('sm')).toBe('2');
      expect(columns[0].getAttribute('md')).toBe('4');
      expect(columns[0].getAttribute('lg')).toBe('6');
    });
  });
});

// Made with Bob
