/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { composeEventHandlers } from '../events';

describe('events tools', () => {
  describe('composeEventHandlers', () => {
    let mockHandlers;
    let mockEvent;

    beforeEach(() => {
      mockHandlers = Array.from(new Array(3), () => jest.fn());
      mockEvent = document.createEvent('Event');
      mockEvent.initEvent('custom-event', true, true);
      document.dispatchEvent(mockEvent);
    });

    it('should call all handlers if the event has not been prevented', () => {
      composeEventHandlers(mockHandlers)(mockEvent);
      mockHandlers.forEach((handler) => {
        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenCalledWith(mockEvent);
      });
    });

    it('should stop if a handler calls `preventDefault`', () => {
      const preventDefaultHandler = jest.fn((event) => {
        event.preventDefault();
      });
      const handlers = [preventDefaultHandler, ...mockHandlers];
      composeEventHandlers(handlers)(mockEvent);

      expect(preventDefaultHandler).toHaveBeenCalledTimes(1);
      expect(preventDefaultHandler).toHaveBeenCalledWith(mockEvent);
      handlers.slice(1).forEach((handler) => {
        expect(handler).not.toHaveBeenCalled();
      });
    });
  });
});
