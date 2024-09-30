/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit';
import { PROGRESS_STEP_STAT } from '../../src/components/progress-indicator/progress-step';
import { Playground } from '../../src/components/progress-indicator/progress-indicator-story';

const template = (props?) =>
  Playground({
    'cds-progress-step': props,
  });

describe('cds-progress-step', function () {
  describe('Rendering', function () {
    it('Should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve();
      expect(
        document.body.querySelector('cds-progress-step' as any)
      ).toMatchSnapshot({
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
        document.body.querySelector(
          'cds-progress-step[state="complete"]' as any
        )
      ).toMatchSnapshot({ mode: 'shadow' });
    });

    afterEach(async function () {
      await render(undefined!, document.body);
    });
  });
});
