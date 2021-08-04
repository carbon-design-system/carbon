/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { iconSearch } from 'carbon-icons';
import Icon, { findIcon, svgShapes, getSvgData, isPrefixed } from '../Icon';
import { mount } from 'enzyme';

describe('Icon', () => {
  describe('Renders as expected', () => {
    const props = {
      className: 'extra-class',
      icon: iconSearch,
      width: '20',
      height: '20',
      description: 'close the thing',
      iconTitle: 'title',
      style: {
        transition: '2s',
      },
    };

    const wrapper = mount(<Icon {...props} />);

    it('Renders `description` as expected', () => {
      expect(wrapper.props().description).toEqual('close the thing');
    });

    it('Renders `title` as expected', () => {
      expect(wrapper.props().iconTitle).toEqual('title');
    });

    it('should have a default role prop', () => {
      expect(wrapper.props().role).toEqual('img');
    });

    it('should have expected viewBox on <svg>', () => {
      expect(wrapper.find('svg').props().viewBox).not.toEqual('');
    });

    it('should add extra classes that are passed via className', () => {
      expect(wrapper.props().className).toEqual('extra-class');
    });

    it('should receive width props', () => {
      expect(wrapper.props().width).toEqual('20');
    });

    it('should receive height props', () => {
      expect(wrapper.props().height).toEqual('20');
    });

    it('should receive style props', () => {
      expect(wrapper.props().style).toEqual({ transition: '2s' });
    });
  });

  describe('findIcon', () => {
    it('should return a defined object', () => {
      const test = findIcon('search');
      expect(test).toBeDefined();
    });

    it('returns a single JSON object', () => {
      const test = [findIcon('search')];
      expect(test.length).toEqual(1);
    });

    it('returns false when given wrong name param', () => {
      const test = findIcon('wrong-name');
      expect(test).toBe(false);
    });

    it('throws if multiple icons are found from one name param', () => {
      const json = [{ name: 'bob' }, { name: 'bob' }];

      expect(() => {
        findIcon('bob', json);
      }).toThrow();
    });
  });

  describe('getSvgData', () => {
    it('returns false when given an undefined icon name', () => {
      const badData = getSvgData('wrongIconName');

      expect(badData).toBe(false);
    });
  });

  describe('svgShapes', () => {
    it('returns with SVG XML when given a valid icon name', () => {
      const data = getSvgData('icon--search');
      const content = svgShapes(data);
      expect(content.length).toBeGreaterThan(0);
    });

    it('returns empty when given an icon with no valid svgProp', () => {
      const svgData = {
        invalidProp: [{ invalidAttribute: 43 }],
      };
      const content = svgShapes(svgData);
      expect(content.length).toBeGreaterThan(0);
      expect(content).toEqual(['']);
    });

    it('takes care of polygons', () => {
      const svgData = {
        polygons: [
          {
            points: 'POINT',
          },
        ],
      };
      expect(
        svgShapes(svgData).map((item) =>
          item.map(({ type, key, props }) => ({ type, key, props }))
        )
      ).toEqual([
        [{ type: 'polygon', key: 'key0', props: { points: 'POINT' } }],
      ]);
    });
  });

  describe('isPrefixed', () => {
    it('returns true when given a name with icon-- prefix', () => {
      const prefixed = isPrefixed('icon--search');
      expect(prefixed).toBe(true);
    });

    it('returns false when given a name without icon-- prefix', () => {
      const prefixed = isPrefixed('search');
      expect(prefixed).toBe(false);
    });
  });
});
