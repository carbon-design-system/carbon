/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import EventManager from '../utils/event-manager';
import createReactCustomElementType, {
  booleanSerializer,
  numberSerializer,
  objectSerializer,
} from '../../src/globals/wrappers/createReactCustomElementType';

describe('React wrapper', function () {
  let container;
  const events = new EventManager();

  beforeEach(function () {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  describe('Handling `null`/undefined`', function () {
    it('Should not set the attribute for `undefined`', function () {
      const Component = createReactCustomElementType('test-foo', {});
      act(() => {
        render(React.createElement(Component, { foo: undefined }), container);
      });
      expect(container.querySelector('test-foo').hasAttribute('foo')).toBe(false);
    });

    it('Should not set the attribute for `null`', function () {
      const Component = createReactCustomElementType('test-foo', {});
      act(() => {
        render(React.createElement(Component, { foo: null }), container);
      });
      expect(container.querySelector('test-foo').hasAttribute('foo')).toBe(false);
    });
  });

  describe('Attribute mapping', function () {
    it('Should use the property name as the attribute name by default', function () {
      const Component = createReactCustomElementType('test-foo', {});
      act(() => {
        render(React.createElement(Component, { foo: 'value-foo' }), container);
      });
      expect(container.querySelector('test-foo').getAttribute('foo')).toBe('value-foo');
    });

    it('Should use the attribute name specified in the mapping', function () {
      const Component = createReactCustomElementType('test-foo', {
        foo: {
          attribute: 'attrib-foo',
        },
      });
      act(() => {
        render(React.createElement(Component, { foo: 'value-foo' }), container);
      });
      expect(container.querySelector('test-foo').getAttribute('attrib-foo')).toBe('value-foo');
    });
  });

  describe('Serialization', function () {
    it('Should support converting boolean prop', function () {
      const Component = createReactCustomElementType('test-foo', {
        foo: {
          serialize: booleanSerializer,
        },
      });
      act(() => {
        render(React.createElement(Component, { foo: true }), container);
      });
      expect(container.querySelector('test-foo').getAttribute('foo')).toBe('');
      act(() => {
        render(React.createElement(Component, { foo: false }), container);
      });
      expect(container.querySelector('test-foo').hasAttribute('foo')).toBe(false);
    });

    it('Should support converting number prop', function () {
      const Component = createReactCustomElementType('test-foo', {
        foo: {
          serialize: numberSerializer,
        },
      });
      act(() => {
        render(React.createElement(Component, { foo: 1 }), container);
      });
      expect(container.querySelector('test-foo').getAttribute('foo')).toBe('1');
    });

    it('Should support converting object prop', function () {
      const Component = createReactCustomElementType('test-foo', {
        foo: {
          serialize: objectSerializer,
        },
      });
      act(() => {
        render(React.createElement(Component, { foo: { foo: 'Foo', bar: 'Bar' } }), container);
      });
      expect(container.querySelector('test-foo').getAttribute('foo')).toBe('{"foo":"Foo","bar":"Bar"}');
    });
  });

  describe('Direct property mapping', function () {
    it('Should map to properties instead of to attributes', function () {
      const Component = createReactCustomElementType('test-foo', {
        foo: {
          attribute: false,
        },
      });
      act(() => {
        render(React.createElement(Component, { foo: { foo: 'Foo', bar: 'Bar' } }), container);
      });
      expect(container.querySelector('test-foo').foo).toEqual({ foo: 'Foo', bar: 'Bar' });
    });
  });

  describe('Event handling', function () {
    it('Should support string-based event descriptor', function () {
      const Component = createReactCustomElementType('test-foo', {
        onClick: {
          event: 'click',
        },
      });
      const spyClick = jasmine.createSpy('click');
      act(() => {
        render(React.createElement(Component, { onClick: spyClick }), container);
      });
      container.querySelector('test-foo').click();
      expect(spyClick).toHaveBeenCalled();
    });

    it('Should support object-based event descriptor with event options', function () {
      const Component = createReactCustomElementType('test-foo', {
        onClick: {
          event: {
            name: 'click',
            options: true,
          },
        },
      });
      const spyClick = jasmine.createSpy('click');
      act(() => {
        render(
          React.createElement(
            Component,
            {
              onClick: () => spyClick('parent'),
            },
            React.createElement('div')
          ),
          container
        );
      });
      const childDiv = container.querySelector('test-foo div');
      events.on(childDiv, 'click', () => spyClick('child'));
      childDiv.click();
      // The event handler on `<test-foo>` should be called first as the event listener is attached in capture mode
      expect(spyClick.calls.allArgs().map(item => item[0])).toEqual(['parent', 'child']);
    });
  });

  afterEach(function () {
    if (container) {
      unmountComponentAtNode(container);
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
      container = null;
    }
    events.reset();
  });
});
