/**
 * Copyright IBM Corp. 2026, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './index';
import { html } from 'lit';
import DragVertical16 from '@carbon/icons/es/drag--vertical/16.js';
import { iconLoader } from '../../globals/internal/icon-loader';

const meta = {
  title: 'Utilities/Resizer',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    '--resizer-thickness': {
      control: { type: 'range', min: 1, max: 16, step: 1 },
      description: 'Thickness of the resizer handle',
      table: { defaultValue: { summary: '4px' } },
    },
    '--resizer-grab-thickness': {
      control: { type: 'range', min: 0, max: 32, step: 1 },
      description: 'Additional grab area thickness',
      table: { defaultValue: { summary: '8px' } },
    },
    '--resizer-grab-color': {
      control: { type: 'boolean' },
      description:
        'Show grab area color (uses --cds-background-selected token)',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    '--resizer-thickness': 4,
    '--resizer-grab-thickness': 8,
    '--resizer-grab-color': false,
  },
};

export default meta;

const grabColor = (args) =>
  args['--resizer-grab-color']
    ? 'var(--cds-background-selected)'
    : 'transparent';

const getStyles = (args) => html`
  <style>
    .container {
      width: 600px;
      height: 400px;
      --resizer-thickness: ${args['--resizer-thickness']}px;
      --resizer-grab-thickness: ${args['--resizer-grab-thickness']}px;
      --resizer-grab-color: ${grabColor(args)};
    }
    .nested-container {
      width: 800px;
      height: 600px;
      --resizer-thickness: ${args['--resizer-thickness']}px;
      --resizer-grab-thickness: ${args['--resizer-grab-thickness']}px;
      --resizer-grab-color: ${grabColor(args)};
    }
    .panel-content {
      padding: var(--cds-spacing-05);
      background: var(--cds-layer);
      height: 100%;
      overflow: auto;
    }
  </style>
`;

// ─── Single panel — no boundaries ────────────────────────────────────────────

export const SinglePanelNoBoundaries = (args) => {
  let initialHeight = 0;
  const handleResizeStart = (e) => {
    const panel = e.target.previousElementSibling;
    if (panel) {
      initialHeight = panel.offsetHeight;
      panel.style.transition = 'none';
    }
  };
  const handleResize = (e) => {
    const panel = e.target.previousElementSibling;
    if (panel && e.detail.delta !== undefined) {
      panel.style.height = `${Math.max(48, initialHeight + e.detail.delta)}px`;
    }
  };
  const handleReset = (e) => {
    const panel = e.target.previousElementSibling;
    if (panel) {
      panel.style.transition = 'height 180ms cubic-bezier(0.25, 0.9, 0.25, 1)';
      panel.style.height = '200px';
    }
  };
  return html`
    ${getStyles(args)}
    <style>
      .single-panel {
        display: flex;
        flex-direction: column;
        width: 600px;
        overflow: hidden;
        --resizer-thickness: ${args['--resizer-thickness']}px;
        --resizer-grab-thickness: ${args['--resizer-grab-thickness']}px;
        --resizer-grab-color: ${grabColor(args)};
      }
      .single-panel__panel {
        padding: var(--cds-spacing-05);
        background-color: var(--cds-layer);
        min-block-size: var(--cds-spacing-09);
        overflow: auto;
        height: 200px;
      }
    </style>
    <div class="single-panel">
      <div class="single-panel__panel">
        <h3>Single Panel (no boundaries)</h3>
        <p>
          A basic resizable panel. The handle emits events you listen to for
          custom resize logic. Double-click to reset.
        </p>
      </div>
      <cds-resizer-handle
        @resize-start=${handleResizeStart}
        @resize-drag=${handleResize}
        @resize-reset=${handleReset}></cds-resizer-handle>
    </div>
  `;
};

// ─── Single panel — bounded ───────────────────────────────────────────────────

export const SinglePanelBounded = (args) => {
  let initialHeight = 0;
  const handleResizeStart = (e) => {
    const panel = e.target.previousElementSibling;
    if (panel) {
      initialHeight = panel.offsetHeight;
      panel.style.transition = 'none';
    }
  };
  const handleResize = (e) => {
    const panel = e.target.previousElementSibling;
    const container = e.target.parentElement;
    if (panel && container && e.detail.delta !== undefined) {
      const constrainedHeight = Math.max(
        48,
        Math.min(initialHeight + e.detail.delta, container.offsetHeight - 20)
      );
      panel.style.height = `${constrainedHeight}px`;
    }
  };
  const handleReset = (e) => {
    const panel = e.target.previousElementSibling;
    if (panel) {
      panel.style.transition = 'height 180ms cubic-bezier(0.25, 0.9, 0.25, 1)';
      panel.style.height = '200px';
    }
  };
  return html`
    ${getStyles(args)}
    <style>
      .single-panel-bounded {
        width: 600px;
        height: 400px;
        overflow: hidden;
        --resizer-thickness: ${args['--resizer-thickness']}px;
        --resizer-grab-thickness: ${args['--resizer-grab-thickness']}px;
        --resizer-grab-color: ${grabColor(args)};
      }
      .single-panel-bounded__container {
        height: 100%;
        display: flex;
        flex-direction: column;
      }
      .single-panel-bounded__panel {
        padding: var(--cds-spacing-05);
        background-color: var(--cds-layer);
        min-block-size: var(--cds-spacing-09);
        overflow: auto;
        height: 200px;
      }
    </style>
    <div class="single-panel-bounded">
      <div class="single-panel-bounded__container">
        <div class="single-panel-bounded__panel">
          <h3>Single Panel (bounded)</h3>
          <p>
            Resizing is constrained within a 600×400px container. The resize
            logic uses events to enforce min/max bounds. Double-click to reset.
          </p>
        </div>
        <cds-resizer-handle
          @resize-start=${handleResizeStart}
          @resize-drag=${handleResize}
          @resize-reset=${handleReset}></cds-resizer-handle>
      </div>
    </div>
  `;
};

// ─── Single panel — overlay ───────────────────────────────────────────────────

export const SinglePanelOverlay = (args) => {
  let initialHeight = 0;
  const handleResizeStart = (e) => {
    const panelContent = e.target.nextElementSibling;
    if (panelContent) {
      initialHeight = panelContent.offsetHeight;
      panelContent.style.transition = 'none';
    }
  };
  const handleResize = (e) => {
    const panelContent = e.target.nextElementSibling;
    const container = e.target.closest('.single-panel-overlay');
    if (panelContent && container && e.detail.delta !== undefined) {
      const constrainedHeight = Math.max(
        48,
        Math.min(initialHeight - e.detail.delta, container.offsetHeight - 20)
      );
      panelContent.style.height = `${constrainedHeight}px`;
    }
  };
  const handleReset = (e) => {
    const panelContent = e.target.nextElementSibling;
    if (panelContent) {
      panelContent.style.transition =
        'height 180ms cubic-bezier(0.25, 0.9, 0.25, 1)';
      panelContent.style.height = '200px';
    }
  };
  return html`
    ${getStyles(args)}
    <style>
      .single-panel-overlay {
        position: relative;
        width: 600px;
        height: 400px;
        overflow: hidden;
        --resizer-thickness: ${args['--resizer-thickness']}px;
        --resizer-grab-thickness: ${args['--resizer-grab-thickness']}px;
        --resizer-grab-color: ${grabColor(args)};
      }
      .single-panel-overlay__content {
        padding: var(--cds-spacing-05);
        height: 100%;
        overflow: auto;
      }
      .single-panel-overlay__panel {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        max-height: 400px;
        background-color: var(--cds-layer);
        z-index: 1;
        display: flex;
        flex-direction: column;
      }
      .single-panel-overlay__panel-content {
        padding: var(--cds-spacing-05);
        overflow: auto;
        height: 200px;
        min-block-size: var(--cds-spacing-09);
      }
    </style>
    <div class="single-panel-overlay">
      <div class="single-panel-overlay__content">
        <h3>Main Content</h3>
        <p>
          This is the main content area that remains fixed in the background.
        </p>
      </div>
      <div class="single-panel-overlay__panel">
        <cds-resizer-handle
          @resize-start=${handleResizeStart}
          @resize-drag=${handleResize}
          @resize-reset=${handleReset}></cds-resizer-handle>
        <div class="single-panel-overlay__panel-content">
          <h3>Overlay Panel</h3>
          <p>
            This sliding panel overlays the main content and can be resized from
            the top edge using event-driven resize logic. Double-click to reset.
          </p>
        </div>
      </div>
    </div>
  `;
};

// ─── Two panels — horizontal (top / bottom) ───────────────────────────────────

export const TwoPanelsHorizontal = (args) => html`
  ${getStyles(args)}
  <div class="container">
    <cds-resizer-grid axis="y">
      <cds-resizer-panel slot="top">
        <div class="panel-content">
          <h3>Top Panel</h3>
          <p>Drag the handle below to resize. Double-click to reset.</p>
        </div>
      </cds-resizer-panel>
      <cds-resizer-handle slot="handle-vertical"></cds-resizer-handle>
      <cds-resizer-panel slot="bottom">
        <div class="panel-content">
          <h3>Bottom Panel</h3>
          <p>This panel adjusts automatically.</p>
        </div>
      </cds-resizer-panel>
    </cds-resizer-grid>
  </div>
`;

// ─── Two panels — vertical (left / right) ────────────────────────────────────

export const TwoPanelsVertical = (args) => html`
  ${getStyles(args)}
  <div class="container">
    <cds-resizer-grid axis="x">
      <cds-resizer-panel slot="left">
        <div class="panel-content">
          <h3>Left Panel</h3>
          <p>Drag the handle to resize. Double-click to reset.</p>
        </div>
      </cds-resizer-panel>
      <cds-resizer-handle slot="handle-horizontal"></cds-resizer-handle>
      <cds-resizer-panel slot="right">
        <div class="panel-content">
          <h3>Right Panel</h3>
          <p>This panel adjusts automatically.</p>
        </div>
      </cds-resizer-panel>
    </cds-resizer-grid>
  </div>
`;

// ─── Nested ───────────────────────────────────────────────────────────────────

export const Nested = (args) => html`
  ${getStyles(args)}
  <div class="nested-container">
    <cds-resizer-grid axis="x">
      <cds-resizer-panel slot="left">
        <div class="panel-content">
          <h3>Left Panel</h3>
          <p>This is a fixed left panel.</p>
        </div>
      </cds-resizer-panel>
      <cds-resizer-handle slot="handle-horizontal"></cds-resizer-handle>
      <cds-resizer-panel slot="right">
        <cds-resizer-grid axis="y">
          <cds-resizer-panel slot="top">
            <div class="panel-content">
              <h3>Top Right Panel</h3>
              <p>Nested vertical resizer.</p>
            </div>
          </cds-resizer-panel>
          <cds-resizer-handle slot="handle-vertical"></cds-resizer-handle>
          <cds-resizer-panel slot="bottom">
            <div class="panel-content">
              <h3>Bottom Right Panel</h3>
              <p>Resize both horizontally and vertically.</p>
            </div>
          </cds-resizer-panel>
        </cds-resizer-grid>
      </cds-resizer-panel>
    </cds-resizer-grid>
  </div>
`;

// ─── With pivot handle ────────────────────────────────────────────────────────

export const WithPivotHandle = (args) => {
  const reverse = args.reverse ?? false;

  const innerGrid = html`
    <cds-resizer-grid axis="y" class="inner-grid">
      <cds-resizer-panel slot="top">
        <div class="panel-content">
          <h3>${reverse ? 'Top Left' : 'Top Right'} Panel</h3>
          <p>
            ${reverse
              ? 'Reverse layout — the nested grid is on the left. The pivot handle appears at the intersection.'
              : 'Notice the pivot handle at the intersection — it allows resizing both axes simultaneously.'}
          </p>
        </div>
      </cds-resizer-panel>
      <cds-resizer-handle slot="handle-vertical">
        <cds-resizer-handle-pivot></cds-resizer-handle-pivot>
      </cds-resizer-handle>
      <cds-resizer-panel slot="bottom">
        <div class="panel-content">
          <h3>${reverse ? 'Bottom Left' : 'Bottom Right'} Panel</h3>
          <p>
            The pivot handle
            ${reverse
              ? 'allows simultaneous resizing of both axes'
              : 'appears at the corner where the two resizer handles meet'}.
          </p>
        </div>
      </cds-resizer-panel>
    </cds-resizer-grid>
  `;

  const simplePanel = html`
    <div class="panel-content">
      <h3>${reverse ? 'Right' : 'Left'} Panel</h3>
      <p>
        This is the ${reverse ? 'right' : 'left'} panel. Resize using the
        vertical handle.
      </p>
    </div>
  `;

  return html`
    ${getStyles(args)}
    <style>
      .pivot-container {
        width: 800px;
        height: 600px;
        --resizer-thickness: ${args['--resizer-thickness']}px;
        --resizer-grab-thickness: ${args['--resizer-grab-thickness']}px;
        --resizer-grab-color: ${grabColor(args)};
      }
      .outer-grid {
        --start-element-size: ${reverse ? '4fr' : '1fr'};
        --end-element-size: ${reverse ? '1fr' : '4fr'};
      }
      .inner-grid {
        --start-element-size: 3fr;
        --end-element-size: 1fr;
      }
    </style>
    <div class="pivot-container">
      <cds-resizer-grid axis="x" class="outer-grid">
        <cds-resizer-panel slot="left">
          ${reverse ? innerGrid : simplePanel}
        </cds-resizer-panel>
        <cds-resizer-handle slot="handle-horizontal"></cds-resizer-handle>
        <cds-resizer-panel slot="right">
          ${reverse ? simplePanel : innerGrid}
        </cds-resizer-panel>
      </cds-resizer-grid>
    </div>
  `;
};

WithPivotHandle.argTypes = {
  reverse: {
    control: { type: 'boolean' },
    description: 'Reverse the layout (nested grid on left instead of right)',
    table: { defaultValue: { summary: 'false' } },
  },
};
WithPivotHandle.args = { reverse: false };

// ─── With custom handles ──────────────────────────────────────────────────────

export const WithCustomHandles = (args) => {
  let initialHeight = 0;
  const handleResizeStart = (e) => {
    const panel = e.target.previousElementSibling;
    if (panel) {
      initialHeight = panel.offsetHeight;
      panel.style.transition = 'none';
    }
  };
  const handleResize = (e) => {
    const panel = e.target.previousElementSibling;
    const container = e.target.parentElement;
    if (panel && container && e.detail.delta !== undefined) {
      const constrainedHeight = Math.max(
        48,
        Math.min(initialHeight + e.detail.delta, container.offsetHeight - 20)
      );
      panel.style.height = `${constrainedHeight}px`;
    }
  };
  const handleReset = (e) => {
    const panel = e.target.previousElementSibling;
    if (panel) {
      panel.style.transition = 'height 180ms cubic-bezier(0.25, 0.9, 0.25, 1)';
      panel.style.height = '150px';
    }
  };

  return html`
    ${getStyles(args)}
    <style>
      .parent-container {
        display: flex;
        flex-wrap: wrap;
        gap: var(--cds-spacing-05);
      }
      .custom-handle-container {
        width: 400px;
        height: 300px;
        overflow: hidden;
        --resizer-thickness: ${args['--resizer-thickness']}px;
        --resizer-grab-thickness: ${args['--resizer-grab-thickness']}px;
        --resizer-grab-color: ${grabColor(args)};
      }
      .custom-handle-flex {
        height: 100%;
        display: flex;
        flex-direction: column;
      }
      .custom-panel {
        padding: var(--cds-spacing-05);
        background-color: var(--cds-layer);
        min-block-size: var(--cds-spacing-09);
        overflow: auto;
        height: 150px;
      }
      .custom-icon {
        position: absolute;
      }
      /* Arrow transition on hover */
      .custom-drag-handler-5 {
        width: var(--cds-spacing-04);
        height: var(--resizer-thickness);
        margin: auto;
        background: var(--cds-border-inverse);
        position: relative;
        transition: all 0.3s ease;
      }
      .custom-drag-handler-5::before,
      .custom-drag-handler-5::after {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        border-left: var(--cds-spacing-02) solid transparent;
        border-right: var(--cds-spacing-02) solid transparent;
        transition: all 150ms ease;
      }
      .custom-drag-handler-5::before {
        bottom: 100%;
      }
      .custom-drag-handler-5::after {
        top: 100%;
      }
      cds-resizer-handle.custom-resizer-5:hover .custom-drag-handler-5,
      cds-resizer-handle.custom-resizer-5:focus .custom-drag-handler-5 {
        width: var(--cds-spacing-01);
        background: var(--cds-layer-selected-inverse);
      }
      cds-resizer-handle.custom-resizer-5:hover .custom-drag-handler-5::before,
      cds-resizer-handle.custom-resizer-5:focus .custom-drag-handler-5::before {
        border-bottom: var(--cds-spacing-02) solid
          var(--cds-layer-selected-inverse);
      }
      cds-resizer-handle.custom-resizer-5:hover .custom-drag-handler-5::after,
      cds-resizer-handle.custom-resizer-5:focus .custom-drag-handler-5::after {
        border-top: var(--cds-spacing-02) solid
          var(--cds-layer-selected-inverse);
      }
      /* Static arrows */
      .custom-drag-handler-7 {
        width: var(--cds-spacing-01);
        height: var(--resizer-thickness);
        top: 0;
        margin: auto;
        position: relative;
      }
      .custom-drag-handler-7::before,
      .custom-drag-handler-7::after {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        border-left: var(--cds-spacing-02) solid transparent;
        border-right: var(--cds-spacing-02) solid transparent;
      }
      .custom-drag-handler-7::before {
        bottom: 100%;
        border-bottom: var(--cds-spacing-02) solid
          var(--cds-layer-selected-inverse);
      }
      .custom-drag-handler-7::after {
        top: 100%;
        border-top: var(--cds-spacing-02) solid
          var(--cds-layer-selected-inverse);
      }
    </style>
    <div class="parent-container">
      <!-- Drag icon -->
      <div class="custom-handle-container">
        <div class="custom-handle-flex">
          <div class="custom-panel">
            <h4>Drag Icon</h4>
            <p>Custom handle with a drag icon in the icon slot.</p>
          </div>
          <cds-resizer-handle
            @resize-start=${handleResizeStart}
            @resize-drag=${handleResize}
            @resize-reset=${handleReset}>
            ${iconLoader(DragVertical16, {
              slot: 'icon',
              class: 'custom-icon',
            })}
          </cds-resizer-handle>
        </div>
      </div>
      <!-- Arrow transition on hover -->
      <div class="custom-handle-container">
        <div class="custom-handle-flex">
          <div class="custom-panel">
            <h4>Arrow Transition</h4>
            <p>Custom drag handle transitioning into an arrow on hover.</p>
          </div>
          <cds-resizer-handle
            class="custom-resizer-5"
            @resize-start=${handleResizeStart}
            @resize-drag=${handleResize}
            @resize-reset=${handleReset}>
            <div slot="icon" class="custom-drag-handler-5"></div>
          </cds-resizer-handle>
        </div>
      </div>
      <!-- Static arrows -->
      <div class="custom-handle-container">
        <div class="custom-handle-flex">
          <div class="custom-panel">
            <h4>Static Arrows</h4>
            <p>Custom drag handle with static directional arrows.</p>
          </div>
          <cds-resizer-handle
            class="custom-resizer-7"
            @resize-start=${handleResizeStart}
            @resize-drag=${handleResize}
            @resize-reset=${handleReset}>
            <div slot="icon" class="custom-drag-handler-7"></div>
          </cds-resizer-handle>
        </div>
      </div>
    </div>
  `;
};
