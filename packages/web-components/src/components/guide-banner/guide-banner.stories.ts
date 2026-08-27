/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// cspell:disable

import { html } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { fn } from 'storybook/test';
import './index';
import styles from './story-styles.scss?lit';
import {
  snapScroll,
  scrollNext,
  scrollPrevious,
  hasNextSiblingNotInView,
  hasPreviousSiblingNotInView,
} from '../../utilities/snapscroll';
import { iconLoader } from '../../globals/internal/icon-loader';
import ChevronRight16 from '@carbon/icons/es/chevron--right/';
import ChevronLeft16 from '@carbon/icons/es/chevron--left/';
import Crossroads from '@carbon/icons/es/crossroads/16.js';
import type { Args, Meta } from '@storybook/web-components';

const blockClass = 'guide-banner-story';

type GuideBannerStoryItem = {
  titleText: string;
  descriptionText: string;
  buttonType?: string;
  buttonText: string;
  hasIcon?: boolean;
  isLink?: boolean;
  linkHref?: string;
  idx: number;
};

const manyInsightsItems: GuideBannerStoryItem[] = [
  {
    titleText: 'Use-case specific heading',
    descriptionText:
      'Use-case specific content related to the heading that explains the concept or adds context. Use-case specific content related to the heading that explains the concept or adds context.',
    buttonType: 'tertiary',
    buttonText: 'Show Me',
    hasIcon: true,
    idx: 0,
  },
  {
    titleText: 'Use-case specific heading',
    descriptionText:
      'Use-case specific content related to the heading that explains the concept or adds context. Use-case specific content related to the heading that explains the concept or adds context. Use-case specific content related to the heading that explains the concept or adds context.',
    buttonType: 'ghost',
    buttonText: 'Click me',
    idx: 1,
  },
  {
    titleText: 'Use-case specific heading',
    descriptionText:
      'Use-case specific content related to the heading that explains the concept or adds context.',
    buttonType: 'ghost',
    buttonText: 'Click me',
    idx: 2,
  },
  {
    titleText: 'Use-case specific heading',
    descriptionText:
      'Use-case specific content related to the heading that explains the concept or adds context. Use-case specific content related to the heading that explains the concept or adds context.',
    isLink: true,
    linkHref: 'https://www.ibm.com',
    buttonText: 'Learn more',
    idx: 3,
  },
  {
    titleText: 'Use-case specific heading',
    descriptionText:
      'Use-case specific content related to the heading that explains the concept or adds context.',
    isLink: true,
    linkHref: 'https://www.ibm.com',
    buttonText: 'Learn more',
    idx: 4,
  },
];

const fewInsightsItems: GuideBannerStoryItem[] = [
  {
    titleText: 'Use-case specific heading',
    descriptionText:
      'Use-case specific content related to the heading that explains the concept or adds context. Use-case specific content related to the heading that explains the concept or adds context.',
    buttonType: 'tertiary',
    buttonText: 'Show Me',
    hasIcon: true,
    idx: 0,
  },
  {
    titleText: 'Use-case specific heading',
    descriptionText:
      'Use-case specific content related to the heading that explains the concept or adds context.',
    isLink: true,
    linkHref: 'https://www.ibm.com',
    buttonText: 'Learn more',
    idx: 1,
  },
];

