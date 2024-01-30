/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { unstable_metadata } from '../';

test('metadata', () => {
  expect(unstable_metadata).toMatchInlineSnapshot(`
    Object {
      "v10": Array [
        Object {
          "name": "interactive-01",
          "type": "color",
        },
        Object {
          "name": "interactive-02",
          "type": "color",
        },
        Object {
          "name": "interactive-03",
          "type": "color",
        },
        Object {
          "name": "interactive-04",
          "type": "color",
        },
        Object {
          "name": "ui-background",
          "type": "color",
        },
        Object {
          "name": "ui-01",
          "type": "color",
        },
        Object {
          "name": "ui-02",
          "type": "color",
        },
        Object {
          "name": "ui-03",
          "type": "color",
        },
        Object {
          "name": "ui-04",
          "type": "color",
        },
        Object {
          "name": "ui-05",
          "type": "color",
        },
        Object {
          "name": "text-01",
          "type": "color",
        },
        Object {
          "name": "text-02",
          "type": "color",
        },
        Object {
          "name": "text-03",
          "type": "color",
        },
        Object {
          "name": "text-04",
          "type": "color",
        },
        Object {
          "name": "text-05",
          "type": "color",
        },
        Object {
          "name": "text-error",
          "type": "color",
        },
        Object {
          "name": "icon-01",
          "type": "color",
        },
        Object {
          "name": "icon-02",
          "type": "color",
        },
        Object {
          "name": "icon-03",
          "type": "color",
        },
        Object {
          "name": "link-01",
          "type": "color",
        },
        Object {
          "name": "link-02",
          "type": "color",
        },
        Object {
          "name": "inverse-link",
          "type": "color",
        },
        Object {
          "name": "field-01",
          "type": "color",
        },
        Object {
          "name": "field-02",
          "type": "color",
        },
        Object {
          "name": "inverse-01",
          "type": "color",
        },
        Object {
          "name": "inverse-02",
          "type": "color",
        },
        Object {
          "name": "support-01",
          "type": "color",
        },
        Object {
          "name": "support-02",
          "type": "color",
        },
        Object {
          "name": "support-03",
          "type": "color",
        },
        Object {
          "name": "support-04",
          "type": "color",
        },
        Object {
          "name": "inverse-support-01",
          "type": "color",
        },
        Object {
          "name": "inverse-support-02",
          "type": "color",
        },
        Object {
          "name": "inverse-support-03",
          "type": "color",
        },
        Object {
          "name": "inverse-support-04",
          "type": "color",
        },
        Object {
          "name": "overlay-01",
          "type": "color",
        },
        Object {
          "name": "danger-01",
          "type": "color",
        },
        Object {
          "name": "danger-02",
          "type": "color",
        },
        Object {
          "name": "focus",
          "type": "color",
        },
        Object {
          "name": "inverse-focus-ui",
          "type": "color",
        },
        Object {
          "name": "hover-primary",
          "type": "color",
        },
        Object {
          "name": "active-primary",
          "type": "color",
        },
        Object {
          "name": "hover-primary-text",
          "type": "color",
        },
        Object {
          "name": "hover-secondary",
          "type": "color",
        },
        Object {
          "name": "active-secondary",
          "type": "color",
        },
        Object {
          "name": "hover-tertiary",
          "type": "color",
        },
        Object {
          "name": "active-tertiary",
          "type": "color",
        },
        Object {
          "name": "hover-ui",
          "type": "color",
        },
        Object {
          "name": "hover-light-ui",
          "type": "color",
        },
        Object {
          "name": "hover-selected-ui",
          "type": "color",
        },
        Object {
          "name": "active-ui",
          "type": "color",
        },
        Object {
          "name": "active-light-ui",
          "type": "color",
        },
        Object {
          "name": "selected-ui",
          "type": "color",
        },
        Object {
          "name": "selected-light-ui",
          "type": "color",
        },
        Object {
          "name": "inverse-hover-ui",
          "type": "color",
        },
        Object {
          "name": "hover-danger",
          "type": "color",
        },
        Object {
          "name": "active-danger",
          "type": "color",
        },
        Object {
          "name": "hover-row",
          "type": "color",
        },
        Object {
          "name": "visited-link",
          "type": "color",
        },
        Object {
          "name": "disabled-01",
          "type": "color",
        },
        Object {
          "name": "disabled-02",
          "type": "color",
        },
        Object {
          "name": "disabled-03",
          "type": "color",
        },
        Object {
          "name": "highlight",
          "type": "color",
        },
        Object {
          "name": "decorative-01",
          "type": "color",
        },
        Object {
          "name": "button-separator",
          "type": "color",
        },
        Object {
          "name": "skeleton-01",
          "type": "color",
        },
        Object {
          "name": "skeleton-02",
          "type": "color",
        },
        Object {
          "name": "brand-01",
          "type": "color",
        },
        Object {
          "name": "brand-02",
          "type": "color",
        },
        Object {
          "name": "brand-03",
          "type": "color",
        },
        Object {
          "name": "active-01",
          "type": "color",
        },
        Object {
          "name": "hover-field",
          "type": "color",
        },
        Object {
          "name": "danger",
          "type": "color",
        },
        Object {
          "name": "caption-01",
          "type": "type",
        },
        Object {
          "name": "caption-02",
          "type": "type",
        },
        Object {
          "name": "label-01",
          "type": "type",
        },
        Object {
          "name": "label-02",
          "type": "type",
        },
        Object {
          "name": "helper-text-01",
          "type": "type",
        },
        Object {
          "name": "helper-text-02",
          "type": "type",
        },
        Object {
          "name": "body-short-01",
          "type": "type",
        },
        Object {
          "name": "body-long-01",
          "type": "type",
        },
        Object {
          "name": "body-short-02",
          "type": "type",
        },
        Object {
          "name": "body-long-02",
          "type": "type",
        },
        Object {
          "name": "code-01",
          "type": "type",
        },
        Object {
          "name": "code-02",
          "type": "type",
        },
        Object {
          "name": "heading-01",
          "type": "type",
        },
        Object {
          "name": "productive-heading-01",
          "type": "type",
        },
        Object {
          "name": "heading-02",
          "type": "type",
        },
        Object {
          "name": "productive-Heading-02",
          "type": "type",
        },
        Object {
          "name": "productive-heading-03",
          "type": "type",
        },
        Object {
          "name": "productive-heading-04",
          "type": "type",
        },
        Object {
          "name": "productive-heading-05",
          "type": "type",
        },
        Object {
          "name": "productive-heading-06",
          "type": "type",
        },
        Object {
          "name": "productive-heading-07",
          "type": "type",
        },
        Object {
          "name": "expressive-heading-01",
          "type": "type",
        },
        Object {
          "name": "expressive-heading-02",
          "type": "type",
        },
        Object {
          "name": "expressive-heading-03",
          "type": "type",
        },
        Object {
          "name": "expressive-heading-04",
          "type": "type",
        },
        Object {
          "name": "expressive-heading-05",
          "type": "type",
        },
        Object {
          "name": "expressive-heading-06",
          "type": "type",
        },
        Object {
          "name": "expressive-paragraph-01",
          "type": "type",
        },
        Object {
          "name": "quotation-01",
          "type": "type",
        },
        Object {
          "name": "quotation-02",
          "type": "type",
        },
        Object {
          "name": "display-01",
          "type": "type",
        },
        Object {
          "name": "display-02",
          "type": "type",
        },
        Object {
          "name": "display-03",
          "type": "type",
        },
        Object {
          "name": "display-04",
          "type": "type",
        },
        Object {
          "name": "spacing-01",
          "type": "layout",
        },
        Object {
          "name": "spacing-02",
          "type": "layout",
        },
        Object {
          "name": "spacing-03",
          "type": "layout",
        },
        Object {
          "name": "spacing-04",
          "type": "layout",
        },
        Object {
          "name": "spacing-05",
          "type": "layout",
        },
        Object {
          "name": "spacing-06",
          "type": "layout",
        },
        Object {
          "name": "spacing-07",
          "type": "layout",
        },
        Object {
          "name": "spacing-08",
          "type": "layout",
        },
        Object {
          "name": "spacing-09",
          "type": "layout",
        },
        Object {
          "name": "spacing-10",
          "type": "layout",
        },
        Object {
          "name": "spacing-11",
          "type": "layout",
        },
        Object {
          "name": "spacing-12",
          "type": "layout",
        },
        Object {
          "name": "spacing-13",
          "type": "layout",
        },
        Object {
          "name": "layout-01",
          "type": "layout",
        },
        Object {
          "name": "layout-02",
          "type": "layout",
        },
        Object {
          "name": "layout-03",
          "type": "layout",
        },
        Object {
          "name": "layout-04",
          "type": "layout",
        },
        Object {
          "name": "layout-05",
          "type": "layout",
        },
        Object {
          "name": "layout-06",
          "type": "layout",
        },
        Object {
          "name": "layout-07",
          "type": "layout",
        },
        Object {
          "name": "fluid-spacing-01",
          "type": "layout",
        },
        Object {
          "name": "fluid-spacing-02",
          "type": "layout",
        },
        Object {
          "name": "fluid-spacing-03",
          "type": "layout",
        },
        Object {
          "name": "fluid-spacing-04",
          "type": "layout",
        },
        Object {
          "name": "container-01",
          "type": "layout",
        },
        Object {
          "name": "container-02",
          "type": "layout",
        },
        Object {
          "name": "container-03",
          "type": "layout",
        },
        Object {
          "name": "container-04",
          "type": "layout",
        },
        Object {
          "name": "container-05",
          "type": "layout",
        },
        Object {
          "name": "icon-size-01",
          "type": "layout",
        },
        Object {
          "name": "icon-size-02",
          "type": "layout",
        },
      ],
      "v11": Array [
        Object {
          "name": "background",
          "type": "color",
        },
        Object {
          "name": "background-active",
          "type": "color",
        },
        Object {
          "name": "background-selected",
          "type": "color",
        },
        Object {
          "name": "background-selected-hover",
          "type": "color",
        },
        Object {
          "name": "background-hover",
          "type": "color",
        },
        Object {
          "name": "background-brand",
          "type": "color",
        },
        Object {
          "name": "background-inverse",
          "type": "color",
        },
        Object {
          "name": "background-inverse-hover",
          "type": "color",
        },
        Object {
          "name": "layer-01",
          "type": "color",
        },
        Object {
          "name": "layer-active-01",
          "type": "color",
        },
        Object {
          "name": "layer-hover-01",
          "type": "color",
        },
        Object {
          "name": "layer-selected-01",
          "type": "color",
        },
        Object {
          "name": "layer-selected-hover-01",
          "type": "color",
        },
        Object {
          "name": "layer-02",
          "type": "color",
        },
        Object {
          "name": "layer-active-02",
          "type": "color",
        },
        Object {
          "name": "layer-hover-02",
          "type": "color",
        },
        Object {
          "name": "layer-selected-02",
          "type": "color",
        },
        Object {
          "name": "layer-selected-hover-02",
          "type": "color",
        },
        Object {
          "name": "layer-03",
          "type": "color",
        },
        Object {
          "name": "layer-active-03",
          "type": "color",
        },
        Object {
          "name": "layer-hover-03",
          "type": "color",
        },
        Object {
          "name": "layer-selected-03",
          "type": "color",
        },
        Object {
          "name": "layer-selected-hover-03",
          "type": "color",
        },
        Object {
          "name": "layer-selected-inverse",
          "type": "color",
        },
        Object {
          "name": "layer-selected-disabled",
          "type": "color",
        },
        Object {
          "name": "layer-accent-01",
          "type": "color",
        },
        Object {
          "name": "layer-accent-active-01",
          "type": "color",
        },
        Object {
          "name": "layer-accent-hover-01",
          "type": "color",
        },
        Object {
          "name": "layer-accent-02",
          "type": "color",
        },
        Object {
          "name": "layer-accent-active-02",
          "type": "color",
        },
        Object {
          "name": "layer-accent-hover-02",
          "type": "color",
        },
        Object {
          "name": "layer-accent-03",
          "type": "color",
        },
        Object {
          "name": "layer-accent-active-03",
          "type": "color",
        },
        Object {
          "name": "layer-accent-hover-03",
          "type": "color",
        },
        Object {
          "name": "field-01",
          "type": "color",
        },
        Object {
          "name": "field-hover-01",
          "type": "color",
        },
        Object {
          "name": "field-02",
          "type": "color",
        },
        Object {
          "name": "field-hover-02",
          "type": "color",
        },
        Object {
          "name": "field-03",
          "type": "color",
        },
        Object {
          "name": "field-hover-03",
          "type": "color",
        },
        Object {
          "name": "interactive",
          "type": "color",
        },
        Object {
          "name": "border-subtle-00",
          "type": "color",
        },
        Object {
          "name": "border-subtle-01",
          "type": "color",
        },
        Object {
          "name": "border-subtle-selected-01",
          "type": "color",
        },
        Object {
          "name": "border-subtle-02",
          "type": "color",
        },
        Object {
          "name": "border-subtle-selected-02",
          "type": "color",
        },
        Object {
          "name": "border-subtle-03",
          "type": "color",
        },
        Object {
          "name": "border-subtle-selected-03",
          "type": "color",
        },
        Object {
          "name": "border-strong-01",
          "type": "color",
        },
        Object {
          "name": "border-strong-02",
          "type": "color",
        },
        Object {
          "name": "border-strong-03",
          "type": "color",
        },
        Object {
          "name": "border-tile-01",
          "type": "color",
        },
        Object {
          "name": "border-tile-02",
          "type": "color",
        },
        Object {
          "name": "border-tile-03",
          "type": "color",
        },
        Object {
          "name": "border-inverse",
          "type": "color",
        },
        Object {
          "name": "border-interactive",
          "type": "color",
        },
        Object {
          "name": "border-disabled",
          "type": "color",
        },
        Object {
          "name": "text-primary",
          "type": "color",
        },
        Object {
          "name": "text-secondary",
          "type": "color",
        },
        Object {
          "name": "text-placeholder",
          "type": "color",
        },
        Object {
          "name": "text-helper",
          "type": "color",
        },
        Object {
          "name": "text-error",
          "type": "color",
        },
        Object {
          "name": "text-inverse",
          "type": "color",
        },
        Object {
          "name": "text-on-color",
          "type": "color",
        },
        Object {
          "name": "text-on-color-disabled",
          "type": "color",
        },
        Object {
          "name": "text-disabled",
          "type": "color",
        },
        Object {
          "name": "link-primary",
          "type": "color",
        },
        Object {
          "name": "link-primary-hover",
          "type": "color",
        },
        Object {
          "name": "link-secondary",
          "type": "color",
        },
        Object {
          "name": "link-visited",
          "type": "color",
        },
        Object {
          "name": "link-inverse",
          "type": "color",
        },
        Object {
          "name": "link-inverse-active",
          "type": "color",
        },
        Object {
          "name": "link-inverse-hover",
          "type": "color",
        },
        Object {
          "name": "icon-primary",
          "type": "color",
        },
        Object {
          "name": "icon-secondary",
          "type": "color",
        },
        Object {
          "name": "icon-inverse",
          "type": "color",
        },
        Object {
          "name": "icon-on-color",
          "type": "color",
        },
        Object {
          "name": "icon-on-color-disabled",
          "type": "color",
        },
        Object {
          "name": "icon-disabled",
          "type": "color",
        },
        Object {
          "name": "icon-interactive",
          "type": "color",
        },
        Object {
          "name": "support-error",
          "type": "color",
        },
        Object {
          "name": "support-success",
          "type": "color",
        },
        Object {
          "name": "support-warning",
          "type": "color",
        },
        Object {
          "name": "support-info",
          "type": "color",
        },
        Object {
          "name": "support-error-inverse",
          "type": "color",
        },
        Object {
          "name": "support-success-inverse",
          "type": "color",
        },
        Object {
          "name": "support-warning-inverse",
          "type": "color",
        },
        Object {
          "name": "support-info-inverse",
          "type": "color",
        },
        Object {
          "name": "support-caution-major",
          "type": "color",
        },
        Object {
          "name": "support-caution-minor",
          "type": "color",
        },
        Object {
          "name": "support-caution-undefined",
          "type": "color",
        },
        Object {
          "name": "slug-background",
          "type": "color",
        },
        Object {
          "name": "slug-gradient",
          "type": "color",
        },
        Object {
          "name": "slug-background-hover",
          "type": "color",
        },
        Object {
          "name": "slug-gradient-hover",
          "type": "color",
        },
        Object {
          "name": "slug-hollow-hover",
          "type": "color",
        },
        Object {
          "name": "slug-callout-gradient-top",
          "type": "color",
        },
        Object {
          "name": "slug-callout-gradient-bottom",
          "type": "color",
        },
        Object {
          "name": "slug-callout-aura-start",
          "type": "color",
        },
        Object {
          "name": "slug-callout-aura-end",
          "type": "color",
        },
        Object {
          "name": "slug-callout-gradient-top-hover",
          "type": "color",
        },
        Object {
          "name": "slug-callout-gradient-bottom-hover",
          "type": "color",
        },
        Object {
          "name": "slug-callout-aura-start-hover-01",
          "type": "color",
        },
        Object {
          "name": "slug-callout-aura-start-hover-02",
          "type": "color",
        },
        Object {
          "name": "slug-callout-aura-end-hover-01",
          "type": "color",
        },
        Object {
          "name": "slug-callout-aura-end-hover-02",
          "type": "color",
        },
        Object {
          "name": "slug-callout-gradient-top-selected",
          "type": "color",
        },
        Object {
          "name": "slug-callout-gradient-bottom-selected",
          "type": "color",
        },
        Object {
          "name": "slug-callout-aura-start-selected",
          "type": "color",
        },
        Object {
          "name": "slug-callout-aura-end-selected",
          "type": "color",
        },
        Object {
          "name": "ai-gradient-start-01",
          "type": "color",
        },
        Object {
          "name": "ai-gradient-start-02",
          "type": "color",
        },
        Object {
          "name": "ai-gradient-end",
          "type": "color",
        },
        Object {
          "name": "slug-callout-shadow-outer-01",
          "type": "color",
        },
        Object {
          "name": "slug-callout-shadow-outer-02",
          "type": "color",
        },
        Object {
          "name": "ai-inner-shadow",
          "type": "color",
        },
        Object {
          "name": "ai-aura-start",
          "type": "color",
        },
        Object {
          "name": "ai-aura-end",
          "type": "color",
        },
        Object {
          "name": "ai-aura-hover-background",
          "type": "color",
        },
        Object {
          "name": "ai-aura-hover-start",
          "type": "color",
        },
        Object {
          "name": "ai-aura-hover-end",
          "type": "color",
        },
        Object {
          "name": "ai-border-strong",
          "type": "color",
        },
        Object {
          "name": "ai-border-start",
          "type": "color",
        },
        Object {
          "name": "ai-border-end",
          "type": "color",
        },
        Object {
          "name": "ai-drop-shadow",
          "type": "color",
        },
        Object {
          "name": "slug-callout-caret-center",
          "type": "color",
        },
        Object {
          "name": "slug-callout-caret-bottom",
          "type": "color",
        },
        Object {
          "name": "slug-callout-caret-bottom-background",
          "type": "color",
        },
        Object {
          "name": "slug-callout-caret-bottom-background-actions",
          "type": "color",
        },
        Object {
          "name": "chat-prompt-background",
          "type": "color",
        },
        Object {
          "name": "chat-prompt-border-start",
          "type": "color",
        },
        Object {
          "name": "chat-prompt-border-end",
          "type": "color",
        },
        Object {
          "name": "chat-bubble-user",
          "type": "color",
        },
        Object {
          "name": "chat-bubble-agent",
          "type": "color",
        },
        Object {
          "name": "chat-bubble-agent-border",
          "type": "color",
        },
        Object {
          "name": "chat-avatar-bot",
          "type": "color",
        },
        Object {
          "name": "chat-avatar-agent",
          "type": "color",
        },
        Object {
          "name": "chat-avatar-user",
          "type": "color",
        },
        Object {
          "name": "highlight",
          "type": "color",
        },
        Object {
          "name": "overlay",
          "type": "color",
        },
        Object {
          "name": "toggle-off",
          "type": "color",
        },
        Object {
          "name": "shadow",
          "type": "color",
        },
        Object {
          "name": "focus",
          "type": "color",
        },
        Object {
          "name": "focus-inset",
          "type": "color",
        },
        Object {
          "name": "focus-inverse",
          "type": "color",
        },
        Object {
          "name": "skeleton-background",
          "type": "color",
        },
        Object {
          "name": "skeleton-element",
          "type": "color",
        },
        Object {
          "name": "layer",
          "type": "color",
        },
        Object {
          "name": "layer-active",
          "type": "color",
        },
        Object {
          "name": "layer-hover",
          "type": "color",
        },
        Object {
          "name": "layer-selected",
          "type": "color",
        },
        Object {
          "name": "layer-selected-hover",
          "type": "color",
        },
        Object {
          "name": "layer-accent",
          "type": "color",
        },
        Object {
          "name": "layer-accent-hover",
          "type": "color",
        },
        Object {
          "name": "layer-accent-active",
          "type": "color",
        },
        Object {
          "name": "field",
          "type": "color",
        },
        Object {
          "name": "field-hover",
          "type": "color",
        },
        Object {
          "name": "border-subtle",
          "type": "color",
        },
        Object {
          "name": "border-subtle-selected",
          "type": "color",
        },
        Object {
          "name": "border-strong",
          "type": "color",
        },
        Object {
          "name": "border-tile",
          "type": "color",
        },
        Object {
          "name": "button-separator",
          "type": "color",
        },
        Object {
          "name": "button-primary",
          "type": "color",
        },
        Object {
          "name": "button-secondary",
          "type": "color",
        },
        Object {
          "name": "button-tertiary",
          "type": "color",
        },
        Object {
          "name": "button-danger-primary",
          "type": "color",
        },
        Object {
          "name": "button-danger-secondary",
          "type": "color",
        },
        Object {
          "name": "button-danger-active",
          "type": "color",
        },
        Object {
          "name": "button-primary-active",
          "type": "color",
        },
        Object {
          "name": "button-secondary-active",
          "type": "color",
        },
        Object {
          "name": "button-tertiary-active",
          "type": "color",
        },
        Object {
          "name": "button-danger-hover",
          "type": "color",
        },
        Object {
          "name": "button-primary-hover",
          "type": "color",
        },
        Object {
          "name": "button-secondary-hover",
          "type": "color",
        },
        Object {
          "name": "button-tertiary-hover",
          "type": "color",
        },
        Object {
          "name": "button-disabled",
          "type": "color",
        },
        Object {
          "name": "notification-background-error",
          "type": "color",
        },
        Object {
          "name": "notification-background-success",
          "type": "color",
        },
        Object {
          "name": "notification-background-info",
          "type": "color",
        },
        Object {
          "name": "notification-background-warning",
          "type": "color",
        },
        Object {
          "name": "notification-action-hover",
          "type": "color",
        },
        Object {
          "name": "notification-action-tertiary-inverse",
          "type": "color",
        },
        Object {
          "name": "notification-action-tertiary-inverse-active",
          "type": "color",
        },
        Object {
          "name": "notification-action-tertiary-inverse-hover",
          "type": "color",
        },
        Object {
          "name": "notification-action-tertiary-inverse-text",
          "type": "color",
        },
        Object {
          "name": "notification-action-tertiary-inverse-text-on-color-disabled",
          "type": "color",
        },
        Object {
          "name": "tag-background-red",
          "type": "color",
        },
        Object {
          "name": "tag-color-red",
          "type": "color",
        },
        Object {
          "name": "tag-hover-red",
          "type": "color",
        },
        Object {
          "name": "tag-background-magenta",
          "type": "color",
        },
        Object {
          "name": "tag-color-magenta",
          "type": "color",
        },
        Object {
          "name": "tag-hover-magenta",
          "type": "color",
        },
        Object {
          "name": "tag-background-purple",
          "type": "color",
        },
        Object {
          "name": "tag-color-purple",
          "type": "color",
        },
        Object {
          "name": "tag-hover-purple",
          "type": "color",
        },
        Object {
          "name": "tag-background-blue",
          "type": "color",
        },
        Object {
          "name": "tag-color-blue",
          "type": "color",
        },
        Object {
          "name": "tag-hover-blue",
          "type": "color",
        },
        Object {
          "name": "tag-background-cyan",
          "type": "color",
        },
        Object {
          "name": "tag-color-cyan",
          "type": "color",
        },
        Object {
          "name": "tag-hover-cyan",
          "type": "color",
        },
        Object {
          "name": "tag-background-teal",
          "type": "color",
        },
        Object {
          "name": "tag-color-teal",
          "type": "color",
        },
        Object {
          "name": "tag-hover-teal",
          "type": "color",
        },
        Object {
          "name": "tag-background-green",
          "type": "color",
        },
        Object {
          "name": "tag-color-green",
          "type": "color",
        },
        Object {
          "name": "tag-hover-green",
          "type": "color",
        },
        Object {
          "name": "tag-background-gray",
          "type": "color",
        },
        Object {
          "name": "tag-color-gray",
          "type": "color",
        },
        Object {
          "name": "tag-hover-gray",
          "type": "color",
        },
        Object {
          "name": "tag-background-cool-gray",
          "type": "color",
        },
        Object {
          "name": "tag-color-cool-gray",
          "type": "color",
        },
        Object {
          "name": "tag-hover-cool-gray",
          "type": "color",
        },
        Object {
          "name": "tag-background-warm-gray",
          "type": "color",
        },
        Object {
          "name": "tag-color-warm-gray",
          "type": "color",
        },
        Object {
          "name": "tag-hover-warm-gray",
          "type": "color",
        },
        Object {
          "name": "caption-01",
          "type": "type",
        },
        Object {
          "name": "caption-02",
          "type": "type",
        },
        Object {
          "name": "label-01",
          "type": "type",
        },
        Object {
          "name": "label-02",
          "type": "type",
        },
        Object {
          "name": "helper-text-01",
          "type": "type",
        },
        Object {
          "name": "helper-text-02",
          "type": "type",
        },
        Object {
          "name": "body-short-01",
          "type": "type",
        },
        Object {
          "name": "body-long-01",
          "type": "type",
        },
        Object {
          "name": "body-short-02",
          "type": "type",
        },
        Object {
          "name": "body-long-02",
          "type": "type",
        },
        Object {
          "name": "code-01",
          "type": "type",
        },
        Object {
          "name": "code-02",
          "type": "type",
        },
        Object {
          "name": "heading-01",
          "type": "type",
        },
        Object {
          "name": "productive-heading-01",
          "type": "type",
        },
        Object {
          "name": "heading-02",
          "type": "type",
        },
        Object {
          "name": "productive-Heading-02",
          "type": "type",
        },
        Object {
          "name": "productive-heading-03",
          "type": "type",
        },
        Object {
          "name": "productive-heading-04",
          "type": "type",
        },
        Object {
          "name": "productive-heading-05",
          "type": "type",
        },
        Object {
          "name": "productive-heading-06",
          "type": "type",
        },
        Object {
          "name": "productive-heading-07",
          "type": "type",
        },
        Object {
          "name": "expressive-heading-01",
          "type": "type",
        },
        Object {
          "name": "expressive-heading-02",
          "type": "type",
        },
        Object {
          "name": "expressive-heading-03",
          "type": "type",
        },
        Object {
          "name": "expressive-heading-04",
          "type": "type",
        },
        Object {
          "name": "expressive-heading-05",
          "type": "type",
        },
        Object {
          "name": "expressive-heading-06",
          "type": "type",
        },
        Object {
          "name": "expressive-paragraph-01",
          "type": "type",
        },
        Object {
          "name": "quotation-01",
          "type": "type",
        },
        Object {
          "name": "quotation-02",
          "type": "type",
        },
        Object {
          "name": "display-01",
          "type": "type",
        },
        Object {
          "name": "display-02",
          "type": "type",
        },
        Object {
          "name": "display-03",
          "type": "type",
        },
        Object {
          "name": "display-04",
          "type": "type",
        },
        Object {
          "name": "spacing-01",
          "type": "layout",
        },
        Object {
          "name": "spacing-02",
          "type": "layout",
        },
        Object {
          "name": "spacing-03",
          "type": "layout",
        },
        Object {
          "name": "spacing-04",
          "type": "layout",
        },
        Object {
          "name": "spacing-05",
          "type": "layout",
        },
        Object {
          "name": "spacing-06",
          "type": "layout",
        },
        Object {
          "name": "spacing-07",
          "type": "layout",
        },
        Object {
          "name": "spacing-08",
          "type": "layout",
        },
        Object {
          "name": "spacing-09",
          "type": "layout",
        },
        Object {
          "name": "spacing-10",
          "type": "layout",
        },
        Object {
          "name": "spacing-11",
          "type": "layout",
        },
        Object {
          "name": "spacing-12",
          "type": "layout",
        },
        Object {
          "name": "spacing-13",
          "type": "layout",
        },
        Object {
          "name": "fluid-spacing-01",
          "type": "layout",
        },
        Object {
          "name": "fluid-spacing-02",
          "type": "layout",
        },
        Object {
          "name": "fluid-spacing-03",
          "type": "layout",
        },
        Object {
          "name": "fluid-spacing-04",
          "type": "layout",
        },
        Object {
          "name": "container-01",
          "type": "layout",
        },
        Object {
          "name": "container-02",
          "type": "layout",
        },
        Object {
          "name": "container-03",
          "type": "layout",
        },
        Object {
          "name": "container-04",
          "type": "layout",
        },
        Object {
          "name": "container-05",
          "type": "layout",
        },
        Object {
          "name": "icon-size-01",
          "type": "layout",
        },
        Object {
          "name": "icon-size-02",
          "type": "layout",
        },
      ],
    }
  `);
});
