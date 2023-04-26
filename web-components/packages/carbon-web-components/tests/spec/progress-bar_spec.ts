/**
 * @license
 *
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit';
import { Playground } from '../../src/components/progress-bar/progress-bar-story';

const template = (props?) =>
  Playground({
    'cds-progress-bar': props,
  });

describe('cds-progress-bar', function () {
  describe('Rendering', function () {
    it('Should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve();
      expect(
        document.body.querySelector('cds-progress-bar' as any)
      ).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('Should render with various attributes', async function () {
      render(
        template({
          label: 'Progress Bar label',
          helperText: 'Optional helper text',
          value: 50,
        }),
        document.body
      );
      await Promise.resolve();
      expect(
        document.body.querySelector('cds-progress-bar[value="50"]' as any)
      ).toMatchSnapshot({ mode: 'shadow' });
    });

    afterEach(async function () {
      await render(undefined!, document.body);
    });
  });
});
