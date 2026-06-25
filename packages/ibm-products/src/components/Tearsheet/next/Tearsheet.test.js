/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';

import { AILabel, Button, IconButton, Tab, TabList } from '@carbon/react'; // Or your design system components
import { RightPanelClose } from '@carbon/icons-react';
import { Tearsheet } from './Tearsheet';
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';
import { blockClass } from './context';
import { StackProvider } from './StackContext';

const baseFontSize = '16px';
let mockOverflowOnChange;

jest.mock('../../../global/js/hooks/useResizeObserver', () => ({
  useResizeObserver: () => ({ width: 800 }), // arbitrary test width
}));
jest.mock('@carbon/utilities', () => ({
  createOverflowHandler: jest.fn(({ onChange }) => {
    mockOverflowOnChange = onChange;
  }),
}));
describe('Tearsheet component V2', () => {
  let setOpen, setInfluencerPanelOpen, setSummaryPanelOpen, handlePrevious;

  beforeAll(() => {
    // Set a default font size in jsdom
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
        selectorPrimaryFocus="#input1"
      >
        <Tearsheet.Header>
          <Tearsheet.HeaderContent
            open
            label="label"
            title="Title of the tearsheet"
            description="This is a description"
            headerActions={
              <Tearsheet.HeaderActions
                menuButtonProps={{ label: 'Actions', kind: 'tertiary' }}
              >
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
              onClick={() => setInfluencerPanelOpen(true)}
            >
              <RightPanelClose />
            </IconButton>
            <IconButton
              kind="ghost"
              label="Open right panel"
              onClick={() => setSummaryPanelOpen(true)}
            >
              <RightPanelClose />
            </IconButton>
            <div style={{ height: '1000px' }}>
              <input id="input1" placeholder="Enter an important value here" />
            </div>
          </Tearsheet.MainContent>

          <Tearsheet.SummaryContent
            summaryPanelOpen={false}
            onSummaryPanelClose={() => setSummaryPanelOpen(false)}
          >
            <h2>Summary details</h2>
          </Tearsheet.SummaryContent>
        </Tearsheet.Body>

        <Tearsheet.Footer>
          <Button
            className="step-action-button__cancel"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button onClick={() => handlePrevious()}>Back</Button>
          <Button>Submit</Button>
        </Tearsheet.Footer>
      </Tearsheet>
    );

  // ---------------------------
  //  TEST CASES
  // ---------------------------

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

    // Wait for Tearsheets to render
    const t1 = await screen.findByTestId('tearsheet-1');
    const t2 = await screen.findByTestId('tearsheet-2');
    const t3 = await screen.findByTestId('tearsheet-3');
    // Grab computed styles
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

    // Assertions: topmost tearsheet has smallest block-size-change
    expect(blockSizeChange1).toBe(32); // 2rem * 16px
    expect(blockSizeChange2).toBe(16); // 1rem * 16px
    expect(blockSizeChange3).toBe(0); // 0rem * 16px

    // Optional: ensure decreasing order
    expect(blockSizeChange1).toBeGreaterThan(blockSizeChange2);
    expect(blockSizeChange2).toBeGreaterThan(blockSizeChange3);
  });

  it('check header collapse functionality', async () => {
    renderTearsheet();
    const header = document.querySelector(`.${blockClass}__header`);

    expect(header).not.toHaveClass(`${blockClass}__header-collapsed`);

    // header collapse using scroll button
    const scrollerButton = document.querySelector(
      `.${blockClass}__scroller-button`
    );
    fireEvent.click(scrollerButton); //collapse the header

    expect(header).toHaveClass(`${blockClass}__header-collapsed`);

    fireEvent.click(scrollerButton); //expand the header
    expect(header).not.toHaveClass(`${blockClass}__header-collapsed`);

    //header collapse using scroll event
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

  it('not shows menu button when hidden items does not exist (via onChange)', async () => {
    render(
      <Tearsheet.HeaderActions
        menuButtonProps={{ label: 'Actions', kind: 'tertiary' }}
      >
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

    // Simulate overflow event
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
        menuButtonProps={{ label: 'Actions', kind: 'tertiary' }}
      >
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

    // Simulate overflow event
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
  it('check menu button is not rendered when all items are not wrapped with HeaderActionItem', () => {
    render(
      <Tearsheet open={true}>
        <Tearsheet.Header>
          <Tearsheet.HeaderContent
            headerActions={
              <Tearsheet.HeaderActions
                menuButtonProps={{ label: 'Actions', kind: 'tertiary' }}
              >
                <Tearsheet.HeaderActionItem overflowItemLabel="Action 1">
                  <Button kind="tertiary" size="sm">
                    Action 1
                  </Button>
                </Tearsheet.HeaderActionItem>
                <Tearsheet.HeaderActionItem overflowItemLabel="Action 1">
                  <Button kind="tertiary" size="sm">
                    Action 2
                  </Button>
                </Tearsheet.HeaderActionItem>

                <Button kind="tertiary" size="sm">
                  Action 3
                </Button>
              </Tearsheet.HeaderActions>
            }
          ></Tearsheet.HeaderContent>
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
