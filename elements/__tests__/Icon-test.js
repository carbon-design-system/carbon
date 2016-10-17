import React from 'react';
import Icon from '../Icon';
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
    const instance = new Icon();

    it('should return a defined object', () => {
      const test = instance.findIcon('search');
      expect(test).toBeDefined();
    });

    it('returns a single JSON object', () => {
      const test = [instance.findIcon('search')];
      expect(test.length).toEqual(1);
    });

    it('returns false when given wrong name param', () => {
      const test = instance.findIcon('wrong-name');
      expect(test).toBe(false);
    });

    it('throws if multiple icons are found from one name param', () => {
      const json = [
        { name: 'bob' },
        { name: 'bob' },
      ];

      expect(() => {
        instance.findIcon('bob', json);
      }).toThrow();
    });
  });

  describe('getSvgData', () => {
    it('returns false when given an undefined icon name', () => {
      const instance = new Icon();
      const badData = instance.getSvgData('wrongIconName');

      expect(badData).toBe(false);
    });
  });

  describe('getSvgContent', () => {
    it('returns with SVG XML when given a valid icon name', () => {
      const instance = new Icon();
      const data = instance.getSvgData('search');
      const content = instance.getSvgContent(data);

      expect(content.length).toBeGreaterThan(0);
    });
  });

  describe('JSON file', () => {
    const data = Icon.data;

    it('should be defined', () => {
      expect(typeof(data)).toBeDefined();
    });

    it('should have length > 0', () => {
      expect(data.length).toBeGreaterThan(0);
    });
  });
});
