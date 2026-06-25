/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Canary } from './components/_Canary';

import pkgSettings from './global/js/package-settings';
import React from 'react';
import { themes } from '@carbon/themes';
import pconsole from './global/js/utils/pconsole';

export const carbon = {
  get themes() {
    return themes;
  },
  prefix: 'cds',
};

const componentDeprecatedWarning = (name, details) =>
  `Carbon for IBM Products (WARNING): Component "${name}" is deprecated. ${details}`;

pkgSettings.logDeprecated = (component, name) => {
  if (component?.deprecated) {
    const { level, details } = component.deprecated;
    const logUsing = pconsole?.[level] ?? pconsole.error;

    logUsing(
      componentDeprecatedWarning(name || component.displayName, details)
    );
  }
};

// Check that a component is enabled. This function returns a stub which checks
// the component status on first use and then renders as the component or as
// a Canary placeholder initialized with the name of the replaced component.
// Note that the returned stub carries any other properties which had already
// been assigned (eg propTypes, displayName, etc).
pkgSettings.checkComponentEnabled = (component, name) => {
  if (component.render) {
    // The component is a forward-ref, so make a stub forward-ref.
    const forward = React.forwardRef((props, ref) => {
      pkgSettings.logDeprecated(component, name); // may log don't care about result
      // Replace the stub's render fn so this test only happens once.
      return (forward.render =
        pkgSettings.isComponentEnabled(name) ||
        !pkgSettings.isComponentPublic(name)
          ? // If the component is enabled, or if it's not a public component,
            // replace the stub's render fn with the component's render fn.
            component.render
          : // Note that Canary is a direct render fn (not a forward-ref) and
            // will ignore the passed props and ref (if any)
            Canary.bind(undefined, { componentName: name }))(
        // Call it now (after this it will be directly called).
        props,
        ref
      );
    });

    // Transfer object properties already assigned (eg propTypes, displayName)
    // then merge in the stub forward-ref which checks the component status
    // when first used.
    // NOTE: React 18 = displayName not iterable on render function
    return Object.assign(
      {},
      component,
      { displayName: component.displayName },
      forward
    );
  } else {
    // The component is a direct render fn, so make a stub render fn.
    let render = (props) => {
      pkgSettings.logDeprecated(component, name); // may log don't care about result
      // Replace the stub render fn so this test only happens once.
      return (render =
        pkgSettings.isComponentEnabled(name) ||
        !pkgSettings.isComponentPublic(name)
          ? // If the component is enabled, or if it's not a public component,
            // replace the stub render fn with the component render fn.
            component
          : // Replace the stub render fn with the Canary render fn, which will
            // ignore the passed props.
            Canary.bind(undefined, { componentName: name }))(
        // Call it now (after this it will be directly called).
        props
      );
    };

    // Transfer object properties already assigned (eg propTypes, displayName)
    // to a function which calls the stub render fn which checks the component
    // status when first used.
    return Object.assign((props) => render(props), component, {
      displayName: component.displayName,
    });
  }
};

export const pkg = pkgSettings;
