/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit';

import CDSInlineLoading, {
  INLINE_LOADING_STATE,
} from '../../src/components/inline-loading/inline-loading';
import { Playground } from '../../src/components/inline-loading/inline-loading-story';

const template = (props?) =>
  Playground({
    'cds-inline-loading': props,
  });

describe('cds-inline-loading', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve();
      expect(
        document.body.querySelector('cds-inline-loading' as any)
      ).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render with unknown status', async function () {
      render(template(), document.body);
      (
        document.body.querySelector(
          'cds-inline-loading'
        ) as unknown as CDSInlineLoading
      ).status = undefined!;
      await Promise.resolve();
      expect(
        document.body.querySelector('cds-inline-loading' as any)
      ).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render with inactive status', async function () {
      render(
        template({
          status: INLINE_LOADING_STATE.INACTIVE,
        }),
        document.body
      );
      await Promise.resolve();
      expect(
        document.body.querySelector('cds-inline-loading' as any)
      ).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render with finished status', async function () {
      render(
        template({
          status: INLINE_LOADING_STATE.FINISHED,
        }),
        document.body
      );
      await Promise.resolve();
      expect(
        document.body.querySelector('cds-inline-loading' as any)
      ).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render with error status', async function () {
      render(
        template({
          status: INLINE_LOADING_STATE.ERROR,
        }),
        document.body
      );
      await Promise.resolve();
      expect(
        document.body.querySelector('cds-inline-loading' as any)
      ).toMatchSnapshot({
        mode: 'shadow',
      });
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
