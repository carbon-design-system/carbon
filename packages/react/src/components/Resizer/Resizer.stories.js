// cspell:ignore resizer
/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useRef } from 'react';
import mdx from './Resizer.mdx';
import { Resizer } from './Resizer';
import { DragVertical } from '@carbon/react/icons';
import './story.scss';

export default {
  title: 'Utilities/Resizer',
  component: Resizer,
  parameters: {
    layout: 'centered',
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    orientation: {
      control: false,
    },
    children: {
      control: false,
    },
  },
};

/**
 * SinglePanelNoBoundaries example
 *
 * @param {any} args - props from story controls
 */
export const SinglePanelNoBoundaries = (args) => (
  <>
    <style>
      {`
        .single-panel {
          display: flex;
          flex-direction: column;
          width: 600px;
          overflow: hidden;
        }

        .single-panel__panel {
          padding: var(--cds-spacing-05);
          background-color: var(--cds-layer);
          min-block-size: var(--cds-spacing-09);
          overflow: auto;
          transition: all 150ms linear;
        }

        .cds--resizer--horizontal::before {
          content: "";
          height: calc(100% + var(--cds-spacing-05));
          top: calc(-1 * var(--cds-spacing-03));
          width: 100%;
          position: absolute;
        }
      `}
    </style>
    <div className="single-panel">
      <div className="single-panel__panel">
        <h3 className="single-panel__panel-title">
          Single Panel (no boundaries)
        </h3>
        <p>
          This is a basic resizable panel that can be adjusted vertically using
          the resize handle below. The panel takes height according to the
          content, but can also be pre set.
        </p>
      </div>
      <Resizer {...args} orientation="horizontal" />
    </div>
  </>
);
SinglePanelNoBoundaries.storyName = 'Single panel (no boundaries)';

/**
 * SinglePanelBounded example
 *
 * @param {any} args - props from story controls
 */
export const SinglePanelBounded = (args) => {
  const panelRef = useRef(null);
  return (
    <>
      <style>{`
      .single-panel-bounded {
        width: 600px;
        height: 400px;
        overflow: hidden;
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
        transition: all 150ms linear;
      }

      .cds--resizer--horizontal::before {
        content: "";
        height: calc(100% + var(--cds-spacing-05));
        top: calc(-1 * var(--cds-spacing-03));
        width: 100%;
        position: absolute;
      }
    `}</style>
      <div className="single-panel-bounded">
        <div className="single-panel-bounded__container">
          <div className="single-panel-bounded__panel" ref={panelRef}>
            <h3 className="single-panel-bounded__panel-title">
              Single Panel (bounded)
            </h3>
            <p>
              This panel demonstrates how resizing can be constrained within
              fixed boundaries. The panel is contained within a 600x400 pixel
              container, ensuring that the resizing behavior remains within
              these defined limits.
            </p>
          </div>
          <Resizer
            {...args}
            orientation="horizontal"
            onResizeEnd={(_event, ref) =>
              ref.current.setAttribute(
                'aria-label',
                `top panel ${panelRef?.current?.style.height}`
              )
            } // for custom a11y announcements.
          />
        </div>
      </div>
    </>
  );
};
SinglePanelBounded.storyName = 'Single panel (bounded)';

/**
 * SinglePanelOverlay example
 *
 * @param {any} args - props from story controls
 */
export const SinglePanelOverlay = (args) => (
  <>
    <style>{`
      .single-panel-overlay {
        position: relative;
        width: 600px;
        height: 400px;
        overflow: hidden;
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
        transition: all 150ms linear;
      }

      .cds--resizer--horizontal::before {
        content: "";
        height: calc(100% + var(--cds-spacing-05));
        top: calc(-1 * var(--cds-spacing-03));
        width: 100%;
        position: absolute;
      }
    `}</style>
    <div className="single-panel-overlay">
      <div className="single-panel-overlay__content">
        <h3>Main Content</h3>
        <p>
          This is the main content area that remains fixed in the background. It
          demonstrates how content can be organized in layers, with the overlay
          panel providing additional context or controls when needed.
        </p>
      </div>
      <div className="single-panel-overlay__panel">
        <Resizer {...args} orientation="horizontal" />
        <div className="single-panel-overlay__panel-content">
          <h3 className="single-panel-overlay__panel-title">Overlay Panel</h3>
          <p>
            This sliding panel overlays the main content and can be resized from
            the top edge. Its useful for displaying additional information or
            controls while maintaining access to the main content above.
          </p>
        </div>
      </div>
    </div>
  </>
);
SinglePanelOverlay.storyName = 'Single panel (overlay)';

