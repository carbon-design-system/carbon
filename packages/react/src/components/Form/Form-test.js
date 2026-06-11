/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Form from '../Form';
import { render, screen } from '@testing-library/react';

describe('Form - RTL', () => {
  it('should support a custom `className` prop on the outermost element', () => {
    const { container } = render(<Form className="test" />);
    expect(container.firstChild).toHaveClass('test');
  });

  it('should spread extra props on the outermost element', () => {
    const { container } = render(<Form data-testid="test" />);
    expect(container.firstChild).toHaveAttribute('data-testid', 'test');
  });

  describe('WebMCP attributes', () => {
    it('should render toolname attribute when provided', () => {
      render(<Form toolName="testTool" aria-label="test form" />);
      const form = screen.getByLabelText('test form');
      expect(form).toHaveAttribute('toolname', 'testTool');
    });

    it('should render tooldescription attribute when provided', () => {
      render(
        <Form toolDescription="Test tool description" aria-label="test form" />
      );
      const form = screen.getByLabelText('test form');
      expect(form).toHaveAttribute('tooldescription', 'Test tool description');
    });

    it('should render both toolname and tooldescription when provided', () => {
      render(
        <Form
          toolName="testTool"
          toolDescription="Test tool description"
          aria-label="test form"
        />
      );
      const form = screen.getByLabelText('test form');
      expect(form).toHaveAttribute('toolname', 'testTool');
      expect(form).toHaveAttribute('tooldescription', 'Test tool description');
    });

    it('should not render toolname attribute when not provided', () => {
      render(<Form aria-label="test form" />);
      const form = screen.getByLabelText('test form');
      expect(form).not.toHaveAttribute('toolname');
    });

    it('should not render tooldescription attribute when not provided', () => {
      render(<Form aria-label="test form" />);
      const form = screen.getByLabelText('test form');
      expect(form).not.toHaveAttribute('tooldescription');
    });
  });

  describe('WebMCP event handlers', () => {
    it('should call onToolactivated when toolactivated event is dispatched', () => {
      const handleToolactivated = jest.fn();
      render(
        <Form onToolactivated={handleToolactivated} aria-label="test form" />
      );

      const event = new Event('toolactivated');
      event.toolName = 'testTool';
      window.dispatchEvent(event);

      expect(handleToolactivated).toHaveBeenCalledWith(
        expect.objectContaining({
          toolName: 'testTool',
        })
      );
    });

    it('should call onToolcancel when toolcancel event is dispatched', () => {
      const handleToolcancel = jest.fn();
      render(<Form onToolcancel={handleToolcancel} aria-label="test form" />);

      const event = new Event('toolcancel');
      event.toolName = 'testTool';
      window.dispatchEvent(event);

      expect(handleToolcancel).toHaveBeenCalledWith(
        expect.objectContaining({
          toolName: 'testTool',
        })
      );
    });

    it('should clean up event listeners on unmount', () => {
      const handleToolactivated = jest.fn();
      const handleToolcancel = jest.fn();
      const { unmount } = render(
        <Form
          onToolactivated={handleToolactivated}
          onToolcancel={handleToolcancel}
          aria-label="test form"
        />
      );

      unmount();

      const event1 = new Event('toolactivated');
      event1.toolName = 'testTool';
      window.dispatchEvent(event1);

      const event2 = new Event('toolcancel');
      event2.toolName = 'testTool';
      window.dispatchEvent(event2);

      expect(handleToolactivated).not.toHaveBeenCalled();
      expect(handleToolcancel).not.toHaveBeenCalled();
    });

    it('should not add event listeners when handlers are not provided', () => {
      const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
      const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

      const { unmount } = render(<Form aria-label="test form" />);

      // Should not add any event listeners when no handlers provided
      expect(addEventListenerSpy).not.toHaveBeenCalledWith(
        'toolactivated',
        expect.any(Function)
      );
      expect(addEventListenerSpy).not.toHaveBeenCalledWith(
        'toolcancel',
        expect.any(Function)
      );

      unmount();

      // Should not try to remove listeners that were never added
      expect(removeEventListenerSpy).not.toHaveBeenCalledWith(
        'toolactivated',
        expect.any(Function)
      );
      expect(removeEventListenerSpy).not.toHaveBeenCalledWith(
        'toolcancel',
        expect.any(Function)
      );

      addEventListenerSpy.mockRestore();
      removeEventListenerSpy.mockRestore();
    });
  });
});
