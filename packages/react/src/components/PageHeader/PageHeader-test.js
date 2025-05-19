/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { unstable__PageHeader as PageHeader } from '../../';
import {
  PageHeader as PageHeaderDirect,
  PageHeaderBreadcrumbBar as PageHeaderBreadcrumbBarDirect,
  PageHeaderContent as PageHeaderContentDirect,
  PageHeaderTabBar as PageHeaderTabBarDirect,
} from '../PageHeader';
import * as hooks from '../../internal/useMatchMedia';
import { breakpoints } from '@carbon/layout';
import { TabList, Tab, TabPanels, TabPanel } from '../Tabs/Tabs';
import { Bee } from '@carbon/icons-react';

const prefix = 'cds';

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

    it('should render a subtitle', () => {
      render(<PageHeader.Content title="title" subtitle="subtitle" />);

      expect(screen.getByText('subtitle')).toBeInTheDocument();
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
          pageActions={
            <>
              <div>action 1</div>
              <div>action 2</div>
              <div>action 3</div>
            </>
          }></PageHeader.Content>
      );

      const pageActions = container.querySelector(
        `.${prefix}--page-header__content__page-actions`
      );
      expect(pageActions).toBeInTheDocument();
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

  describe('PageHeader.TabBar component with tags', () => {
    const mockTags = [
      { id: '1', type: 'blue', text: 'Tag 1', size: 'md' },
      { id: '2', type: 'green', text: 'Tag 2', size: 'md' },
      { id: '3', type: 'purple', text: 'Tag 3', size: 'md' },
    ];

    it('should render tags when provided', () => {
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
      render(
        <PageHeader.TabBar tags={mockTags}>
          <PageHeader.Tabs>
            <TabList aria-label="List of tabs">
              <Tab>Tab 1</Tab>
              <Tab>Tab 2</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>Tab Panel 1</TabPanel>
              <TabPanel>Tab Panel 2</TabPanel>
            </TabPanels>
          </PageHeader.Tabs>
        </PageHeader.TabBar>
      );

      expect(screen.getByText('Tab 1')).toBeInTheDocument();
      expect(screen.getByText('Tab 2')).toBeInTheDocument();
      expect(screen.getByText('Tag 1')).toBeInTheDocument();
      expect(screen.getByText('Tag 2')).toBeInTheDocument();
      expect(screen.getByText('Tag 3')).toBeInTheDocument();
    });

    it('should apply correct classes to tags container', () => {
      const { container } = render(<PageHeader.TabBar tags={mockTags} />);

      const tagsContainer = container.querySelector(
        `.${prefix}--page-header__tags`
      );
      expect(tagsContainer).toBeInTheDocument();
    });
  });
});
