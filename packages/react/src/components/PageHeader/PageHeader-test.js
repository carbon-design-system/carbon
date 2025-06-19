/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { unstable__PageHeader as PageHeader } from '../../';
import {
  PageHeader as PageHeaderDirect,
  PageHeaderBreadcrumbBar as PageHeaderBreadcrumbBarDirect,
  PageHeaderContent as PageHeaderContentDirect,
  PageHeaderContentPageActions as PageHeaderContentPageActionsDirect,
  PageHeaderTabBar as PageHeaderTabBarDirect,
} from '../PageHeader';
import * as hooks from '../../internal/useMatchMedia';
import { breakpoints } from '@carbon/layout';
import { Breadcrumb, BreadcrumbItem } from '../Breadcrumb';
import { TabList, Tab, TabPanels, TabPanel } from '../Tabs/Tabs';
import { Bee } from '@carbon/icons-react';

import useOverflowItems from '../../internal/useOverflowItems';
const mockUseOverflowItems = useOverflowItems;

const prefix = 'cds';

let mockOverflowOnChange = jest.fn();

jest.mock('../../internal/useOverflowItems');

jest.mock('@carbon/utilities', () => ({
  createOverflowHandler: jest.fn(({ onChange }) => {
    mockOverflowOnChange = onChange;
  }),
}));

