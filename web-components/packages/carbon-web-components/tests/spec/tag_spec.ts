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
import { Default, Playground } from '../../src/components/tag/tag-story';

const tagTemplate = () => Default();

const playgroundTemplate = (props?) =>
  Playground({
    'cds-tag': props,
  });

describe('cds-tag', function () {
  describe('Enabling/disabling', function () {
    const events = new EventManager();

    it('should allow firing click event for normal condition', async function () {
      render(tagTemplate(), document.body);
      await Promise.resolve();
      const elem = document.querySelector('cds-tag');
      const spyClick = jasmine.createSpy('click');
      events.on(elem!, 'click', spyClick);
      elem!.shadowRoot!.querySelector('button')!.click();
      expect(spyClick).toHaveBeenCalled();
    });

    it('should disallow firing click event if disabled', async function () {
      render(playgroundTemplate({ disabled: true }), document.body);
      await Promise.resolve();
      const elem = document.querySelector('cds-tag');
      const spyClick = jasmine.createSpy('click');
      events.on(elem!, 'click', spyClick);
      elem!.shadowRoot!.querySelector('button')!.click();
      expect(spyClick).not.toHaveBeenCalled();
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
