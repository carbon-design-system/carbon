import React from 'react';
import Icon, { findIcon, getSvgContent, getSvgData, icons } from '../Icon';
import { mount } from 'enzyme';

describe('Icon', () => {
  describe('Renders as expected', () => {
    const iconRoot = mount(<Icon name="search" description="close the thing" />);

    it('Renders `description` as expected', () => {
      expect(iconRoot.props().description).toEqual('close the thing');
    });

    it('Renders with `id` on <title>', () => {
      const id = iconRoot.find('title').props().id;
      expect(id).not.toBeUndefined();
    });

    it('Renders `aria-labelledby` on <svg>', () => {
      const aria = iconRoot.find('svg').props()['aria-labelledby'];
      expect(aria).not.toBeUndefined();
    });

    it('Should have equal values for `id` and `aria-labelledby` props', () => {
      const id = iconRoot.find('title').props().id;
      const aria = iconRoot.find('svg').props()['aria-labelledby'];
      expect(id).toEqual(aria);
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
      const json = [
        { name: 'bob' },
        { name: 'bob' },
      ];

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

  describe('getSvgContent', () => {
    it('returns with SVG XML when given a valid icon name', () => {
      const data = getSvgData('search');
      const content = getSvgContent(data);

      expect(content.length).toBeGreaterThan(0);
    });
  });

  describe('JSON file', () => {
    it('should be defined', () => {
      expect(typeof(icons)).toBeDefined();
    });

    it('should have length > 0', () => {
      expect(icons.length).toBeGreaterThan(0);
    });
  });
});
