/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment jsdom
 */

'use strict';

const Module = require('module');
const React = require('react');
const ReactDOM = require('react-dom');
const rollup = require('rollup').rollup;
const virtual = require('rollup-plugin-virtual');
const vm = require('vm');

async function getModuleFromString(
  string,
  {
    external = ['@carbon/icon-helpers', 'prop-types', 'react'],
    name = '<MockIconModule>',
  } = {}
) {
  const bundle = await rollup({
    input: '__entrypoint__',
    external,
    plugins: [
      virtual({
        __entrypoint__: string,
      }),
    ],
  });
  const { code } = await bundle.generate({
    format: 'cjs',
  });
  const sandbox = {
    console,
    module: new Module(name),
    require,
  };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);

  return sandbox.module.exports;
}

describe('createFromInfo', () => {
  describe('createModuleFromInfo', () => {
    let createModuleFromInfo;
    let descriptor;
    let info;
    let mountNode;

    beforeEach(() => {
      createModuleFromInfo = require('../createFromInfo').createModuleFromInfo;
      descriptor = {
        attrs: {
          width: 16,
          height: 16,
          viewBox: '0 0 16 16',
        },
        content: [
          {
            elem: 'circle',
            attrs: {
              cx: 8,
              cy: 8,
              r: 8,
            },
          },
        ],
      };
      info = {
        descriptor,
        moduleName: 'MockIcon',
      };
      mountNode = document.createElement('div');
      document.body.appendChild(mountNode);
    });

    afterEach(() => {
      mountNode.parentNode.removeChild(mountNode);
    });

    it('should create a renderable component', async () => {
      const moduleSource = createModuleFromInfo(info);
      const MockIconComponent = await getModuleFromString(moduleSource);

      expect(() => {
        ReactDOM.render(<MockIconComponent />, mountNode);
      }).not.toThrow();
    });

    it('should treat focusable as a string', async () => {
      const moduleSource = createModuleFromInfo(info);
      const MockIconComponent = await getModuleFromString(moduleSource);
      const getContainer = () => mountNode.querySelector('svg');

      ReactDOM.render(<MockIconComponent />, mountNode);
      expect(getContainer().getAttribute('focusable')).toBe('false');

      ReactDOM.render(<MockIconComponent focusable />, mountNode);
      expect(getContainer().getAttribute('focusable')).toBe('true');
    });

    it('should support rendering a title in the SVG markup', async () => {
      const moduleSource = createModuleFromInfo(info);
      const MockIconComponent = await getModuleFromString(moduleSource);

      ReactDOM.render(
        <MockIconComponent>
          <title>Mock Icon</title>
        </MockIconComponent>,
        mountNode
      );

      const children = Array.from(mountNode.querySelector('svg').children);
      expect(children[0].tagName).toBe('title');

      for (let i = 0; i < descriptor.content.length; i++) {
        // We do i + 1 here since 0 is used for title above
        expect(children[i + 1].tagName).toBe(descriptor.content[i].elem);
      }
    });

    it('should forward refs to rendered DOM element', async () => {
      const moduleSource = createModuleFromInfo(info);
      const MockIconComponent = await getModuleFromString(moduleSource);
      let svg;
      const ref = jest.fn(node => {
        svg = node;
      });
      ReactDOM.render(<MockIconComponent ref={ref} />, mountNode);
      expect(svg === document.querySelector('svg'));
    });

    it('should be focusable if an aria label and tab index is used', async () => {
      const moduleSource = createModuleFromInfo(info);
      const MockIconComponent = await getModuleFromString(moduleSource);
      const getContainer = () => mountNode.querySelector('svg');

      // Test without a tabIndex, should not be focusable
      ReactDOM.render(<MockIconComponent aria-label="Mock icon" />, mountNode);

      expect(getContainer().getAttribute('aria-label')).toBeDefined();
      getContainer().focus();
      expect(document.activeElement === getContainer()).toBe(false);

      // Test without aria-label and with tabIndex, should not be focusable
      // because we require a label in that case
      ReactDOM.render(<MockIconComponent tabIndex="0" />, mountNode);

      expect(getContainer().getAttribute('aria-label')).toBeDefined();
      getContainer().focus();
      expect(document.activeElement === getContainer()).toBe(false);

      // Test with aria-label and tabIndex, should be focusable
      ReactDOM.render(
        <MockIconComponent aria-label="Mock icon" tabIndex="0" />,
        mountNode
      );

      expect(getContainer().getAttribute('aria-label')).toBeDefined();
      getContainer().focus();
      expect(document.activeElement === getContainer()).toBe(true);
    });

    it('should not transform data attributes', async () => {
      const dataTestId = 1;
      const descriptor = {
        attrs: {
          width: 16,
          height: 16,
          viewBox: '0 0 16 16',
        },
        content: [
          {
            elem: 'circle',
            attrs: {
              cx: 8,
              cy: 8,
              r: 8,
              'data-test-id': dataTestId,
            },
          },
        ],
      };
      const moduleSource = createModuleFromInfo({
        descriptor,
        moduleName: 'MockIcon',
      });
      const MockIconComponent = await getModuleFromString(moduleSource);

      ReactDOM.render(<MockIconComponent />, mountNode);
      expect(
        mountNode.querySelector(`[data-test-id="${dataTestId}"]`)
      ).toBeDefined();
    });
  });
});
