/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit';
import EventManager from '../utils/event-manager';
import { TILE_COLOR_SCHEME } from '../../src/components/tile/tile';
import BXExpandableTile from '../../src/components/tile/expandable-tile';
import BXSelectableTile from '../../src/components/tile/selectable-tile';
import BXRadioTile from '../../src/components/tile/radio-tile';
import {
  clickable,
  expandable,
  multiSelectable,
  singleSelectable,
} from '../../src/components/tile/tile-story';

const clickableTemplate = (props?) =>
  clickable({
    'cds-clickable-tile': props,
  });

const expandableTemplate = (props?) =>
  expandable({
    'cds-expandable-tile': props,
  });

const multiSelectableTemplate = (props?) =>
  multiSelectable({
    'cds-selectable-tile': props,
  });

const singleSelectableTemplate = (props?) =>
  singleSelectable({
    'cds-radio-tile': props,
  });

describe('cds-tile', function () {
  const events = new EventManager();

  describe('cds-clickable-tile', function () {
    describe('Misc attributes', function () {
      it('should render with minimum attributes', async function () {
        render(clickableTemplate(), document.body);
        await Promise.resolve();
        expect(
          document.body.querySelector('cds-clickable-tile' as any)
        ).toMatchSnapshot({ mode: 'shadow' });
      });

      it('should render with various attributes', async function () {
        render(
          clickableTemplate({
            colorScheme: TILE_COLOR_SCHEME.LIGHT,
            download: 'file-name-foo',
            href: 'about:blank',
            hreflang: 'en',
            ping: 'about:blank',
            rel: 'noopener',
            target: '_blank',
            type: 'text/plain',
          }),
          document.body
        );
        await Promise.resolve();
        expect(
          document.body.querySelector('cds-clickable-tile' as any)
        ).toMatchSnapshot({ mode: 'shadow' });
      });

      it('should render disabled state', async function () {
        render(
          clickableTemplate({
            colorScheme: TILE_COLOR_SCHEME.LIGHT,
            disabled: true,
            download: 'file-name-foo',
            href: 'about:blank',
            hreflang: 'en',
            ping: 'about:blank',
            rel: 'noopener',
            target: '_blank',
            type: 'text/plain',
          }),
          document.body
        );
        await Promise.resolve();
        expect(
          document.body.querySelector('cds-clickable-tile' as any)
        ).toMatchSnapshot({ mode: 'shadow' });
      });
    });
  });

  describe('cds-expandable-tile', function () {
    describe('Misc attributes', function () {
      it('should render with minimum attributes', async function () {
        render(expandableTemplate(), document.body);
        await Promise.resolve();
        expect(
          document.body.querySelector('cds-expandable-tile' as any)
        ).toMatchSnapshot({ mode: 'shadow' });
      });

      it('should render with various attributes', async function () {
        render(
          expandableTemplate({
            colorScheme: TILE_COLOR_SCHEME.LIGHT,
            expanded: true,
          }),
          document.body
        );
        await Promise.resolve();
        expect(
          document.body.querySelector('cds-expandable-tile' as any)
        ).toMatchSnapshot({ mode: 'shadow' });
      });
    });

    describe('Toggling', function () {
      it('Should fire cds-expandable-tile-beingtoggled/cds-expandable-tile-toggled events upon expanding', async function () {
        render(expandableTemplate(), document.body);
        await Promise.resolve();
        const tile = document.querySelector('cds-expandable-tile');
        const spyBeforeToggle = jasmine.createSpy('before toggle');
        const spyAfterToggle = jasmine.createSpy('after toggle');
        events.on(tile!, 'cds-expandable-tile-beingtoggled', spyBeforeToggle);
        events.on(tile!, 'cds-expandable-tile-toggled', spyAfterToggle);
        tile!.shadowRoot!.querySelector('button')!.click();
        expect((tile as BXExpandableTile).expanded).toBe(true);
        expect(spyBeforeToggle).toHaveBeenCalled();
        expect(spyBeforeToggle.calls.argsFor(0)[0].detail.expanded).toBe(true);
        expect(spyAfterToggle).toHaveBeenCalled();
        expect(spyAfterToggle.calls.argsFor(0)[0].detail.expanded).toBe(true);
      });

      it('Should fire cds-expandable-tile-beingtoggled/cds-expandable-tile-toggled events upon collapsing', async function () {
        render(expandableTemplate({ expanded: true }), document.body);
        await Promise.resolve();
        const tile = document.querySelector('cds-expandable-tile');
        const spyBeforeToggle = jasmine.createSpy('before toggle');
        const spyAfterToggle = jasmine.createSpy('after toggle');
        events.on(tile!, 'cds-expandable-tile-beingtoggled', spyBeforeToggle);
        events.on(tile!, 'cds-expandable-tile-toggled', spyAfterToggle);
        tile!.shadowRoot!.querySelector('button')!.click();
        expect((tile as BXExpandableTile).expanded).toBe(false);
        expect(spyBeforeToggle).toHaveBeenCalled();
        expect(spyBeforeToggle.calls.argsFor(0)[0].detail.expanded).toBe(false);
        expect(spyAfterToggle).toHaveBeenCalled();
        expect(spyAfterToggle.calls.argsFor(0)[0].detail.expanded).toBe(false);
      });

      it('Should support preventing tile from being expanded upon user gesture', async function () {
        render(expandableTemplate(), document.body);
        await Promise.resolve();
        const tile = document.querySelector('cds-expandable-tile');
        const spyAfterToggle = jasmine.createSpy('after toggle');
        events.on(tile!, 'cds-expandable-tile-beingtoggled', (event) => {
          event.preventDefault();
        });
        events.on(tile!, 'cds-expandable-tile-toggled', spyAfterToggle);
        tile!.shadowRoot!.querySelector('button')!.click();
        expect((tile as BXExpandableTile).expanded).toBe(false);
        expect(spyAfterToggle).not.toHaveBeenCalled();
      });

      it('Should support preventing tile from being collapsed upon user gesture', async function () {
        render(expandableTemplate({ expanded: true }), document.body);
        await Promise.resolve();
        const tile = document.querySelector('cds-expandable-tile');
        const spyAfterToggle = jasmine.createSpy('after toggle');
        events.on(tile!, 'cds-expandable-tile-beingtoggled', (event) => {
          event.preventDefault();
        });
        events.on(tile!, 'cds-expandable-tile-toggled', spyAfterToggle);
        tile!.shadowRoot!.querySelector('button')!.click();
        expect((tile as BXExpandableTile).expanded).toBe(true);
        expect(spyAfterToggle).not.toHaveBeenCalled();
      });
    });
  });

  describe('cds-radio-tile', function () {
    describe('Misc attributes', function () {
      it('should render with minimum attributes', async function () {
        render(singleSelectableTemplate(), document.body);
        await Promise.resolve();
        expect(
          document.body.querySelector('cds-radio-tile' as any)
        ).toMatchSnapshot({
          mode: 'shadow',
        });
      });

      it('should render with various attributes', async function () {
        render(
          singleSelectableTemplate({
            checkmarkLabel: 'checkmark-label-foo',
            colorScheme: TILE_COLOR_SCHEME.LIGHT,
            name: 'name-foo',
            value: 'value-foo',
          }),
          document.body
        );
        await Promise.resolve();
        expect(
          document.body.querySelector('cds-radio-tile' as any)
        ).toMatchSnapshot({
          mode: 'shadow',
        });
      });
    });

    describe('Selection', function () {
      it('should reflect the selection', async function () {
        render(singleSelectableTemplate({ name: 'name-foo' }), document.body);
        await Promise.resolve();
        const tiles = document.body.querySelectorAll('cds-radio-tile');
        const input1 = tiles[1]!.shadowRoot!.querySelector('input');
        input1!.click();
        expect(
          Array.prototype.map.call(
            tiles,
            (item) => (item as BXRadioTile).selected
          )
        ).toEqual([false, true, false]);
      });
    });
  });

  describe('cds-selectable-tile', function () {
    describe('Misc attributes', function () {
      it('should render with minimum attributes', async function () {
        render(multiSelectableTemplate(), document.body);
        await Promise.resolve();
        expect(
          document.body.querySelector('cds-selectable-tile' as any)
        ).toMatchSnapshot({ mode: 'shadow' });
      });

      it('should render with various attributes', async function () {
        render(
          multiSelectableTemplate({
            checkmarkLabel: 'checkmark-label-foo',
            colorScheme: TILE_COLOR_SCHEME.LIGHT,
            name: 'name-foo',
            selected: true,
            value: 'value-foo',
          }),
          document.body
        );
        await Promise.resolve();
        expect(
          document.body.querySelector('cds-selectable-tile' as any)
        ).toMatchSnapshot({ mode: 'shadow' });
      });
    });

    describe('Selection', function () {
      it('should reflect the selection', async function () {
        render(multiSelectableTemplate(), document.body);
        await Promise.resolve();
        const tile = document.body.querySelector('cds-selectable-tile');
        const input = tile!.shadowRoot!.querySelector('input');
        input!.click();
        expect((tile as BXSelectableTile).selected).toBe(true);
        input!.click();
        expect((tile as BXSelectableTile).selected).toBe(false);
      });
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
    events.reset();
  });
});
