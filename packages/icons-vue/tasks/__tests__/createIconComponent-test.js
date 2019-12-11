/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment jsdom
 */

/* eslint-disable no-console */

'use strict';

const Module = require('module');
const rollup = require('rollup').rollup;
const babel = require('rollup-plugin-babel');
const virtual = require('../plugins/virtual');
const vm = require('vm');
// Include version of Vue that has built-in template support
const Vue = require('vue/dist/vue');

const babelConfig = {
  babelrc: false,
  exclude: /node_modules/,
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['extends browserslist-config-carbon'],
        },
      },
    ],
  ],
};

async function getModuleFromString(
  string,
  { external = ['@carbon/icon-helpers'], name = '<MockIconModule>' } = {}
) {
  const bundle = await rollup({
    input: '__entrypoint__.js',
    external,
    plugins: [
      virtual({
        '__entrypoint__.js': string,
      }),
      babel(babelConfig),
    ],
  });
  const { output } = await bundle.generate({
    format: 'cjs',
  });
  const sandbox = {
    console,
    module: new Module(name),
    require,
  };
  vm.createContext(sandbox);
  vm.runInContext(output[0].code, sandbox);

  return sandbox.module.exports;
}

describe('createIconComponent', () => {
  let createIconComponent;
  let descriptor;
  let info;
  let mountNode;
  let MockIconComponent;
  let render;

  beforeEach(async () => {
    createIconComponent = require('../createIconComponent').createIconComponent;

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

    MockIconComponent = await getModuleFromString(
      createIconComponent(info.moduleName, info.descriptor).source
    );

    render = ({ components, template, ...rest }) => {
      const rootNode = mountNode.appendChild(document.createElement('div'));

      new Vue({
        el: rootNode,
        components,
        template,
        ...rest,
      });

      // Vue ends up replacing `rootNode` so we need to use the `mountNode` to
      // look for the last `<MockIcon />` added to the DOM, most likely this
      // is the last <svg> node that has been inserted
      return mountNode.querySelector('svg:last-of-type');
    };
  });

  afterEach(() => {
    mountNode.parentNode.removeChild(mountNode);
  });

  it('should create a renderable component', async () => {
    const originalConsoleError = console.error;
    console.error = jest.fn();

    render({
      components: {
        [MockIconComponent.name]: MockIconComponent,
      },
      template: `<MockIcon />`,
    });

    // Verify that we can render without errors
    expect(console.error).not.toHaveBeenCalled();

    console.error = originalConsoleError;
  });

  it('should treat focusable as a string', async () => {
    const defaultNode = render({
      components: {
        [MockIconComponent.name]: MockIconComponent,
      },
      template: `<MockIcon />`,
    });
    const focusableNode = render({
      components: {
        [MockIconComponent.name]: MockIconComponent,
      },
      template: `<MockIcon focusable="true" />`,
    });

    expect(defaultNode.getAttribute('focusable')).toBe('false');
    expect(focusableNode.getAttribute('focusable')).toBe('true');
  });

  it('should support rendering a title in the SVG markup', async () => {
    const node = render({
      components: {
        [MockIconComponent.name]: MockIconComponent,
      },
      template: `<MockIcon tabindex="0" title="Custom title" />`,
    });

    const children = Array.from(node.children);
    expect(children[0].tagName).toBe('title');

    for (let i = 1; i < descriptor.content.length; i++) {
      // We do i + 1 here since 0 is used for title above
      expect(children[i].tagName).toBe(descriptor.content[i].elem);
    }
  });

  it('should support custom class names', async () => {
    const customClass = 'foo';
    const dynamicClass = 'bar';
    const node = render({
      components: {
        [MockIconComponent.name]: MockIconComponent,
      },
      data() {
        return {
          myDynamicClass: dynamicClass,
        };
      },
      template: `<MockIcon class="${customClass}" v-bind:class="myDynamicClass" />`,
    });

    expect(node.classList.contains(customClass)).toBe(true);
    expect(node.classList.contains(dynamicClass)).toBe(true);
  });

  it('should support dynamic classes only', async () => {
    const dynamicClass = 'bar';
    const node = render({
      components: {
        [MockIconComponent.name]: MockIconComponent,
      },
      data() {
        return {
          myDynamicClass: dynamicClass,
        };
      },
      template: `<MockIcon v-bind:class="myDynamicClass" />`,
    });

    expect(node.classList.contains(dynamicClass)).toBe(true);
  });

  it('should support custom styles', async () => {
    const customStyle = 'z-index: 99; overflow: hidden;';
    const dynamicStyle = { opacity: '0.99' };
    const node = render({
      components: {
        [MockIconComponent.name]: MockIconComponent,
      },
      data() {
        return {
          myDynamicStyle: dynamicStyle,
        };
      },
      template: `<MockIcon style="${customStyle}" v-bind:style="myDynamicStyle" />`,
    });

    const nodeStyle = node.getAttribute('style');

    expect(nodeStyle).toEqual(
      expect.stringContaining('will-change: transform')
    );
    expect(nodeStyle).toEqual(expect.stringContaining(customStyle));
    expect(nodeStyle).toEqual(expect.stringContaining('opacity: 0.99'));
  });

  it('should support dynamic styles only', async () => {
    const dynamicStyle = { opacity: '0.99' };
    const node = render({
      components: {
        [MockIconComponent.name]: MockIconComponent,
      },
      data() {
        return {
          myDynamicStyle: dynamicStyle,
        };
      },
      template: `<MockIcon v-bind:style="myDynamicStyle" />`,
    });

    const nodeStyle = node.getAttribute('style');
    expect(nodeStyle).toEqual(
      expect.stringContaining('will-change: transform')
    );
    expect(nodeStyle).toEqual(expect.stringContaining('opacity: 0.99'));
  });

  it('should have will-change', async () => {
    const node = render({
      components: {
        [MockIconComponent.name]: MockIconComponent,
      },
      template: `<MockIcon />`,
    });

    const nodeStyle = node.getAttribute('style');
    expect(nodeStyle).toEqual(
      expect.stringContaining('will-change: transform')
    );
  });

  it('should be able to override helper style will-change', async () => {
    const dynamicStyle = { willChange: 'height', opacity: '0.99' };
    const node = render({
      components: {
        [MockIconComponent.name]: MockIconComponent,
      },
      data() {
        return {
          myDynamicStyle: dynamicStyle,
        };
      },
      template: `<MockIcon  style="visibility: hidden" v-bind:style="myDynamicStyle" />`,
    });

    const nodeStyle = node.getAttribute('style');
    expect(nodeStyle).toEqual(expect.stringContaining('will-change: height'));
  });

  it('should be focusable if aria-label and tabindex is used', async () => {
    const label = 'custom-label';
    const node = render({
      components: {
        [MockIconComponent.name]: MockIconComponent,
      },
      template: `<MockIcon aria-label="${label}" tabindex="0" />`,
    });

    expect(node.getAttribute('aria-label')).toBe(label);
    expect(node.getAttribute('role')).toBe('img');
    expect(node.getAttribute('tabindex')).toBe('0');
    expect(node.getAttribute('focusable')).toBe('true');
  });

  it('should create a clickable component', async () => {
    const onClick = jest.fn();
    const node = render({
      components: {
        [MockIconComponent.name]: MockIconComponent,
      },
      data: {
        onClick,
      },
      template: `<MockIcon aria-label="custom-label" tabindex="0" v-on:click="onClick" />`,
    });

    node.dispatchEvent(new MouseEvent('click'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
