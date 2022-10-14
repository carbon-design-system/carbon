/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { mount } from 'enzyme';
import React from 'react';
import Search from './ExpandableSearch';

const prefix = 'cds';

describe('ExpandableSearch', () => {
  let wrapper;

  const container = () => wrapper.find(`.${prefix}--search`);
  const button = () => wrapper.find('button');
  const input = () => wrapper.find('input');
  const label = () => wrapper.find('label');

  const render = (props) => {
    if (wrapper) {
      return wrapper.setProps(props);
    }

    wrapper = mount(<Search labelText="testlabel" {...props} />);

    return wrapper;
  };

  describe('container', () => {
    beforeEach(() => {
      render();
    });

    it('has the class `${prefix}--search--expandable`', () => {
      const value = container().hasClass(`${prefix}--search--expandable`);
      expect(value).toEqual(true);
    });

    describe('expanded', () => {
      const value = () => container().hasClass(`${prefix}--search--expanded`);

      describe('when input has no content', () => {
        beforeEach(() => {
          input().simulate('change', { target: { value: '' } });
        });

        it('is false', () => {
          expect(value()).toEqual(false);
        });
      });

      describe.skip('when input has content', () => {
        beforeEach(() => {
          input().simulate('change', { target: { value: 'text' } });
        });

        it('is true', () => {
          expect(value()).toEqual(true);
        });

        describe('when content is cleared', () => {
          beforeEach(() => {
            button().simulate('click');
          });

          it('is false', () => {
            expect(value()).toEqual(false);
          });
        });
      });
    });
  });

  describe('label', () => {
    beforeEach(() => {
      render();
    });

    it('is rendered', () => {
      expect(label().text()).toEqual('testlabel');
    });
  });

  describe('onBlur', () => {
    const onBlur = jest.fn();

    beforeEach(() => {
      render({ onBlur });
    });

    afterEach(() => {
      onBlur.mockReset();
    });

    it('is called on blur', () => {
      input().simulate('blur');
      expect(onBlur).toHaveBeenCalled();
    });
  });

  describe('onChange', () => {
    const onChange = jest.fn();

    beforeEach(() => {
      render({ onChange });
    });

    afterEach(() => {
      onChange.mockReset();
    });

    it('is called on change', () => {
      input().simulate('change', { target: { value: 'text' } });
      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('onClick', () => {
    const onClick = jest.fn();

    beforeEach(() => {
      render({ onClick });
    });

    afterEach(() => {
      onClick.mockReset();
    });

    it('is called on click', () => {
      input().simulate('click');
      expect(onClick).toHaveBeenCalled();
    });
  });

  describe('onClear', () => {
    const onClear = jest.fn();

    beforeEach(() => {
      render({ onClear });
    });

    afterEach(() => {
      onClear.mockReset();
    });

    describe('when input has no content', () => {
      beforeEach(() => {
        input().simulate('change', { target: { value: '' } });
      });

      it('is called on clear', () => {
        button().simulate('click');
        expect(onClear).toHaveBeenCalled();
      });
    });

    describe('when input has content', () => {
      beforeEach(() => {
        input().simulate('change', { target: { value: 'text' } });
      });

      it('is called on clear', () => {
        button().simulate('click');
        expect(onClear).toHaveBeenCalled();
      });
    });
  });

  describe('onExpand', () => {
    const onExpand = jest.fn();

    beforeEach(() => {
      render({ onExpand });
    });

    afterEach(() => {
      onExpand.mockReset();
    });

    // This won't work until v11
    it.skip('is called on focus', () => {
      input().simulate('focus');
      expect(onExpand).toHaveBeenCalled();
    });
  });

  describe('onFocus', () => {
    const onFocus = jest.fn();

    beforeEach(() => {
      render({ onFocus });
    });

    afterEach(() => {
      onFocus.mockReset();
    });

    it('is called on focus', () => {
      input().simulate('focus');
      expect(onFocus).toHaveBeenCalled();
    });
  });
});
