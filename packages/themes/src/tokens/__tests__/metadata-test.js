/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { unstable_metadata } from '../';

test('metadata', () => {
  expect(unstable_metadata).toMatchInlineSnapshot(`
    {
      "v10": [
        {
          "name": "interactive-01",
          "type": "color",
        },
        {
          "name": "interactive-02",
          "type": "color",
        },
        {
          "name": "interactive-03",
          "type": "color",
        },
        {
          "name": "interactive-04",
          "type": "color",
        },
        {
          "name": "ui-background",
          "type": "color",
        },
        {
          "name": "ui-01",
          "type": "color",
        },
        {
          "name": "ui-02",
          "type": "color",
        },
        {
          "name": "ui-03",
          "type": "color",
        },
        {
          "name": "ui-04",
          "type": "color",
        },
        {
          "name": "ui-05",
          "type": "color",
        },
        {
          "name": "text-01",
          "type": "color",
        },
        {
          "name": "text-02",
          "type": "color",
        },
        {
          "name": "text-03",
          "type": "color",
        },
        {
          "name": "text-04",
          "type": "color",
        },
        {
          "name": "text-05",
          "type": "color",
        },
        {
          "name": "text-error",
          "type": "color",
        },
        {
          "name": "icon-01",
          "type": "color",
        },
        {
          "name": "icon-02",
          "type": "color",
        },
        {
          "name": "icon-03",
          "type": "color",
        },
        {
          "name": "link-01",
          "type": "color",
        },
        {
          "name": "link-02",
          "type": "color",
        },
        {
          "name": "inverse-link",
          "type": "color",
        },
        {
          "name": "field-01",
          "type": "color",
        },
        {
          "name": "field-02",
          "type": "color",
        },
        {
          "name": "inverse-01",
          "type": "color",
        },
        {
          "name": "inverse-02",
          "type": "color",
        },
        {
          "name": "support-01",
          "type": "color",
        },
        {
          "name": "support-02",
          "type": "color",
        },
        {
          "name": "support-03",
          "type": "color",
        },
        {
          "name": "support-04",
          "type": "color",
        },
        {
          "name": "inverse-support-01",
          "type": "color",
        },
        {
          "name": "inverse-support-02",
          "type": "color",
        },
        {
          "name": "inverse-support-03",
          "type": "color",
        },
        {
          "name": "inverse-support-04",
          "type": "color",
        },
        {
          "name": "overlay-01",
          "type": "color",
        },
        {
          "name": "danger-01",
          "type": "color",
        },
        {
          "name": "danger-02",
          "type": "color",
        },
        {
          "name": "focus",
          "type": "color",
        },
        {
          "name": "inverse-focus-ui",
          "type": "color",
        },
        {
          "name": "hover-primary",
          "type": "color",
        },
        {
          "name": "active-primary",
          "type": "color",
        },
        {
          "name": "hover-primary-text",
          "type": "color",
        },
        {
          "name": "hover-secondary",
          "type": "color",
        },
        {
          "name": "active-secondary",
          "type": "color",
        },
        {
          "name": "hover-tertiary",
          "type": "color",
        },
        {
          "name": "active-tertiary",
          "type": "color",
        },
        {
          "name": "hover-ui",
          "type": "color",
        },
        {
          "name": "hover-light-ui",
          "type": "color",
        },
        {
          "name": "hover-selected-ui",
          "type": "color",
        },
        {
          "name": "active-ui",
          "type": "color",
        },
        {
          "name": "active-light-ui",
          "type": "color",
        },
        {
          "name": "selected-ui",
          "type": "color",
        },
        {
          "name": "selected-light-ui",
          "type": "color",
        },
        {
          "name": "inverse-hover-ui",
          "type": "color",
        },
        {
          "name": "hover-danger",
          "type": "color",
        },
        {
          "name": "active-danger",
          "type": "color",
        },
        {
          "name": "hover-row",
          "type": "color",
        },
        {
          "name": "visited-link",
          "type": "color",
        },
        {
          "name": "disabled-01",
          "type": "color",
        },
        {
          "name": "disabled-02",
          "type": "color",
        },
        {
          "name": "disabled-03",
          "type": "color",
        },
        {
          "name": "highlight",
          "type": "color",
        },
        {
          "name": "decorative-01",
          "type": "color",
        },
        {
          "name": "button-separator",
          "type": "color",
        },
        {
          "name": "skeleton-01",
          "type": "color",
        },
        {
          "name": "skeleton-02",
          "type": "color",
        },
        {
          "name": "brand-01",
          "type": "color",
        },
        {
          "name": "brand-02",
          "type": "color",
        },
        {
          "name": "brand-03",
          "type": "color",
        },
        {
          "name": "active-01",
          "type": "color",
        },
        {
          "name": "hover-field",
          "type": "color",
        },
        {
          "name": "danger",
          "type": "color",
        },
        {
          "name": "caption-01",
          "type": "type",
        },
        {
          "name": "caption-02",
          "type": "type",
        },
        {
          "name": "label-01",
          "type": "type",
        },
        {
          "name": "label-02",
          "type": "type",
        },
        {
          "name": "helper-text-01",
          "type": "type",
        },
        {
          "name": "helper-text-02",
          "type": "type",
        },
        {
          "name": "body-short-01",
          "type": "type",
        },
        {
          "name": "body-long-01",
          "type": "type",
        },
        {
          "name": "body-short-02",
          "type": "type",
        },
        {
          "name": "body-long-02",
          "type": "type",
        },
        {
          "name": "code-01",
          "type": "type",
        },
        {
          "name": "code-02",
          "type": "type",
        },
        {
          "name": "heading-01",
          "type": "type",
        },
        {
          "name": "productive-heading-01",
          "type": "type",
        },
        {
          "name": "heading-02",
          "type": "type",
        },
        {
          "name": "productive-Heading-02",
          "type": "type",
        },
        {
          "name": "productive-heading-03",
          "type": "type",
        },
        {
          "name": "productive-heading-04",
          "type": "type",
        },
        {
          "name": "productive-heading-05",
          "type": "type",
        },
        {
          "name": "productive-heading-06",
          "type": "type",
        },
        {
          "name": "productive-heading-07",
          "type": "type",
        },
        {
          "name": "expressive-heading-01",
          "type": "type",
        },
        {
          "name": "expressive-heading-02",
          "type": "type",
        },
        {
          "name": "expressive-heading-03",
          "type": "type",
        },
        {
          "name": "expressive-heading-04",
          "type": "type",
        },
        {
          "name": "expressive-heading-05",
          "type": "type",
        },
        {
          "name": "expressive-heading-06",
          "type": "type",
        },
        {
          "name": "expressive-paragraph-01",
          "type": "type",
        },
        {
          "name": "quotation-01",
          "type": "type",
        },
        {
          "name": "quotation-02",
          "type": "type",
        },
        {
          "name": "display-01",
          "type": "type",
        },
        {
          "name": "display-02",
          "type": "type",
        },
        {
          "name": "display-03",
          "type": "type",
        },
        {
          "name": "display-04",
          "type": "type",
        },
        {
          "name": "spacing-01",
          "type": "layout",
        },
        {
          "name": "spacing-02",
          "type": "layout",
        },
        {
          "name": "spacing-03",
          "type": "layout",
        },
        {
          "name": "spacing-04",
          "type": "layout",
        },
        {
          "name": "spacing-05",
          "type": "layout",
        },
        {
          "name": "spacing-06",
          "type": "layout",
        },
        {
          "name": "spacing-07",
          "type": "layout",
        },
        {
          "name": "spacing-08",
          "type": "layout",
        },
        {
          "name": "spacing-09",
          "type": "layout",
        },
        {
          "name": "spacing-10",
          "type": "layout",
        },
        {
          "name": "spacing-11",
          "type": "layout",
        },
        {
          "name": "spacing-12",
          "type": "layout",
        },
        {
          "name": "spacing-13",
          "type": "layout",
        },
        {
          "name": "layout-01",
          "type": "layout",
        },
        {
          "name": "layout-02",
          "type": "layout",
        },
        {
          "name": "layout-03",
          "type": "layout",
        },
        {
          "name": "layout-04",
          "type": "layout",
        },
        {
          "name": "layout-05",
          "type": "layout",
        },
        {
          "name": "layout-06",
          "type": "layout",
        },
        {
          "name": "layout-07",
          "type": "layout",
        },
        {
          "name": "fluid-spacing-01",
          "type": "layout",
        },
        {
          "name": "fluid-spacing-02",
          "type": "layout",
        },
        {
          "name": "fluid-spacing-03",
          "type": "layout",
        },
        {
          "name": "fluid-spacing-04",
          "type": "layout",
        },
        {
          "name": "container-01",
          "type": "layout",
        },
        {
          "name": "container-02",
          "type": "layout",
        },
        {
          "name": "container-03",
          "type": "layout",
        },
        {
          "name": "container-04",
          "type": "layout",
        },
        {
          "name": "container-05",
          "type": "layout",
        },
        {
          "name": "icon-size-01",
          "type": "layout",
        },
        {
          "name": "icon-size-02",
          "type": "layout",
        },
      ],
      "v11": [
        {
          "name": "background",
          "type": "color",
        },
        {
          "name": "background-active",
          "type": "color",
        },
        {
          "name": "background-selected",
          "type": "color",
        },
        {
          "name": "background-selected-hover",
          "type": "color",
        },
        {
          "name": "background-hover",
          "type": "color",
        },
        {
          "name": "background-brand",
          "type": "color",
        },
        {
          "name": "background-inverse",
          "type": "color",
        },
        {
          "name": "background-inverse-hover",
          "type": "color",
        },
        {
          "name": "layer-01",
          "type": "color",
        },
        {
          "name": "layer-active-01",
          "type": "color",
        },
        {
          "name": "layer-background-01",
          "type": "color",
        },
        {
          "name": "layer-hover-01",
          "type": "color",
        },
        {
          "name": "layer-selected-01",
          "type": "color",
        },
        {
          "name": "layer-selected-hover-01",
          "type": "color",
        },
        {
          "name": "layer-02",
          "type": "color",
        },
        {
          "name": "layer-active-02",
          "type": "color",
        },
        {
          "name": "layer-background-02",
          "type": "color",
        },
        {
          "name": "layer-hover-02",
          "type": "color",
        },
        {
          "name": "layer-selected-02",
          "type": "color",
        },
        {
          "name": "layer-selected-hover-02",
          "type": "color",
        },
        {
          "name": "layer-03",
          "type": "color",
        },
        {
          "name": "layer-active-03",
          "type": "color",
        },
        {
          "name": "layer-background-03",
          "type": "color",
        },
        {
          "name": "layer-hover-03",
          "type": "color",
        },
        {
          "name": "layer-selected-03",
          "type": "color",
        },
        {
          "name": "layer-selected-hover-03",
          "type": "color",
        },
        {
          "name": "layer-selected-inverse",
          "type": "color",
        },
        {
          "name": "layer-selected-disabled",
          "type": "color",
        },
        {
          "name": "layer-accent-01",
          "type": "color",
        },
        {
          "name": "layer-accent-active-01",
          "type": "color",
        },
        {
          "name": "layer-accent-hover-01",
          "type": "color",
        },
        {
          "name": "layer-accent-02",
          "type": "color",
        },
        {
          "name": "layer-accent-active-02",
          "type": "color",
        },
        {
          "name": "layer-accent-hover-02",
          "type": "color",
        },
        {
          "name": "layer-accent-03",
          "type": "color",
        },
        {
          "name": "layer-accent-active-03",
          "type": "color",
        },
        {
          "name": "layer-accent-hover-03",
          "type": "color",
        },
        {
          "name": "field-01",
          "type": "color",
        },
        {
          "name": "field-hover-01",
          "type": "color",
        },
        {
          "name": "field-02",
          "type": "color",
        },
        {
          "name": "field-hover-02",
          "type": "color",
        },
        {
          "name": "field-03",
          "type": "color",
        },
        {
          "name": "field-hover-03",
          "type": "color",
        },
        {
          "name": "interactive",
          "type": "color",
        },
        {
          "name": "border-subtle-00",
          "type": "color",
        },
        {
          "name": "border-subtle-01",
          "type": "color",
        },
        {
          "name": "border-subtle-selected-01",
          "type": "color",
        },
        {
          "name": "border-subtle-02",
          "type": "color",
        },
        {
          "name": "border-subtle-selected-02",
          "type": "color",
        },
        {
          "name": "border-subtle-03",
          "type": "color",
        },
        {
          "name": "border-subtle-selected-03",
          "type": "color",
        },
        {
          "name": "border-strong-01",
          "type": "color",
        },
        {
          "name": "border-strong-02",
          "type": "color",
        },
        {
          "name": "border-strong-03",
          "type": "color",
        },
        {
          "name": "border-tile-01",
          "type": "color",
        },
        {
          "name": "border-tile-02",
          "type": "color",
        },
        {
          "name": "border-tile-03",
          "type": "color",
        },
        {
          "name": "border-inverse",
          "type": "color",
        },
        {
          "name": "border-interactive",
          "type": "color",
        },
        {
          "name": "border-disabled",
          "type": "color",
        },
        {
          "name": "text-primary",
          "type": "color",
        },
        {
          "name": "text-secondary",
          "type": "color",
        },
        {
          "name": "text-placeholder",
          "type": "color",
        },
        {
          "name": "text-helper",
          "type": "color",
        },
        {
          "name": "text-error",
          "type": "color",
        },
        {
          "name": "text-inverse",
          "type": "color",
        },
        {
          "name": "text-on-color",
          "type": "color",
        },
        {
          "name": "text-on-color-disabled",
          "type": "color",
        },
        {
          "name": "text-disabled",
          "type": "color",
        },
        {
          "name": "link-primary",
          "type": "color",
        },
        {
          "name": "link-primary-hover",
          "type": "color",
        },
        {
          "name": "link-secondary",
          "type": "color",
        },
        {
          "name": "link-inverse-visited",
          "type": "color",
        },
        {
          "name": "link-visited",
          "type": "color",
        },
        {
          "name": "link-inverse",
          "type": "color",
        },
        {
          "name": "link-inverse-active",
          "type": "color",
        },
        {
          "name": "link-inverse-hover",
          "type": "color",
        },
        {
          "name": "icon-primary",
          "type": "color",
        },
        {
          "name": "icon-secondary",
          "type": "color",
        },
        {
          "name": "icon-inverse",
          "type": "color",
        },
        {
          "name": "icon-on-color",
          "type": "color",
        },
        {
          "name": "icon-on-color-disabled",
          "type": "color",
        },
        {
          "name": "icon-disabled",
          "type": "color",
        },
        {
          "name": "icon-interactive",
          "type": "color",
        },
        {
          "name": "support-error",
          "type": "color",
        },
        {
          "name": "support-success",
          "type": "color",
        },
        {
          "name": "support-warning",
          "type": "color",
        },
        {
          "name": "support-info",
          "type": "color",
        },
        {
          "name": "support-error-inverse",
          "type": "color",
        },
        {
          "name": "support-success-inverse",
          "type": "color",
        },
        {
          "name": "support-warning-inverse",
          "type": "color",
        },
        {
          "name": "support-info-inverse",
          "type": "color",
        },
        {
          "name": "support-caution-major",
          "type": "color",
        },
        {
          "name": "support-caution-minor",
          "type": "color",
        },
        {
          "name": "support-caution-undefined",
          "type": "color",
        },
        {
          "name": "syntax-comment",
          "type": "color",
        },
        {
          "name": "syntax-line-comment",
          "type": "color",
        },
        {
          "name": "syntax-block-comment",
          "type": "color",
        },
        {
          "name": "syntax-doc-comment",
          "type": "color",
        },
        {
          "name": "syntax-doc-string",
          "type": "color",
        },
        {
          "name": "syntax-keyword",
          "type": "color",
        },
        {
          "name": "syntax-operator-keyword",
          "type": "color",
        },
        {
          "name": "syntax-control-keyword",
          "type": "color",
        },
        {
          "name": "syntax-definition-keyword",
          "type": "color",
        },
        {
          "name": "syntax-module-keyword",
          "type": "color",
        },
        {
          "name": "syntax-variable",
          "type": "color",
        },
        {
          "name": "syntax-name",
          "type": "color",
        },
        {
          "name": "syntax-variable-name",
          "type": "color",
        },
        {
          "name": "syntax-label-name",
          "type": "color",
        },
        {
          "name": "syntax-attribute",
          "type": "color",
        },
        {
          "name": "syntax-attribute-name",
          "type": "color",
        },
        {
          "name": "syntax-property-name",
          "type": "color",
        },
        {
          "name": "syntax-tag",
          "type": "color",
        },
        {
          "name": "syntax-tag-name",
          "type": "color",
        },
        {
          "name": "syntax-type",
          "type": "color",
        },
        {
          "name": "syntax-type-name",
          "type": "color",
        },
        {
          "name": "syntax-class-name",
          "type": "color",
        },
        {
          "name": "syntax-namespace",
          "type": "color",
        },
        {
          "name": "syntax-macro-name",
          "type": "color",
        },
        {
          "name": "syntax-atom",
          "type": "color",
        },
        {
          "name": "syntax-literal",
          "type": "color",
        },
        {
          "name": "syntax-bool",
          "type": "color",
        },
        {
          "name": "syntax-null",
          "type": "color",
        },
        {
          "name": "syntax-self",
          "type": "color",
        },
        {
          "name": "syntax-number",
          "type": "color",
        },
        {
          "name": "syntax-integer",
          "type": "color",
        },
        {
          "name": "syntax-float",
          "type": "color",
        },
        {
          "name": "syntax-unit",
          "type": "color",
        },
        {
          "name": "syntax-string",
          "type": "color",
        },
        {
          "name": "syntax-character",
          "type": "color",
        },
        {
          "name": "syntax-attribute-value",
          "type": "color",
        },
        {
          "name": "syntax-special-string",
          "type": "color",
        },
        {
          "name": "syntax-regexp",
          "type": "color",
        },
        {
          "name": "syntax-escape",
          "type": "color",
        },
        {
          "name": "syntax-url",
          "type": "color",
        },
        {
          "name": "syntax-color",
          "type": "color",
        },
        {
          "name": "ai-popover-background",
          "type": "color",
        },
        {
          "name": "ai-popover-shadow-outer-01",
          "type": "color",
        },
        {
          "name": "ai-popover-shadow-outer-02",
          "type": "color",
        },
        {
          "name": "ai-inner-shadow",
          "type": "color",
        },
        {
          "name": "ai-aura-start-sm",
          "type": "color",
        },
        {
          "name": "ai-aura-start",
          "type": "color",
        },
        {
          "name": "ai-aura-end",
          "type": "color",
        },
        {
          "name": "ai-aura-hover-background",
          "type": "color",
        },
        {
          "name": "ai-aura-hover-start",
          "type": "color",
        },
        {
          "name": "ai-aura-hover-end",
          "type": "color",
        },
        {
          "name": "ai-border-strong",
          "type": "color",
        },
        {
          "name": "ai-border-start",
          "type": "color",
        },
        {
          "name": "ai-border-end",
          "type": "color",
        },
        {
          "name": "ai-drop-shadow",
          "type": "color",
        },
        {
          "name": "ai-skeleton-background",
          "type": "color",
        },
        {
          "name": "ai-skeleton-element-background",
          "type": "color",
        },
        {
          "name": "ai-overlay",
          "type": "color",
        },
        {
          "name": "ai-popover-caret-center",
          "type": "color",
        },
        {
          "name": "ai-popover-caret-bottom",
          "type": "color",
        },
        {
          "name": "ai-popover-caret-bottom-background",
          "type": "color",
        },
        {
          "name": "ai-popover-caret-bottom-background-actions",
          "type": "color",
        },
        {
          "name": "chat-prompt-background",
          "type": "color",
        },
        {
          "name": "chat-prompt-border-start",
          "type": "color",
        },
        {
          "name": "chat-prompt-border-end",
          "type": "color",
        },
        {
          "name": "chat-prompt-text",
          "type": "color",
        },
        {
          "name": "chat-bubble-user",
          "type": "color",
        },
        {
          "name": "chat-bubble-user-text",
          "type": "color",
        },
        {
          "name": "chat-bubble-agent",
          "type": "color",
        },
        {
          "name": "chat-bubble-agent-text",
          "type": "color",
        },
        {
          "name": "chat-bubble-border",
          "type": "color",
        },
        {
          "name": "chat-avatar-bot",
          "type": "color",
        },
        {
          "name": "chat-avatar-agent",
          "type": "color",
        },
        {
          "name": "chat-avatar-user",
          "type": "color",
        },
        {
          "name": "chat-shell-background",
          "type": "color",
        },
        {
          "name": "chat-header-background",
          "type": "color",
        },
        {
          "name": "chat-header-text",
          "type": "color",
        },
        {
          "name": "chat-button",
          "type": "color",
        },
        {
          "name": "chat-button-hover",
          "type": "color",
        },
        {
          "name": "chat-button-text-hover",
          "type": "color",
        },
        {
          "name": "chat-button-active",
          "type": "color",
        },
        {
          "name": "chat-button-selected",
          "type": "color",
        },
        {
          "name": "chat-button-text-selected",
          "type": "color",
        },
        {
          "name": "highlight",
          "type": "color",
        },
        {
          "name": "overlay",
          "type": "color",
        },
        {
          "name": "toggle-off",
          "type": "color",
        },
        {
          "name": "shadow",
          "type": "color",
        },
        {
          "name": "focus",
          "type": "color",
        },
        {
          "name": "focus-inset",
          "type": "color",
        },
        {
          "name": "focus-inverse",
          "type": "color",
        },
        {
          "name": "skeleton-background",
          "type": "color",
        },
        {
          "name": "skeleton-element",
          "type": "color",
        },
        {
          "name": "layer",
          "type": "color",
        },
        {
          "name": "layer-active",
          "type": "color",
        },
        {
          "name": "layer-hover",
          "type": "color",
        },
        {
          "name": "layer-selected",
          "type": "color",
        },
        {
          "name": "layer-selected-hover",
          "type": "color",
        },
        {
          "name": "layer-accent",
          "type": "color",
        },
        {
          "name": "layer-accent-hover",
          "type": "color",
        },
        {
          "name": "layer-accent-active",
          "type": "color",
        },
        {
          "name": "field",
          "type": "color",
        },
        {
          "name": "field-hover",
          "type": "color",
        },
        {
          "name": "border-subtle",
          "type": "color",
        },
        {
          "name": "border-subtle-selected",
          "type": "color",
        },
        {
          "name": "border-strong",
          "type": "color",
        },
        {
          "name": "border-tile",
          "type": "color",
        },
        {
          "name": "button-separator",
          "type": "color",
        },
        {
          "name": "button-primary",
          "type": "color",
        },
        {
          "name": "button-secondary",
          "type": "color",
        },
        {
          "name": "button-tertiary",
          "type": "color",
        },
        {
          "name": "button-danger-primary",
          "type": "color",
        },
        {
          "name": "button-danger-secondary",
          "type": "color",
        },
        {
          "name": "button-danger-active",
          "type": "color",
        },
        {
          "name": "button-primary-active",
          "type": "color",
        },
        {
          "name": "button-secondary-active",
          "type": "color",
        },
        {
          "name": "button-tertiary-active",
          "type": "color",
        },
        {
          "name": "button-danger-hover",
          "type": "color",
        },
        {
          "name": "button-primary-hover",
          "type": "color",
        },
        {
          "name": "button-secondary-hover",
          "type": "color",
        },
        {
          "name": "button-tertiary-hover",
          "type": "color",
        },
        {
          "name": "button-disabled",
          "type": "color",
        },
        {
          "name": "content-switcher-selected",
          "type": "color",
        },
        {
          "name": "content-switcher-background",
          "type": "color",
        },
        {
          "name": "content-switcher-background-hover",
          "type": "color",
        },
        {
          "name": "notification-background-error",
          "type": "color",
        },
        {
          "name": "notification-background-success",
          "type": "color",
        },
        {
          "name": "notification-background-info",
          "type": "color",
        },
        {
          "name": "notification-background-warning",
          "type": "color",
        },
        {
          "name": "notification-action-hover",
          "type": "color",
        },
        {
          "name": "notification-action-tertiary-inverse",
          "type": "color",
        },
        {
          "name": "notification-action-tertiary-inverse-active",
          "type": "color",
        },
        {
          "name": "notification-action-tertiary-inverse-hover",
          "type": "color",
        },
        {
          "name": "notification-action-tertiary-inverse-text",
          "type": "color",
        },
        {
          "name": "notification-action-tertiary-inverse-text-on-color-disabled",
          "type": "color",
        },
        {
          "name": "status-red",
          "type": "color",
        },
        {
          "name": "status-orange",
          "type": "color",
        },
        {
          "name": "status-orange-outline",
          "type": "color",
        },
        {
          "name": "status-yellow",
          "type": "color",
        },
        {
          "name": "status-yellow-outline",
          "type": "color",
        },
        {
          "name": "status-purple",
          "type": "color",
        },
        {
          "name": "status-green",
          "type": "color",
        },
        {
          "name": "status-blue",
          "type": "color",
        },
        {
          "name": "status-gray",
          "type": "color",
        },
        {
          "name": "tag-background-red",
          "type": "color",
        },
        {
          "name": "tag-color-red",
          "type": "color",
        },
        {
          "name": "tag-hover-red",
          "type": "color",
        },
        {
          "name": "tag-background-magenta",
          "type": "color",
        },
        {
          "name": "tag-color-magenta",
          "type": "color",
        },
        {
          "name": "tag-hover-magenta",
          "type": "color",
        },
        {
          "name": "tag-background-purple",
          "type": "color",
        },
        {
          "name": "tag-color-purple",
          "type": "color",
        },
        {
          "name": "tag-hover-purple",
          "type": "color",
        },
        {
          "name": "tag-background-blue",
          "type": "color",
        },
        {
          "name": "tag-color-blue",
          "type": "color",
        },
        {
          "name": "tag-hover-blue",
          "type": "color",
        },
        {
          "name": "tag-background-cyan",
          "type": "color",
        },
        {
          "name": "tag-color-cyan",
          "type": "color",
        },
        {
          "name": "tag-hover-cyan",
          "type": "color",
        },
        {
          "name": "tag-background-teal",
          "type": "color",
        },
        {
          "name": "tag-color-teal",
          "type": "color",
        },
        {
          "name": "tag-hover-teal",
          "type": "color",
        },
        {
          "name": "tag-background-green",
          "type": "color",
        },
        {
          "name": "tag-color-green",
          "type": "color",
        },
        {
          "name": "tag-hover-green",
          "type": "color",
        },
        {
          "name": "tag-background-gray",
          "type": "color",
        },
        {
          "name": "tag-color-gray",
          "type": "color",
        },
        {
          "name": "tag-hover-gray",
          "type": "color",
        },
        {
          "name": "tag-border-red",
          "type": "color",
        },
        {
          "name": "tag-border-blue",
          "type": "color",
        },
        {
          "name": "tag-border-cyan",
          "type": "color",
        },
        {
          "name": "tag-border-teal",
          "type": "color",
        },
        {
          "name": "tag-border-green",
          "type": "color",
        },
        {
          "name": "tag-border-magenta",
          "type": "color",
        },
        {
          "name": "tag-border-purple",
          "type": "color",
        },
        {
          "name": "tag-border-gray",
          "type": "color",
        },
        {
          "name": "tag-border-cool-gray",
          "type": "color",
        },
        {
          "name": "tag-border-warm-gray",
          "type": "color",
        },
        {
          "name": "tag-background-cool-gray",
          "type": "color",
        },
        {
          "name": "tag-color-cool-gray",
          "type": "color",
        },
        {
          "name": "tag-hover-cool-gray",
          "type": "color",
        },
        {
          "name": "tag-background-warm-gray",
          "type": "color",
        },
        {
          "name": "tag-color-warm-gray",
          "type": "color",
        },
        {
          "name": "tag-hover-warm-gray",
          "type": "color",
        },
        {
          "name": "caption-01",
          "type": "type",
        },
        {
          "name": "caption-02",
          "type": "type",
        },
        {
          "name": "label-01",
          "type": "type",
        },
        {
          "name": "label-02",
          "type": "type",
        },
        {
          "name": "helper-text-01",
          "type": "type",
        },
        {
          "name": "helper-text-02",
          "type": "type",
        },
        {
          "name": "body-short-01",
          "type": "type",
        },
        {
          "name": "body-long-01",
          "type": "type",
        },
        {
          "name": "body-short-02",
          "type": "type",
        },
        {
          "name": "body-long-02",
          "type": "type",
        },
        {
          "name": "code-01",
          "type": "type",
        },
        {
          "name": "code-02",
          "type": "type",
        },
        {
          "name": "heading-01",
          "type": "type",
        },
        {
          "name": "productive-heading-01",
          "type": "type",
        },
        {
          "name": "heading-02",
          "type": "type",
        },
        {
          "name": "productive-Heading-02",
          "type": "type",
        },
        {
          "name": "productive-heading-03",
          "type": "type",
        },
        {
          "name": "productive-heading-04",
          "type": "type",
        },
        {
          "name": "productive-heading-05",
          "type": "type",
        },
        {
          "name": "productive-heading-06",
          "type": "type",
        },
        {
          "name": "productive-heading-07",
          "type": "type",
        },
        {
          "name": "expressive-heading-01",
          "type": "type",
        },
        {
          "name": "expressive-heading-02",
          "type": "type",
        },
        {
          "name": "expressive-heading-03",
          "type": "type",
        },
        {
          "name": "expressive-heading-04",
          "type": "type",
        },
        {
          "name": "expressive-heading-05",
          "type": "type",
        },
        {
          "name": "expressive-heading-06",
          "type": "type",
        },
        {
          "name": "expressive-paragraph-01",
          "type": "type",
        },
        {
          "name": "quotation-01",
          "type": "type",
        },
        {
          "name": "quotation-02",
          "type": "type",
        },
        {
          "name": "display-01",
          "type": "type",
        },
        {
          "name": "display-02",
          "type": "type",
        },
        {
          "name": "display-03",
          "type": "type",
        },
        {
          "name": "display-04",
          "type": "type",
        },
        {
          "name": "spacing-01",
          "type": "layout",
        },
        {
          "name": "spacing-02",
          "type": "layout",
        },
        {
          "name": "spacing-03",
          "type": "layout",
        },
        {
          "name": "spacing-04",
          "type": "layout",
        },
        {
          "name": "spacing-05",
          "type": "layout",
        },
        {
          "name": "spacing-06",
          "type": "layout",
        },
        {
          "name": "spacing-07",
          "type": "layout",
        },
        {
          "name": "spacing-08",
          "type": "layout",
        },
        {
          "name": "spacing-09",
          "type": "layout",
        },
        {
          "name": "spacing-10",
          "type": "layout",
        },
        {
          "name": "spacing-11",
          "type": "layout",
        },
        {
          "name": "spacing-12",
          "type": "layout",
        },
        {
          "name": "spacing-13",
          "type": "layout",
        },
        {
          "name": "fluid-spacing-01",
          "type": "layout",
        },
        {
          "name": "fluid-spacing-02",
          "type": "layout",
        },
        {
          "name": "fluid-spacing-03",
          "type": "layout",
        },
        {
          "name": "fluid-spacing-04",
          "type": "layout",
        },
        {
          "name": "container-01",
          "type": "layout",
        },
        {
          "name": "container-02",
          "type": "layout",
        },
        {
          "name": "container-03",
          "type": "layout",
        },
        {
          "name": "container-04",
          "type": "layout",
        },
        {
          "name": "container-05",
          "type": "layout",
        },
        {
          "name": "icon-size-01",
          "type": "layout",
        },
        {
          "name": "icon-size-02",
          "type": "layout",
        },
      ],
    }
  `);
});