/**
 * TwoPanelsHorizontal example
 *
 * @param {any} args - props from story controls
 */
export const TwoPanelsHorizontal = (args) => (
  <>
    <style>{`
      .two-panels-horizontal {
        display: flex;
        flex-direction: column;
        width: 600px;
        height: 400px;
        overflow: hidden;
      }

      .two-panels-horizontal__panel {
        height: 100%;
        background-color: var(--cds-layer);
        padding: var(--cds-spacing-05);
        overflow: auto;
        min-block-size: 48px;
        transition: all 150ms linear;
      }

      .cds--resizer--horizontal::before {
        content: "";
        height: calc(100% + var(--cds-spacing-05));
        top: calc(-1 * var(--cds-spacing-03));
        width: 100%;
        position: absolute;
      }
    `}</style>
    <div className="two-panels-horizontal">
      <div className="two-panels-horizontal__panel">
        <h3 className="two-panels-horizontal__panel-title">Top Panel</h3>
        <p>
          The top panel in this vertically stacked layout can be adjusted using
          the horizontal resize handle below. This arrangement is particularly
          useful for interfaces that need to display different levels of
          information, such as a preview area above and details below.
        </p>
      </div>
      <Resizer {...args} orientation="horizontal" />
      <div className="two-panels-horizontal__panel">
        <h3 className="two-panels-horizontal__panel-title">Bottom Panel</h3>
        <p>
          The bottom panel adapts its size in response to the top panels
          resizing, maintaining a fluid and responsive layout. This setup works
          well for scenarios like log viewers, console outputs, or supplementary
          information displays.
        </p>
      </div>
    </div>
  </>
);
TwoPanelsHorizontal.storyName = 'Two panels (horizontal)';

/**
 * TwoPanelsVertical example
 *
 * @param {any} args - props from story controls
 */
export const TwoPanelsVertical = (args) => (
  <>
    <style>{`
      .two-panels-vertical {
        display: flex;
        width: 600px;
        height: 400px;
        overflow: hidden;
      }

      .two-panels-vertical__panel {
        background-color: var(--cds-layer);
        padding: var(--cds-spacing-05);
        overflow: auto;
        min-inline-size: 48px;
        transition: all 150ms linear;
      }

      .cds--resizer--vertical::before {
        content: "";
        height: 100%;
        left: calc(-1 * var(--cds-spacing-03));
        width: calc(100% + var(--cds-spacing-05));
        position: absolute;
      }
    `}</style>
    <div className="two-panels-vertical">
      <div className="two-panels-vertical__panel">
        <h3 className="two-panels-vertical__panel-title">Left Panel</h3>
        <p>
          This panel forms the left section of a two-panel layout. The vertical
          resize handle between panels allows for horizontal adjustment, making
          it perfect for side-by-side content organization like navigation menus
          and main content areas.
        </p>
      </div>
      <Resizer {...args} orientation="vertical" />
      <div className="two-panels-vertical__panel">
        <h3 className="two-panels-vertical__panel-title">Right Panel</h3>
        <p>
          The right panel complements the left panel, creating a flexible
          workspace. This arrangement is ideal for applications requiring
          concurrent view of related content, such as code editors with preview
          panes or document comparison tools.
        </p>
      </div>
    </div>
  </>
);
TwoPanelsVertical.storyName = 'Two panels (vertical)';

/**
 * FourPanels example
 *
 * @param {any} args - props from story controls
 */
