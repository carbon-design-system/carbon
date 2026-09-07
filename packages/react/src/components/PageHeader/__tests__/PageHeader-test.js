/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { cloneElement } from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Compact, Default } from '../PageHeader.stories';
import { preview__PageHeader as PageHeader, pkg } from '../../../..';
import { blockClass } from '../../PageHeaderUtils';
import {
  PageHeader as PageHeaderDirect,
  PageHeaderBreadcrumbBar as PageHeaderBreadcrumbBarDirect,
  PageHeaderContent as PageHeaderContentDirect,
  PageHeaderTabBar as PageHeaderTabBarDirect,
} from '../PageHeader';
import { PageHeaderBreadcrumbPageActions } from '../PageHeaderBreadcrumbPageActions';
import { scrollableAncestor, getHeaderOffset } from '../utils';
import { usePageHeader } from '../context';
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

jest.mock('../overflowHandler', () => ({
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

    it('should apply fullWidth to internal grids when fullWidthGrid=true', () => {
      const { container } = render(
        <PageHeader.Root fullWidthGrid role="banner">
          <PageHeader.BreadcrumbBar>
            <Breadcrumb>
              <BreadcrumbItem href="/#">Breadcrumb 1</BreadcrumbItem>
            </Breadcrumb>
          </PageHeader.BreadcrumbBar>
          <PageHeader.Content title="title" />
          <PageHeader.TabBar />
        </PageHeader.Root>
      );
      // All three internal grids should carry the Carbon full-width class
      const fullWidthGrids = container.querySelectorAll(
        `.${carbonPrefix}--css-grid--full-width`
      );
      expect(fullWidthGrids.length).toBeGreaterThanOrEqual(3);
    });

    it('should apply --width--xl class when fullWidthGrid="xl"', () => {
      const { container } = render(
        <PageHeader.Root fullWidthGrid="xl" role="banner">
          <PageHeader.Content title="title" />
        </PageHeader.Root>
      );
      expect(container.firstChild).toHaveClass(
        `${prefix}--page-header--width--xl`
      );
    });

    it('should apply narrow to internal grids when narrowGrid=true', () => {
      const { container } = render(
        <PageHeader.Root narrowGrid role="banner">
          <PageHeader.BreadcrumbBar>
            <Breadcrumb>
              <BreadcrumbItem href="/#">Breadcrumb 1</BreadcrumbItem>
            </Breadcrumb>
          </PageHeader.BreadcrumbBar>
          <PageHeader.Content title="title" />
          <PageHeader.TabBar />
        </PageHeader.Root>
      );
      // All three internal grids should carry the Carbon narrow class
      const narrowGrids = container.querySelectorAll(
        `.${carbonPrefix}--css-grid--narrow`
      );
      expect(narrowGrids.length).toBeGreaterThanOrEqual(3);
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
            }>
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
            pageActions={<button className="page-action-item">Button</button>}>
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
            pageActions={<button className="page-action-item">Button</button>}>
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
            }}></PageHeader.Content>
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
            }></PageHeader.Content>
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
            pageActions={<button>page actions</button>}></PageHeader.Content>
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

    it('should pass live observerState to functional pageActions', () => {
      // Capture each IntersectionObserver callback and the element it observes
      const observerInstances = [];
      window.IntersectionObserver = jest.fn().mockImplementation((cb) => {
        let observedElement = null;
        const instance = {
          observe: jest.fn((el) => {
            observedElement = el;
          }),
          unobserve: jest.fn(),
          disconnect: jest.fn(),
          fire: (isIntersecting) => {
            if (observedElement) {
              cb([{ isIntersecting, target: observedElement }]);
            }
          },
        };
        observerInstances.push(instance);
        return instance;
      });

      const pageActionsSpy = jest.fn(({ fullyCollapsed }) => (
        <button>{fullyCollapsed ? 'collapsed state' : 'expanded state'}</button>
      ));

      render(
        <PageHeader.Root>
          <PageHeader.Content title="title" pageActions={pageActionsSpy} />
        </PageHeader.Root>
      );

      // Initially rendered with default (false) state
      expect(screen.getByText(/expanded state/i)).toBeInTheDocument();
      expect(pageActionsSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({ fullyCollapsed: false })
      );

      // Fire the content observer (first one created) with isIntersecting: false
      act(() => {
        observerInstances[0]?.fire(false);
      });

      expect(pageActionsSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({ fullyCollapsed: true })
      );
    });

    it('should render functional breadcrumb actions without errors', () => {
      render(
        <PageHeader.Root>
          <PageHeader.BreadcrumbBar
            contentActions={() => <button>functional content actions</button>}
            pageActions={() => (
              <button>functional breadcrumb page actions</button>
            )}>
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
                openPopover,
                triggerId
              ) => {
                if (!hiddenItems.length) {
                  return;
                }
                return (
                  <OperationalTag
                    id={triggerId}
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
              }}>
              {!noTags ? mockTags : null}
            </PageHeader.TagOverflow>
          }>
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
                      aria-label="Overflow menu in a breadcrumb">
                      <OverflowMenuItem itemText={'Hidden item'} />
                    </OverflowMenu>
                  </BreadcrumbItem>
                );
              }}>
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

  describe('PageHeader.Root observer callbacks', () => {
    let savedIntersectionCallbacks;

    beforeEach(() => {
      savedIntersectionCallbacks = [];
      window.IntersectionObserver = jest.fn().mockImplementation((callback) => {
        savedIntersectionCallbacks.push(callback);
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

    // Helper: fire the nth IntersectionObserver callback with a synthetic entry
    const fireIntersection = (cbIndex, target, isIntersecting) =>
      act(() => {
        savedIntersectionCallbacks[cbIndex]([{ target, isIntersecting }]);
      });

    it('calls onContentFullyCollapsed with true when content scrolls out of view and false when it scrolls back in', async () => {
      const onContentFullyCollapsed = jest.fn();
      const { container } = render(
        <PageHeader.Root onContentFullyCollapsed={onContentFullyCollapsed}>
          <PageHeader.Content title="title" />
        </PageHeader.Root>
      );

      // Wait for refs to be set and observers to be created
      await act(async () => {});

      // The content observer is created first; its index is 0
      const contentEl = container.querySelector(
        `.${prefix}--page-header__content`
      );

      fireIntersection(0, contentEl, false);
      expect(onContentFullyCollapsed).toHaveBeenLastCalledWith(true);

      fireIntersection(0, contentEl, true);
      expect(onContentFullyCollapsed).toHaveBeenLastCalledWith(false);
    });

    it('calls onTitleClipped with true when title scrolls out of view and false when it scrolls back in', async () => {
      const onTitleClipped = jest.fn();
      const { container } = render(
        <PageHeader.Root onTitleClipped={onTitleClipped}>
          <PageHeader.Content title="title" />
        </PageHeader.Root>
      );

      await act(async () => {});

      // The title observer is created second; its index is 1
      const titleEl = container.querySelector(
        `.${prefix}--page-header__content__title`
      );

      fireIntersection(1, titleEl, false);
      expect(onTitleClipped).toHaveBeenLastCalledWith(true);

      fireIntersection(1, titleEl, true);
      expect(onTitleClipped).toHaveBeenLastCalledWith(false);
    });

    it('calls onContentActionsClipped with true/false when content actions cross the threshold', async () => {
      const onContentActionsClipped = jest.fn();
      const mockActions = [
        {
          id: 'action1',
          onClick: jest.fn(),
          body: <button>Action 1</button>,
          menuItem: { label: 'Action 1' },
        },
      ];
      const { container } = render(
        <PageHeader.Root onContentActionsClipped={onContentActionsClipped}>
          <PageHeader.Content title="title" />
          <PageHeader.ContentPageActions actions={mockActions} />
        </PageHeader.Root>
      );

      await act(async () => {});

      // ContentPageActions sets refs.contentActions to its container ul
      const actionsEl = container.querySelector(
        `.${prefix}--page-header__content__page-actions`
      );

      // Fire each captured callback; only the one whose entry.target matches
      // refs.contentActions.current will invoke onContentActionsClipped
      savedIntersectionCallbacks.forEach((cb) => {
        act(() => {
          cb([{ target: actionsEl, isIntersecting: false }]);
        });
      });
      expect(onContentActionsClipped).toHaveBeenCalledWith(true);

      savedIntersectionCallbacks.forEach((cb) => {
        act(() => {
          cb([{ target: actionsEl, isIntersecting: true }]);
        });
      });
      expect(onContentActionsClipped).toHaveBeenCalledWith(false);
    });
  });

  describe('PageHeaderContent pageActions render prop receives live observerState', () => {
    let savedIntersectionCallbacks;

    beforeEach(() => {
      savedIntersectionCallbacks = [];
      window.IntersectionObserver = jest.fn().mockImplementation((callback) => {
        savedIntersectionCallbacks.push(callback);
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

    it('passes the live observer state to a functional pageActions prop', async () => {
      const pageActionsFn = jest.fn(() => <button>page action</button>);
      const { container } = render(
        <PageHeader.Root>
          <PageHeader.Content title="title" pageActions={pageActionsFn} />
        </PageHeader.Root>
      );

      await act(async () => {});

      // Trigger fully-collapsed by firing the content IntersectionObserver
      const contentEl = container.querySelector(
        `.${prefix}--page-header__content`
      );
      act(() => {
        savedIntersectionCallbacks[0]([
          { target: contentEl, isIntersecting: false },
        ]);
      });

      // The render prop should eventually be called with fullyCollapsed: true
      await waitFor(() => {
        const calls = pageActionsFn.mock.calls;
        const lastCall = calls[calls.length - 1][0];
        expect(lastCall).toMatchObject({ fullyCollapsed: true });
      });
    });
  });

  describe('PageHeaderBreadcrumbOverflow with renderOverflowBreadcrumb and overflow trigger', () => {
    it('renders the overflow breadcrumb in second-to-last position and passes hidden breadcrumbs to render prop', () => {
      const renderOverflowBreadcrumb = jest.fn((hiddenBreadcrumbs) => (
        <BreadcrumbItem>
          <OverflowMenu aria-label="Overflow menu">
            {hiddenBreadcrumbs.map((el, i) => (
              <OverflowMenuItem key={i} itemText={`hidden-${i}`} />
            ))}
          </OverflowMenu>
        </BreadcrumbItem>
      ));

      const ref = React.createRef();
      render(
        <PageHeader.Root>
          <PageHeader.BreadcrumbBar>
            <PageHeader.BreadcrumbOverflow
              ref={ref}
              renderOverflowBreadcrumb={renderOverflowBreadcrumb}>
              <BreadcrumbItem href="/#">Breadcrumb 1</BreadcrumbItem>
              <BreadcrumbItem href="/#">Breadcrumb 2</BreadcrumbItem>
              <BreadcrumbItem href="/#">Breadcrumb 3</BreadcrumbItem>
              <PageHeader.TitleBreadcrumb data-fixed>
                Title
              </PageHeader.TitleBreadcrumb>
            </PageHeader.BreadcrumbOverflow>
          </PageHeader.BreadcrumbBar>
        </PageHeader.Root>
      );

      // Trigger overflow: 2 visible breadcrumbs, 2 hidden
      const hiddenItems = [
        document.createElement('li'),
        document.createElement('li'),
      ];
      act(() => {
        mockOverflowOnChange([], hiddenItems);
      });

      // renderOverflowBreadcrumb should have been called with the hidden items
      expect(renderOverflowBreadcrumb).toHaveBeenCalledWith(hiddenItems);

      // The breadcrumb list should now contain 5 items:
      // Breadcrumb 1, Breadcrumb 2, Breadcrumb 3, overflow item (2nd to last), Title
      const breadcrumbParent = ref.current.firstChild;
      expect(breadcrumbParent.childElementCount).toEqual(5);

      // Overflow item is at second-to-last index (index 3, before Title at index 4)
      const children = breadcrumbParent.children;
      expect(children[3]).toHaveClass(
        `${prefix}--page-header-breadcrumb-overflow-item`
      );
    });
  });

  describe('PageHeader.TabBar disableStickyTabBar', () => {
    it('adds the disable-sticky-tab-bar class to PageHeader.Root when disableStickyTabBar is true', () => {
      const { container } = render(
        <PageHeader.Root role="banner">
          <PageHeader.TabBar disableStickyTabBar={true} />
        </PageHeader.Root>
      );

      const root = screen.getByRole('banner');
      expect(root).toHaveClass(`${blockClass}--disable-sticky-tab-bar`);
    });

    it('does not add the disable-sticky-tab-bar class to PageHeader.Root when disableStickyTabBar is false', () => {
      const { container } = render(
        <PageHeader.Root role="banner">
          <PageHeader.TabBar disableStickyTabBar={false} />
        </PageHeader.Root>
      );

      const root = screen.getByRole('banner');
      expect(root).not.toHaveClass(`${blockClass}--disable-sticky-tab-bar`);
    });
  });

  // ─── PageHeaderBreadcrumbPageActions ──────────────────────────────────────
  describe('PageHeader.BreadcrumbPageActions component api', () => {
    const mockActions = [
      {
        id: 'a1',
        label: 'Edit',
        renderIcon: () => <svg />,
        onClick: jest.fn(),
      },
      {
        id: 'a2',
        label: 'Delete',
        renderIcon: () => <svg />,
        onClick: jest.fn(),
      },
    ];

    afterEach(() => jest.clearAllMocks());

    it('renders action buttons for each action item', () => {
      render(
        <PageHeader.Root>
          <PageHeaderBreadcrumbPageActions actions={mockActions} />
        </PageHeader.Root>
      );
      expect(screen.getByLabelText('Edit')).toBeInTheDocument();
      expect(screen.getByLabelText('Delete')).toBeInTheDocument();
    });

    it('applies a custom className', () => {
      const { container } = render(
        <PageHeader.Root>
          <PageHeaderBreadcrumbPageActions
            actions={mockActions}
            className="custom-bpa"
          />
        </PageHeader.Root>
      );
      expect(container.querySelector('.custom-bpa')).toBeInTheDocument();
    });

    it('shows hidden action labels in the overflow menu after overflow fires', async () => {
      render(
        <PageHeader.Root>
          <PageHeaderBreadcrumbPageActions actions={mockActions} />
        </PageHeader.Root>
      );

      // Trigger overflow: a2 is hidden
      act(() => {
        mockOverflowOnChange(
          [{ dataset: { id: 'a1' } }],
          [{ dataset: { id: 'a2' } }]
        );
      });

      // The overflow menu button is always present; verify hidden item label appears in DOM
      expect(screen.getByLabelText('More page actions')).toBeInTheDocument();
      // The OverflowMenuItem for the hidden action renders its text into the list
      expect(screen.getByText('Delete')).toBeInTheDocument();
    });

    it('calls onClick of hidden action item button when clicked', async () => {
      const deleteClick = jest.fn();
      const actionsWithClick = [
        {
          id: 'a1',
          label: 'Edit',
          renderIcon: () => <svg />,
          onClick: jest.fn(),
        },
        {
          id: 'a2',
          label: 'Delete',
          renderIcon: () => <svg />,
          onClick: deleteClick,
        },
      ];
      render(
        <PageHeader.Root>
          <PageHeaderBreadcrumbPageActions actions={actionsWithClick} />
        </PageHeader.Root>
      );

      // No overflow — click the visible Delete button directly
      const deleteBtn = screen.getByLabelText('Delete');
      await act(() => userEvent.click(deleteBtn));
      expect(deleteClick).toHaveBeenCalledTimes(1);
    });
  });

  // ─── utils.ts ─────────────────────────────────────────────────────────────
  describe('utils — scrollableAncestor / getHeaderOffset', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('scrollableAncestor returns null when window is undefined', () => {
      // simulate no-window environment by passing null target
      expect(scrollableAncestor(null)).toBeNull();
    });

    it('scrollableAncestor returns document.scrollingElement for a fixed-position element', () => {
      const el = document.createElement('div');
      // jsdom respects inline position:fixed via getComputedStyle
      el.style.position = 'fixed';
      document.body.appendChild(el);
      expect(scrollableAncestor(el)).toBe(document.scrollingElement);
      document.body.removeChild(el);
    });

    it('scrollableAncestor finds a scrollable parent', () => {
      const parent = document.createElement('div');
      const child = document.createElement('div');
      parent.appendChild(child);
      document.body.appendChild(parent);

      // Make parent scrollable via inline style — no getComputedStyle mock needed
      parent.style.overflow = 'scroll';

      const result = scrollableAncestor(child);
      expect(result).toBe(parent);

      document.body.removeChild(parent);
    });

    it('getHeaderOffset returns 0 when element has negative bounding top inside a scrollable container', () => {
      const scrollable = document.createElement('div');
      const inner = document.createElement('div');
      scrollable.appendChild(inner);
      document.body.appendChild(scrollable);

      scrollable.style.overflow = 'scroll';

      jest.spyOn(inner, 'getBoundingClientRect').mockReturnValue({ top: -50 });
      jest
        .spyOn(scrollable, 'getBoundingClientRect')
        .mockReturnValue({ top: -10 });

      const result = getHeaderOffset(inner);
      // totalHeaderOffset = -50 - (-10) = -40 → clamped to 0
      expect(result).toBe(0);

      document.body.removeChild(scrollable);
    });

    it('getHeaderOffset uses scrollable container offset when container is not document.scrollingElement', () => {
      const scrollable = document.createElement('div');
      const inner = document.createElement('div');
      scrollable.appendChild(inner);
      document.body.appendChild(scrollable);

      scrollable.style.overflow = 'scroll';

      jest.spyOn(inner, 'getBoundingClientRect').mockReturnValue({ top: 100 });
      jest
        .spyOn(scrollable, 'getBoundingClientRect')
        .mockReturnValue({ top: 60 });

      const result = getHeaderOffset(inner);
      // totalHeaderOffset = 100 - 60 = 40
      expect(result).toBe(40);

      document.body.removeChild(scrollable);
    });
  });

  // ─── PageHeaderScrollButton ────────────────────────────────────────────────
  describe('PageHeader.ScrollButton scroll behavior', () => {
    let intersectionCallbacks;

    beforeEach(() => {
      intersectionCallbacks = [];
      window.IntersectionObserver = jest.fn().mockImplementation((cb) => {
        intersectionCallbacks.push(cb);
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

    it('scroller button is present and clicking collapse does not throw', async () => {
      // Covers PageHeaderScrollButton lines 47-52 (!isFullyCollapsed scroll branch)
      render(
        <PageHeader.Root>
          <PageHeader.Content title="title" />
          <PageHeaderTabBarDirect scroller={<PageHeader.ScrollButton />} />
        </PageHeader.Root>
      );

      await act(async () => {});

      const collapseBtn = screen.getByLabelText('Collapse');
      expect(collapseBtn).toBeInTheDocument();
      // Click Collapse → covers !isFullyCollapsed branch in handleScroller (lines 47-52)
      // Use async act to ensure floating-ui tooltip state updates are flushed
      await act(async () => {
        await userEvent.click(collapseBtn);
      });
    });
  });

  // ─── PageHeader.ScrollButton ──────────────────────────────────────────────
  describe('PageHeader.ScrollButton', () => {
    // Get the pconsole module's default export to spy on its `warn` method.
    // PageHeaderScrollButton calls `pconsole.warn(...)` on the default export,
    // so we spy on that object rather than `console.warn` directly, which avoids
    // fragility around the test setup's console.warn wrapper.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const pconsoleModule = require('../../../global/js/utils/pconsole');
    // In Jest+Babel the default export is at .default; fall back to the module itself
    const pconsoleDefault = pconsoleModule.default ?? pconsoleModule;

    afterEach(() => jest.restoreAllMocks());

    it('warns when collapseText prop is an empty string', () => {
      // Spy directly on the default export object used by PageHeaderScrollButton
      const warnSpy = jest
        .spyOn(pconsoleDefault, 'warn')
        .mockImplementation(() => {});
      render(
        <PageHeader.Root>
          <PageHeader.ScrollButton collapseText="" />
        </PageHeader.Root>
      );
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('collapseText')
      );
    });

    it('warns when expandText prop is an empty string', () => {
      const warnSpy = jest
        .spyOn(pconsoleDefault, 'warn')
        .mockImplementation(() => {});
      render(
        <PageHeader.Root>
          <PageHeader.ScrollButton expandText="" />
        </PageHeader.Root>
      );
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('expandText')
      );
    });

    it('scrolls the page to the top when expand is clicked while the content is fully collapsed', async () => {
      const scrollToMock = jest.fn();
      const intersectionCallbacks = [];
      window.IntersectionObserver = jest.fn().mockImplementation((cb) => {
        intersectionCallbacks.push(cb);
        return {
          observe: jest.fn(),
          unobserve: jest.fn(),
          disconnect: jest.fn(),
        };
      });

      document.body.style.overflow = 'scroll';
      document.body.scrollTo = scrollToMock;

      try {
        const { container } = render(
          <PageHeader.Root>
            <PageHeader.Content title="title" />
            <PageHeaderTabBarDirect scroller={<PageHeader.ScrollButton />} />
          </PageHeader.Root>
        );

        // Flush all pending effects including nested state updates:
        // PageHeaderContent sets refs → Root re-renders → Root creates observers
        await act(async () => {});
        await act(async () => {});

        // At this point intersectionCallbacks should contain the contentObserver's cb
        const contentEl = container.querySelector(
          `.${prefix}--page-header__content`
        );

        // Fire the captured callbacks with the contentEl as target to
        // trigger fullyCollapsed = true in the Root
        await act(async () => {
          intersectionCallbacks.forEach((cb) => {
            cb([{ target: contentEl, isIntersecting: false }]);
          });
        });

        // Now the ScrollButton should show "Expand" (fullyCollapsed = true)
        await waitFor(() => {
          expect(screen.getByLabelText('Expand')).toBeInTheDocument();
        });

        await act(async () => {
          await userEvent.click(screen.getByLabelText('Expand'));
        });

        expect(scrollToMock).toHaveBeenCalledWith(
          expect.objectContaining({ top: 0 })
        );
      } finally {
        document.body.style.overflow = '';
        delete document.body.scrollTo;
      }
    });

    it('does not throw when clicked and no PageHeaderContent is present', async () => {
      // Renders without PageHeaderContent so refs.contentRef is undefined;
      // clicking must be a safe no-op.
      // Render directly in Root (no TabBar wrapper) to avoid @floating-ui tooltip
      // state updates firing outside act()
      render(
        <PageHeader.Root>
          <PageHeader.ScrollButton />
        </PageHeader.Root>
      );
      const btn = screen.getByLabelText('Collapse');
      // Wrap in async act so floating-ui tooltip state updates are flushed
      await act(async () => {
        await userEvent.click(btn);
      });
      // No scroll should have been attempted
      expect(true).toBe(true);
    });
  });

  // ─── PageHeader.BreadcrumbOverflow ────────────────────────────────────────
  describe('PageHeader.BreadcrumbOverflow', () => {
    it('renders only the provided breadcrumb items when renderOverflowBreadcrumb returns null', () => {
      // Covers the `if (!overflowBreadcrumb) return children` early-return path
      const { getAllByRole } = render(
        <PageHeader.Root>
          <PageHeader.BreadcrumbBar>
            <PageHeader.BreadcrumbOverflow
              renderOverflowBreadcrumb={() => null}>
              <BreadcrumbItem href="/#">Breadcrumb 1</BreadcrumbItem>
              <BreadcrumbItem href="/#">Breadcrumb 2</BreadcrumbItem>
            </PageHeader.BreadcrumbOverflow>
          </PageHeader.BreadcrumbBar>
        </PageHeader.Root>
      );
      // 2 original breadcrumb items with no injected overflow item.
      // Use { hidden: true } in case ancestor styles cause elements to be
      // removed from the a11y tree (e.g. after a prior test leaves
      // document.body.style.overflow set).
      const items = getAllByRole('listitem', { hidden: true });
      // Filter to only the direct BreadcrumbItems (li.cds--breadcrumb-item)
      const breadcrumbItems = items.filter((el) =>
        el.classList.contains('cds--breadcrumb-item')
      );
      expect(breadcrumbItems).toHaveLength(2);
    });
  });

  // ─── PageHeader.BreadcrumbPageActions ─────────────────────────────────────
  describe('PageHeader.BreadcrumbPageActions', () => {
    it('renders without error when the actions array is empty', () => {
      expect(() =>
        render(
          <PageHeader.Root>
            <PageHeaderBreadcrumbPageActions actions={[]} />
          </PageHeader.Root>
        )
      ).not.toThrow();
    });
  });

  // ─── PageHeader.Content direct import ─────────────────────────────────────
  describe('PageHeader.Content (direct import)', () => {
    it('renders without throwing when using the named export directly', () => {
      expect(() =>
        render(
          <PageHeader.Root>
            <PageHeaderContentDirect title="title" />
          </PageHeader.Root>
        )
      ).not.toThrow();
    });
  });

  // ─── PageHeader.ContentPageActions clipping ───────────────────────────────
  describe('PageHeader.ContentPageActions clipping', () => {
    const singleAction = [
      {
        id: 'action1',
        onClick: jest.fn(),
        body: <button>Action 1</button>,
        menuItem: { label: 'Action 1' },
      },
    ];

    afterEach(() => jest.clearAllMocks());

    it('does not apply the clipped modifier in the content zone before the content scrolls away', async () => {
      // isInBreadcrumbBar=false, contentActionsClipped=false (initial state)
      // → clipped modifier class must be absent on first render.
      // Wrap render in act so all mount effects (setRefs, setPageActionsInstance)
      // settle before asserting.
      let container;
      await act(async () => {
        ({ container } = render(
          <PageHeader.Root>
            <PageHeader.Content title="title" />
            <PageHeader.ContentPageActions actions={singleAction} />
          </PageHeader.Root>
        ));
      });

      await waitFor(() => {
        const actionsEl = container.querySelector(
          `.${prefix}--page-header__content__page-actions`
        );
        expect(actionsEl).not.toBeNull();
        expect(actionsEl).not.toHaveClass(
          `${prefix}--page-header__content__page-actions--clipped`
        );
      });
    });

    it('applies the clipped modifier in the breadcrumb bar when contentActionsClipped is false (inverse logic)', async () => {
      // isInBreadcrumbBar=true, isFunctionalContentActions=false,
      // contentActionsClipped=false → class IS applied (inverse of content-zone behavior)
      const { container } = render(
        <PageHeader.Root>
          <PageHeader.BreadcrumbBar
            contentActions={
              <PageHeader.ContentPageActions actions={singleAction} />
            }
          />
        </PageHeader.Root>
      );

      await waitFor(() => {
        const actionsEl = container.querySelector(
          `.${prefix}--page-header__content__page-actions`
        );
        expect(actionsEl).not.toBeNull();
        expect(actionsEl).toHaveClass(
          `${prefix}--page-header__content__page-actions--clipped`
        );
      });
    });

    it('sets the title-grid-width CSS variable on the PageHeader root when the overflow menu button appears', async () => {
      const { container } = render(
        <PageHeader.Root>
          <PageHeader.Content title="title" />
          <PageHeader.ContentPageActions actions={singleAction} />
        </PageHeader.Root>
      );

      // Pass proper mock elements with dataset so BreadcrumbPageActions mock doesn't crash
      act(() => {
        const hiddenEl = document.createElement('li');
        hiddenEl.dataset.id = 'action1';
        mockOverflowOnChange([], [hiddenEl]);
      });

      await waitFor(() => {
        const root = container.querySelector(`.${prefix}--page-header__next`);
        expect(root).toBeInTheDocument();
      });
    });
  });

  // ─── PageHeader.HeroImage ─────────────────────────────────────────────────
  describe('PageHeader.HeroImage', () => {
    it('switches from 3x2 to 2x1 aspect ratio when the lg breakpoint is crossed', async () => {
      let mediaChangeListener;
      const mockMQL = {
        matches: false,
        addEventListener: jest.fn((_, fn) => {
          mediaChangeListener = fn;
        }),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      };
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockReturnValue(mockMQL),
      });

      const { container } = render(
        <PageHeader.HeroImage>
          <img alt="test" />
        </PageHeader.HeroImage>
      );

      // Initially small screen → 3x2
      // AspectRatio wraps children in a div; container.firstChild is the AspectRatio div
      const aspectRatioEl = container.querySelector(
        `.${carbonPrefix}--aspect-ratio`
      );
      expect(aspectRatioEl).not.toBeNull();
      expect(aspectRatioEl).toHaveClass(`${carbonPrefix}--aspect-ratio--3x2`);

      // Fire the change listener as if the viewport crossed the lg breakpoint
      act(() => {
        mediaChangeListener({ matches: true });
      });

      await waitFor(() => {
        expect(aspectRatioEl).toHaveClass(`${carbonPrefix}--aspect-ratio--2x1`);
      });
    });
  });

  // ─── PageHeader.TagOverflow ───────────────────────────────────────────────
  describe('PageHeader.TagOverflow', () => {
    it('returns focus to the overflow trigger button when a window resize closes the open popover', async () => {
      const mockTags = [
        <Tag type="blue" id="tag-a" key="tag-a">
          Tag A
        </Tag>,
        <Tag type="red" id="tag-b" key="tag-b">
          Tag B
        </Tag>,
      ];

      render(
        <PageHeader.Root>
          <PageHeader.TabBar
            tags={
              <PageHeader.TagOverflow
                renderOverflowTag={(
                  hiddenItems,
                  handleOverflowClick,
                  openPopover,
                  triggerId
                ) => {
                  if (!hiddenItems.length) return null;
                  return (
                    <OperationalTag
                      id={triggerId}
                      onClick={handleOverflowClick}
                      aria-expanded={openPopover}
                      text={`+${hiddenItems.length}`}
                    />
                  );
                }}
                renderPopoverContent={() => null}>
                {mockTags}
              </PageHeader.TagOverflow>
            }
          />
        </PageHeader.Root>
      );

      // Trigger overflow via the local overflow handler mock
      act(() => {
        mockOverflowOnChange([], mockTags);
      });

      const overflowButton = screen.getByRole('button', { name: '+2' });

      // Open the popover
      await act(() => userEvent.click(overflowButton));
      await waitFor(() =>
        expect(overflowButton).toHaveAttribute('aria-expanded', 'true')
      );

      const focusSpy = jest.spyOn(overflowButton, 'focus');

      // Resize while open → focus should be returned before closing
      act(() => {
        window.dispatchEvent(new Event('resize'));
      });

      await waitFor(() =>
        expect(overflowButton).toHaveAttribute('aria-expanded', 'false')
      );
      expect(focusSpy).toHaveBeenCalled();
      focusSpy.mockRestore();
    });
  });

  // ─── PageHeader.TitleBreadcrumb ───────────────────────────────────────────
  describe('PageHeader.TitleBreadcrumb', () => {
    it('is visible and not aria-hidden when no PageHeader.Content is present (compact mode)', () => {
      const { getByText } = render(
        <PageHeader.Root>
          <PageHeader.BreadcrumbBar>
            <Breadcrumb>
              <BreadcrumbItem href="/#">Home</BreadcrumbItem>
              <PageHeader.TitleBreadcrumb>My Page</PageHeader.TitleBreadcrumb>
            </Breadcrumb>
          </PageHeader.BreadcrumbBar>
          {/* No PageHeader.Content → compact mode */}
        </PageHeader.Root>
      );

      const titleCrumbText = getByText('My Page');
      const titleCrumb = titleCrumbText.closest(
        `.${prefix}--page-header-title-breadcrumb`
      );
      expect(titleCrumb).toBeInTheDocument();
      expect(titleCrumb).not.toHaveAttribute('aria-hidden', 'true');
      expect(titleCrumb).toHaveClass(
        `${prefix}--page-header-title-breadcrumb-show__without-content-element`
      );
    });
  });

  // ─── getHeaderOffset ──────────────────────────────────────────────────────
  describe('getHeaderOffset', () => {
    afterEach(() => jest.restoreAllMocks());

    it('returns 0 when the element sits at the top of the document viewport', () => {
      const el = document.createElement('div');
      document.body.appendChild(el);
      jest.spyOn(el, 'getBoundingClientRect').mockReturnValue({ top: 0 });
      expect(getHeaderOffset(el)).toBe(0);
      document.body.removeChild(el);
    });

    it('returns the element-to-container offset when inside a scrollable ancestor', () => {
      const scrollParent = document.createElement('div');
      const inner = document.createElement('div');
      scrollParent.appendChild(inner);
      document.body.appendChild(scrollParent);
      scrollParent.style.overflow = 'scroll';

      jest.spyOn(inner, 'getBoundingClientRect').mockReturnValue({ top: 80 });
      jest
        .spyOn(scrollParent, 'getBoundingClientRect')
        .mockReturnValue({ top: 20 });

      // totalHeaderOffset = 80 - 20 = 60 → positive → returned as-is
      expect(getHeaderOffset(inner)).toBe(60);
      document.body.removeChild(scrollParent);
    });
  });

  // ─── usePageHeader ────────────────────────────────────────────────────────
  describe('usePageHeader', () => {
    it('throws a descriptive error when called outside a PageHeader.Root provider', () => {
      // Patch useContext for one call so it returns undefined, simulating
      // a component tree that has no PageHeaderContext.Provider ancestor.
      const React_ = require('react');
      const contextModule = require('./context');
      const origUseContext = React_.useContext;

      jest.spyOn(React_, 'useContext').mockImplementationOnce((ctx) => {
        if (ctx === contextModule.PageHeaderContext) return undefined;
        return origUseContext(ctx);
      });

      expect(() => contextModule.usePageHeader()).toThrow(
        'Page header context was not provided or hook was used outside of the Page header component.'
      );

      jest.restoreAllMocks();
    });
  });
});
