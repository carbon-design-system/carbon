/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Button from '../../Button';
import CodeSnippet from '../';
import Copy from '../../Copy';
import CopyButton from '../../CopyButton';
import { shallow, mount } from 'enzyme';
import { settings } from 'carbon-components';

const { prefix } = settings;

jest.mock('copy-to-clipboard', () => {
  return jest.fn();
});

describe('Code Snippet', () => {
  describe('Renders as expected', () => {
    let snippet;

    beforeEach(() => {
      snippet = shallow(
        <CodeSnippet className="some-class" type="single">
          {'node -v'}
        </CodeSnippet>
      );
    });

    it('should use the appropriate snippet class', () => {
      expect(snippet.hasClass(`${prefix}--snippet`)).toEqual(true);
      expect(snippet.hasClass(`${prefix}--snippet--single`)).toEqual(true);
    });

    it('should render children as expected', () => {
      expect(snippet.find(`.${prefix}--snippet-container`).length).toBe(1);
    });

    it('should all for custom classes to be applied', () => {
      expect(snippet.hasClass('some-class')).toEqual(true);
    });

    it('should allow hiding of the copy button', () => {
      expect(snippet.find(CopyButton).length).toBe(1);
      snippet.setProps({ hideCopyButton: true });
      expect(snippet.find(CopyButton).length).toBe(0);
    });

    it('should set disabled if one is passed via props', () => {
      snippet.setProps({ disabled: true });
      expect(snippet.find(`.${prefix}--snippet--disabled`).length).toBe(1);
    });
  });

  describe('Triggers appropriate events', () => {
    it('should call the click handler', () => {
      const onClick = jest.fn();
      const clickWrapper = mount(<CodeSnippet onClick={onClick} />);
      clickWrapper.find(CopyButton).simulate('click');
      expect(onClick).toHaveBeenCalled();
    });

    it('should call the click handler with type="inline"', () => {
      const onClick = jest.fn();
      const clickWrapper = mount(
        <CodeSnippet type={'inline'} onClick={onClick} />
      );
      clickWrapper.find(Copy).simulate('click');
      expect(onClick).toHaveBeenCalled();
    });
  });

  describe('check for showMoreBtn', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(<CodeSnippet type={'multi'} />);
    });

    it('when less then 15 rows', () => {
      wrapper.setProps({
        children: '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14',
      });

      expect(wrapper.find(Button).length).toBe(0);
    });

    it('when exactly 15 rows', () => {
      wrapper.setProps({
        children: '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15',
      });

      expect(wrapper.find(Button).length).toBe(0);
    });

    it.skip('when more then 15 rows', () => {
      wrapper.setProps({
        children: '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16',
      });

      expect(wrapper.find(Button).length).toBe(1);
    });
  });
});