export const FourPanels = (args) => (
  <>
    <style>{`
      .four-panels {
        display: flex;
        height: 400px;
        width: 600px;
      }

      .four-panels__column {
        overflow: auto;
        min-inline-size: var(--cds-spacing-09);
        width: 50%;
        display: flex;
        flex-direction: column;
        transition: all 150ms linear;
      }

      .four-panels__panel {
        padding: var(--cds-spacing-05);
        background-color: var(--cds-layer);
        overflow: auto;
        min-block-size: var(--cds-spacing-09);
        height: 50%;
        transition: all 150ms linear;
      }

      .four-panels__panel--right-top {
        height: 40%;
      }

      .four-panels__panel--right-bottom {
        height: 60%;
      }

      .four-panels__panel-title {
        margin-top: 0;
      }

      .cds--resizer--vertical::before {
        content: "";
        height: 100%;
        left: calc(-1 * var(--cds-spacing-03));
        width: calc(100% + var(--cds-spacing-05));
        position: absolute;
      }

      .cds--resizer--horizontal::before {
        content: "";
        height: calc(100% + var(--cds-spacing-05));
        top: calc(-1 * var(--cds-spacing-03));
        width: 100%;
        position: absolute;
      }
    `}</style>
    <div className="four-panels">
      <div className="four-panels__column">
        <div className="four-panels__panel">
          <h3 className="four-panels__panel-title">Top Left Panel</h3>
          <p>
            Buttons are used to initialize an action, either in the background
            or foreground of an experience. There are several kinds of buttons.
            Primary buttons should be used for the principle call to action on
            the page.
          </p>
        </div>
        <Resizer {...args} orientation="horizontal" />
        <div className="four-panels__panel">
          <h3 className="four-panels__panel-title">Bottom Left Panel</h3>
          <p>
            Buttons are used to initialize an action, either in the background
            or foreground of an experience. There are several kinds of buttons.
            Primary buttons should be used for the principle call to action on
            the page.
          </p>
        </div>
      </div>
      <Resizer {...args} orientation="vertical" />
      <div className="four-panels__column">
        <div className="four-panels__panel four-panels__panel--right-top">
          <h3 className="four-panels__panel-title">Top Right Panel</h3>
          <p>
            Buttons are used to initialize an action, either in the background
            or foreground of an experience. There are several kinds of buttons.
            Primary buttons should be used for the principle call to action on
            the page.
          </p>
        </div>
        <Resizer {...args} orientation="horizontal" />
        <div className="four-panels__panel four-panels__panel--right-bottom">
          <h3 className="four-panels__panel-title">Bottom Right Panel</h3>
          <p>
            Buttons are used to initialize an action, either in the background
            or foreground of an experience. There are several kinds of buttons.
            Primary buttons should be used for the principle call to action on
            the page.
          </p>
        </div>
      </div>
    </div>
  </>
);
FourPanels.storyName = 'Four panels';

/**
 * TwoPanelsVerticalGrid example
 *
 * @param {any} args - props from story controls
 */
