/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable jsdoc/require-jsdoc */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ClickOutsideHandler } from '../click-outside-handler';

describe('ClickOutsideHandler', () => {
  let container: HTMLDivElement;
  let outsideElement: HTMLDivElement;

  beforeEach(() => {
    // Use fake timers so setTimeout(0) inside attach() is controllable
    vi.useFakeTimers();

    // Create test DOM elements
    container = document.createElement('div');
    container.id = 'test-container';
    document.body.appendChild(container);

    outsideElement = document.createElement('div');
    outsideElement.id = 'outside-element';
    document.body.appendChild(outsideElement);
  });

  afterEach(() => {
    // Restore real timers and clean up DOM
    vi.useRealTimers();
    document.body.removeChild(container);
    document.body.removeChild(outsideElement);
  });

  describe('Basic Functionality', () => {
    /**
     * Test that onOutsideClick is called when clicking outside the container
     */
    it('should call onOutsideClick when clicking outside', () => {
      const onOutsideClick = vi.fn();
      const handler = new ClickOutsideHandler({
        isOpen: true,
        containsNode: (node) => container.contains(node),
        onOutsideClick,
      });

      handler.attach();
      vi.runAllTimers(); // flush the setTimeout(0) delay inside attach()

      // Simulate click outside
      outsideElement.click();

      expect(onOutsideClick).toHaveBeenCalledTimes(1);
      handler.detach();
    });

    /**
     * Test that onOutsideClick is not called when clicking inside the container
     */
    it('should not call onOutsideClick when clicking inside', () => {
      const onOutsideClick = vi.fn();
      const handler = new ClickOutsideHandler({
        isOpen: true,
        containsNode: (node) => container.contains(node),
        onOutsideClick,
      });

      handler.attach();
      vi.runAllTimers(); // flush the setTimeout(0) delay inside attach()

      // Simulate click inside
      container.click();

      expect(onOutsideClick).not.toHaveBeenCalled();
      handler.detach();
    });

    /**
     * Test that onOutsideClick is not called when the handler is not open
     */
    it('should not call onOutsideClick when not open', () => {
      const onOutsideClick = vi.fn();
      const handler = new ClickOutsideHandler({
        isOpen: false,
        containsNode: (node) => container.contains(node),
        onOutsideClick,
      });

      handler.attach();

      // Simulate click outside
      outsideElement.click();

      expect(onOutsideClick).not.toHaveBeenCalled();
      handler.detach();
    });
  });

  describe('Timing and Delay', () => {
    /**
     * Test that the handler respects the attachDelay configuration
     */
    it('should respect attachDelay', () => {
      const onOutsideClick = vi.fn();
      const handler = new ClickOutsideHandler({
        isOpen: true,
        containsNode: (node) => container.contains(node),
        onOutsideClick,
        attachDelay: 100,
      });

      handler.attach();

      // Click immediately - should not trigger (listener not attached yet)
      outsideElement.click();
      expect(onOutsideClick).not.toHaveBeenCalled();

      // Advance time but not enough
      vi.advanceTimersByTime(50);
      outsideElement.click();
      expect(onOutsideClick).not.toHaveBeenCalled();

      // Advance time past delay
      vi.advanceTimersByTime(60);
      outsideElement.click();
      expect(onOutsideClick).toHaveBeenCalledTimes(1);

      handler.detach();
    });

    /**
     * Test that the handler uses a default delay of 0 when not specified
     */
    it('should use default delay of 0', () => {
      const onOutsideClick = vi.fn();
      const handler = new ClickOutsideHandler({
        isOpen: true,
        containsNode: (node) => container.contains(node),
        onOutsideClick,
      });

      handler.attach();

      // Click immediately - should not trigger (waiting for next tick)
      outsideElement.click();
      expect(onOutsideClick).not.toHaveBeenCalled();

      // Advance to next tick
      vi.advanceTimersByTime(0);
      outsideElement.click();
      expect(onOutsideClick).toHaveBeenCalledTimes(1);

      handler.detach();
    });

    /**
     * Test that the opening click doesn't immediately close the handler when using delay
     */
    it('should prevent opening click from closing when using delay', () => {
      const onOutsideClick = vi.fn();
      const handler = new ClickOutsideHandler({
        isOpen: true,
        containsNode: (node) => container.contains(node),
        onOutsideClick,
        attachDelay: 0,
      });

      // Simulate: user clicks button to open
      const openButton = document.createElement('button');
      document.body.appendChild(openButton);

      // Attach handler (simulating calendar opening)
      handler.attach();

      // Same click event that opened the calendar
      openButton.click();
      expect(onOutsideClick).not.toHaveBeenCalled();

      // Advance to next tick (after delay)
      vi.advanceTimersByTime(0);

      // Now clicks should be detected
      openButton.click();
      expect(onOutsideClick).toHaveBeenCalledTimes(1);

      document.body.removeChild(openButton);
      handler.detach();
    });
  });

  describe('Lifecycle Management', () => {
    /**
     * Test that the handler cleans up event listeners properly on detach
     */
    it('should clean up properly on detach', () => {
      const onOutsideClick = vi.fn();
      const handler = new ClickOutsideHandler({
        isOpen: true,
        containsNode: (node) => container.contains(node),
        onOutsideClick,
      });

      handler.attach();
      handler.detach();

      // Click after detach - should not trigger
      outsideElement.click();
      expect(onOutsideClick).not.toHaveBeenCalled();
    });

    /**
     * Test that multiple attach calls don't create duplicate listeners
     */
    it('should handle multiple attach calls safely', () => {
      const onOutsideClick = vi.fn();
      const handler = new ClickOutsideHandler({
        isOpen: true,
        containsNode: (node) => container.contains(node),
        onOutsideClick,
      });

      handler.attach();
      handler.attach(); // Second attach should be ignored
      handler.attach(); // Third attach should be ignored
      vi.runAllTimers(); // flush the setTimeout(0) delay inside attach()

      outsideElement.click();

      // Should only be called once, not three times
      expect(onOutsideClick).toHaveBeenCalledTimes(1);
      handler.detach();
    });

    /**
     * Test that multiple detach calls don't throw errors
     */
    it('should handle multiple detach calls safely', () => {
      const onOutsideClick = vi.fn();
      const handler = new ClickOutsideHandler({
        isOpen: true,
        containsNode: (node) => container.contains(node),
        onOutsideClick,
      });

      handler.attach();
      handler.detach();
      handler.detach(); // Should not throw
      handler.detach(); // Should not throw

      outsideElement.click();
      expect(onOutsideClick).not.toHaveBeenCalled();
    });

    /**
     * Test that detaching cancels any pending attachment timers
     */
    it('should cancel pending attachment on detach', () => {
      const onOutsideClick = vi.fn();
      const handler = new ClickOutsideHandler({
        isOpen: true,
        containsNode: (node) => container.contains(node),
        onOutsideClick,
        attachDelay: 100,
      });

      handler.attach();
      handler.detach(); // Detach before delay completes

      // Advance time past delay
      vi.advanceTimersByTime(150);

      // Click should not trigger (attachment was cancelled)
      outsideElement.click();
      expect(onOutsideClick).not.toHaveBeenCalled();
    });
  });

  describe('Configuration Updates', () => {
    /**
     * Test that the isOpen state can be updated dynamically
     */
    it('should update isOpen state', () => {
      const onOutsideClick = vi.fn();
      const handler = new ClickOutsideHandler({
        isOpen: true,
        containsNode: (node) => container.contains(node),
        onOutsideClick,
      });

      handler.attach();
      vi.runAllTimers(); // flush the setTimeout(0) delay inside attach()

      // Click when open - should trigger
      outsideElement.click();
      expect(onOutsideClick).toHaveBeenCalledTimes(1);

      // Update to closed
      handler.updateConfig({ isOpen: false });

      // Click when closed - should not trigger
      outsideElement.click();
      expect(onOutsideClick).toHaveBeenCalledTimes(1); // Still 1

      // Update back to open
      handler.updateConfig({ isOpen: true });

      // Click when open again - should trigger
      outsideElement.click();
      expect(onOutsideClick).toHaveBeenCalledTimes(2);

      handler.detach();
    });

    /**
     * Test that the containsNode function can be updated dynamically
     */
    it('should update containsNode function', () => {
      const onOutsideClick = vi.fn();
      const secondContainer = document.createElement('div');
      document.body.appendChild(secondContainer);

      const handler = new ClickOutsideHandler({
        isOpen: true,
        containsNode: (node) => container.contains(node),
        onOutsideClick,
      });

      handler.attach();
      vi.runAllTimers(); // flush the setTimeout(0) delay inside attach()

      // Click second container - should trigger (not in first container)
      secondContainer.click();
      expect(onOutsideClick).toHaveBeenCalledTimes(1);

      // Update to include second container
      handler.updateConfig({
        containsNode: (node) =>
          container.contains(node) || secondContainer.contains(node),
      });

      // Click second container - should not trigger (now included)
      secondContainer.click();
      expect(onOutsideClick).toHaveBeenCalledTimes(1); // Still 1

      document.body.removeChild(secondContainer);
      handler.detach();
    });

    /**
     * Test that the onOutsideClick callback can be updated dynamically
     */
    it('should update onOutsideClick callback', () => {
      const firstCallback = vi.fn();
      const secondCallback = vi.fn();

      const handler = new ClickOutsideHandler({
        isOpen: true,
        containsNode: (node) => container.contains(node),
        onOutsideClick: firstCallback,
      });

      handler.attach();
      vi.runAllTimers(); // flush the setTimeout(0) delay inside attach()

      // Click - should call first callback
      outsideElement.click();
      expect(firstCallback).toHaveBeenCalledTimes(1);
      expect(secondCallback).not.toHaveBeenCalled();

      // Update callback
      handler.updateConfig({ onOutsideClick: secondCallback });

      // Click - should call second callback
      outsideElement.click();
      expect(firstCallback).toHaveBeenCalledTimes(1); // Still 1
      expect(secondCallback).toHaveBeenCalledTimes(1);

      handler.detach();
    });

    /**
     * Test that multiple configuration properties can be updated simultaneously
     */
    it('should update multiple config properties at once', () => {
      const firstCallback = vi.fn();
      const secondCallback = vi.fn();

      const handler = new ClickOutsideHandler({
        isOpen: true,
        containsNode: (node) => container.contains(node),
        onOutsideClick: firstCallback,
      });

      handler.attach();
      vi.runAllTimers(); // flush the setTimeout(0) delay inside attach()

      // Update multiple properties
      handler.updateConfig({
        isOpen: false,
        onOutsideClick: secondCallback,
      });

      // Click - should not trigger (isOpen is false)
      outsideElement.click();
      expect(firstCallback).not.toHaveBeenCalled();
      expect(secondCallback).not.toHaveBeenCalled();

      // Update back to open
      handler.updateConfig({ isOpen: true });

      // Click - should call second callback
      outsideElement.click();
      expect(firstCallback).not.toHaveBeenCalled();
      expect(secondCallback).toHaveBeenCalledTimes(1);

      handler.detach();
    });
  });

  describe('Capture Phase', () => {
    /**
     * Test that the handler uses capture phase by default
     */
    it('should use capture phase by default', () => {
      const onOutsideClick = vi.fn();
      const handler = new ClickOutsideHandler({
        isOpen: true,
        containsNode: (node) => container.contains(node),
        onOutsideClick,
      });

      handler.attach();
      vi.runAllTimers(); // flush the setTimeout(0) delay inside attach()

      // Create a nested element that stops propagation
      const nested = document.createElement('div');
      outsideElement.appendChild(nested);

      nested.addEventListener('click', (e) => {
        e.stopPropagation();
      });

      // Click nested element
      nested.click();

      // Should still be called because we use capture phase
      expect(onOutsideClick).toHaveBeenCalledTimes(1);

      handler.detach();
    });

    /**
     * Test that the handler respects useCapture: false configuration
     */
    it('should respect useCapture: false', () => {
      const onOutsideClick = vi.fn();
      const handler = new ClickOutsideHandler({
        isOpen: true,
        containsNode: (node) => container.contains(node),
        onOutsideClick,
        useCapture: false,
      });

      handler.attach();

      // Create a nested element that stops propagation
      const nested = document.createElement('div');
      outsideElement.appendChild(nested);

      nested.addEventListener('click', (e) => {
        e.stopPropagation();
      });

      // Click nested element
      nested.click();

      // Should not be called because propagation was stopped
      expect(onOutsideClick).not.toHaveBeenCalled();

      handler.detach();
    });
  });

  describe('Status Methods', () => {
    /**
     * Test that isAttached() reports the correct attachment status
     */
    it('should report attached status correctly', () => {
      const handler = new ClickOutsideHandler({
        isOpen: true,
        containsNode: (node) => container.contains(node),
        onOutsideClick: vi.fn(),
      });

      expect(handler.isAttached()).toBe(false);

      handler.attach();
      vi.runAllTimers(); // flush the setTimeout(0) delay inside attach()
      expect(handler.isAttached()).toBe(true);

      handler.detach();
      expect(handler.isAttached()).toBe(false);
    });

    /**
     * Test that isPending() reports the correct pending status
     */
    it('should report pending status correctly', () => {
      const handler = new ClickOutsideHandler({
        isOpen: true,
        containsNode: (node) => container.contains(node),
        onOutsideClick: vi.fn(),
        attachDelay: 100,
      });

      expect(handler.isPending()).toBe(false);

      handler.attach();
      expect(handler.isPending()).toBe(true);
      expect(handler.isAttached()).toBe(false);

      vi.advanceTimersByTime(100);
      expect(handler.isPending()).toBe(false);
      expect(handler.isAttached()).toBe(true);

      handler.detach();
    });
  });

  describe('Edge Cases', () => {
    /**
     * Test that the handler handles null/undefined nodes gracefully
     */
    it('should handle null/undefined nodes gracefully', () => {
      const onOutsideClick = vi.fn();
      const handler = new ClickOutsideHandler({
        isOpen: true,
        containsNode: (_node) => {
          // Simulate a case where container might be null
          return false;
        },
        onOutsideClick,
      });

      handler.attach();
      vi.runAllTimers(); // flush the setTimeout(0) delay inside attach()

      // Should not throw
      outsideElement.click();
      expect(onOutsideClick).toHaveBeenCalledTimes(1);

      handler.detach();
    });

    /**
     * Test that the handler works correctly with Shadow DOM
     */
    it('should work with Shadow DOM', () => {
      // Create a custom element with shadow DOM
      const customElement = document.createElement('div');
      const shadowRoot = customElement.attachShadow({ mode: 'open' });
      const shadowChild = document.createElement('div');
      shadowRoot.appendChild(shadowChild);
      document.body.appendChild(customElement);

      const onOutsideClick = vi.fn();
      const handler = new ClickOutsideHandler({
        isOpen: true,
        containsNode: (node) => {
          return customElement.contains(node) || shadowRoot.contains(node);
        },
        onOutsideClick,
      });

      handler.attach();
      vi.runAllTimers(); // flush the setTimeout(0) delay inside attach()

      // Click inside shadow DOM - should not trigger
      shadowChild.click();
      expect(onOutsideClick).not.toHaveBeenCalled();

      // Click outside - should trigger
      outsideElement.click();
      expect(onOutsideClick).toHaveBeenCalledTimes(1);

      document.body.removeChild(customElement);
      handler.detach();
    });

    /**
     * Test that the handler handles rapid open/close cycles correctly
     */
    it('should handle rapid open/close cycles', () => {
      const onOutsideClick = vi.fn();
      const handler = new ClickOutsideHandler({
        isOpen: true,
        containsNode: (node) => container.contains(node),
        onOutsideClick,
        attachDelay: 10,
      });

      // Rapid attach/detach
      handler.attach();
      handler.detach();
      handler.attach();
      handler.detach();
      handler.attach();

      // Advance time
      vi.advanceTimersByTime(20);

      // Click should trigger (last attach succeeded)
      outsideElement.click();
      expect(onOutsideClick).toHaveBeenCalledTimes(1);

      handler.detach();
    });
  });
});
