/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ReactiveController, ReactiveElement } from 'lit';
import {
  computePosition,
  flip,
  size,
  offset,
  arrow,
  autoUpdate,
  hide,
  Placement,
  type Boundary,
} from '@floating-ui/dom';

type FloatingControllerOptions = {
  target: HTMLElement;
  trigger: HTMLElement;
  alignment: string;

  arrowElement?: HTMLElement | undefined;
  flipArguments?: object;
  caret?: boolean;

  styleElement?: HTMLElement;
  matchWidth?: boolean;
  open: boolean;
  alignmentAxisOffset?: number;
  autoAlignBoundary?: Boundary;
  isTabTip?: boolean;
};

/**
 * Controller for positioning the menu using Floating UI.
 */
export default class FloatingController implements ReactiveController {
  /**
   * Host component
   */
  private host: ReactiveElement;
  /**
   * Floating-ui options to pass to `computePlacement()`
   */
  private options!: FloatingControllerOptions;
  /**
   * cleanup function to stop auto updates
   */
  private cleanup?: () => void;

  /**
   * register with host component
   * @param host host component
   */
  constructor(host: ReactiveElement) {
    this.host = host;
    host.addController(this);
  }

  async setPlacement(options: FloatingControllerOptions = this.options) {
    this.options = options;
    const { trigger, target } = options;
    this.cleanup = autoUpdate(trigger, target, this.updatePlacement);
  }

  updatePlacement = (): void => {
    this.computePlacement();
  };

  async computePlacement() {
    const {
      arrowElement,
      alignment,
      caret,
      trigger,
      target,
      styleElement,
      matchWidth,
      open,
      alignmentAxisOffset,
      autoAlignBoundary,
      isTabTip,
    } = this.options;

    const element = styleElement ?? target;

    if (!element) return;

    let shimmedAlign;
    switch (alignment) {
      case 'top-left':
        shimmedAlign = 'top-start';
        break;
      case 'top-right':
        shimmedAlign = 'top-end';
        break;
      case 'bottom-left':
        shimmedAlign = 'bottom-start';
        break;
      case 'bottom-right':
        shimmedAlign = 'bottom-end';
        break;
      case 'left-bottom':
        shimmedAlign = 'left-end';
        break;
      case 'left-top':
        shimmedAlign = 'left-start';
        break;
      case 'right-bottom':
        shimmedAlign = 'right-end';
        break;
      case 'right-top':
        shimmedAlign = 'right-start';
        break;
      default:
        shimmedAlign = alignment;
        break;
    }
    const cs = getComputedStyle(element);
    const toPx = (val: string) => {
      const raw = parseFloat(val);
      return val.trim().endsWith('rem') ? raw * 16 : raw;
    };
    const offsetPx = !isTabTip
      ? (toPx(cs.getPropertyValue('--cds-popover-offset').trim()) ?? 10)
      : 0;

    const middleware = [
      offset(
        caret && !isTabTip
          ? { alignmentAxis: alignmentAxisOffset, mainAxis: offsetPx }
          : 0
      ),
      flip({
        fallbackPlacements: isTabTip
          ? shimmedAlign.includes('bottom')
            ? ['bottom-start', 'bottom-end', 'top-start', 'top-end']
            : ['top-start', 'top-end', 'bottom-start', 'bottom-end']
          : shimmedAlign.includes('bottom')
            ? [
                'bottom',
                'bottom-start',
                'bottom-end',
                'right',
                'right-start',
                'right-end',
                'left',
                'left-start',
                'left-end',
                'top',
                'top-start',
                'top-end',
              ]
            : [
                'top',
                'top-start',
                'top-end',
                'left',
                'left-start',
                'left-end',
                'right',
                'right-start',
                'right-end',
                'bottom',
                'bottom-start',
                'bottom-end',
              ],

        fallbackStrategy: 'initialPlacement',
        fallbackAxisSideDirection: 'start',
        boundary: autoAlignBoundary,
      }),
      ...(matchWidth && (shimmedAlign === 'bottom' || shimmedAlign === 'top')
        ? [
            size({
              apply({ rects, elements }) {
                elements.floating.style.width = `${rects.reference.width}px`;
              },
            }),
          ]
        : [
            size({
              apply({ elements }) {
                elements.floating.style.removeProperty('width');
              },
            }),
          ]),

      ...(caret && arrowElement
        ? [arrow({ element: arrowElement, padding: 15 })]
        : []),

      ...[hide()],
    ];

    if (open) {
      const { x, y, placement, middlewareData, strategy } =
        await computePosition(trigger, element, {
          strategy: 'fixed',
          middleware,
          placement: shimmedAlign as Placement,
        });

      element.setAttribute('align', placement);

      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
      element.style.position = `${strategy}`;

      element.style.visibility = middlewareData.hide?.referenceHidden
        ? 'hidden'
        : 'visible';

      if (arrowElement) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
        // @ts-ignore
        const { x: arrowX, y: arrowY } = middlewareData.arrow;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
        const staticSide: any = {
          top: 'bottom',
          right: 'left',
          bottom: 'top',
          left: 'right',
        }[placement.split('-')[0]];

        arrowElement.style.left = arrowX != null ? `${arrowX}px` : '';
        arrowElement.style.top = arrowY != null ? `${arrowY}px` : '';
        arrowElement.style.right = '';
        arrowElement.style.bottom = '';
        arrowElement.style[staticSide] = `${-arrowElement.offsetWidth / 2}px`;
      }

      // adding specific case here where the style of the caret/arrow
      // is dependent on the placement
      // TODO: remove reference to slug in v12
      if (
        this.host.tagName === 'CDS-AI-LABEL' ||
        this.host.tagName === 'CDS-SLUG'
      ) {
        this.host?.setAttribute('alignment', placement);
      }
    }
  }

  hostUpdated(): void {
    if (!this.host.hasAttribute('open')) {
      this.cleanup?.();
      this.cleanup = undefined;
    }
  }

  hostDisconnected(): void {
    this.cleanup?.();
    this.cleanup = undefined;
  }
}