const renderTemplate = (args: Args) => {
  const {
    '@cds-guidebanner-toggle': handleToggle,
    '@cds-guidebanner-close': handleOnClose,
    collapseText,
    expandText,
    titleText,
    open,
    items = manyInsightsItems,
    withLeftGutter,
  } = args;

  document.addEventListener('DOMContentLoaded', () => {
    snapScroll(`.${blockClass}__body`, `.${blockClass}__body-elm`);
  });

  const nextHandler = () => {
    scrollNext();
  };

  const previousHandler = () => {
    scrollPrevious();
  };

  const scrollendHandler = () => {
    const nextBtn = document.getElementById('next-btn');
    if (hasNextSiblingNotInView()) {
      nextBtn?.removeAttribute('disabled');
    } else {
      nextBtn?.setAttribute('disabled', '');
    }

    const previousBtn = document.getElementById('previous-btn');
    if (hasPreviousSiblingNotInView()) {
      previousBtn?.removeAttribute('disabled');
    } else {
      previousBtn?.setAttribute('disabled', '');
    }
  };

  return html`
    <style>
      ${styles}
    </style>
    <cds-guide-banner
      @cds-guidebanner-toggle=${handleToggle}
      @cds-guidebanner-close=${handleOnClose}
      class=${withLeftGutter
        ? `${blockClass} ${blockClass}--with-left-gutter`
        : blockClass}
      collapseText=${collapseText}
      expandText=${expandText}
      ?open=${open}
      titleText=${titleText}>
      <div slot="body">
        <div
          class="${blockClass}__body"
          dir="ltr"
          @scrollend=${scrollendHandler}>
          ${repeat(
            items,
            (item: GuideBannerStoryItem) => item.idx,
            (item: GuideBannerStoryItem) => html`
              <cds-guide-banner-element class="${blockClass}__body-elm">
                <div slot="title">${item.titleText}</div>
                <div slot="description">${item.descriptionText}</div>
                ${item.isLink
                  ? html`<cds-link href="${item.linkHref}" target="_blank"
                      >${item.buttonText}</cds-link
                    >`
                  : html`<cds-button kind="${item.buttonType}">
                      ${item.buttonText}
                      ${item.hasIcon
                        ? html`${iconLoader(Crossroads, { slot: 'icon' })}`
                        : ''}
                    </cds-button>`}
              </cds-guide-banner-element>
            `
          )}
        </div>
      </div>
      <div class="${blockClass}__footer" slot="footer">
        <div class="${blockClass}__footer-left">
          <cds-button
            id="toggle-btn"
            kind="ghost"
            class="${blockClass}__toggle-button"
            @click=${(evt: MouseEvent) => {
              const guideBanner = (evt.target as HTMLElement)?.closest(
                'cds-guide-banner'
              ) as
                | (HTMLElement & { open: boolean; _handleToggle(): void })
                | null;
              const toggleBtn = evt.target as HTMLElement;
              const footerRight = document.querySelector(
                `.${blockClass}__footer-right`
              ) as HTMLElement;
              if (guideBanner) {
                guideBanner._handleToggle();
                // Update button text and navigation visibility after toggle
                setTimeout(() => {
                  const btn = toggleBtn.closest('cds-button');
                  if (btn) {
                    btn.textContent = guideBanner.open
                      ? collapseText
                      : expandText;
                  }
                  // Show/hide navigation buttons based on open state
                  if (footerRight) {
                    footerRight.style.display = guideBanner.open
                      ? 'flex'
                      : 'none';
                  }
                }, 0);
              }
            }}>
            ${open ? collapseText : expandText}
          </cds-button>
        </div>
        <div
          class="${blockClass}__footer-right"
          style="display: ${open ? 'flex' : 'none'}">
          <cds-button
            id="previous-btn"
            kind="ghost"
            class="${blockClass}__toggle-button"
            @click=${previousHandler}
            ?disabled=${true}>
            <span
              @click=${(evt: MouseEvent) => {
                evt.preventDefault();
              }}>
              ${iconLoader(ChevronLeft16, { slot: 'icon' })}
            </span>
          </cds-button>
          <cds-button
            id="next-btn"
            kind="ghost"
            class="${blockClass}__toggle-button"
            @click=${nextHandler}
            ?disabled=${false}>
            <span
              @click=${(evt: MouseEvent) => {
                evt.preventDefault();
              }}>
              ${iconLoader(ChevronRight16, { slot: 'icon' })}
            </span>
          </cds-button>
        </div>
      </div>
    </cds-guide-banner>
  `;
};

const defaultArgs = {
  '@cds-guidebanner-toggle': fn(),
  '@cds-guidebanner-close': fn(),
  collapseText: 'Read less',
  expandText: 'Read more',
  titleText: 'Page-related heading that can stand on its own',
  open: true,
  items: manyInsightsItems,
  withLeftGutter: false,
};

const meta: Meta = {
  title: 'Experimental/GuideBanner',
  component: 'cds-guide-banner',
};

export default meta;

export const Default = {
  args: {
    ...defaultArgs,
  },
  argTypes: {},
  render: renderTemplate,
};

export const Collapsible = {
  args: {
    ...defaultArgs,
    open: false,
  },
  argTypes: {},
  render: renderTemplate,
};

export const ManyInsights = {
  args: {
    ...defaultArgs,
    open: false,
    items: manyInsightsItems,
  },
  argTypes: {},
  render: renderTemplate,
};

export const FewInsights = {
  args: {
    ...defaultArgs,
    open: false,
    items: fewInsightsItems,
  },
  argTypes: {},
  render: renderTemplate,
};

export const WithCustomLabels = {
  args: {
    '@cds-guidebanner-toggle': fn(),
    '@cds-guidebanner-close': fn(),
    collapseText: 'Show less',
    expandText: 'Show more',
    titleText: 'Page-related heading that can stand on its own',
    open: true,
  },
  render: renderTemplate,
};

export const WithoutTitle = {
  args: {
    '@cds-guidebanner-toggle': fn(),
    '@cds-guidebanner-close': fn(),
    collapseText: 'Read less',
    expandText: 'Read more',
    titleText: '',
    open: true,
  },
  render: renderTemplate,
};
