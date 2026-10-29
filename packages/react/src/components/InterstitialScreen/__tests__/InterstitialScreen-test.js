/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// jest.mock calls are hoisted above imports by Jest/Babel, so these run before
// any module code executes.
//
// @carbon/utilities: initCarousel calls window.matchMedia synchronously at
// module init time, which doesn't exist in jsdom.
//
// ButtonSet: its useEffect + setSortedChildren fires in a microtask via
// React 19's processRootScheduleInMicrotask, after act() has closed and
// restored IS_REACT_ACT_ENVIRONMENT to undefined — causing console.error.
jest.mock('@carbon/utilities', () => ({
  initCarousel: jest.fn(() => ({
    next: jest.fn(),
    prev: jest.fn(),
    getActiveItem: jest.fn(() => ({ index: 0 })),
    destroyEvents: jest.fn(),
  })),
}));

jest.mock('../../ButtonSet', () => {
  const React = require('react');
  const ButtonSet = React.forwardRef(({ children }, ref) => (
    <div ref={ref}>{children}</div>
  ));
  ButtonSet.displayName = 'ButtonSet';
  return { __esModule: true, default: ButtonSet };
});

import React, { useState } from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../../Button';
import { InterstitialScreen } from '../InterstitialScreen';
import { InterstitialScreenView } from '../InterstitialScreenView';
import { InterstitialScreenViewModule } from '../_story-assets/InterstitialScreenViewModule/InterstitialScreenViewModule';

const prefix = 'cds';
const blockClass = `${prefix}--interstitial-screen`;
const componentName = InterstitialScreen.displayName;

const className = 'custom-class';
const InterstitialScreenViewModuleTitle = 'Test Title';
const dataTestId = 'interstitial-test-id';

const renderComponent = ({ onClose = jest.fn(), ...rest } = {}) => {
  const translations = {
    'carbon.progress-step.complete': 'Terminé',
    'carbon.progress-step.incomplete': 'Partiel',
    'carbon.progress-step.current': 'Actuel',
    'carbon.progress-step.invalid': 'Non valide',
  };
  const translateWithId = (messageId) => translations[messageId];

  return render(
    <InterstitialScreen
      open={true}
      onClose={onClose}
      data-testid={dataTestId}
      {...rest}>
      <InterstitialScreen.Header
        headerTitle="headerTitle"
        headerSubTitle="headerSubTitle"
      />
      <InterstitialScreen.Body
        contentRenderer={() => (
          <>
            <InterstitialScreenView
              stepTitle="Step 1"
              translateWithId={translateWithId}>
              <InterstitialScreenViewModule
                title={InterstitialScreenViewModuleTitle}
                description="Use case-specific content that explains the concept."
              />
            </InterstitialScreenView>
            <InterstitialScreenView
              stepTitle="Step 2"
              translateWithId={translateWithId}>
              <InterstitialScreenViewModule
                title="Use case-specific heading 2"
                description="Use case-specific content that explains the concept."
              />
            </InterstitialScreenView>
          </>
        )}
      />
      <InterstitialScreen.Footer />
    </InterstitialScreen>
  );
};

const renderComponentSingleStep = ({ onClose = jest.fn(), ...rest } = {}) => {
  const translations = {
    'carbon.progress-step.complete': 'Terminé',
    'carbon.progress-step.incomplete': 'Partiel',
    'carbon.progress-step.current': 'Actuel',
    'carbon.progress-step.invalid': 'Non valide',
  };
  const translateWithId = (messageId) => translations[messageId];

  return render(
    <InterstitialScreen
      open={true}
      onClose={onClose}
      data-testid={dataTestId}
      {...rest}>
      <InterstitialScreen.Header
        headerTitle="headerTitle"
        headerSubTitle="headerSubTitle"
      />
      <InterstitialScreen.Body
        contentRenderer={() => (
          <InterstitialScreenView
            stepTitle="Step 1"
            translateWithId={translateWithId}>
            <InterstitialScreenViewModule
              title={InterstitialScreenViewModuleTitle}
              description="Use case-specific content that explains the concept."
            />
          </InterstitialScreenView>
        )}
      />
      <InterstitialScreen.Footer />
    </InterstitialScreen>
  );
};

