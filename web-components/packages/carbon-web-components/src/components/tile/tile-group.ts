/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import { NAVIGATION_DIRECTION } from '../../globals/internal/radio-group-manager';
import HostListener from '../../globals/decorators/host-listener';
import HostListenerMixin from '../../globals/mixins/host-listener';
import styles from './tile.scss';

/**
 * Map of navigation direction by key.
 */
const navigationDirectionForKey = {
  ArrowUp: NAVIGATION_DIRECTION.BACKWARD,
  Up: NAVIGATION_DIRECTION.BACKWARD, // IE
  ArrowDown: NAVIGATION_DIRECTION.FORWARD,
  Down: NAVIGATION_DIRECTION.FORWARD, // IE
};

/**
 * Tile group.
 *
 * @element cds-tile-group
 */
@customElement(`${prefix}-tile-group`)
class CDSTileGroup extends HostListenerMixin(LitElement) {
  private _handleRadioClick(event) {
    const { target } = event;
    const { currentRadioSelection } = this;
    const { eventCurrentRadioTileSelection } = this
      .constructor as typeof CDSTileGroup;

    if (!currentRadioSelection) {
      this.currentRadioSelection = target;
    } else if (currentRadioSelection !== target) {
      currentRadioSelection.toggleAttribute('selected');
      this.currentRadioSelection = target;
    }

    this.dispatchEvent(
      new CustomEvent(eventCurrentRadioTileSelection, {
        bubbles: true,
        composed: true,
        detail: {
          target,
        },
      })
    );
  }

  private _handleSelectableClick(event) {
    const { target } = event;
    const { currentSelections } = this;
    const { eventCurrentSelectableTilesSelection } = this
      .constructor as typeof CDSTileGroup;

    if (!currentSelections.includes(target)) {
      currentSelections.push(target);
    } else {
      currentSelections.splice(currentSelections.indexOf(target), 1);
    }
    (target as HTMLElement).toggleAttribute('selected');

    this.dispatchEvent(
      new CustomEvent(eventCurrentSelectableTilesSelection, {
        bubbles: true,
        composed: true,
        detail: {
          currentSelections,
        },
      })
    );
    event.stopPropagation();
    event.preventDefault();
  }

  /**
   * Click listener to ensure selectability.
   *
   * @param event click
   */
  @HostListener('click')
  // @ts-ignore
  private _handleTileSelect(event: Event) {
    if (this.radioTiles.length) {
      this._handleRadioClick(event);
    } else {
      this._handleSelectableClick(event);
    }
  }

  /**
   * Handle keyboard navigation for radio tiles
   *
   * @param nextSibling to focus on
   */
  private _handleKeydownRadio(nextSibling) {
    const { currentRadioSelection } = this;

    const { eventCurrentRadioTileSelection } = this
      .constructor as typeof CDSTileGroup;

    if (currentRadioSelection) {
      currentRadioSelection.toggleAttribute('selected');
    }
    nextSibling.focus();
    nextSibling.toggleAttribute('selected');
    this.currentRadioSelection = nextSibling;

    this.dispatchEvent(
      new CustomEvent(eventCurrentRadioTileSelection, {
        bubbles: true,
        composed: true,
        detail: {
          nextSibling,
        },
      })
    );
  }

  /**
   * Handle keyboard navigation for selectable tiles
   *
   * @param event to get target
   * @param nextSibling to focus on
   */
  private _handleKeydownSelectable(event, nextSibling?) {
    const { target } = event;
    const { currentSelections } = this;
    const { eventCurrentSelectableTilesSelection } = this
      .constructor as typeof CDSTileGroup;

    if (nextSibling) {
      nextSibling.focus();
    } else {
      if (!currentSelections.includes(target)) {
        currentSelections.push(target);
      } else {
        currentSelections.splice(currentSelections.indexOf(target), 1);
      }

      this.dispatchEvent(
        new CustomEvent(eventCurrentSelectableTilesSelection, {
          bubbles: true,
          composed: true,
          detail: {
            currentSelections,
          },
        })
      );
    }
  }

  /**
   * Keyboard listener to ensure keyboard navigation.
   *
   * @param event to get key pressed
   */
  @HostListener('keydown')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleKeydown = (event: KeyboardEvent) => {
    const { target, key } = event;
    const { radioTiles, selectableTiles } = this;
    const navigationDirection = navigationDirectionForKey[key];

    let tiles = radioTiles.length ? radioTiles : selectableTiles;
    const currentIndex = [...tiles].findIndex((e) => e == target);
    const nextIndex = currentIndex + navigationDirection;
    const nextSibling =
      nextIndex !== -1
        ? tiles[nextIndex % tiles.length]
        : tiles[tiles.length - 1];

    if (navigationDirection) {
      event.preventDefault(); // Prevent default (scrolling) behavior

      if (this.radioTiles.length) {
        this._handleKeydownRadio(nextSibling);
      } else {
        this._handleKeydownSelectable(event, nextSibling);
      }
    } else if (key === ' ' || key === 'Enter') {
      this._handleKeydownSelectable(event);
    }
  };

  /**
   * Focus listener to focus on selected element upon focusing
   *
   * @param event to get focused
   */
  @HostListener('focusin')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleFocus = (event: KeyboardEvent) => {
    const { relatedTarget, target } = event as any;

    if (this.radioTiles.length) {
      if (!this.currentRadioSelection) {
        target.toggleAttribute('selected');
        this.currentRadioSelection = target;
      } else if (
        !relatedTarget?.matches(
          (this.constructor as typeof CDSTileGroup).selectorRadioTile
        ) &&
        target !== this.currentRadioSelection
      ) {
        this.currentRadioSelection.focus();
      }
    }
  };

  /**
   * Provide an optional className to be applied to the component
   */
  @property({ reflect: true, attribute: 'class-name' })
  className;

  /**
   * Specify whether the group is disabled
   */
  @property({ reflect: true, type: Boolean })
  disabled;

  @property()
  currentRadioSelection;

  @property()
  currentSelections = [] as any;

  @property()
  radioTiles;

  @property()
  selectableTiles;

  firstUpdated() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'group');
    }

    if (!this.radioTiles) {
      this.radioTiles = this.querySelectorAll(
        (this.constructor as typeof CDSTileGroup).selectorRadioTile
      );
    }

    if (!this.selectableTiles) {
      this.selectableTiles = this.querySelectorAll(
        (this.constructor as typeof CDSTileGroup).selectorSelectableTile
      );
    }

    if (this.disabled) {
      this.radioTiles.forEach((e) => e.toggleAttribute('disabled'));
      this.selectableTiles.forEach((e) => e.toggleAttribute('disabled'));
    }
  }

  render() {
    const { className, disabled } = this;
    return html`
      <fieldset class="${className}" ?disabled=${disabled}>
        <slot name="legend" class="${prefix}--label"></slot>
        <slot></slot>
      </fieldset>
    `;
  }

  /**
   * A selector that selects a radio tile component.
   */
  static get selectorRadioTile() {
    return `${prefix}-radio-tile`;
  }

  /**
   * A selector that selects a selectable tile component.
   */
  static get selectorSelectableTile() {
    return `${prefix}-selectable-tile`;
  }

  /**
   * The name of the custom event fired after a radio tile changes its selected state.
   */
  static get eventCurrentRadioTileSelection() {
    return `${prefix}-current-radio-tile-selection`;
  }

  /**
   * The name of the custom event fired after a radio tile changes its selected state.
   */
  static get eventCurrentSelectableTilesSelection() {
    return `${prefix}-current-selectable-tile-selections`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default CDSTileGroup;
