/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render } from '@testing-library/react'; // https://testing-library.com/docs/react-testing-library/intro

import { ExampleDeprecatedComponent } from './ExampleDeprecatedComponent';
import { expectWarn } from '../../global/js/utils/test-helper';

const componentName = ExampleDeprecatedComponent.displayName;

describe(componentName, () => {
  it('Warns when using a deprecated component', async () => {
    expectWarn(
      'Carbon for IBM Products (WARNING): Component "ExampleDeprecatedComponent" is deprecated. This an example component deprecation message used by \'checkComponentEnabled\'.',
      () => {
        render(<ExampleDeprecatedComponent />);
      }
    );
  });
});
