/**
 * Copyright IBM Corp. 2023, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { pkg } from '../../settings';
import { ExampleComponent } from './ExampleComponent';

const componentName = 'ExampleDeprecatedComponent';

// This is NOT a full component example. It is only intended to show the deprecation of a component.
export let ExampleDeprecatedComponent = () => (
  <ExampleComponent
    primaryButtonLabel="primary"
    secondaryButtonLabel="secondary"
  />
);

// example of a deprecation warning
ExampleDeprecatedComponent.deprecated = {
  level: 'warn',
  details: `This an example component deprecation message used by 'checkComponentEnabled'.`,
};

// The component enable should log the deprecation
ExampleDeprecatedComponent = pkg.checkComponentEnabled(
  ExampleDeprecatedComponent,
  componentName
);