describe('PageHeader', () => {
  beforeEach(() => {
    mockUseOverflowItems.mockReset();
    mockUseOverflowItems.mockReturnValue({
      visibleItems: [],
      hiddenItems: [],
      itemRefHandler: jest.fn(),
    });
  });

  describe('export configuration', () => {
    it('supports dot notation component namespacing from the main entrypoint', () => {
      const { container } = render(
        <PageHeader.Root>
          <PageHeader.BreadcrumbBar />
          <PageHeader.Content title="title" />
          <PageHeader.TabBar />
        </PageHeader.Root>
      );
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
      const { container } = render(
        <PageHeader.Root className="custom-class" />
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('PageHeader.BreadcrumbBar component api', () => {
    it('should render', () => {
      const { container } = render(<PageHeader.BreadcrumbBar />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should place className on the outermost element', () => {
      const { container } = render(
        <PageHeader.BreadcrumbBar className="custom-class" />
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should render an icon', () => {
      const { container } = render(
        <PageHeader.BreadcrumbBar
          renderIcon={() => {
            return <Bee size={16} />;
          }}
        />
      );

      const icon = container.querySelector(
        `.${prefix}--page-header__breadcrumb__icon`
      );
      expect(icon).toBeInTheDocument();
    });

    it('should render breadcrumb items', () => {
      const { container } = render(
        <PageHeader.BreadcrumbBar>
          <Breadcrumb>
            <BreadcrumbItem href="/#">Breadcrumb 1</BreadcrumbItem>
            <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
          </Breadcrumb>
        </PageHeader.BreadcrumbBar>
      );

      const breadcrumbs = container.getElementsByClassName(
        `${prefix}--breadcrumb-item`
      );

      expect(breadcrumbs.length).toBe(2);
    });

    it('should render content actions', () => {
      const { container } = render(
        <PageHeader.BreadcrumbBar
          contentActions={
            <button className="content-action-item">Button</button>
          }>
          <Breadcrumb>
            <BreadcrumbItem href="/#">Breadcrumb 1</BreadcrumbItem>
            <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
          </Breadcrumb>
        </PageHeader.BreadcrumbBar>
      );

      const elem = container.querySelector(`.content-action-item`);
      expect(elem).toBeInTheDocument();
    });

    it('should render page actions', () => {
      const { container } = render(
        <PageHeader.BreadcrumbBar
          pageActions={<button className="page-action-item">Button</button>}>
          <Breadcrumb>
            <BreadcrumbItem href="/#">Breadcrumb 1</BreadcrumbItem>
            <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
          </Breadcrumb>
        </PageHeader.BreadcrumbBar>
      );

      const elem = container.querySelector(`.page-action-item`);
      expect(elem).toBeInTheDocument();
    });
  });

  describe('PageHeader.Content component api', () => {
    it('should render', () => {
      const { container } = render(<PageHeader.Content title="title" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should place className on the outermost element', () => {
      const { container } = render(
        <PageHeader.Content className="custom-class" title="title" />
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should render a title', () => {
      render(<PageHeader.Content title="Page header content title" />);

      expect(screen.getByText('Page header content title')).toBeInTheDocument();
    });

    it('should render an icon', () => {
      const { container } = render(
        <PageHeader.Content
          title="title"
          renderIcon={() => {
            return <Bee size={32} />;
          }}></PageHeader.Content>
      );

      const icon = container.querySelector(
        `.${prefix}--page-header__content__icon`
      );
      expect(icon).toBeInTheDocument();
    });

    it('should render children', () => {
      render(
        <PageHeader.Content title="title">Children content</PageHeader.Content>
      );

      expect(screen.getByText('Children content')).toBeInTheDocument();
    });

    it('should render contextual actions', () => {
      const { container } = render(
        <PageHeader.Content
          title="title"
          contextualActions={
            <>
              <div>action 1</div>
              <div>action 2</div>
              <div>action 3</div>
            </>
          }></PageHeader.Content>
      );

      const pageActions = container.querySelector(
        `.${prefix}--page-header__content__contextual-actions`
      );
      expect(pageActions).toBeInTheDocument();
    });

    it('should render page actions', () => {
      const { container } = render(
        <PageHeader.Content
          title="title"
          pageActions={<button>page actions</button>}></PageHeader.Content>
      );

      const buttonElement = screen.getByText(/page actions/i);
      expect(buttonElement).toBeInTheDocument();
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
        <PageHeader.ContentPageActions actions={mockPageActions} />
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
        `.${prefix}--menu-button__container`
      );
      const parent = menuButton?.parentElement;
      expect(parent).toHaveAttribute('data-hidden');
    });

    it('should render MenuButton with hidden actions when overflow occurs', async () => {
      render(<PageHeader.ContentPageActions actions={mockPageActions} />);

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

      await userEvent.click(menuButton);

      const menu = await screen.findByRole('menu');
      expect(menu).toBeInTheDocument();

      // Check if the hidden action appears in the menu
      const menuItems = screen.getAllByRole('menuitem');
      expect(menuItems).toHaveLength(1); // Expecting just 1 item (the hidden action)
      expect(menuItems[0]).toHaveTextContent('Action 2');
    });

    it('should apply a custom className', () => {
      const { container } = render(
        <PageHeader.ContentPageActions
          className="custom-class"
          actions={mockPageActions}
        />
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should use a custom menuButtonLabel if provided', () => {
      render(
        <PageHeader.ContentPageActions
          actions={mockPageActions}
          menuButtonLabel="Options"
        />
      );
      expect(screen.getByText('Options')).toBeInTheDocument();
    });

    it('should call onClick of hidden action when MenuItem is clicked', async () => {
      render(<PageHeader.ContentPageActions actions={mockPageActions} />);

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

      await userEvent.click(menuButton);

      const menuItem = await screen.findByRole('menuitem', {
        name: /Action 2/i,
      });
      await userEvent.click(menuItem);

      expect(onClickMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('PageHeader.ContentText component api', () => {
    it('should render the child text', () => {
      const { container, getByText } = render(
        <PageHeader.ContentText>
          PageHeader content title
        </PageHeader.ContentText>
      );
      expect(container.firstChild).toBeInTheDocument();
      expect(getByText('PageHeader content title')).toBeInTheDocument();
    });

    it('should place className on the outermost element', () => {
      const { container } = render(
        <PageHeader.ContentText className="custom-class" />
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should render a subtitle', () => {
      render(<PageHeader.ContentText subtitle="subtitle" />);

      expect(screen.getByText('subtitle')).toBeInTheDocument();
    });
  });

  describe('PageHeader.HeroImage component api', () => {
    beforeEach(() => {
      jest.resetModules();
      jest.spyOn(hooks, 'useMatchMedia').mockImplementation(() => true);
    });

    it('should place className on the outermost element', () => {
      const { container } = render(
        <PageHeader.HeroImage className="custom-class" />
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should use a 2x1 ratio on large screens', () => {
      const { container } = render(
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
      );

      expect(container.firstChild).toHaveClass(`${prefix}--aspect-ratio--2x1`);
    });

    it('should use a 3x2 ratio on small screens', () => {
      jest.spyOn(hooks, 'useMatchMedia').mockImplementation(() => false);

      const { container } = render(
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
      );

      expect(container.firstChild).toHaveClass(`${prefix}--aspect-ratio--3x2`);
    });
  });

  describe('PageHeader.TabBar component api', () => {
    it('should render', () => {
      const { container } = render(<PageHeader.TabBar />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should place className on the outermost element', () => {
      const { container } = render(
        <PageHeader.TabBar className="custom-class" />
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('PageHeader.TabBar component with tags', () => {
    const mockTags = [
      { id: '1', type: 'blue', text: 'Tag 1', size: 'md' },
      { id: '2', type: 'green', text: 'Tag 2', size: 'md' },
      { id: '3', type: 'purple', text: 'Tag 3', size: 'md' },
    ];

    it('should render tags when provided', () => {
      mockUseOverflowItems.mockReturnValue({
        visibleItems: mockTags,
        hiddenItems: [],
        itemRefHandler: jest.fn(),
      });

      render(<PageHeader.TabBar tags={mockTags} />);

      expect(screen.getByText('Tag 1')).toBeInTheDocument();
      expect(screen.getByText('Tag 2')).toBeInTheDocument();
      expect(screen.getByText('Tag 3')).toBeInTheDocument();
    });

    it('should not render tags when not provided', () => {
      render(<PageHeader.TabBar />);

      expect(screen.queryByText('Tag 1')).not.toBeInTheDocument();
      expect(screen.queryByText('Tag 2')).not.toBeInTheDocument();
      expect(screen.queryByText('Tag 3')).not.toBeInTheDocument();
    });

    it('should render tags alongside tabs', () => {
      mockUseOverflowItems.mockReturnValue({
        visibleItems: mockTags,
        hiddenItems: [],
        itemRefHandler: jest.fn(),
      });

      render(
        <PageHeader.TabBar tags={mockTags}>
          <TabList aria-label="List of tabs">
            <Tab>Tab 1</Tab>
            <Tab>Tab 2</Tab>
          </TabList>
        </PageHeader.TabBar>
      );

      expect(screen.getByText('Tab 1')).toBeInTheDocument();
      expect(screen.getByText('Tab 2')).toBeInTheDocument();
      expect(screen.getByText('Tag 1')).toBeInTheDocument();
      expect(screen.getByText('Tag 2')).toBeInTheDocument();
      expect(screen.getByText('Tag 3')).toBeInTheDocument();
    });

    it('should apply correct classes to tags container', () => {
      mockUseOverflowItems.mockReturnValue({
        visibleItems: mockTags,
        hiddenItems: [],
        itemRefHandler: jest.fn(),
      });

      const { container } = render(<PageHeader.TabBar tags={mockTags} />);

      const tagsContainer = container.querySelector(
        `.${prefix}--page-header__tags`
      );
      expect(tagsContainer).toBeInTheDocument();
    });

    it('should maintain tab focus management with tags present', async () => {
      mockUseOverflowItems.mockReturnValue({
        visibleItems: mockTags,
        hiddenItems: [],
        itemRefHandler: jest.fn(),
      });

      render(
        <>
          <PageHeader.TabBar tags={mockTags}>
            <TabList aria-label="List of tabs">
              <Tab>Tab 1</Tab>
              <Tab>Tab 2</Tab>
              <Tab>Tab 3</Tab>
            </TabList>
          </PageHeader.TabBar>
          <TabPanels>
            <TabPanel>Tab Panel 1</TabPanel>
            <TabPanel>Tab Panel 2</TabPanel>
            <TabPanel>Tab Panel 3</TabPanel>
          </TabPanels>
        </>
      );

      const tab1Button = screen.getByRole('tab', { name: 'Tab 1' });
      const tab2Button = screen.getByRole('tab', { name: 'Tab 2' });
      const tab3Button = screen.getByRole('tab', { name: 'Tab 3' });

      // Verify tabs can be focused and clicked
      await userEvent.click(tab2Button);
      await waitFor(() => {
        expect(screen.getByText('Tab Panel 2')).toBeInTheDocument();
      });

      await userEvent.click(tab3Button);
      await waitFor(() => {
        expect(screen.getByText('Tab Panel 3')).toBeInTheDocument();
      });

      // Verify tags are still present and functional
      expect(screen.getByText('Tag 1')).toBeInTheDocument();
      expect(screen.getByText('Tag 2')).toBeInTheDocument();
      expect(screen.getByText('Tag 3')).toBeInTheDocument();
    });

    describe('Overflow functionality', () => {
      it('should handle overflow items correctly', () => {
        mockUseOverflowItems.mockReturnValue({
          visibleItems: mockTags.slice(0, 2), // Only Tag 1 and Tag 2
          hiddenItems: mockTags.slice(2), // Only Tag 3
          itemRefHandler: jest.fn(),
        });

        render(
          <PageHeader.TabBar tags={mockTags}>
            <TabList aria-label="List of tabs">
              <Tab>Tab 1</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>Tab Panel 1</TabPanel>
            </TabPanels>
          </PageHeader.TabBar>
        );

        // Check that only visible tags are rendered
        expect(screen.getByText('Tag 1')).toBeInTheDocument();
        expect(screen.getByText('Tag 2')).toBeInTheDocument();

        // Check that overflow indicator is present
        expect(screen.getByText('+1')).toBeInTheDocument();

        // Check that the overflow button is not expanded (popover closed)
        const overflowButton = screen.getByRole('button', { name: '+1' });
        expect(overflowButton).toHaveAttribute('aria-expanded', 'false');
      });

      it('should not show overflow tag when all items are visible', () => {
        mockUseOverflowItems.mockReturnValue({
          visibleItems: mockTags,
          hiddenItems: [],
          itemRefHandler: jest.fn(),
        });

        render(<PageHeader.TabBar tags={mockTags} />);

        // All tags should be visible
        mockTags.forEach((tag) => {
          expect(screen.getByText(tag.text)).toBeInTheDocument();
        });

        // No overflow indicator should be present
        expect(screen.queryByText(/^\+\d+$/)).not.toBeInTheDocument();
      });

      it('should show hidden tags in popover when overflow tag is clicked', async () => {
        mockUseOverflowItems.mockReturnValue({
          visibleItems: mockTags.slice(0, 2),
          hiddenItems: mockTags.slice(2),
          itemRefHandler: jest.fn(),
        });

        render(<PageHeader.TabBar tags={mockTags} />);

        const overflowButton = screen.getByRole('button', { name: '+1' });

        // Initially popover should be closed
        expect(overflowButton).toHaveAttribute('aria-expanded', 'false');

        // Click to open popover
        await userEvent.click(overflowButton);

        // Check that popover is now open
        await waitFor(() => {
          expect(overflowButton).toHaveAttribute('aria-expanded', 'true');
        });
      });

      it('should close popover when clicked outside', async () => {
        mockUseOverflowItems.mockReturnValue({
          visibleItems: mockTags.slice(0, 2),
          hiddenItems: mockTags.slice(2),
          itemRefHandler: jest.fn(),
        });

        render(<PageHeader.TabBar tags={mockTags} />);

        const overflowButton = screen.getByRole('button', { name: '+1' });

        // Click to open popover
        await userEvent.click(overflowButton);

        // Verify popover is open
        await waitFor(() => {
          expect(overflowButton).toHaveAttribute('aria-expanded', 'true');
        });

        // Click outside popover
        await userEvent.click(document.body);

        // Verify popover is closed
        await waitFor(() => {
          expect(overflowButton).toHaveAttribute('aria-expanded', 'false');
        });
      });

      it('should handle window resize by closing popover', async () => {
        mockUseOverflowItems.mockReturnValue({
          visibleItems: mockTags.slice(0, 2),
          hiddenItems: mockTags.slice(2),
          itemRefHandler: jest.fn(),
        });

        render(<PageHeader.TabBar tags={mockTags} />);

        const overflowButton = screen.getByRole('button', { name: '+1' });

        // Click to open popover
        await userEvent.click(overflowButton);

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

      it('should handle useOverflowItems returning null/undefined', () => {
        // Mock the hook to return undefined/null
        mockUseOverflowItems.mockReturnValue(null);

        render(<PageHeader.TabBar tags={mockTags} />);

        // Should use fallback values
        const tagsContainer = document.querySelector('.cds--page-header__tags');
        expect(tagsContainer).toBeInTheDocument();

        // Should not render any tags (fallback to empty arrays)
        expect(screen.queryByText('Tag 1')).not.toBeInTheDocument();
      });

      it('should handle useOverflowItems returning undefined properties', () => {
        // Mock with missing properties
        mockUseOverflowItems.mockReturnValue({
          visibleItems: undefined,
          hiddenItems: undefined,
          itemRefHandler: undefined,
        });

        render(<PageHeader.TabBar tags={mockTags} />);

        // Should use fallback values from the || operator
        const tagsContainer = document.querySelector('.cds--page-header__tags');
        expect(tagsContainer).toBeInTheDocument();
      });

      it('should handle useOverflowItems with partial data', () => {
        // Mock with only some properties
        mockUseOverflowItems.mockReturnValue({
          visibleItems: mockTags.slice(0, 1),
          // hiddenItems and itemRefHandler missing
        });

        render(<PageHeader.TabBar tags={mockTags} />);

        expect(screen.getByText('Tag 1')).toBeInTheDocument();
      });
    });
  });
});
