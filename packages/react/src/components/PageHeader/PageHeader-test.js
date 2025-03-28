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
});
