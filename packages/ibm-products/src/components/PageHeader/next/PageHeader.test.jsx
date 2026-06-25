/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { cloneElement } from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Compact, Default } from './PageHeader.stories';
import { preview__PageHeader as PageHeader, pkg } from '../../..';
import {
  PageHeader as PageHeaderDirect,
  PageHeaderBreadcrumbBar as PageHeaderBreadcrumbBarDirect,
  PageHeaderContent as PageHeaderContentDirect,
  PageHeaderTabBar as PageHeaderTabBarDirect,
} from './PageHeader';
import { breakpoints } from '@carbon/layout';
import {
  Breadcrumb,
  BreadcrumbItem,
  TabList,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
  OperationalTag,
  OverflowMenu,
  OverflowMenuItem,
  Tag,
} from '@carbon/react';
import { Bee } from '@carbon/icons-react';

let mockOverflowOnChange = jest.fn();

jest.mock('@carbon/utilities', () => ({
  createOverflowHandler: jest.fn(({ onChange }) => {
    mockOverflowOnChange = onChange;
    return {
      disconnect: jest.fn(),
    };
  }),
}));

jest.mock('./overflowHandler', () => ({
  createOverflowHandler: jest.fn(({ onChange }) => {
    mockOverflowOnChange = onChange;
    return {
      disconnect: jest.fn(),
    };
  }),
}));

const prefix = 'c4p';
const carbonPrefix = 'cds';