export const TwoPanelsVerticalGrid = (args) => {
  // fully controlled example

  // eslint-disable-next-line jsdoc/require-jsdoc
  const clampFraction = (value) =>
    Math.max(0.0806723, Math.min(0.919328, value));

  // eslint-disable-next-line jsdoc/require-jsdoc
  const clampWidth = (width, totalWidth) =>
    Math.max(48, Math.min(totalWidth - 48, width));
  const containerRef = useRef(null);
  const startWidthRef = useRef(0);
  const currentFractionRef = useRef(0.5);
  const initialFraction = 0.5;

  // eslint-disable-next-line jsdoc/require-jsdoc
  const handleResize = (event, delta) => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    container.style.transition = event.type === 'keydown' ? '' : 'unset';
    const totalWidth = container.offsetWidth - 5;
    let newFraction = currentFractionRef.current;

    if (event.type === 'keydown') {
      const step = delta / totalWidth;
      newFraction = clampFraction(currentFractionRef.current + step);
    } else {
      const leftPanelWidth = container.firstElementChild?.clientWidth ?? 0;
      if (startWidthRef.current === 0) {
        startWidthRef.current = leftPanelWidth;
      }
      const newWidth = clampWidth(startWidthRef.current + delta, totalWidth);
      newFraction = newWidth / totalWidth;
    }

    currentFractionRef.current = newFraction;
    container.style.gridTemplateColumns = `${newFraction}fr auto ${
      1 - newFraction
    }fr`;
  };

  // eslint-disable-next-line jsdoc/require-jsdoc
  const handleResizeEnd = (event, _ref) => {
    const container = containerRef.current;
    container.style.transition = event.type === 'keydown' ? '' : 'unset';
    startWidthRef.current = 0;
  };

  // eslint-disable-next-line jsdoc/require-jsdoc
  const handleDoubleClick = (event) => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    container.style.transition = event.type !== 'keydown' ? '' : 'unset';
    currentFractionRef.current = initialFraction;
    container.style.gridTemplateColumns = `${initialFraction}fr auto ${
      1 - initialFraction
    }fr`;
  };

  return (
    <>
      <style>{`
      .two-panels-vertical-grid {
        display: grid;
        grid-template-columns: 0.5fr auto 0.5fr;
        width: 600px;
        height: 400px;
        transition: all 150ms linear;
      }

      .two-panels-vertical-grid__panel {
        background-color: var(--cds-layer);
        padding: var(--cds-spacing-05);
        overflow: auto;
        min-inline-size: 48px;
      }

      .cds--resizer--vertical::before {
        content: "";
        height: 100%;
        left: calc(-1 * var(--cds-spacing-03));
        width: calc(100% + var(--cds-spacing-05));
        position: absolute;
      }
      `}</style>
      <div className="two-panels-vertical-grid" ref={containerRef}>
        <div className="two-panels-vertical-grid__panel">
          <h3>Left Panel</h3>
          <p>
            Buttons are used to initialize an action, either in the background
            or foreground of an experience. There are several kinds of buttons.
            Primary buttons should be used for the principle call to action on
            the page.
          </p>
        </div>

        <Resizer
          {...args}
          orientation="vertical"
          onResize={handleResize}
          onResizeEnd={handleResizeEnd}
          onDoubleClick={handleDoubleClick}
        />

        <div className="two-panels-vertical-grid__panel">
          <h3>Right Panel</h3>
          <p>
            Buttons are used to initialize an action, either in the background
            or foreground of an experience. There are several kinds of buttons.
            Primary buttons should be used for the principle call to action on
            the page.
          </p>
        </div>
      </div>
    </>
  );
};
TwoPanelsVerticalGrid.storyName = 'Two panels vertical (grid)';

/**
 * WithCustomHandles example
 *
 * @param {any} args - props from story controls
 */
