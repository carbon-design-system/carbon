/**
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, renderHook, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Code, Copy } from '@carbon/react/icons';

import { pkg } from '../../settings';

import uuidv4 from '../../global/js/utils/uuidv4';
import { documentationLinks } from './preview-components/documentationLinks';
import {
  WebTerminal,
  WebTerminalProvider,
  WebTerminalContentWrapper,
  useWebTerminal,
} from './index';
import { componentName } from '../Toolbar/Toolbar';

const blockClass = `${pkg.prefix}--web-terminal`;
const name = WebTerminal.displayName;
const dataTestId = uuidv4();

const MockWebTerminal = React.forwardRef(
  (
    { children, ...props }, // eslint-disable-line
    ref
  ) => (
    <WebTerminalProvider>
      <WebTerminal
        isInitiallyOpen
        closeIconDescription="Close terminal"
        ref={ref}
        {...props}
      >
        {children}
      </WebTerminal>
    </WebTerminalProvider>
  )
);

describe(name, () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('Renders the component `WebTerminal` if flag is enabled', async () => {
    const { container } = render(
      <MockWebTerminal>Body content</MockWebTerminal>
    );

    expect(container.querySelector(`.${blockClass}`)).not.toBeNull();
  });

  /**
    We are skipping the a11y test for now since the only a11y violation
    is a potential violation. We can remove the skip once we fix our accessibility-checker
    issue. https://github.com/carbon-design-system/ibm-products/issues/2154
  */
  it('has no accessibility violations', async () => {
    const { container } = render(
      <MockWebTerminal isInitiallyOpen>Body content</MockWebTerminal>
    );

    expect(container).toBeAccessible(componentName);
    expect(container).toHaveNoAxeViolations();
  });

  it('should attach a custom class to the web terminal', async () => {
    const testClassName = 'test-class-name';
    const { container } = render(
      <MockWebTerminal isInitiallyOpen className={testClassName}>
        Body content
      </MockWebTerminal>
    );
    expect(container.querySelector(`.${testClassName}`)).not.toBeNull();
  });

  it('should render child element content', async () => {
    render(<MockWebTerminal>Body content</MockWebTerminal>);
    expect(screen.getByText(/Body content/i)).toBeInTheDocument();
  });

  it('custom hook should toggle web terminal', async () => {
    /**  Utilizing renderHook so jest knows about the custom hook and passing
         in the WebTerminalProvider so that the hook can consume the value  */
    const { result } = renderHook(() => useWebTerminal(), {
      wrapper: WebTerminalProvider,
    });

    // open should be false by default and check if openWebTerminal is a function
    expect(result.current.open).toBe(false);
    expect(typeof result.current.toggleWebTerminal).toBe('function');

    act(() => {
      result.current.toggleWebTerminal();
    });

    expect(result.current.open).toBe(true);

    act(() => {
      result.current.toggleWebTerminal();
    });

    expect(result.current.open).toBe(false);
  });

  it('custom hook should open and close web terminal', async () => {
    /**  Utilizing renderHook so jest knows about the custom hook and passing
         in the WebTerminalProvider so that the hook can consume the value  */
    const { result } = renderHook(() => useWebTerminal(), {
      wrapper: WebTerminalProvider,
    });

    // open should be false by default and check if openWebTerminal is a function
    expect(result.current.open).toBe(false);
    expect(typeof result.current.openWebTerminal).toBe('function');

    // open web terminal
    act(() => {
      result.current.openWebTerminal();
    });

    // open should be true
    expect(result.current.open).toBe(true);

    // check if closeWebTerminal is a function
    expect(typeof result.current.closeWebTerminal).toBe('function');

    // close web terminal
    act(() => {
      result.current.closeWebTerminal();
    });

    // open should be false
    expect(result.current.open).toBe(false);
  });

  it('should render documentation link text', async () => {
    const overflowLabel = 'Show documentation links';
    render(
      <MockWebTerminal documentationLinks={documentationLinks}>
        Body content
      </MockWebTerminal>
    );
    const { click } = userEvent;
    await act(() => click(screen.getByRole('button', { name: overflowLabel })));
    documentationLinks.forEach((link) => {
      screen.getByText(link.itemText);
    });
  });

  it('adds additional properties to the containing node', async () => {
    const { container } = render(
      <MockWebTerminal data-testid={dataTestId}>Body content</MockWebTerminal>
    );
    expect(
      container.querySelector(`.${blockClass}[data-testid="${dataTestId}"]`)
    ).toBeInTheDocument();
  });

  it('forwards a ref to an appropriate node', async () => {
    const ref = React.createRef(null);
    render(<MockWebTerminal ref={ref}>Body content</MockWebTerminal>);

    /**
      This await is necessary so that the document loads completely and the ref isn't null */
    await screen.findByText('Body content');

    expect(ref.current.classList.contains(blockClass)).toBeTruthy();
  });

  it('should call the animationEnd event', async () => {
    const { container } = render(
      <div data-testid="container-id">
        <MockWebTerminal isInitiallyOpen closeIconDescription="Close terminal">
          Body content
        </MockWebTerminal>
      </div>
    );

    const closeButton = screen.getByRole('button', {
      name: /close terminal/i,
    });
    await act(() => userEvent.click(closeButton));

    const outerElement = container.querySelector(`.${blockClass}`);

    expect(outerElement).toBeNull();
  });

  it('should render action icon buttons', async () => {
    const { click } = userEvent;
    const deploymentButtonFn = jest.fn();
    const copyLogsButtonFn = jest.fn();

    render(
      <MockWebTerminal
        actions={[
          {
            renderIcon: (props) => <Code size={16} {...props} />,
            onClick: deploymentButtonFn,
            iconDescription: 'Create new deployment',
          },
          {
            renderIcon: (props) => <Copy size={16} {...props} />,
            onClick: copyLogsButtonFn,
            iconDescription: 'Copy logs',
          },
        ]}
      >
        Body content
      </MockWebTerminal>
    );

    await act(() => click(screen.getByLabelText(/Create new deployment/i)));
    expect(deploymentButtonFn).toHaveBeenCalledTimes(1);

    await act(() => click(screen.getByRole('button', { name: /Copy logs/i })));
    expect(copyLogsButtonFn).toHaveBeenCalledTimes(1);
  });

  it('should render the close icon description prop', async () => {
    render(
      <MockWebTerminal
        isInitiallyOpen
        closeIconDescription="Close web terminal"
      >
        Body content
      </MockWebTerminal>
    );

    expect(screen.getByText(/close web terminal/i)).toBeInTheDocument();
  });

  it('content wrapper should pass children', async () => {
    render(
      <WebTerminalProvider>
        <WebTerminalContentWrapper>body content</WebTerminalContentWrapper>
      </WebTerminalProvider>
    );

    expect(screen.getByText(/body content/i)).toBeInTheDocument();
  });

  it('content wrapper should be full width when web terminal is closed', async () => {
    const RenderComponent = (
      { isInitiallyOpen = false, dataTestId = null } // eslint-disable-line
    ) => (
      <WebTerminalProvider>
        <WebTerminalContentWrapper>content</WebTerminalContentWrapper>
        <WebTerminal
          isInitiallyOpen={isInitiallyOpen}
          data-testid={dataTestId}
          closeIconDescription="Close terminal"
        >
          Body content
        </WebTerminal>
      </WebTerminalProvider>
    );

    render(<RenderComponent />);

    let windowWidth = document.body.getBoundingClientRect().width;
    let contentWrapperWidth = screen
      .getByText('content')
      .getBoundingClientRect().width;

    expect(contentWrapperWidth).toBe(windowWidth);
  });

  it('content wrapper should be reacting to the width of the web terminal when open ', async () => {
    const RenderComponent = (
      { isInitiallyOpen = false, dataTestId = null } // eslint-disable-line
    ) => (
      <WebTerminalProvider>
        <WebTerminalContentWrapper>content</WebTerminalContentWrapper>
        <WebTerminal
          isInitiallyOpen={isInitiallyOpen}
          data-testid={dataTestId}
          closeIconDescription="Close terminal"
        >
          Body content
        </WebTerminal>
      </WebTerminalProvider>
    );

    const dataTestId = uuidv4();
    render(<RenderComponent isInitiallyOpen dataTestId={dataTestId} />);

    let windowWidth = document.body.getBoundingClientRect().width;
    let contentWrapperWidth = screen
      .getByText('content')
      .getBoundingClientRect().width;
    let webTerminalWidth = screen
      .getByTestId(dataTestId)
      .getBoundingClientRect().width;

    expect(contentWrapperWidth).toBe(windowWidth - webTerminalWidth);
  });

  it('should reduce motion', async () => {
    const dataTestId = uuidv4();

    const { rerender } = render(
      <MockWebTerminal
        isInitiallyOpen
        closeIconDescription="close web terminal"
        data-testid={dataTestId}
      >
        Body content
      </MockWebTerminal>
    );

    expect(window.matchMedia('(prefers-reduced-motion: reduce)').matches).toBe(
      false
    );
    expect(
      screen.getByTestId(dataTestId).hasAttribute('style')
    ).not.toBeTruthy();

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: true,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    rerender(
      <MockWebTerminal
        isInitiallyOpen
        closeIconDescription="close web terminal"
        data-testid={dataTestId}
      >
        Body content
      </MockWebTerminal>
    );

    expect(window.matchMedia('(prefers-reduced-motion: reduce)').matches).toBe(
      true
    );
    expect(screen.getByTestId(dataTestId).getAttribute('style')).toBeNull();
  });
});