describe('PageHeader', () => {
  describe('export configuration', () => {
    let savedObserverCb;

    beforeEach(() => {
      window.ResizeObserver = jest.fn().mockImplementation((cb) => {
        savedObserverCb = cb;
        return {
          observe: jest.fn(),
          unobserve: jest.fn(),
          disconnect: jest.fn(),
        };
      });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    // Triggers resize from the saved resize observer callback
    const triggerResize = (element, width = 500) =>
      act(() => {
        savedObserverCb([{ target: element, contentRect: { width } }]);
      });

    it('should update css variable for sticky positioning', () => {
      const testId = 'page-header-next-test-id';
      render(<Default {...Default.args} data-testid={testId} />);
      triggerResize();
      const computedStyle = window.getComputedStyle(screen.getByTestId(testId));
      expect(
        computedStyle.getPropertyValue(
          `--${pkg.prefix}--page-header-header-top`
        )
      ).toBeDefined();
      expect(
        computedStyle.getPropertyValue(
          `--${pkg.prefix}--page-header-breadcrumb-top`
        )
      ).toBeDefined();
    });

    it('supports dot notation component namespacing from the main entrypoint', () => {
      const { container } = render(<Default {...Default.args} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('supports direct component imports from the PageHeader path', () => {
      const { container } = render(
        <PageHeaderDirect>
          <PageHeaderBreadcrumbBarDirect />
          <PageHeaderContentDirect title="title" />
          <PageHeaderTabBarDirect />
        </PageHeaderDirect>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('PageHeader.Root component api', () => {
    it('should render', () => {
      const { container } = render(<PageHeader.Root />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should place className on the outermost element', () => {
      render(
        <Default {...Default.args} className="custom-class" role="banner" />
      );
      const pageHeaderOuter = screen.getByRole('banner');
      expect(pageHeaderOuter).toHaveClass('custom-class');
    });
  });

  describe('PageHeader.BreadcrumbBar component api', () => {
    it('should render', () => {
      const { container } = render(
        <PageHeader.Root>
          <PageHeader.BreadcrumbBar />
        </PageHeader.Root>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should place className on the outermost element', () => {
      const { container } = render(
        <PageHeader.Root>
          <PageHeader.BreadcrumbBar className="custom-class" />
        </PageHeader.Root>
      );
      expect(container.firstChild.firstChild).toHaveClass('custom-class');
    });

    it('should render an icon', () => {
      const { container } = render(
        <PageHeader.Root>
          <PageHeader.BreadcrumbBar
            renderIcon={() => {
              return <Bee size={16} />;
            }}
          />
        </PageHeader.Root>
      );

      const icon = container.querySelector(
        `.${prefix}--page-header__breadcrumb__icon`
      );
      expect(icon).toBeInTheDocument();
    });

    it('should render breadcrumb items', () => {
      render(<Default {...Default.args} role="banner" />);

      const pageHeaderOuter = screen.getByRole('banner');
      const breadcrumbs = pageHeaderOuter.getElementsByClassName(
        `${carbonPrefix}--breadcrumb-item`
      );

      expect(breadcrumbs.length).toBe(5);
    });

    it('should render content actions', () => {
      const { container } = render(
        <PageHeader.Root>
          <PageHeader.BreadcrumbBar
            contentActions={
              <button className="content-action-item">Button</button>
            }
          >
            <Breadcrumb>
              <BreadcrumbItem href="/#">Breadcrumb 1</BreadcrumbItem>
              <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
            </Breadcrumb>
          </PageHeader.BreadcrumbBar>
        </PageHeader.Root>
      );

      const elem = container.querySelector(`.content-action-item`);
      expect(elem).toBeInTheDocument();
    });

    it('should render page actions', () => {
      const { container } = render(
        <PageHeader.Root>
          <PageHeader.BreadcrumbBar
            pageActions={<button className="page-action-item">Button</button>}
          >
            <Breadcrumb>
              <BreadcrumbItem href="/#">Breadcrumb 1</BreadcrumbItem>
              <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
            </Breadcrumb>
          </PageHeader.BreadcrumbBar>
        </PageHeader.Root>
      );

      const elem = container.querySelector(`.page-action-item`);
      expect(elem).toBeInTheDocument();
    });

    it('should render the page header title breadcrumb', () => {
      const { container } = render(
        <PageHeader.Root>
          <PageHeader.BreadcrumbBar
            pageActions={<button className="page-action-item">Button</button>}
          >
            <Breadcrumb>
              <BreadcrumbItem href="/#">Breadcrumb 1</BreadcrumbItem>
              <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
              <PageHeader.TitleBreadcrumb className="title-breadcrumb-item">
                Title
              </PageHeader.TitleBreadcrumb>
            </Breadcrumb>
          </PageHeader.BreadcrumbBar>
          <PageHeader.Content title="title" />
        </PageHeader.Root>
      );
      const titleBreadcrumbElement = container.querySelector(
        '.title-breadcrumb-item'
      );
      expect(titleBreadcrumbElement).toBeInTheDocument();
    });
  });

  describe('PageHeader.Content component api', () => {
    it('should render', () => {
      const { container } = render(
        <PageHeader.Root>
          <PageHeader.Content title="title" />
        </PageHeader.Root>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should place className on the outermost element', () => {
      const { container } = render(
        <PageHeader.Root>
          <PageHeader.Content className="custom-class" title="title" />
        </PageHeader.Root>
      );
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(container.firstChild.firstChild).toHaveClass('custom-class');
    });

    it('should support a custom titleAs heading level', () => {
      render(
        <PageHeader.Root>
          <PageHeader.Content title="title" titleAs="h1" />
        </PageHeader.Root>
      );

      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    it('should render a title', () => {
      render(
        <PageHeader.Root>
          <PageHeader.Content title="Page header content title" />
        </PageHeader.Root>
      );

      expect(screen.getByText('Page header content title')).toBeInTheDocument();
    });

    it('should render an icon', () => {
      const { container } = render(
        <PageHeader.Root>
          <PageHeader.Content
            title="title"
            renderIcon={() => {
              return <Bee size={32} />;
            }}
          ></PageHeader.Content>
        </PageHeader.Root>
      );

      const icon = container.querySelector(
        `.${prefix}--page-header__content__icon`
      );
      expect(icon).toBeInTheDocument();
    });

    it('should render children', () => {
      render(
        <PageHeader.Root>
          <PageHeader.Content title="title">
            Children content
          </PageHeader.Content>
        </PageHeader.Root>
      );

      expect(screen.getByText('Children content')).toBeInTheDocument();
    });

    it('should render contextual actions', () => {
      const { container } = render(
        <PageHeader.Root>
          <PageHeader.Content
            title="title"
            contextualActions={
              <>
                <div>action 1</div>
                <div>action 2</div>
                <div>action 3</div>
              </>
            }
          ></PageHeader.Content>
        </PageHeader.Root>
      );

      const pageActions = container.querySelector(
        `.${prefix}--page-header__content__contextual-actions`
      );
      expect(pageActions).toBeInTheDocument();
    });

    it('should render page actions', () => {
      render(
        <PageHeader.Root>
          <PageHeader.Content
            title="title"
            pageActions={<button>page actions</button>}
          ></PageHeader.Content>
        </PageHeader.Root>
      );

      const buttonElement = screen.getByText(/page actions/i);
      expect(buttonElement).toBeInTheDocument();
    });

    it('should render functional content page actions', () => {
      render(
        <PageHeader.Root>
          <PageHeader.Content
            title="title"
            pageActions={() => <button>functional page actions</button>}
          />
        </PageHeader.Root>
      );

      expect(screen.getByText(/functional page actions/i)).toBeInTheDocument();
    });

    it('should render functional breadcrumb actions without errors', () => {
      render(
        <PageHeader.Root>
          <PageHeader.BreadcrumbBar
            contentActions={() => <button>functional content actions</button>}
            pageActions={() => (
              <button>functional breadcrumb page actions</button>
            )}
          >
            <Breadcrumb>
              <BreadcrumbItem href="/#">Breadcrumb 1</BreadcrumbItem>
              <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
            </Breadcrumb>
          </PageHeader.BreadcrumbBar>
        </PageHeader.Root>
      );

      expect(
        screen.getByText(/functional content actions/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/functional breadcrumb page actions/i)
      ).toBeInTheDocument();
    });
  });

  describe('PageHeader.ContentText component api', () => {
    it('should support a custom subtitleAs heading level', () => {
      render(<PageHeader.ContentText subtitle="Subtitle" subtitleAs="h4" />);

      expect(screen.getByRole('heading', { level: 4 })).toBeInTheDocument();
    });
  });

  describe('PageHeader.ContentPageActions component api', () => {
    const onClickMock = jest.fn();
    const mockPageActions = [
      {
        id: 'action1',
        onClick: jest.fn(),
        body: <button>Visible Action</button>,
        menuItem: {
          label: 'Action 1',
        },
      },
      {
        id: 'action2',
        onClick: onClickMock,
        body: <button>Hidden Action</button>,
        menuItem: {
          label: 'Action 2',
        },
      },
    ];

    it('should not show MenuButton when there are no hidden elements', async () => {
      // Render the component with the mock page actions
      const { container } = render(
        <PageHeader.Root>
          <PageHeader.ContentPageActions actions={mockPageActions} />
        </PageHeader.Root>
      );

      act(() => {
        mockOverflowOnChange(
          [mockPageActions[0]], // visible
          [] // no hidden elements
        );
      });

      // Check that the visible action is in the document
      expect(screen.getByText('Visible Action')).toBeInTheDocument();

      // check that the parent div of menu button is hidden
      const menuButton = container.querySelector(
        `.${carbonPrefix}--menu-button__container`
      );
      const parent = menuButton?.parentElement;
      expect(parent).toHaveAttribute('data-hidden');
    });

    it('should render MenuButton with hidden actions when overflow occurs', async () => {
      render(
        <PageHeader.Root>
          <PageHeader.ContentPageActions actions={mockPageActions} />
        </PageHeader.Root>
      );

      act(() => {
        mockOverflowOnChange(
          [mockPageActions[0]], // visible
          [mockPageActions[1]] // hidden
        );
      });

      // Find the menu button
      const menuButton = await screen.findByRole('button', {
        name: /Actions/i,
      });
      expect(menuButton).toBeInTheDocument();

      await act(() => {
        userEvent.click(menuButton);
      });

      const menu = await screen.findByRole('menu');
      expect(menu).toBeInTheDocument();

      // Check if the hidden action appears in the menu
      const menuItems = screen.getAllByRole('menuitem');
      expect(menuItems).toHaveLength(1); // Expecting just 1 item (the hidden action)
      expect(menuItems[0]).toHaveTextContent('Action 2');
    });

    it('should apply a custom className', () => {
      const { container } = render(
        <PageHeader.Root>
          <PageHeader.ContentPageActions
            className="custom-class"
            actions={mockPageActions}
          />
        </PageHeader.Root>
      );
      expect(container.firstChild.firstChild).toHaveClass('custom-class');
    });

    it('should use a custom menuButtonLabel if provided', () => {
      render(<Compact {...Compact.args} />);
      expect(
        screen.getByRole('button', { name: /actions/i })
      ).toBeInTheDocument();
    });

    it('should call onClick of hidden action when MenuItem is clicked', async () => {
      render(
        <PageHeader.Root>
          <PageHeader.ContentPageActions actions={mockPageActions} />
        </PageHeader.Root>
      );

      await act(() =>
        mockOverflowOnChange(
          [mockPageActions[0]], // visible
          [mockPageActions[1]] // hidden
        )
      );

      // Find the menu button
      const menuButton = await screen.findByRole('button', {
        name: /Actions/i,
      });
      expect(menuButton).toBeInTheDocument();

      await act(() => userEvent.click(menuButton));

      const menuItem = await screen.findByRole('menuitem', {
        name: /Action 2/i,
      });

      expect(menuItem).toBeInTheDocument();

      await act(() => userEvent.click(menuItem));

      expect(onClickMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('PageHeader.ContentText component api', () => {
    it('should render the child text', () => {
      const { container, getByText } = render(
        <PageHeader.Root>
          <PageHeader.ContentText>
            PageHeader content title
          </PageHeader.ContentText>
        </PageHeader.Root>
      );
      expect(container.firstChild).toBeInTheDocument();
      expect(getByText('PageHeader content title')).toBeInTheDocument();
    });

    it('should place className on the outermost element', () => {
      const { container } = render(
        <PageHeader.Root>
          <PageHeader.ContentText className="custom-class" />
        </PageHeader.Root>
      );
      expect(container.firstChild.firstChild).toHaveClass('custom-class');
    });

    it('should render a subtitle', () => {
      render(<Default {...Default.args} />);

      expect(screen.getByText('Subtitle')).toBeInTheDocument();
    });
  });

  describe('PageHeader.HeroImage component api', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
          matches: false,
          media: query,
          onchange: null,
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });
    });

    it('should place className on the outermost element', () => {
      const { container } = render(
        <PageHeader.Root>
          <PageHeader.HeroImage className="custom-class" />
        </PageHeader.Root>
      );
      expect(container.firstChild.firstChild).toHaveClass('custom-class');
    });

    it('should use a 2x1 ratio on large screens', () => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
          matches: true,
          media: query,
          onchange: null,
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });

      const { container } = render(
        <PageHeader.Root>
          <PageHeader.HeroImage>
            <picture>
              <source
                srcSet="https://picsum.photos/200/100"
                media={`(min-width: ${breakpoints.lg.width}`}
              />
              <source
                srcSet="https://picsum.photos/300/200"
                media={`(max-width: ${breakpoints.lg.width}`}
              />
              <img
                src="https://picsum.photos/200/100"
                alt="a default image"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </picture>
          </PageHeader.HeroImage>
        </PageHeader.Root>
      );

      expect(container.firstChild.firstChild).toHaveClass(
        `${carbonPrefix}--aspect-ratio--2x1`
      );
    });

    it('should use a 3x2 ratio on small screens', () => {
      const { container } = render(
        <PageHeader.Root>
          <PageHeader.HeroImage>
            <picture>
              <source
                srcSet="https://picsum.photos/200/100"
                media={`(min-width: ${breakpoints.lg.width}`}
              />
              <source
                srcSet="https://picsum.photos/300/200"
                media={`(max-width: ${breakpoints.lg.width}`}
              />
              <img
                src="https://picsum.photos/200/100"
                alt="a default image"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </picture>
          </PageHeader.HeroImage>
        </PageHeader.Root>
      );

      expect(container.firstChild.firstChild).toHaveClass(
        `${carbonPrefix}--aspect-ratio--3x2`
      );
    });
  });

  describe('PageHeader.TabBar component api', () => {
    it('should render', () => {
      const { container } = render(
        <PageHeader.Root>
          <PageHeader.TabBar />
        </PageHeader.Root>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should place className on the outermost element', () => {
      const { container } = render(
        <PageHeader.Root>
          <PageHeader.TabBar className="custom-class" />
        </PageHeader.Root>
      );
      expect(container.firstChild.firstChild).toHaveClass('custom-class');
    });
  });

  describe('PageHeader.TabBar component with tags', () => {
    const mockTags = [
      <Tag type="blue" id="example-tag-1" key="example-tag-1">
        Tag 1
      </Tag>,
      <Tag type="purple" id="example-tag-2" key="example-tag-2">
        Tag 2
      </Tag>,
      <Tag type="red" id="example-tag-3" key="example-tag-3">
        Tag 3
      </Tag>,
      <OperationalTag
        type="blue"
        id="example-tag-4"
        key="example-tag-4"
        text="Tag 4"
      />,
      <Tag type="purple" id="example-tag-5" key="example-tag-5">
        Tag 5
      </Tag>,
      <Tag type="red" id="example-tag-6" key="example-tag-6">
        Tag 6
      </Tag>,
    ];

    it('should render tags when provided', () => {
      render(
        <PageHeader.Root>
          <PageHeader.TabBar tags={mockTags} />
        </PageHeader.Root>
      );

      expect(screen.getByText('Tag 1')).toBeInTheDocument();
      expect(screen.getByText('Tag 2')).toBeInTheDocument();
      expect(screen.getByText('Tag 3')).toBeInTheDocument();
    });

    it('should not render tags when not provided', () => {
      render(
        <PageHeader.Root>
          <PageHeader.TabBar />
        </PageHeader.Root>
      );

      expect(screen.queryByText('Tag 1')).not.toBeInTheDocument();
      expect(screen.queryByText('Tag 2')).not.toBeInTheDocument();
      expect(screen.queryByText('Tag 3')).not.toBeInTheDocument();
    });

    it('should render tags alongside tabs', () => {
      render(
        <PageHeader.Root>
          <PageHeader.TabBar tags={mockTags}>
            <TabList aria-label="List of tabs">
              <Tab>Tab 1</Tab>
              <Tab>Tab 2</Tab>
            </TabList>
          </PageHeader.TabBar>
        </PageHeader.Root>
      );

      expect(screen.getByText('Tab 1')).toBeInTheDocument();
      expect(screen.getByText('Tab 2')).toBeInTheDocument();
      expect(screen.getByText('Tag 1')).toBeInTheDocument();
      expect(screen.getByText('Tag 2')).toBeInTheDocument();
      expect(screen.getByText('Tag 3')).toBeInTheDocument();
    });

    it('should apply correct classes to tags container', () => {
      const { container } = render(
        <PageHeader.Root>
          <PageHeader.TabBar
            tags={<PageHeader.TagOverflow>{mockTags}</PageHeader.TagOverflow>}
          />
        </PageHeader.Root>
      );

      const tagsContainer = container.querySelector(
        `.${prefix}--page-header--tag-overflow-container`
      );
      expect(tagsContainer).toBeInTheDocument();
    });

    it('should maintain tab focus management with tags present', async () => {
      render(
        <Tabs>
          <PageHeader.Root>
            <PageHeader.TabBar tags={mockTags}>
              <TabList aria-label="List of tabs">
                <Tab>Tab 1</Tab>
                <Tab>Tab 2</Tab>
                <Tab>Tab 3</Tab>
              </TabList>
            </PageHeader.TabBar>
          </PageHeader.Root>
          <TabPanels>
            <TabPanel>Tab Panel 1</TabPanel>
            <TabPanel>Tab Panel 2</TabPanel>
            <TabPanel>Tab Panel 3</TabPanel>
          </TabPanels>
        </Tabs>
      );

      const tab2Button = screen.getByRole('tab', { name: 'Tab 2' });
      const tab3Button = screen.getByRole('tab', { name: 'Tab 3' });

      // Verify tabs can be focused and clicked
      await act(() => userEvent.click(tab2Button));
      await waitFor(() => {
        expect(screen.getByText('Tab Panel 2')).toBeInTheDocument();
      });

      await act(() => userEvent.click(tab3Button));
      await waitFor(() => {
        expect(screen.getByText('Tab Panel 3')).toBeInTheDocument();
      });

      // Verify tags are still present and functional
      expect(screen.getByText('Tag 1')).toBeInTheDocument();
      expect(screen.getByText('Tag 2')).toBeInTheDocument();
      expect(screen.getByText('Tag 3')).toBeInTheDocument();
    });

    const WithTagOverflow = ({ noTags }) => (
      <PageHeader.Root>
        <PageHeader.TabBar
          tags={
            <PageHeader.TagOverflow
              renderOverflowTag={(
                hiddenItems,
                handleOverflowClick,
                openPopover
              ) => {
                if (!hiddenItems.length) {
                  return;
                }
                return (
                  <OperationalTag
                    onClick={handleOverflowClick}
                    aria-expanded={openPopover}
                    text={`+${hiddenItems.length}`}
                  />
                );
              }}
              renderPopoverContent={(hiddenItems) => {
                return hiddenItems.map((i, index) => {
                  const foundJSXTag = mockTags.find(
                    (c) => c.props.id === (i.id ?? i.props.id)
                  );
                  return cloneElement(foundJSXTag, {
                    id: `cloned-tag-node-id-${index}`,
                    key: `cloned-tag-key-${index}`,
                  });
                });
              }}
            >
              {!noTags ? mockTags : null}
            </PageHeader.TagOverflow>
          }
        >
          <TabList aria-label="List of tabs">
            <Tab>Tab 1</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>Tab Panel 1</TabPanel>
          </TabPanels>
        </PageHeader.TabBar>
      </PageHeader.Root>
    );

    describe('Overflow functionality', () => {
      it('should handle overflow items correctly', () => {
        render(<WithTagOverflow />);

        act(() => {
          mockOverflowOnChange(
            mockTags, // visible
            [] // no hidden elements
          );
        });

        // Check that tags `Tag n` are in the document
        for (let i = 0; i < 5; i++) {
          expect(screen.getByText(`Tag ${i + 1}`)).toBeInTheDocument();
        }

        act(() => {
          mockOverflowOnChange(
            mockTags.slice(0, 3), // visible, first 3 items
            mockTags.slice(-3) // hidden elements, last 3 items
          );
        });

        // Check that overflow indicator is present
        expect(screen.getByText('+3')).toBeInTheDocument();

        // Check that the overflow button is not expanded (popover closed)
        const overflowButton = screen.getByRole('button', { name: '+3' });
        expect(overflowButton).toHaveAttribute('aria-expanded', 'false');
      });

      it('should not show overflow tag when all items are visible', () => {
        render(<WithTagOverflow />);

        // All tags should be visible
        act(() => {
          mockOverflowOnChange(
            mockTags, // visible
            [] // no hidden elements
          );
        });
        // Check that tags `Tag n` are in the document
        for (let i = 0; i < 5; i++) {
          expect(screen.getByText(`Tag ${i + 1}`)).toBeInTheDocument();
        }

        // No overflow indicator should be present
        expect(screen.queryByText(/^\+\d+$/)).not.toBeInTheDocument();
      });

      it('should show hidden tags in popover when overflow tag is clicked', async () => {
        render(<WithTagOverflow />);

        act(() => {
          mockOverflowOnChange(
            [], // visible tags
            mockTags // hidden tags
          );
        });

        const overflowButton = screen.getByRole('button', { name: '+6' });

        // Initially popover should be closed
        expect(overflowButton).toHaveAttribute('aria-expanded', 'false');

        // Click to open popover
        await act(() => userEvent.click(overflowButton));

        // Check that popover is now open
        await waitFor(() => {
          expect(overflowButton).toHaveAttribute('aria-expanded', 'true');
        });
      });

      it('should close popover when clicked outside', async () => {
        render(<WithTagOverflow />);

        act(() => {
          mockOverflowOnChange(
            [], // visible tags
            mockTags // hidden tags
          );
        });

        const overflowButton = screen.getByRole('button', { name: '+6' });

        // Click to open popover
        await act(() => userEvent.click(overflowButton));

        // Verify popover is open
        await waitFor(() => {
          expect(overflowButton).toHaveAttribute('aria-expanded', 'true');
        });

        // Click outside popover
        await act(() => userEvent.click(document.body));

        // Verify popover is closed
        await waitFor(() => {
          expect(overflowButton).toHaveAttribute('aria-expanded', 'false');
        });
      });

      it('should handle window resize by closing popover', async () => {
        render(<WithTagOverflow />);

        act(() => {
          mockOverflowOnChange(
            [], // visible
            mockTags // no hidden elements
          );
        });

        const overflowButton = screen.getByRole('button', { name: '+6' });

        // Click to open popover
        await act(() => userEvent.click(overflowButton));

        // Verify popover is open
        await waitFor(() => {
          expect(overflowButton).toHaveAttribute('aria-expanded', 'true');
        });

        // Simulate window resize
        act(() => {
          window.dispatchEvent(new Event('resize'));
        });

        // Verify popover is closed after resize
        await waitFor(() => {
          expect(overflowButton).toHaveAttribute('aria-expanded', 'false');
        });
      });

      it('should handle returning null/undefined', () => {
        render(<WithTagOverflow noTags />);

        // Should use fallback values
        const tagsContainer = document.querySelector(
          `.${prefix}--page-header--tag-overflow-container`
        );
        expect(tagsContainer).toBeInTheDocument();

        // Should not render any tags (fallback to empty arrays)
        expect(screen.queryByText('Tag 1')).not.toBeInTheDocument();
      });
    });
  });
  describe('PageHeader.TabBar with scroller button', () => {
    beforeEach(() => {
      window.IntersectionObserver = jest.fn().mockImplementation(() => ({
        observe: () => null,
        unobserve: () => null,
        disconnect: () => null,
      }));
    });
    it('should render a tab bar with scroller button and tags', () => {
      render(
        <PageHeader.Root>
          <PageHeader.Content>Hello</PageHeader.Content>
          <PageHeaderTabBarDirect
            tags={
              <>
                <Tag type="blue" key="tag-1" id="1">
                  Tag 1
                </Tag>
                ,
                <Tag type="green" key="tag-2" id="2">
                  Tag 2
                </Tag>
                ,
                <Tag type="purple" key="tag-3" id="3">
                  Tag 3
                </Tag>
              </>
            }
            scroller={<PageHeader.ScrollButton />}
          />
        </PageHeader.Root>
      );
      expect(screen.getByLabelText('Collapse')).toBeInTheDocument();
    });
    it('should render a tab bar with scroller button and without passing tags', () => {
      render(
        <PageHeader.Root>
          <PageHeader.Content>Hello</PageHeader.Content>
          <PageHeaderTabBarDirect scroller={<PageHeader.ScrollButton />} />
        </PageHeader.Root>
      );
      expect(screen.getByLabelText('Collapse')).toBeInTheDocument();
    });
    it('should call onClick function passed to scroller', async () => {
      const scrollerOnClick = jest.fn();
      render(
        <PageHeader.Root>
          <PageHeader.Content>Hello</PageHeader.Content>
          <PageHeaderTabBarDirect
            scroller={<PageHeader.ScrollButton onClick={scrollerOnClick} />}
          />
        </PageHeader.Root>
      );
      const scrollerButton = screen.getByLabelText('Collapse');
      expect(scrollerButton).toBeInTheDocument();
      await waitFor(async () => {
        await userEvent.click(scrollerButton);
      });
      expect(scrollerOnClick).toHaveBeenCalledTimes(1);
    });
  });
  describe('PageHeader.BreadcrumbOverflow', () => {
    it('should render default breadcrumbs', () => {
      render(
        <PageHeader.Root>
          <PageHeader.BreadcrumbBar>
            <PageHeader.BreadcrumbOverflow>
              <BreadcrumbItem href="/#">Breadcrumb 1</BreadcrumbItem>
              <BreadcrumbItem href="/#">Breadcrumb 2</BreadcrumbItem>
              <BreadcrumbItem href="/#">Breadcrumb 3</BreadcrumbItem>
              <PageHeader.TitleBreadcrumb data-fixed>
                Virtual Machine DAL
              </PageHeader.TitleBreadcrumb>
            </PageHeader.BreadcrumbOverflow>
          </PageHeader.BreadcrumbBar>
        </PageHeader.Root>
      );
      expect(screen.getByText('Breadcrumb 1')).toBeInTheDocument();
      expect(screen.getByText('Breadcrumb 2')).toBeInTheDocument();
      expect(screen.getByText('Breadcrumb 3')).toBeInTheDocument();
      expect(screen.getByText('Virtual Machine DAL')).toBeInTheDocument();
    });
    it('should accept a ref', () => {
      const ref = React.createRef();
      render(
        <PageHeader.Root>
          <PageHeader.BreadcrumbBar>
            <PageHeader.BreadcrumbOverflow ref={ref}>
              <BreadcrumbItem href="/#">Breadcrumb 1</BreadcrumbItem>
            </PageHeader.BreadcrumbOverflow>
          </PageHeader.BreadcrumbBar>
        </PageHeader.Root>
      );
      expect(ref.current).toHaveClass(
        `${pkg.prefix}--page-header-breadcrumb-overflow`
      );
    });
    it('should render children without overflow breadcrumb', () => {
      const ref = React.createRef();
      render(
        <PageHeader.Root>
          <PageHeader.BreadcrumbBar>
            <PageHeader.BreadcrumbOverflow ref={ref}>
              <BreadcrumbItem href="/#">Breadcrumb 1</BreadcrumbItem>
              <BreadcrumbItem href="/#">Breadcrumb 1</BreadcrumbItem>
              <BreadcrumbItem href="/#">Breadcrumb 1</BreadcrumbItem>
            </PageHeader.BreadcrumbOverflow>
          </PageHeader.BreadcrumbBar>
        </PageHeader.Root>
      );
      const breadcrumbParent = ref.current.firstChild;
      expect(breadcrumbParent.childElementCount).toEqual(3);
    });
    it('should render children with overflow breadcrumb', () => {
      const renderPropFn = jest.fn();
      const ref = React.createRef();
      render(
        <PageHeader.Root>
          <PageHeader.BreadcrumbBar>
            <PageHeader.BreadcrumbOverflow
              ref={ref}
              renderOverflowBreadcrumb={() => {
                renderPropFn();
                return (
                  <BreadcrumbItem>
                    <OverflowMenu
                      align="bottom"
                      aria-label="Overflow menu in a breadcrumb"
                    >
                      <OverflowMenuItem itemText={'Hidden item'} />
                    </OverflowMenu>
                  </BreadcrumbItem>
                );
              }}
            >
              <BreadcrumbItem href="/#">Breadcrumb 1</BreadcrumbItem>
              <BreadcrumbItem href="/#">Breadcrumb 1</BreadcrumbItem>
              <BreadcrumbItem href="/#">Breadcrumb 1</BreadcrumbItem>
            </PageHeader.BreadcrumbOverflow>
          </PageHeader.BreadcrumbBar>
        </PageHeader.Root>
      );
      const breadcrumbParent = ref.current.firstChild;
      expect(breadcrumbParent.childElementCount).toEqual(4);
      expect(renderPropFn).toHaveBeenCalled();
    });
  });
});
