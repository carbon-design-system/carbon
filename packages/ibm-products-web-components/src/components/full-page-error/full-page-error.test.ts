/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { describe, it, expect } from 'vitest';
import { fixture, html, expect as owcExpect } from '@open-wc/testing';
import { render } from 'lit';
import { Kind } from './types';
import CDSFullPageError, { blockClass } from './full-page-error';

const defaultProps = {
  class: 'custom-class',
  label: 'Error ###',
  title: '[Error title]',
  description: 'This is a description',
  kind: Kind.Custom,
  children: html`
    <a class="cds--link" href="#">– Forwarding link 1</a>
    <br />
    <a class="cds--link" href="#">– Forwarding link 2</a>
  `,
};

const template = (props: any = defaultProps) => html`
  <c4p-full-page-error
    label=${props.label}
    class=${props.class}
    title=${props.title}
    description=${props.description}
    kind=${props.kind}
  >
    ${props.children}
  </c4p-full-page-error>
`;

const elementName = 'c4p-full-page-error';

describe(elementName, () => {
  it('should render full page error', async () => {
    const element = render(template(), document.body);
    expect(element).toBeDefined();
  });

  // Can't figure out how to check a11y with vitest, using open-wc chai dom functions for now
  it.skip('has no accessibility violations', async () => {
    const element = await fixture(template());
    owcExpect(element).to.be.accessible();
  });

  it('should render children content', async () => {
    const childNode = `<p>hello</p>`;
    const element = await fixture(
      template({ ...defaultProps, children: childNode })
    );

    expect(element.textContent?.includes(childNode)).toBe(true);
  });

  it('applies a class to the containing node', async () => {
    const className = 'a-test-class';
    const element = await fixture(
      template({ ...defaultProps, class: className })
    );

    expect(element.hasAttribute('class')).toBe(true);
  });

  it('renders an error label', async () => {
    const element: CDSFullPageError = await fixture(template());

    expect(element.label).toBe(defaultProps.label);
    expect(
      element.shadowRoot
        ?.querySelector(`.${blockClass}__label`)
        ?.textContent?.includes(defaultProps.label)
    ).toBeTruthy();
  });

  it('renders a description', async () => {
    const element: CDSFullPageError = await fixture(template());

    expect(element.description).toBe(defaultProps.description);
    expect(
      element.shadowRoot?.querySelector(`.${blockClass}__description`)
        ?.textContent
    ).toBe(defaultProps.description);
  });

  it('renders a title', async () => {
    const element: CDSFullPageError = await fixture(template());

    expect(element.title).toBe(defaultProps.title);
    expect(
      element.shadowRoot
        ?.querySelector(`.${blockClass}__title`)
        ?.textContent?.includes(defaultProps.title)
    ).toBeTruthy();
  });

  it('renders custom svg illustration if kind is custom', async () => {
    const element: CDSFullPageError = await fixture(template());

    expect(element.kind).toBe(defaultProps.kind);
    expect(
      element.shadowRoot
        ?.querySelector(`.${blockClass}__svg-container svg`)
        ?.classList.contains(`${blockClass}__custom`)
    ).toBeTruthy();
  });

  it('renders 404 svg illustration if kind is 404', async () => {
    const element: CDSFullPageError = await fixture(
      template({ ...defaultProps, kind: Kind.Error404 })
    );

    expect(element.kind).toBe(Kind.Error404);
    expect(
      element.shadowRoot
        ?.querySelector(`.${blockClass}__svg-container svg`)
        ?.classList.contains(`${blockClass}__404`)
    ).toBeTruthy();
  });

  it('renders 403 svg illustration if kind is 403', async () => {
    const element: CDSFullPageError = await fixture(
      template({ ...defaultProps, kind: Kind.Error403 })
    );

    expect(element.kind).toBe(Kind.Error403);
    expect(
      element.shadowRoot
        ?.querySelector(`.${blockClass}__svg-container svg`)
        ?.classList.contains(`${blockClass}__403`)
    ).toBeTruthy();
  });
});
