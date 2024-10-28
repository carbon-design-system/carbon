/**
 * @license
 *
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ReactiveController, LitElement } from 'lit';
import {
  computePosition,
  flip,
  offset,
  arrow,
  autoUpdate,
  Placement,
} from '@floating-ui/dom';

type PopoverControllerOptions = {
  target: HTMLElement;
  trigger: HTMLElement;
  arrowElement?: HTMLElement | undefined;
  alignment: string;
  flip: boolean;
  caret: boolean;
};

interface PopoverElement extends LitElement {
  open: boolean;
}

export default class PopoverController implements ReactiveController {
  /**
   * Host component
   */
  private host!: PopoverElement;

  /**
   * Floating-ui options to pass to `computePlacement()`
   */
  private options!: PopoverControllerOptions;

  /**
   * cleanup function to stop auto updates
   */
  private cleanup?: () => void;

  /**
   * register with host component
   * @param host host component
   */
  constructor(host: PopoverElement) {
    (this.host = host).addController(this);
  }

  async setPlacement(options: PopoverControllerOptions = this.options) {
    this.options = options;
    const { trigger, target } = options;

    this.cleanup = autoUpdate(trigger, target, this.updatePlacement);
  }

  updatePlacement = (): void => {
    this.computePlacement();
  };

  async computePlacement() {
    const { arrowElement, alignment, caret, trigger, target } = this.options;

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
      flip({ fallbackAxisSideDirection: 'start' }),
      offset(caret ? 10 : 0),
      ...(caret && arrowElement
        ? [arrow({ element: arrowElement, padding: 15 })]
        : []),
    ];

    if (this.host.hasAttribute('open')) {
      const { x, y, placement, middlewareData, strategy } =
        await computePosition(trigger, target, {
          strategy: 'fixed',
          middleware,
          placement: shimmedAlign as Placement,
        });

      target.style.left = `${x}px`;
      target.style.top = `${y}px`;
      target.style.position = `${strategy}`;

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
