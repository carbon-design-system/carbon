import React from 'react';
import Icon, {
  findIcon,
  svgShapes,
  getSvgData,
  icons,
  isPrefixed,
} from '../Icon';
import { mount } from 'enzyme';

describe('Icon', () => {
  describe('Renders as expected', () => {
    const props = {
      className: 'extra-class',
      name: 'search',
      width: '20',
      height: '20',
      description: 'close the thing',
      style: {
        transition: '2s',
      },
    };

    const wrapper = mount(<Icon {...props} />);

    it('Renders `description` as expected', () => {
      expect(wrapper.props().description).toEqual('close the thing');
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

    it('should recieve width props', () => {
      expect(wrapper.props().width).toEqual('20');
    });

    it('should recieve height props', () => {
      expect(wrapper.props().height).toEqual('20');
    });

    it('should recieve style props', () => {
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

  describe('JSON file', () => {
    it('should be defined', () => {
      expect(typeof icons).toBeDefined();
    });

    it('should have length > 0', () => {
      expect(icons.length).toBeGreaterThan(0);
    });
  });
});
