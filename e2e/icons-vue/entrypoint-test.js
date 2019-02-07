/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

describe('@carbon/icons-vue CommonJS', () => {
  it('should be require-able', () => {
    expect(() => {
      require('../../packages/icons-vue');
    }).not.toThrow();
  });

  describe('CarbonIconsVue', () => {
    let CarbonIconsVue;

    beforeEach(() => {
      CarbonIconsVue = require('../../packages/icons-vue').CarbonIconsVue;
    });

    it('should register given components with view', () => {
      const mockVue = {
        component: jest.fn(),
      };
      const mockOptions = {
        components: {
          A: 'a',
          B: 'b',
          C: 'c',
        },
      };
      const componentNames = Object.keys(mockOptions.components);
      CarbonIconsVue.install(mockVue, mockOptions);

      expect(mockVue.component).toHaveBeenCalledTimes(componentNames.length);

      componentNames.forEach(name => {
        expect(mockVue.component).toHaveBeenCalledWith(
          name,
          mockOptions.components[name]
        );
      });
    });
  });
});
