/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit';

import CDSInlineLoading, {
  INLINE_LOADING_STATE,
} from '../../src/components/inline-loading/inline-loading';
import { Playground } from '../../src/components/inline-loading/inline-loading.stories';

const template = (props?) =>
  Playground({
    'cds-inline-loading': props,
  });

describe('cds-inline-loading', () => {
  describe('Misc attributes', () => {
    it('should render with minimum attributes', async () => {
      render(template(), document.body);
      await Promise.resolve();
      expect(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
        document.body.querySelector('cds-inline-loading' as any)
      ).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render with unknown status', async () => {
      render(template(), document.body);
      (
        document.body.querySelector(
          'cds-inline-loading'
        ) as unknown as CDSInlineLoading
      ).status = undefined!; // eslint-disable-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      await Promise.resolve();
      expect(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
        document.body.querySelector('cds-inline-loading' as any)
      ).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render with inactive status', async () => {
      render(
        template({
          status: INLINE_LOADING_STATE.INACTIVE,
        }),
        document.body
      );
      await Promise.resolve();
      expect(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
        document.body.querySelector('cds-inline-loading' as any)
      ).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render with finished status', async () => {
      render(
        template({
          status: INLINE_LOADING_STATE.FINISHED,
        }),
        document.body
      );
      await Promise.resolve();
      expect(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
        document.body.querySelector('cds-inline-loading' as any)
      ).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render with error status', async () => {
      render(
        template({
          status: INLINE_LOADING_STATE.ERROR,
        }),
        document.body
      );
      await Promise.resolve();
      expect(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
        document.body.querySelector('cds-inline-loading' as any)
      ).toMatchSnapshot({
        mode: 'shadow',
      });
    });
  });

  afterEach(async () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
    await render(undefined!, document.body);
  });
});
