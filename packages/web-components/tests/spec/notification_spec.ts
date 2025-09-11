/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit';
import CDSInlineNotification, {
  NOTIFICATION_KIND,
} from '../../src/components/notification/inline-notification';
import { Playground } from '../../src/components/notification/inline-notification-story';

const inlineTemplate = (props?) =>
  Playground({
    'cds-inline-notification': props,
  });

describe('cds-inline-notification', () => {
  describe('Rendering titles', () => {
    it('Should render with minimum attributes', async () => {
      render(inlineTemplate(), document.body);
      await Promise.resolve();
      expect(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
        document.body.querySelector('cds-inline-notification' as any)
      ).toMatchSnapshot({ mode: 'shadow' });
    });

    it('Should render with various attributes', async () => {
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
        document.body.querySelector('cds-inline-notification' as any)
      ).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  describe('Closing', () => {
    let notification: CDSInlineNotification | null;

    beforeEach(async () => {
      render(inlineTemplate(), document.body);
      await Promise.resolve();
      notification = document.body.querySelector('cds-inline-notification');
    });

    it('Should support closing', async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      expect(notification!.open).toBe(true);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      notification!.shadowRoot!.querySelector('button')!.click();
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      expect(notification!.open).toBe(false);
    });
  });

  describe('Timeout', () => {
    const timeout = 100;

    let notification;

    beforeEach(async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
      const initializeTimerCloseEvent = (CDSInlineNotification.prototype as any)
        ._handleUserOrTimerInitiatedClose;
      spyOn(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
        CDSInlineNotification.prototype as any,
        '_initializeTimeout'
      ).and.callFake(function () {
        // TODO: See if we can get around TS2683
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20071
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

    it('Should support closing after the timeout', async () => {
      notification.open = true;
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      expect(notification!.open).toBe(false);
    });
  });

  afterEach(async () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
    await render(undefined!, document.body);
  });
});
