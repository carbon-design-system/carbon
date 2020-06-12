/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, cleanup } from '@carbon/test-utils/react';
import { getByLabel, getByText } from '@carbon/test-utils/dom';
import React from 'react';
import { Simulate } from 'react-dom/test-utils';
import { FileUploaderItem } from '../';
import { keys } from '../../../internal/keyboard';

const statuses = ['uploading', 'edit', 'complete'];

describe('FileUploaderItem', () => {
  afterEach(cleanup);

  describe('automated accessibility tests', () => {
    it.each(statuses)(
      'should have no axe violations with status %s',
      async (status) => {
        const { container } = render(
          <FileUploaderItem uuid="test" name="test" status={status} />
        );
        await expect(container).toHaveNoAxeViolations();
      }
    );
  });

  it('should support calling `onDelete` if the user interacts with the filename during editing', () => {
    const onDelete = jest.fn();
    const description = 'test-description';
    const edit = render(
      <FileUploaderItem
        uuid="edit"
        name="edit"
        iconDescription={description}
        status="edit"
        onDelete={onDelete}
      />
    );

    let removeFile = getByLabel(edit.container, description);
    Simulate.click(removeFile);
    expect(onDelete).toHaveBeenCalledTimes(1);

    Simulate.keyDown(removeFile, keys.Enter);
    expect(onDelete).toHaveBeenCalledTimes(2);

    Simulate.keyDown(removeFile, keys.Space);
    expect(onDelete).toHaveBeenCalledTimes(3);

    onDelete.mockReset();

    const uploading = render(
      <FileUploaderItem
        uuid="uploading"
        name="uploading"
        iconDescription={description}
        status="uploading"
        onDelete={onDelete}
      />
    );
    removeFile = getByText(uploading.container, description);

    Simulate.click(removeFile);
    expect(onDelete).not.toHaveBeenCalled();

    Simulate.keyDown(removeFile, keys.Enter);
    expect(onDelete).not.toHaveBeenCalled();

    Simulate.keyDown(removeFile, keys.Space);
    expect(onDelete).not.toHaveBeenCalled();
  });
});
