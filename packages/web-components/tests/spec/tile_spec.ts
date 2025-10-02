/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit';
import EventManager from '../utils/event-manager';
import { TILE_COLOR_SCHEME } from '../../src/components/tile/tile';
import CDSExpandableTile from '../../src/components/tile/expandable-tile';
import CDSSelectableTile from '../../src/components/tile/selectable-tile';
import CDSRadioTile from '../../src/components/tile/radio-tile';
import {
  clickable,
  expandable,
  multiSelectable,
} from '../../src/components/tile/tile.stories';

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

xdescribe('cds-tile', () => {
  const events = new EventManager();

  describe('cds-clickable-tile', () => {
    describe('Misc attributes', () => {
      it('should render with minimum attributes', async () => {
        render(clickableTemplate(), document.body);
        await Promise.resolve();
        expect(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
          document.body.querySelector('cds-clickable-tile' as any)
        ).toMatchSnapshot({ mode: 'shadow' });
      });

      it('should render with various attributes', async () => {
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
          document.body.querySelector('cds-clickable-tile' as any)
        ).toMatchSnapshot({ mode: 'shadow' });
      });

      it('should render disabled state', async () => {
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
          document.body.querySelector('cds-clickable-tile' as any)
        ).toMatchSnapshot({ mode: 'shadow' });
      });
    });
  });

  describe('cds-expandable-tile', () => {
    describe('Misc attributes', () => {
      it('should render with minimum attributes', async () => {
        render(expandableTemplate(), document.body);
        await Promise.resolve();
        expect(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
          document.body.querySelector('cds-expandable-tile' as any)
        ).toMatchSnapshot({ mode: 'shadow' });
      });

      it('should render with various attributes', async () => {
        render(
          expandableTemplate({
            colorScheme: TILE_COLOR_SCHEME.LIGHT,
            expanded: true,
          }),
          document.body
        );
        await Promise.resolve();
        expect(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
          document.body.querySelector('cds-expandable-tile' as any)
        ).toMatchSnapshot({ mode: 'shadow' });
      });
    });

    describe('Toggling', () => {
      it('Should fire cds-expandable-tile-beingtoggled/cds-expandable-tile-toggled events upon expanding', async () => {
        render(expandableTemplate(), document.body);
        await Promise.resolve();
        const tile = document.querySelector('cds-expandable-tile');
        const spyBeforeToggle = jasmine.createSpy('before toggle');
        const spyAfterToggle = jasmine.createSpy('after toggle');
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        events.on(tile!, 'cds-expandable-tile-beingtoggled', spyBeforeToggle);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        events.on(tile!, 'cds-expandable-tile-toggled', spyAfterToggle);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        tile!.shadowRoot!.querySelector('button')!.click();
        expect((tile as CDSExpandableTile).expanded).toBe(true);
        expect(spyBeforeToggle).toHaveBeenCalled();
        expect(spyBeforeToggle.calls.argsFor(0)[0].detail.expanded).toBe(true);
        expect(spyAfterToggle).toHaveBeenCalled();
        expect(spyAfterToggle.calls.argsFor(0)[0].detail.expanded).toBe(true);
      });

      it('Should fire cds-expandable-tile-beingtoggled/cds-expandable-tile-toggled events upon collapsing', async () => {
        render(expandableTemplate({ expanded: true }), document.body);
        await Promise.resolve();
        const tile = document.querySelector('cds-expandable-tile');
        const spyBeforeToggle = jasmine.createSpy('before toggle');
        const spyAfterToggle = jasmine.createSpy('after toggle');
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        events.on(tile!, 'cds-expandable-tile-beingtoggled', spyBeforeToggle);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        events.on(tile!, 'cds-expandable-tile-toggled', spyAfterToggle);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        tile!.shadowRoot!.querySelector('button')!.click();
        expect((tile as CDSExpandableTile).expanded).toBe(false);
        expect(spyBeforeToggle).toHaveBeenCalled();
        expect(spyBeforeToggle.calls.argsFor(0)[0].detail.expanded).toBe(false);
        expect(spyAfterToggle).toHaveBeenCalled();
        expect(spyAfterToggle.calls.argsFor(0)[0].detail.expanded).toBe(false);
      });

      it('Should support preventing tile from being expanded upon user gesture', async () => {
        render(expandableTemplate(), document.body);
        await Promise.resolve();
        const tile = document.querySelector('cds-expandable-tile');
        const spyAfterToggle = jasmine.createSpy('after toggle');
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        events.on(tile!, 'cds-expandable-tile-beingtoggled', (event) => {
          event.preventDefault();
        });
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        events.on(tile!, 'cds-expandable-tile-toggled', spyAfterToggle);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        tile!.shadowRoot!.querySelector('button')!.click();
        expect((tile as CDSExpandableTile).expanded).toBe(false);
        expect(spyAfterToggle).not.toHaveBeenCalled();
      });

      it('Should support preventing tile from being collapsed upon user gesture', async () => {
        render(expandableTemplate({ expanded: true }), document.body);
        await Promise.resolve();
        const tile = document.querySelector('cds-expandable-tile');
        const spyAfterToggle = jasmine.createSpy('after toggle');
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        events.on(tile!, 'cds-expandable-tile-beingtoggled', (event) => {
          event.preventDefault();
        });
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        events.on(tile!, 'cds-expandable-tile-toggled', spyAfterToggle);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        tile!.shadowRoot!.querySelector('button')!.click();
        expect((tile as CDSExpandableTile).expanded).toBe(true);
        expect(spyAfterToggle).not.toHaveBeenCalled();
      });
    });
  });

  describe('cds-radio-tile', () => {
    describe('Misc attributes', () => {
      it('should render with minimum attributes', async () => {
        render(clickableTemplate(), document.body);
        await Promise.resolve();
        expect(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
          document.body.querySelector('cds-radio-tile' as any)
        ).toMatchSnapshot({
          mode: 'shadow',
        });
      });

      it('should render with various attributes', async () => {
        render(
          clickableTemplate({
            checkmarkLabel: 'checkmark-label-foo',
            colorScheme: TILE_COLOR_SCHEME.LIGHT,
            name: 'name-foo',
            value: 'value-foo',
          }),
          document.body
        );
        await Promise.resolve();
        expect(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
          document.body.querySelector('cds-radio-tile' as any)
        ).toMatchSnapshot({
          mode: 'shadow',
        });
      });
    });

    describe('Selection', () => {
      it('should reflect the selection', async () => {
        render(clickableTemplate({ name: 'name-foo' }), document.body);
        await Promise.resolve();
        const tiles = document.body.querySelectorAll('cds-radio-tile');
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        const input1 = tiles[1]!.shadowRoot!.querySelector('input');
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        input1!.click();
        expect(
          Array.prototype.map.call(
            tiles,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
            (item: any) => (item as CDSRadioTile).selected
          )
        ).toEqual([false, true, false]);
      });
    });
  });

  describe('cds-selectable-tile', () => {
    describe('Misc attributes', () => {
      it('should render with minimum attributes', async () => {
        render(multiSelectableTemplate(), document.body);
        await Promise.resolve();
        expect(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
          document.body.querySelector('cds-selectable-tile' as any)
        ).toMatchSnapshot({ mode: 'shadow' });
      });

      it('should render with various attributes', async () => {
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
          document.body.querySelector('cds-selectable-tile' as any)
        ).toMatchSnapshot({ mode: 'shadow' });
      });
    });

    describe('Selection', () => {
      it('should reflect the selection', async () => {
        render(multiSelectableTemplate(), document.body);
        await Promise.resolve();
        const tile = document.body.querySelector('cds-selectable-tile');
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        const input = tile!.shadowRoot!.querySelector('input');
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        input!.click();
        expect((tile as CDSSelectableTile).selected).toBe(true);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        input!.click();
        expect((tile as CDSSelectableTile).selected).toBe(false);
      });
    });
  });

  afterEach(async () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
    await render(undefined!, document.body);
    events.reset();
  });
});
