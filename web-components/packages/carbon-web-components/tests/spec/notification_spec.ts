/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit';
import BXInlineNotification, {
  NOTIFICATION_KIND,
} from '../../src/components/notification/inline-notification';
import { inline } from '../../src/components/notification/notification-story';

const inlineTemplate = (props?) =>
  inline({
    'cds-inline-notification': props,
  });

describe('cds-inline-notification', function () {
  describe('Rendering titles', function () {
    it('Should render with minimum attributes', async function () {
      render(inlineTemplate(), document.body);
      await Promise.resolve();
      expect(
        document.body.querySelector('cds-inline-notification' as any)
      ).toMatchSnapshot({ mode: 'shadow' });
    });

    it('Should render with various attributes', async function () {
      render(
        inlineTemplate({
          closeButtonLabel: 'close-button-label-foo',
          hideCloseButton: true,
          iconLabel: 'icon-label-foo',
          kind: NOTIFICATION_KIND.INFO,
          open: false,
          subtitle: 'subtitle-foo',
          title: 'title-foo',
        }),
        document.body
      );
      await Promise.resolve();
      expect(
        document.body.querySelector('cds-inline-notification' as any)
      ).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  describe('Closing', function () {
    let notification: BXInlineNotification | null;

    beforeEach(async function () {
      render(inlineTemplate(), document.body);
      await Promise.resolve();
      notification = document.body.querySelector('cds-inline-notification');
    });

    it('Should support closing', async function () {
      expect(notification!.open).toBe(true);
      notification!.shadowRoot!.querySelector('button')!.click();
      await Promise.resolve();
      expect(notification!.open).toBe(false);
    });
  });

  describe('Timeout', function () {
    const timeout = 100;

    let notification;

    beforeEach(async function () {
      const initializeTimerCloseEvent = (BXInlineNotification.prototype as any)
        ._handleUserOrTimerInitiatedClose;
      spyOn(
        BXInlineNotification.prototype as any,
        '_initializeTimeout'
      ).and.callFake(function () {
        // TODO: See if we can get around TS2683
        // @ts-ignore
        initializeTimerCloseEvent.call(this);
      });
      render(
        inlineTemplate({
          timeout,
          open: false,
        }),
        document.body
      );
      await Promise.resolve();
      notification = document.body.querySelector('cds-inline-notification');
    });

    it('Should support closing after the timeout', async function () {
      notification.open = true;
      await Promise.resolve();
      expect(notification!.open).toBe(false);
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
