/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit-html';
import { PROGRESS_STEP_STAT } from '../../src/components/progress-indicator/progress-step';
import { Default } from '../../src/components/progress-indicator/progress-indicator-story';

const template = (props?) =>
  Default({
    'bx-progress-step': props,
  });

describe('bx-progress-step', function () {
  describe('Rendering', function () {
    it('Should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve();
      expect(document.body.querySelector('bx-progress-step')).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('Should render with various attributes', async function () {
      render(
        template({
          disabled: true,
          iconLabel: 'icon-label-foo',
          labelText: 'label-text-foo',
          secondaryLabelText: 'secondary-label-text-foo',
          state: PROGRESS_STEP_STAT.COMPLETE,
        }),
        document.body
      );
      await Promise.resolve();
      expect(
        document.body.querySelector('bx-progress-step[state="complete"]')
      ).toMatchSnapshot({ mode: 'shadow' });
    });

    afterEach(async function () {
      await render(undefined!, document.body);
    });
  });
});