export const WithCustomHandles = (args) => {
  return (
    <>
      <style>{`
      /************* General Layout *************/
      .parent-container {
        display: flex;
        flex-wrap: wrap;
        gap: var(--cds-spacing-05);
      }

      .single-panel-bounded {
        width: 400px;
        height: 160px;
        overflow: hidden;
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
        transition: all 150ms linear;
      }

      /************* Shared Resizer Styling *************/
      .cds--resizer--horizontal::before {
        content: "";
        position: absolute;
        top: calc(-1 * var(--cds-spacing-03));
        width: 100%;
        height: calc(100% + var(--cds-spacing-05));
      }

      /************* Handler 1: Always Visible Icon *************/
      .custom-drag-handler-1 {
        position: absolute;
        top: calc(-1 * (var(--cds-spacing-04) / 2));
        left: 50%;
        transform: translateX(-50%);
      }

      /************* Handler 2: Icon Shown on Hover *************/
      .custom-drag-handler-2 {
        position: absolute;
        top: calc(-1 * (var(--cds-spacing-04) / 2));
        left: 50%;
        transform: translateX(-50%);
        display: none;
        transition: all 150ms ease-out;
      }

      .custom-resizer-2:hover .custom-drag-handler-2,
      .custom-resizer-2:focus .custom-drag-handler-2 {
        display: unset;
      }

      /************* Handler 3: Animated Lines on Hover *************/
      .custom-drag-handler-3 {
        position: absolute;
        top: var(--cds-spacing-01);
        left: 50%;
        transform: translateX(-50%);
      }

      .line-1::before,
      .line-1::after,
      .line-2::before,
      .line-2::after {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        height: var(--cds-spacing-01);;
        background-color: transparent;
        transition: all 150ms ease-out;
      }

      .line-1::before,
      .line-2::before {
        top: 0;
        width: var(--cds-spacing-03);
      }

      .line-1::after,
      .line-2::after {
        bottom: 0;
        width: var(--cds-spacing-03);
      }

      .line-2::before,
      .line-2::after {
        width: var(--cds-spacing-06);
        transition-delay: 0.1s;
      }

      .custom-resizer-3:hover .line-1::before,
      .custom-resizer-3:focus .line-1::before {
        top: -10px;
        background-color: var(--cds-border-interactive);
      }

      .custom-resizer-3:hover .line-1::after,
      .custom-resizer-3:focus .line-1::after {
        bottom: -10px;
        background-color: var(--cds-border-interactive);
      }

      .custom-resizer-3:hover .line-2::before,
      .custom-resizer-3:focus .line-2::before {
        top: calc(-1 * (var(--cds-spacing-04) / 2));
        background-color: var(--cds-border-interactive);
      }

      .custom-resizer-3:hover .line-2::after,
      .custom-resizer-3:focus .line-2::after {
        bottom: calc(-1 * (var(--cds-spacing-04) / 2));
        background-color: var(--cds-border-interactive);
      }

      /************* Handler 4: Static Lines *************/
      .custom-resizer-4 .line-1::before {
        top: -8px;
        background-color: var(--cds-border-subtle);
      }

      .custom-resizer-4 .line-1::after {
        bottom: -8px;
        background-color: var(--cds-border-subtle);
      }

      .custom-resizer-4 .line-2::before {
        top: -4px;
        background-color: var(--cds-border-subtle);
      }

      .custom-resizer-4 .line-2::after {
        bottom: -4px;
        background-color: var(--cds-border-subtle);
      }

      /************* Handler 5: Arrow Transition on Hover *************/
      .custom-drag-handler-5 {
        width: var(--cds-spacing-04);
        height: var(--cds-spacing-02);
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

      .custom-resizer-5:hover .custom-drag-handler-5,
      .custom-resizer-5:focus .custom-drag-handler-5 {
        width: var(--cds-spacing-01);
        background: var(--cds-layer-selected-inverse);
      }

      .custom-resizer-5:hover .custom-drag-handler-5::before,
      .custom-resizer-5:focus .custom-drag-handler-5::before {
        border-bottom: var(--cds-spacing-02) solid var(--cds-layer-selected-inverse);
      }

      .custom-resizer-5:hover .custom-drag-handler-5::after,
      .custom-resizer-5:focus .custom-drag-handler-5::after {
        border-top: var(--cds-spacing-02) solid var(--cds-layer-selected-inverse);
      }

      /************* Handler 6: Thicker Arrow Indicator *************/
      .custom-drag-handler-6 {
        width: var(--cds-spacing-06);
        height: var(--cds-spacing-03);
        top: -2px;
        margin: auto;
        background: var(--cds-border-inverse);
        position: relative;
        transition: all 0.3s ease;
      }

      .custom-drag-handler-6::before,
      .custom-drag-handler-6::after {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        border-left: var(--cds-spacing-02) solid transparent;
        border-right: var(--cds-spacing-02) solid transparent;
        transition: all 150ms ease;
      }

      .custom-drag-handler-6::before {
        bottom: 100%;
      }

      .custom-drag-handler-6::after {
        top: 100%;
      }

      .custom-resizer-6:hover .custom-drag-handler-6,
      .custom-resizer-6:focus .custom-drag-handler-6 {
        width: var(--cds-spacing-01);
        background: var(--cds-layer-selected-inverse);
      }

      .custom-resizer-6:hover .custom-drag-handler-6::before,
      .custom-resizer-6:focus .custom-drag-handler-6::before {
        border-bottom: var(--cds-spacing-02) solid var(--cds-layer-selected-inverse);
      }

      .custom-resizer-6:hover .custom-drag-handler-6::after,
      .custom-resizer-6:focus .custom-drag-handler-6::after {
        border-top: var(--cds-spacing-02) solid var(--cds-layer-selected-inverse);
      }

      /************* Handler 7: Static Arrow *************/
      .custom-drag-handler-7 {
        width: var(--cds-spacing-01);
        height: var(--cds-spacing-02);
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
        border-bottom: var(--cds-spacing-02) solid var(--cds-layer-selected-inverse);
      }

      .custom-drag-handler-7::after {
        top: 100%;
        border-top: var(--cds-spacing-02) solid var(--cds-layer-selected-inverse);
      }
      `}</style>

      <div className="parent-container">
        {/* Handler 1 */}
        <div className="single-panel-bounded">
          <div className="single-panel-bounded__container">
            <div className="single-panel-bounded__panel">
              <p>This panel demonstrates custom drag handle with icons</p>
            </div>
            <Resizer {...args} orientation="horizontal">
              <DragVertical className="custom-drag-handler-1" />
            </Resizer>
          </div>
        </div>

        {/* Handler 2 */}
        <div className="single-panel-bounded">
          <div className="single-panel-bounded__container">
            <div className="single-panel-bounded__panel">
              <p>
                This panel demonstrates custom drag handle with icons on hover
              </p>
            </div>
            <Resizer
              {...args}
              orientation="horizontal"
              className="custom-resizer-2">
              <DragVertical className="custom-drag-handler-2" />
            </Resizer>
          </div>
        </div>

        {/* Handler 3 */}
        <div className="single-panel-bounded">
          <div className="single-panel-bounded__container">
            <div className="single-panel-bounded__panel">
              <p>
                This panel demonstrates custom drag handle with divs and
                transitions on hover
              </p>
            </div>
            <Resizer
              {...args}
              orientation="horizontal"
              className="custom-resizer-3">
              <div className="custom-drag-handler-3">
                <div className="line-1"></div>
                <div className="line-2"></div>
              </div>
            </Resizer>
          </div>
        </div>

        {/* Handler 4 */}
        <div className="single-panel-bounded">
          <div className="single-panel-bounded__container">
            <div className="single-panel-bounded__panel">
              <p>This panel demonstrates custom drag handle with static divs</p>
            </div>
            <Resizer
              {...args}
              orientation="horizontal"
              className="custom-resizer-4">
              <div className="custom-drag-handler-4">
                <div className="line-1"></div>
                <div className="line-2"></div>
              </div>
            </Resizer>
          </div>
        </div>

        {/* Handler 5 */}
        <div className="single-panel-bounded">
          <div className="single-panel-bounded__container">
            <div className="single-panel-bounded__panel">
              <p>
                This panel demonstrates custom drag handle transitioning into an
                arrow
              </p>
            </div>
            <Resizer
              {...args}
              orientation="horizontal"
              className="custom-resizer-5">
              <div className="custom-drag-handler-5" />
            </Resizer>
          </div>
        </div>

        {/* Handler 6 */}
        <div className="single-panel-bounded">
          <div className="single-panel-bounded__container">
            <div className="single-panel-bounded__panel">
              <p>
                This panel demonstrates custom drag handle with thick indicator
                and arrow
              </p>
            </div>
            <Resizer
              {...args}
              orientation="horizontal"
              className="custom-resizer-6">
              <div className="custom-drag-handler-6" />
            </Resizer>
          </div>
        </div>

        {/* Handler 7 */}
        <div className="single-panel-bounded">
          <div className="single-panel-bounded__container">
            <div className="single-panel-bounded__panel">
              <p>
                This panel demonstrates custom drag handle with static arrows
              </p>
            </div>
            <Resizer
              {...args}
              orientation="horizontal"
              className="custom-resizer-7">
              <div className="custom-drag-handler-7" />
            </Resizer>
          </div>
        </div>
      </div>
    </>
  );
};
WithCustomHandles.storyName = 'With custom handles';