describe(componentName, () => {
  it('renders a component InterstitialScreen (Modal)', () => {
    renderComponent({
      className: blockClass,
      ariaLabel: 'Modal Interstitial Screen',
    });
    expect(screen.getByTestId(dataTestId)).toHaveClass(blockClass);
  });

  it('renders a component InterstitialScreen (Modal) single step', () => {
    renderComponentSingleStep({
      className: blockClass,
      ariaLabel: 'Modal Interstitial Screen',
    });
    expect(screen.getByTestId(dataTestId)).toHaveClass(blockClass);
  });

  it('renders a component InterstitialScreen (Modal) with plain text content', () => {
    render(
      <InterstitialScreen open={true} onClose={jest.fn()}>
        test content
      </InterstitialScreen>
    );
    expect(screen.getByText('test content')).toBeInTheDocument();
  });

  it('renders a component InterstitialScreen (Full Screen)', () => {
    renderComponent({
      className: blockClass,
      isFullScreen: true,
      ariaLabel: 'Full Screen Interstitial Screen',
    });
    expect(screen.getByTestId(dataTestId)).toHaveClass(blockClass);
  });

  it('has no accessibility violations (Modal)', async () => {
    const { container } = renderComponent({
      className: blockClass,
      ariaLabel: 'Modal Interstitial Screen',
    });
    await expect(container).toHaveNoAxeViolations();
  });

  it('has no accessibility violations (Full Screen)', async () => {
    const { container } = renderComponent({
      className: blockClass,
      isFullScreen: true,
      ariaLabel: 'Full Screen Interstitial Screen',
    });
    await expect(container).toHaveNoAxeViolations();
  });

  it('renders children (Modal)', () => {
    renderComponent({
      className: blockClass,
      ariaLabel: 'Modal Interstitial Screen',
    });
    expect(
      screen.getByText(InterstitialScreenViewModuleTitle)
    ).toBeInTheDocument();
  });

  it('renders children (Full Screen)', () => {
    renderComponent({
      className: blockClass,
      isFullScreen: true,
      ariaLabel: 'Full Screen Interstitial Screen',
    });
    expect(
      screen.getByText(InterstitialScreenViewModuleTitle)
    ).toBeInTheDocument();
  });

  it('applies className to the containing node (Modal)', () => {
    renderComponent({
      className,
      ariaLabel: 'Modal Interstitial Screen',
    });
    expect(screen.getByTestId(dataTestId)).toHaveClass(className);
  });

  it('applies className to the containing node (Full Screen)', () => {
    renderComponent({
      className,
      isFullScreen: true,
      ariaLabel: 'Full Screen Interstitial Screen',
    });
    expect(screen.getByTestId(dataTestId)).toHaveClass(className);
  });

  it('forwards a ref to an appropriate node (Modal)', () => {
    const tmpRef = React.createRef();
    renderComponent({
      ref: tmpRef,
      className: blockClass,
      ariaLabel: 'Modal Interstitial Screen',
    });
    expect(tmpRef.current).toHaveClass(blockClass);
  });

  it('forwards a ref to an appropriate node (Full Screen)', () => {
    const tmpRef = React.createRef();
    renderComponent({
      ref: tmpRef,
      className: blockClass,
      isFullScreen: true,
      ariaLabel: 'Full Screen Interstitial Screen',
    });
    expect(tmpRef.current).toHaveClass(blockClass);
  });

  it('adds data-component-name attribute to the containing node (Modal)', () => {
    renderComponent({
      className: blockClass,
      ariaLabel: 'Modal Interstitial Screen',
    });
    expect(screen.getByTestId(dataTestId)).toHaveAttribute(
      'data-component-name',
      componentName
    );
  });

  it('adds data-component-name attribute to the containing node (Full Screen)', () => {
    renderComponent({
      className: blockClass,
      isFullScreen: true,
      ariaLabel: 'Full Screen Interstitial Screen',
    });
    expect(screen.getByTestId(dataTestId)).toHaveAttribute(
      'data-component-name',
      componentName
    );
  });

  it('clicks on the next and back buttons', async () => {
    const user = userEvent.setup();
    renderComponent({
      className: blockClass,
      ariaLabel: 'Modal Interstitial Screen',
    });

    expect(screen.getByText('Next')).toBeVisible();
    expect(screen.getByText('Step 1')).toBeVisible();
    const step1 = screen.getByText('Step 1');
    const listElement1 = step1.closest('li');
    const step2 = screen.getByText('Step 2');
    const listElement2 = step2.closest('li');
    expect(listElement1).toHaveClass(`${prefix}--progress-step--current`);
    expect(listElement1).toHaveTextContent('Actuel');

    expect(listElement2).toHaveClass(`${prefix}--progress-step--incomplete`);
    expect(listElement2).toHaveTextContent('Partiel');

    const nextButtonElement = screen.getByText('Next');
    expect(nextButtonElement).toHaveClass(`${blockClass}--next-btn`);
    await user.click(nextButtonElement);

    expect(listElement1).toHaveClass(`${prefix}--progress-step--complete`);
    expect(listElement1).toHaveTextContent('Terminé');

    expect(listElement2).toHaveClass(`${prefix}--progress-step--current`);
    expect(listElement2).toHaveTextContent('Actuel');

    expect(screen.getByText('Back')).toBeInTheDocument();
    const backButtonElement = screen.getByText('Back');
    expect(backButtonElement).toHaveClass(`${blockClass}--prev-btn`);

    await user.click(backButtonElement);
    expect(listElement1).toHaveClass(`${prefix}--progress-step--current`);
    expect(listElement2).toHaveClass(`${prefix}--progress-step--incomplete`);
  });

  it('clicks the close button', async () => {
    const user = userEvent.setup();
    const onCloseMock = jest.fn();
    renderComponent({
      className: blockClass,
      ariaLabel: 'Modal Interstitial Screen',
      onClose: onCloseMock,
    });
    const closeBtn = screen.getByLabelText('Close');
    await user.click(closeBtn);
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('should return focus to the launcher button', async () => {
    const user = userEvent.setup();
    const onOpen = jest.fn();
    const onCloseMock = jest.fn();

    const DummyComponent = ({ open }) => {
      const buttonRef = React.useRef(null);

      return (
        <>
          <InterstitialScreen
            open={open}
            onClose={onCloseMock}
            data-testid={dataTestId}
            launcherButtonRef={buttonRef}>
            <InterstitialScreen.Header
              headerTitle="headerTitle"
              headerSubTitle="headerSubTitle"
            />
          </InterstitialScreen>
          <Button ref={buttonRef} onClick={onOpen}>
            Generate
          </Button>
        </>
      );
    };

    const { getByText, rerender } = render(<DummyComponent open={false} />);

    const launchButtonEl = getByText('Generate');
    expect(launchButtonEl).toBeInTheDocument();

    await user.click(launchButtonEl);
    expect(onOpen).toHaveBeenCalled();

    rerender(<DummyComponent open={true} />);

    const closeButton = screen.getByLabelText('Close');
    await act(() => new Promise((resolve) => setTimeout(resolve, 0)));
    expect(closeButton).toBeInTheDocument();

    await user.click(closeButton);
    expect(onCloseMock).toHaveBeenCalled();

    rerender(<DummyComponent open={false} />);

    await act(() => new Promise((resolve) => setTimeout(resolve, 0)));
    expect(launchButtonEl).toHaveFocus();
  });

  describe('Disabled button configurations', () => {
    it('should disable skip button when disableButtonConfig.skip is true', async () => {
      const TestComponent = () => {
        const [open, setOpen] = useState(true);
        return (
          <InterstitialScreen open={open} onClose={() => setOpen(false)}>
            <InterstitialScreen.Header
              headerTitle="Test"
              headerSubTitle="Test subtitle"
            />
            <InterstitialScreen.Body
              contentRenderer={({ disableActionButton }) => (
                <>
                  <InterstitialScreenView
                    stepTitle="Step 1"
                    translateWithId={(id) => id}>
                    <InterstitialScreenViewModule
                      title="Test"
                      description="Test description"
                      disableActionButton={() =>
                        disableActionButton({ skip: true })
                      }
                    />
                  </InterstitialScreenView>
                  <InterstitialScreenView
                    stepTitle="Step 2"
                    translateWithId={(id) => id}>
                    <InterstitialScreenViewModule
                      title="Test 2"
                      description="Test description 2"
                    />
                  </InterstitialScreenView>
                </>
              )}
            />
            <InterstitialScreen.Footer />
          </InterstitialScreen>
        );
      };

      render(<TestComponent />);
      await waitFor(() => {
        const skipButton = screen.getByText('Skip');
        expect(skipButton).toBeDisabled();
      });
    });

    it('should disable back button when disableButtonConfig.back is true', async () => {
      const user = userEvent.setup();
      const TestComponent = () => {
        const [open, setOpen] = useState(true);
        return (
          <InterstitialScreen open={open} onClose={() => setOpen(false)}>
            <InterstitialScreen.Header
              headerTitle="Test"
              headerSubTitle="Test subtitle"
            />
            <InterstitialScreen.Body
              contentRenderer={({ disableActionButton }) => (
                <>
                  <InterstitialScreenView
                    stepTitle="Step 1"
                    translateWithId={(id) => id}>
                    <InterstitialScreenViewModule
                      title="Test"
                      description="Test description"
                    />
                  </InterstitialScreenView>
                  <InterstitialScreenView
                    stepTitle="Step 2"
                    translateWithId={(id) => id}>
                    <InterstitialScreenViewModule
                      title="Test 2"
                      description="Test description 2"
                      disableActionButton={() =>
                        disableActionButton({ back: true })
                      }
                    />
                  </InterstitialScreenView>
                </>
              )}
            />
            <InterstitialScreen.Footer />
          </InterstitialScreen>
        );
      };

      render(<TestComponent />);

      const nextButton = screen.getByText('Next');
      await user.click(nextButton);

      await waitFor(() => {
        const backButton = screen.getByText('Back');
        expect(backButton).toBeDisabled();
      });
    });

    it('should disable next button when disableButtonConfig.next is true', async () => {
      const TestComponent = () => {
        const [open, setOpen] = useState(true);
        return (
          <InterstitialScreen open={open} onClose={() => setOpen(false)}>
            <InterstitialScreen.Header
              headerTitle="Test"
              headerSubTitle="Test subtitle"
            />
            <InterstitialScreen.Body
              contentRenderer={({ disableActionButton }) => (
                <>
                  <InterstitialScreenView
                    stepTitle="Step 1"
                    translateWithId={(id) => id}>
                    <InterstitialScreenViewModule
                      title="Test"
                      description="Test description"
                      disableActionButton={() =>
                        disableActionButton({ next: true })
                      }
                    />
                  </InterstitialScreenView>
                  <InterstitialScreenView
                    stepTitle="Step 2"
                    translateWithId={(id) => id}>
                    <InterstitialScreenViewModule
                      title="Test 2"
                      description="Test description 2"
                    />
                  </InterstitialScreenView>
                </>
              )}
            />
            <InterstitialScreen.Footer />
          </InterstitialScreen>
        );
      };

      render(<TestComponent />);
      await waitFor(() => {
        const nextButton = screen.getByText('Next');
        expect(nextButton).toBeDisabled();
      });
    });

    it('should disable start button when disableButtonConfig.start is true (single step)', async () => {
      const TestComponent = () => {
        const [open, setOpen] = useState(true);
        return (
          <InterstitialScreen open={open} onClose={() => setOpen(false)}>
            <InterstitialScreen.Header
              headerTitle="Test"
              headerSubTitle="Test subtitle"
            />
            <InterstitialScreen.Body
              contentRenderer={({ disableActionButton }) => (
                <InterstitialScreenView
                  stepTitle="Step 1"
                  translateWithId={(id) => id}>
                  <InterstitialScreenViewModule
                    title="Test"
                    description="Test description"
                    disableActionButton={() =>
                      disableActionButton({ start: true })
                    }
                  />
                </InterstitialScreenView>
              )}
            />
            <InterstitialScreen.Footer />
          </InterstitialScreen>
        );
      };

      render(<TestComponent />);
      await waitFor(() => {
        const startButton = screen.getByText('Get Started');
        expect(startButton).toBeDisabled();
      });
    });
  });

  describe('Edge cases', () => {
    it('should handle escape key press when modal is open', async () => {
      const onCloseMock = jest.fn();
      renderComponent({
        className: blockClass,
        ariaLabel: 'Modal Interstitial Screen',
        onClose: onCloseMock,
      });

      await act(() => {
        const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
        window.dispatchEvent(escapeEvent);
      });

      expect(onCloseMock).toHaveBeenCalledWith('close');
    });

    it('should not render when open is false', () => {
      const { container } = render(
        <InterstitialScreen open={false} onClose={jest.fn()}>
          <InterstitialScreen.Header
            headerTitle="Test"
            headerSubTitle="Test subtitle"
          />
          <InterstitialScreen.Body
            contentRenderer={() => (
              <InterstitialScreenView stepTitle="Step 1">
                <div>Content</div>
              </InterstitialScreenView>
            )}
          />
          <InterstitialScreen.Footer />
        </InterstitialScreen>
      );

      expect(container.firstChild).toBeNull();
    });

    it('should handle empty skipButtonLabel', () => {
      const TestComponent = () => {
        const [open, setOpen] = useState(true);
        return (
          <InterstitialScreen open={open} onClose={() => setOpen(false)}>
            <InterstitialScreen.Header
              headerTitle="Test"
              headerSubTitle="Test subtitle"
            />
            <InterstitialScreen.Body
              contentRenderer={() => (
                <>
                  <InterstitialScreenView
                    stepTitle="Step 1"
                    translateWithId={(id) => id}>
                    <InterstitialScreenViewModule
                      title="Test"
                      description="Test description"
                    />
                  </InterstitialScreenView>
                  <InterstitialScreenView
                    stepTitle="Step 2"
                    translateWithId={(id) => id}>
                    <InterstitialScreenViewModule
                      title="Test 2"
                      description="Test description 2"
                    />
                  </InterstitialScreenView>
                </>
              )}
            />
            <InterstitialScreen.Footer skipButtonLabel="" />
          </InterstitialScreen>
        );
      };

      render(<TestComponent />);
      const skipButton = screen.queryByText('Skip');
      expect(skipButton).not.toBeInTheDocument();
    });

    it('should handle onAction callback returning true to abort navigation', async () => {
      const user = userEvent.setup();
      const onActionMock = jest.fn(() => true);
      const TestComponent = () => {
        const [open, setOpen] = useState(true);
        return (
          <InterstitialScreen open={open} onClose={() => setOpen(false)}>
            <InterstitialScreen.Header
              headerTitle="Test"
              headerSubTitle="Test subtitle"
            />
            <InterstitialScreen.Body
              contentRenderer={() => (
                <>
                  <InterstitialScreenView
                    stepTitle="Step 1"
                    translateWithId={(id) => id}>
                    <InterstitialScreenViewModule
                      title="Test"
                      description="Test description"
                    />
                  </InterstitialScreenView>
                  <InterstitialScreenView
                    stepTitle="Step 2"
                    translateWithId={(id) => id}>
                    <InterstitialScreenViewModule
                      title="Test 2"
                      description="Test description 2"
                    />
                  </InterstitialScreenView>
                </>
              )}
            />
            <InterstitialScreen.Footer onAction={onActionMock} />
          </InterstitialScreen>
        );
      };

      render(<TestComponent />);

      const nextButton = screen.getByText('Next');
      await user.click(nextButton);

      expect(onActionMock).toHaveBeenCalledWith('next', expect.any(Object));
      expect(screen.getByText('Step 1')).toBeInTheDocument();
    });
  });
});
