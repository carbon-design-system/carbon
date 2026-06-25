/**
 * Copyright IBM Corp. 2021, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// cspell:words grafana

import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { pkg } from '../../settings';

import uuidv4 from '../../global/js/utils/uuidv4';

import { Link } from '@carbon/react';
import { AboutModal } from '.';

import ExampleLogo from './_story-assets/example-logo.svg';
import ansibleLogo from './_story-assets/ansible-logo.png';
import grafanaLogo from './_story-assets/grafana-logo.png';
import jsLogo from './_story-assets/js-logo.png';

const blockClass = `${pkg.prefix}--about-modal`;
const componentName = AboutModal.displayName;

const className = `class-${uuidv4()}`;
const closeIconDescription = `close ${uuidv4()}`;
const version = `Version 0.0.${uuidv4()}`;
const copyrightText = `Copyright test text ${uuidv4()}`;
const dataTestId = uuidv4();
const logoAltText = `Example product ${uuidv4()} logo`;
const logo = (
  <img src={ExampleLogo} alt={logoAltText} style={{ maxWidth: '6rem' }} />
);
const content = `Legal test text ${uuidv4()}`;
const linkText = `Carbon (${uuidv4()}) Design System`;
const linkHref = `https://www.carbondesignsystem.com/${uuidv4()}`;
const links = [
  <Link href={linkHref} key="link1">
    {linkText}
  </Link>,
  <Link href="https://www.ibm.com/design/language" key="link2">
    IBM Design Language
  </Link>,
];
const onCloseReturnsTrue = jest.fn(() => true);
const onCloseReturnsFalse = jest.fn(() => false);
const titleText = `Watson ${uuidv4()} Ops`;
const title = (
  <>
    IBM <span>{titleText}</span>
  </>
);

// render an AboutModal with version, logo, title, copyrightText and any other required props
const renderComponent = ({ ...rest } = {}) =>
  render(
    <main>
      <AboutModal
        {...{
          closeIconDescription,
          version,
          logo,
          title,
          copyrightText,
          ...rest,
        }}
        modalAriaLabel="About this product"
      />
    </main>
  );

describe(componentName, () => {
  it('renders a component AboutModal', async () => {
    renderComponent({ open: true });
    expect(screen.getByRole('presentation')).toHaveClass(blockClass);
  });

  it('has no accessibility violations when closed', async () => {
    const { container } = renderComponent({ open: false });
    await expect(container).toBeAccessible(`${componentName} closed`);
    await expect(container).toHaveNoAxeViolations();
  });

  it('has no accessibility violations', async () => {
    const { container } = renderComponent({ open: true });
    await expect(container).toBeAccessible(componentName);
    await expect(container).toHaveNoAxeViolations();
  });

  it('renders closeIconDescription, title, logo, and version', async () => {
    renderComponent({ open: true });
    screen.getByRole('button', { name: closeIconDescription });
    screen.getByText(titleText);
    screen.getByText(version);
    screen.getByAltText(logoAltText);
  });

  it('renders version number', async () => {
    renderComponent({ version, open: true });
    screen.getByText(version);
  });

  it('renders with links', async () => {
    renderComponent({ links, open: true });
    const link = screen.getByRole('link', { name: linkText });
    expect(link.href).toEqual(linkHref);
  });

  it('renders general text', async () => {
    renderComponent({ content, open: true });
    screen.getByText(content);
  });

  it('renders copyright text', async () => {
    renderComponent({ copyrightText, open: true });
    screen.getByText(copyrightText);
  });

  it('renders additional info in footer', async () => {
    const id = uuidv4();
    renderComponent({
      additionalInfo: (
        <>
          <p>{`Powered by (${id})`}</p>
          <img
            src={grafanaLogo}
            alt="Grafana"
            className="c4p-about-modal__stories--tech-logo"
          />
          <img
            src={ansibleLogo}
            alt="Ansible"
            className="c4p-about-modal__stories--tech-logo"
          />
          <img
            src={jsLogo}
            alt="JavaScript"
            className="c4p-about-modal__stories--tech-logo"
          />
        </>
      ),
    });
    screen.getByText(`Powered by (${id})`);
  });

  it('is visible when open is true', async () => {
    renderComponent({ open: true });
    expect(screen.getByRole('presentation')).toHaveClass('is-visible');
  });

  it('is not visible when open is not true', async () => {
    const { container } = renderComponent({ open: false });

    expect(container.firstChild).not.toHaveClass('is-visible');
  });

  it('applies className to the root node', async () => {
    renderComponent({ className, open: true });
    expect(screen.getByRole('presentation')).toHaveClass(className);
  });

  it('calls onClose() when modal is closed', async () => {
    renderComponent({ open: true, onClose: onCloseReturnsTrue });
    const aboutModal = screen.getByRole('presentation');
    const closeButton = screen.getByRole('button', {
      name: closeIconDescription,
    });
    expect(aboutModal).toHaveClass('is-visible');
    expect(onCloseReturnsTrue).toHaveBeenCalledTimes(0);
    await act(() => userEvent.click(closeButton));
    expect(aboutModal).not.toHaveClass('is-visible');
    expect(onCloseReturnsTrue).toHaveBeenCalledTimes(1);
  });

  it('allows veto when modal is closed', async () => {
    renderComponent({ open: true, onClose: onCloseReturnsFalse });
    const aboutModal = screen.getByRole('presentation');
    const closeButton = screen.getByRole('button', {
      name: closeIconDescription,
    });
    expect(aboutModal).toHaveClass('is-visible');
    expect(onCloseReturnsFalse).toHaveBeenCalledTimes(0);
    await act(() => userEvent.click(closeButton));
    expect(aboutModal).toHaveClass('is-visible');
    expect(onCloseReturnsFalse).toHaveBeenCalledTimes(1);
  });

  it('adds additional properties to the containing node', async () => {
    renderComponent({ 'data-testid': dataTestId });
    screen.getByTestId(dataTestId);
  });

  it('forwards a ref to an appropriate node', async () => {
    const ref = React.createRef();
    renderComponent({ ref });
    expect(ref.current).toHaveClass(blockClass);
  });

  it('adds the Devtools attribute to the containing node', async () => {
    renderComponent({ 'data-testid': dataTestId });

    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      componentName
    );
  });
});
