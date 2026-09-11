/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { createRef } from 'react';

import { AILabel } from '../../AILabel';
import Button from '../../Button';
import { IconButton } from '../../IconButton';
import Tab from '../../Tab';
import { TabList } from '../../Tabs';
import { RightPanelClose } from '@carbon/icons-react';
import { Tearsheet } from '../Tearsheet';
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';
import { StackProvider } from '../StackContext';

const prefix = 'cds';
const blockClass = `${prefix}--tearsheet`;

// jsdom does not implement window.matchMedia — provide a minimal stub
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

let mockOverflowOnChange;

jest.mock('../../../internal/useResizeObserver', () => ({
  useResizeObserver: () => ({ width: 800 }), // arbitrary test width
}));
jest.mock('@carbon/utilities', () => ({
  createOverflowHandler: jest.fn(({ onChange }) => {
    mockOverflowOnChange = onChange;
  }),
}));

describe(Tearsheet.displayName, () => {
  let setOpen, setInfluencerPanelOpen, setSummaryPanelOpen, handlePrevious;

  const baseFontSize = '16px';

  beforeAll(() => {
    document.documentElement.style.fontSize = baseFontSize;
  });
  beforeEach(() => {
    setOpen = jest.fn();
    setInfluencerPanelOpen = jest.fn();
    setSummaryPanelOpen = jest.fn();
    handlePrevious = jest.fn();
    jest.clearAllMocks();
    mockOverflowOnChange = null;
  });

  const renderTearsheet = (open = true) =>
    render(
      <Tearsheet
        open={open}
        variant="wide"
        decorator={<AILabel />}
        onClose={() => setOpen(false)}
        preventCloseOnClickOutside={true}
        launcherButtonRef={{ current: null }}
        selectorPrimaryFocus="#input1">
        <Tearsheet.Header>
          <Tearsheet.HeaderContent
            open
            label="label"
            title="Title of the tearsheet"
            description="This is a description"
            headerActions={
              <Tearsheet.HeaderActions
                menuButtonProps={{ label: 'Actions', kind: 'tertiary' }}>
                <Tearsheet.HeaderActionItem overflowItemLabel="Action 1">
                  <Button kind="tertiary" size="sm">
                    Action 1
                  </Button>
                </Tearsheet.HeaderActionItem>
              </Tearsheet.HeaderActions>
            }
          />
          <Tearsheet.NavigationBar scroller={<Tearsheet.ScrollButton />}>
            <TabList>
              <Tab>Tab 1</Tab>
              <Tab>Tab 2</Tab>
            </TabList>
          </Tearsheet.NavigationBar>
        </Tearsheet.Header>
        <Tearsheet.Influencer>influencer</Tearsheet.Influencer>
        <Tearsheet.Body>
          <Tearsheet.MainContent>
            <IconButton
              kind="ghost"
              label="Open influencer"
              onClick={() => setInfluencerPanelOpen(true)}>
              <RightPanelClose />
            </IconButton>
            <IconButton
              kind="ghost"
              label="Open right panel"
              onClick={() => setSummaryPanelOpen(true)}>
              <RightPanelClose />
            </IconButton>
            <div style={{ height: '1000px' }}>
              <input id="input1" placeholder="Enter an important value here" />
            </div>
          </Tearsheet.MainContent>

          <Tearsheet.SummaryContent
            summaryPanelOpen={false}
            onSummaryPanelClose={() => setSummaryPanelOpen(false)}>
            <h2>Summary details</h2>
          </Tearsheet.SummaryContent>
        </Tearsheet.Body>

        <Tearsheet.Footer>
          <Button
            className="step-action-button__cancel"
            onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => handlePrevious()}>Back</Button>
          <Button>Submit</Button>
        </Tearsheet.Footer>
      </Tearsheet>
    );

  it('renders the component', async () => {
    render(<Tearsheet open={true} className="custom-class"></Tearsheet>);
    expect(screen.getByRole('presentation', { hidden: true })).toHaveClass(
      'custom-class'
    );
  });

  it('renders the header content correctly', () => {
    renderTearsheet();

    expect(screen.getByText('label')).toBeInTheDocument();
    expect(screen.getByText('Title of the tearsheet')).toBeInTheDocument();
    expect(screen.getByText('This is a description')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Action 1/i })
    ).toBeInTheDocument();
  });

  it('renders influencer', () => {
    renderTearsheet();
    expect(screen.getByText('influencer')).toBeInTheDocument();
  });

  it('renders main content and form fields', () => {
    renderTearsheet();
    expect(
      screen.getByPlaceholderText('Enter an important value here')
    ).toBeInTheDocument();
  });

  it('renders summaryContent', () => {
    renderTearsheet();
    expect(screen.getByText('Summary details')).toBeInTheDocument();
  });

  it('calls onClose when Cancel is clicked', () => {
    renderTearsheet();
    fireEvent.click(screen.getByText('Cancel'));
    expect(setOpen).toHaveBeenCalledTimes(1);
  });

  it('calls handlePrevious when Back button is clicked', () => {
    renderTearsheet();
    fireEvent.click(screen.getByText('Back'));
    expect(handlePrevious).toHaveBeenCalledTimes(1);
  });

  it('opens influencer and summary panels on icon button clicks', () => {
    renderTearsheet();

    fireEvent.click(screen.getByRole('button', { name: /open influencer/i }));
    expect(setInfluencerPanelOpen).toHaveBeenCalledWith(true);

    fireEvent.click(screen.getByRole('button', { name: /open right panel/i }));
    expect(setSummaryPanelOpen).toHaveBeenCalledWith(true);
  });

  it('does not render when open is false', () => {
    const { container } = renderTearsheet(false);

    expect(container.querySelector(`.${blockClass}`)).not.toBeInTheDocument();
  });

  it('renders footer buttons correctly', () => {
    renderTearsheet();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Back')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('check stacking tearsheet is rendered properly', async () => {
    render(
      <StackProvider>
        <Tearsheet open data-testid="tearsheet-1"></Tearsheet>
        <Tearsheet open data-testid="tearsheet-2"></Tearsheet>
        <Tearsheet open data-testid="tearsheet-3"></Tearsheet>
      </StackProvider>
    );

    const t1 = await screen.findByTestId('tearsheet-1');
    const t2 = await screen.findByTestId('tearsheet-2');
    const t3 = await screen.findByTestId('tearsheet-3');
    const style1 = window.getComputedStyle(t1);
    const style2 = window.getComputedStyle(t2);
    const style3 = window.getComputedStyle(t3);

    await waitFor(() =>
      expect(style3.getPropertyValue('--stack-depth')).toBe('0')
    );
    expect(style2.getPropertyValue('--stack-depth')).toBe('1');
    expect(style1.getPropertyValue('--stack-depth')).toBe('2');

    const scaleFactor1 = style1.getPropertyValue('--scale-factor');
    const scaleFactor2 = style2.getPropertyValue('--scale-factor');
    const scaleFactor3 = style3.getPropertyValue('--scale-factor');

    expect(Number(scaleFactor2)).toBeGreaterThan(Number(scaleFactor1));
    expect(Number(scaleFactor3)).toBeGreaterThan(Number(scaleFactor2));

    const blockSizeChange1 = Number(
      style1.getPropertyValue('--block-size-change').replace('px', '')
    );
    const blockSizeChange2 = Number(
      style2.getPropertyValue('--block-size-change').replace('px', '')
    );
    const blockSizeChange3 = Number(
      style3.getPropertyValue('--block-size-change').replace('px', '')
    );

    expect(blockSizeChange1).toBe(32); // 2rem * 16px
    expect(blockSizeChange2).toBe(16); // 1rem * 16px
    expect(blockSizeChange3).toBe(0); // 0rem * 16px
    expect(blockSizeChange1).toBeGreaterThan(blockSizeChange2);
    expect(blockSizeChange2).toBeGreaterThan(blockSizeChange3);
  });

  it('check header collapse functionality', async () => {
    renderTearsheet();
    const header = document.querySelector(`.${blockClass}__header`);

    expect(header).not.toHaveClass(`${blockClass}__header-collapsed`);

    const scrollerButton = document.querySelector(
      `.${blockClass}__scroller-button`
    );
    fireEvent.click(scrollerButton); // collapse the header
    expect(header).toHaveClass(`${blockClass}__header-collapsed`);

    fireEvent.click(scrollerButton); // expand the header
    expect(header).not.toHaveClass(`${blockClass}__header-collapsed`);

    const body = document.querySelector(`.${blockClass}__main-content`);

    Object.defineProperty(body, 'clientHeight', {
      value: 500,
      configurable: true,
    });
    Object.defineProperty(body, 'scrollHeight', {
      value: 800,
      configurable: true,
    });

    fireEvent.wheel(body, { deltaY: 100 });
    expect(header).toHaveClass(`${blockClass}__header-collapsed`);
    fireEvent.wheel(body, { deltaY: -100 });
    expect(header).not.toHaveClass(`${blockClass}__header-collapsed`);
  });

  it('does not show menu button when hidden items do not exist (via onChange)', async () => {
    render(
      <Tearsheet.HeaderActions
        menuButtonProps={{ label: 'Actions', kind: 'tertiary' }}>
        <Tearsheet.HeaderActionItem overflowItemLabel="Action 1">
          <Button kind="tertiary" size="sm">
            Action 1
          </Button>
        </Tearsheet.HeaderActionItem>
        <Tearsheet.HeaderActionItem overflowItemLabel="Action 2">
          <Button kind="tertiary" size="sm">
            Action 2
          </Button>
        </Tearsheet.HeaderActionItem>
      </Tearsheet.HeaderActions>
    );

    await act(async () => {
      mockOverflowOnChange?.(
        [
          <Tearsheet.HeaderActionItem overflowItemLabel="Action 1">
            <Button kind="tertiary" size="sm">
              Action 1
            </Button>
          </Tearsheet.HeaderActionItem>,
          <Tearsheet.HeaderActionItem overflowItemLabel="Action 2">
            <Button kind="tertiary" size="sm">
              Action 2
            </Button>
          </Tearsheet.HeaderActionItem>,
        ],
        []
      );
    });

    const buttons = document.querySelectorAll(
      `.${blockClass}__header-action-item`
    );
    expect(buttons).toHaveLength(2);
    buttons.forEach((btn) => {
      expect(btn).not.toHaveAttribute('data-hidden', 'true');
    });
    const menuButton = document.querySelector(
      `.${blockClass}__header-actions-menuButton.${blockClass}____header-actions-menuButton--hidden`
    );
    expect(menuButton).not.toBeInTheDocument();
  });

  it('shows menu button when hidden items exist (via onChange)', async () => {
    render(
      <Tearsheet.HeaderActions
        menuButtonProps={{ label: 'Actions', kind: 'tertiary' }}>
        <Tearsheet.HeaderActionItem overflowItemLabel="Action 1">
          <Button kind="tertiary" size="sm">
            Action 1
          </Button>
        </Tearsheet.HeaderActionItem>
        <Tearsheet.HeaderActionItem overflowItemLabel="Action 2">
          <Button kind="tertiary" size="sm">
            Action 2
          </Button>
        </Tearsheet.HeaderActionItem>
      </Tearsheet.HeaderActions>
    );

    await act(async () => {
      mockOverflowOnChange?.(
        [
          <Tearsheet.HeaderActionItem overflowItemLabel="Action 1">
            <Button kind="tertiary" size="sm">
              Action 1
            </Button>
          </Tearsheet.HeaderActionItem>,
        ],
        [
          <Tearsheet.HeaderActionItem overflowItemLabel="Action 2">
            <Button kind="tertiary" size="sm">
              Action 2
            </Button>
          </Tearsheet.HeaderActionItem>,
        ]
      );
    });

    const menuButton = document.querySelector(
      `.${blockClass}__header-actions-menuButton.${blockClass}____header-actions-menuButton--hidden`
    );
    expect(menuButton).toBeDefined();
  });

  describe('portal behavior', () => {
    it('renders into document.body by default (portal active)', () => {
      const { container } = render(<Tearsheet open={true} />);
      expect(container.querySelector(`.${blockClass}`)).not.toBeInTheDocument();
      expect(document.querySelector(`.${blockClass}`)).toBeInTheDocument();
    });

    it('renders inline when disablePortal is true', () => {
      const { container } = render(
        <Tearsheet open={true} disablePortal={true} />
      );
      expect(container.querySelector(`.${blockClass}`)).toBeInTheDocument();
    });

    it('renders into a custom portalTarget', () => {
      const customTarget = document.createElement('div');
      document.body.appendChild(customTarget);

      render(<Tearsheet open={true} portalTarget={customTarget} />);

      expect(customTarget.querySelector(`.${blockClass}`)).toBeInTheDocument();

      document.body.removeChild(customTarget);
    });

    it('renders exactly once on first open (no double-mount)', () => {
      render(<Tearsheet open={true} />);

      const containers = document.querySelectorAll(
        `.${prefix}--modal-container`
      );
      expect(containers).toHaveLength(1);
    });
  });

  describe('keepMounted', () => {
    it('keeps the tearsheet in the DOM when closed', () => {
      const { rerender } = render(
        <Tearsheet open={true} keepMounted={true} disablePortal={true} />
      );
      expect(document.querySelector(`.${blockClass}`)).toBeInTheDocument();

      rerender(
        <Tearsheet open={false} keepMounted={true} disablePortal={true} />
      );

      expect(document.querySelector(`.${blockClass}`)).toBeInTheDocument();
      expect(document.querySelector(`.${blockClass}`)).not.toHaveClass(
        'is-visible'
      );
    });

    it('removes the tearsheet from the DOM when closed without keepMounted', async () => {
      const { rerender } = render(
        <Tearsheet open={true} disablePortal={true} />
      );
      expect(document.querySelector(`.${blockClass}`)).toBeInTheDocument();

      rerender(<Tearsheet open={false} disablePortal={true} />);

      await waitFor(() =>
        expect(document.querySelector(`.${blockClass}`)).not.toBeInTheDocument()
      );
    });
  });

  describe('accessibility', () => {
    it('applies aria-label when provided', () => {
      render(
        <Tearsheet open={true} ariaLabel="My tearsheet" disablePortal={true} />
      );
      expect(
        document.querySelector(`[aria-label="My tearsheet"]`)
      ).toBeInTheDocument();
    });

    it('falls back to aria-labelledby when ariaLabel is not provided', () => {
      render(<Tearsheet open={true} disablePortal={true} />);
      const container = document.querySelector(`.${prefix}--modal-container`);
      expect(container).toHaveAttribute('aria-labelledby');
      expect(container).not.toHaveAttribute('aria-label');
    });
  });

  describe('variant', () => {
    it('applies narrow modifier class when variant is narrow', () => {
      render(<Tearsheet open={true} variant="narrow" disablePortal={true} />);
      expect(document.querySelector(`.${blockClass}`)).toHaveClass(
        `${blockClass}--narrow`
      );
    });

    it('applies wide modifier class by default', () => {
      render(<Tearsheet open={true} disablePortal={true} />);
      expect(document.querySelector(`.${blockClass}`)).toHaveClass(
        `${blockClass}--wide`
      );
    });
  });

  it('applies containerClassName to the modal container', () => {
    render(
      <Tearsheet
        open={true}
        containerClassName="my-container"
        disablePortal={true}
      />
    );
    expect(document.querySelector(`.${blockClass}__container`)).toHaveClass(
      'my-container'
    );
  });

  describe('launcherButtonRef focus return', () => {
    it('returns focus to the launcher button after close', () => {
      jest.useFakeTimers();
      const buttonRef = createRef();

      const { rerender } = render(
        <div>
          <button ref={buttonRef} data-testid="launcher">
            Open
          </button>
          <Tearsheet
            open={true}
            disablePortal={true}
            keepMounted={true}
            launcherButtonRef={buttonRef}
          />
        </div>
      );

      rerender(
        <div>
          <button ref={buttonRef} data-testid="launcher">
            Open
          </button>
          <Tearsheet
            open={false}
            disablePortal={true}
            keepMounted={true}
            launcherButtonRef={buttonRef}
          />
        </div>
      );

      act(() => {
        jest.runAllTimers();
      });

      expect(document.activeElement).toBe(screen.getByTestId('launcher'));

      jest.useRealTimers();
    });
  });

  it('does not render menu button when actions not wrapped with HeaderActionItem', () => {
    render(
      <Tearsheet open={true}>
        <Tearsheet.Header>
          <Tearsheet.HeaderContent
            headerActions={
              <Tearsheet.HeaderActions
                menuButtonProps={{ label: 'Actions', kind: 'tertiary' }}>
                <Tearsheet.HeaderActionItem overflowItemLabel="Action 1">
                  <Button kind="tertiary" size="sm">
                    Action 1
                  </Button>
                </Tearsheet.HeaderActionItem>
                <Tearsheet.HeaderActionItem overflowItemLabel="Action 2">
                  <Button kind="tertiary" size="sm">
                    Action 2
                  </Button>
                </Tearsheet.HeaderActionItem>

                <Button kind="tertiary" size="sm">
                  Action 3
                </Button>
              </Tearsheet.HeaderActions>
            }
          />
        </Tearsheet.Header>
      </Tearsheet>
    );

    const buttons = document.querySelectorAll(
      `.${blockClass}__header-actions button`
    );
    const menuButton = document.querySelector(
      `.${blockClass}__header-actions-menuButton`
    );

    expect(buttons).toHaveLength(3);
    expect(menuButton).not.toBeInTheDocument();
  });
});
