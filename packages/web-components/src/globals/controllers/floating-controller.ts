/**
 * Copyright IBM Corp. 2024
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
  Placement,
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
      flipArguments,
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

    const middleware = [
      flip(flipArguments),
      offset(caret ? 10 : 0),
      ...(caret && arrowElement
        ? [arrow({ element: arrowElement, padding: 15 })]
        : []),
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
    ];

    if (open) {
      const { x, y, placement, middlewareData, strategy } =
        await computePosition(trigger, element, {
          strategy: 'fixed',
          middleware,
          placement: shimmedAlign as Placement,
        });

      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
      element.style.position = `${strategy}`;

      if (arrowElement) {
        // @ts-ignore
        const { x: arrowX, y: arrowY } = middlewareData.arrow;

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
