/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Close16 } from '@carbon/icons-react';
import { mount, shallow } from 'enzyme';
import React from 'react';
import { FileUploaderItem } from '../';

describe('FileUploaderItem', () => {
  const mountWrapper = mount(
    <FileUploaderItem file={{ name: 'jd.jpg', status: 'edit' }} />
  );

  describe('click on edit icon (close--solid)', () => {
    it('should have a click event', () => {
      const onDelete = jest.fn();
      mountWrapper.setProps({ onDelete, status: 'edit' });
      mountWrapper.find(Close16).simulate('click');
      expect(onDelete).toBeCalled();
    });
  });
});
