/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { fixture, html, expect } from '@open-wc/testing';
import { Kind } from '@carbon/web-components/es/components/full-page-error/types.js';
import { prefix } from '@carbon/web-components/es/globals/settings.js';
import '@carbon/web-components/es/components/full-page-error/index.js';

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

const template = (props = defaultProps) => html`
  <cds-full-page-error
    label=${props.label}
    class=${props.class}
    title=${props.title}
    description=${props.description}
    kind=${props.kind}>
    ${props.children}
  </cds-full-page-error>
`;

const blockClass = `${prefix}--full-page-error`;

describe('cds-full-page-error', () => {
  it('should render full page error', async () => {
    const el = await fixture(template());
    expect(el).to.exist;
    expect(el.tagName.toLowerCase()).to.equal('cds-full-page-error');
  });

  it('should render children content', async () => {
    const childNode = html`<p>hello</p>`;
    const el = await fixture(
      template({ ...defaultProps, children: childNode })
    );
    await el.updateComplete;

    expect(el.textContent.includes('hello')).to.be.true;
  });

  it('applies a class to the containing node', async () => {
    const className = 'a-test-class';
    const el = await fixture(template({ ...defaultProps, class: className }));

    expect(el.classList.contains('a-test-class')).to.be.true;
  });

  it('renders an error label', async () => {
    const el = await fixture(template());

    expect(el.label).to.equal(defaultProps.label);
    const labelNode = el.shadowRoot.querySelector(`.${blockClass}__label`);
    expect(labelNode).to.exist;
    expect(labelNode.textContent.includes(defaultProps.label)).to.be.true;
  });

  it('renders a description', async () => {
    const el = await fixture(template());

    expect(el.description).to.equal(defaultProps.description);
    const descNode = el.shadowRoot.querySelector(`.${blockClass}__description`);
    expect(descNode).to.exist;
    expect(descNode.textContent).to.equal(defaultProps.description);
  });

  it('renders a title', async () => {
    const el = await fixture(template());

    expect(el.title).to.equal(defaultProps.title);
    const titleNode = el.shadowRoot.querySelector(`.${blockClass}__title`);
    expect(titleNode).to.exist;
    expect(titleNode.textContent.includes(defaultProps.title)).to.be.true;
  });

  it('renders custom svg illustration if kind is custom', async () => {
    const el = await fixture(template());

    expect(el.kind).to.equal(defaultProps.kind);
    const svgNode = el.shadowRoot.querySelector(
      `.${blockClass}__svg-container svg`
    );
    expect(svgNode).to.exist;
    expect(svgNode.classList.contains(`${blockClass}__custom`)).to.be.true;
  });

  it('renders 404 svg illustration if kind is 404', async () => {
    const el = await fixture(
      template({ ...defaultProps, kind: Kind.Error404 })
    );

    expect(el.kind).to.equal(Kind.Error404);
    const svgNode = el.shadowRoot.querySelector(
      `.${blockClass}__svg-container svg`
    );
    expect(svgNode).to.exist;
    expect(svgNode.classList.contains(`${blockClass}__404`)).to.be.true;
  });

  it('renders 403 svg illustration if kind is 403', async () => {
    const el = await fixture(
      template({ ...defaultProps, kind: Kind.Error403 })
    );

    expect(el.kind).to.equal(Kind.Error403);
    const svgNode = el.shadowRoot.querySelector(
      `.${blockClass}__svg-container svg`
    );
    expect(svgNode).to.exist;
    expect(svgNode.classList.contains(`${blockClass}__403`)).to.be.true;
  });
});
