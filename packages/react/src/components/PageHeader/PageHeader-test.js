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

const prefix = 'cds';

let mockOverflowOnChange = jest.fn();

jest.mock('@carbon/utilities', () => ({
  createOverflowHandler: jest.fn(({ onChange }) => {
    mockOverflowOnChange = onChange;
  }),
}));

describe('PageHeader', () => {
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

    it('should render children', () => {
      const { container } = render(
        <PageHeader.TabBar>
          <div data-testid="test-child">Child content</div>
        </PageHeader.TabBar>
      );

      expect(screen.getByTestId('test-child')).toBeInTheDocument();
    });
  });

  describe('PageHeader.Tabs component api', () => {
    it('should render', () => {
      const { container } = render(
        <PageHeader.Tabs>
          <TabList aria-label="List of tabs">
            <Tab>Tab 1</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>Tab Panel 1</TabPanel>
          </TabPanels>
        </PageHeader.Tabs>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should render children within the Tabs component', () => {
      render(
        <PageHeader.Tabs>
          <TabList aria-label="List of tabs">
            <Tab>Tab 1</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>Tab Panel 1</TabPanel>
          </TabPanels>
        </PageHeader.Tabs>
      );

      expect(screen.getByText('Tab 1')).toBeInTheDocument();
      expect(screen.getByText('Tab Panel 1')).toBeInTheDocument();
    });

    it('should forward props to the internal Tabs component', () => {
      render(
        <PageHeader.Tabs onTabCloseRequest={() => {}} dismissable>
          <TabList aria-label="List of tabs">
            <Tab>Tab 1</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>Tab Panel 1</TabPanel>
          </TabPanels>
        </PageHeader.Tabs>
      );
      expect(
        document.querySelector(`.${prefix}--tabs--dismissable`)
      ).toBeInTheDocument();
    });

    it('should work with the TabBar component', () => {
      const { container } = render(
        <PageHeader.TabBar>
          <PageHeader.Tabs>
            <TabList aria-label="List of tabs">
              <Tab>Tab 1</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>Tab Panel 1</TabPanel>
            </TabPanels>
          </PageHeader.Tabs>
        </PageHeader.TabBar>
      );

      expect(
        container.querySelector(`.${prefix}--page-header__tab-bar`)
      ).toBeInTheDocument();
      expect(screen.getByText('Tab 1')).toBeInTheDocument();
      expect(screen.getByText('Tab Panel 1')).toBeInTheDocument();
    });
  });
});
