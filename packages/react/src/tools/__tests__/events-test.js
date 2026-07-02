/**
 * Copyright IBM Corp. 2016, 2025
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

    it('should skip `undefined` or non-function handlers', () => {
      const handlers = [undefined, jest.fn(), null];

      composeEventHandlers(handlers)(mockEvent);

      expect(handlers[1]).toHaveBeenCalled();
    });

    it('should not call any handler if `event.defaultPrevented` is already `true`', () => {
      mockEvent.preventDefault();

      composeEventHandlers(mockHandlers)(mockEvent);

      mockHandlers.forEach((handler) => {
        expect(handler).not.toHaveBeenCalled();
      });
    });

    it('should forward additional arguments to handlers', () => {
      const additionalArg = '🌎🚀🌓';

      composeEventHandlers(mockHandlers)(mockEvent, additionalArg);

      mockHandlers.forEach((handler) => {
        expect(handler).toHaveBeenCalledWith(mockEvent, additionalArg);
      });
    });

    it('should call handlers in order and stop after one calls `preventDefault`', () => {
      const handler1 = jest.fn();
      const handler2 = jest.fn();
      const handler3 = jest.fn((event) => event.preventDefault());
      const handler4 = jest.fn();
      const handlers = [handler1, handler2, handler3, handler4];

      composeEventHandlers(handlers)(mockEvent);

      expect(handler1).toHaveBeenCalled();
      expect(handler2).toHaveBeenCalled();
      expect(handler3).toHaveBeenCalled();
      expect(handler4).not.toHaveBeenCalled();

      const handler1Order = handler1.mock.invocationCallOrder[0];
      const handler2Order = handler2.mock.invocationCallOrder[0];
      const handler3Order = handler3.mock.invocationCallOrder[0];

      expect(handler1Order).toBeLessThan(handler2Order);
      expect(handler2Order).toBeLessThan(handler3Order);
    });

    it('should handle an empty array of handlers gracefully', () => {
      expect(() => composeEventHandlers([])(mockEvent)).not.toThrow();
    });
  });
});
