/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect } from '@open-wc/testing';
import { defineCustomElement } from '@carbon/web-components/es/globals/register.js';

// these tests cover the `defineCustomElement` API - the new v3 import behavior
// tests will be added to the v3 feature branch
describe('defineCustomElement', () => {
  it('registers under the class static `is` by default', () => {
    class El extends HTMLElement {
      static is = 'reg-test-default';
    }
    defineCustomElement(El);
    expect(customElements.get('reg-test-default')).to.equal(El);
  });

  it('registers under a custom `name`', () => {
    class El extends HTMLElement {
      static is = 'reg-test-isname';
    }
    defineCustomElement(El, { name: 'reg-test-customname' });
    expect(customElements.get('reg-test-customname')).to.equal(El);
    expect(customElements.get('reg-test-isname'), 'default `is` not used').to.be
      .undefined;
  });

  it('routes to a provided `registry`, leaving the global registry untouched', () => {
    const calls = [];
    const registry = {
      get: () => undefined,
      define: (name, clazz) => calls.push([name, clazz]),
    };
    class El extends HTMLElement {
      static is = 'reg-test-scoped';
    }
    defineCustomElement(El, { registry });

    expect(calls, 'defined into the provided registry').to.deep.equal([
      ['reg-test-scoped', El],
    ]);
    expect(customElements.get('reg-test-scoped'), 'global registry untouched')
      .to.be.undefined;
  });

  it('is idempotent - re-defining an existing tag is a no-op', () => {
    class El extends HTMLElement {
      static is = 'reg-test-idem';
    }
    defineCustomElement(El);
    expect(() => defineCustomElement(El)).to.not.throw();
    expect(customElements.get('reg-test-idem')).to.equal(El);
  });

  it('returns the class for convenient re-export', () => {
    class El extends HTMLElement {
      static is = 'reg-test-return';
    }
    expect(defineCustomElement(El)).to.equal(El);
  });

  it('registers a subclass under a custom name when the class is already registered', () => {
    // classes only be registered once per registry, so a custom-name call
    // after the default tag was defined registers an identical subclass
    class El extends HTMLElement {
      static is = 'reg-test-sub-default';
    }
    defineCustomElement(El);
    const returned = defineCustomElement(El, { name: 'reg-test-sub-alias' });
    const registered = customElements.get('reg-test-sub-alias');

    expect(registered, 'alias registered').to.exist;
    expect(
      registered,
      'registered value is a subclass, not the base'
    ).to.not.equal(El);
    expect(returned, 'returns the class actually registered').to.equal(
      registered
    );
    expect(
      document.createElement('reg-test-sub-alias') instanceof El,
      'custom-tag elements stay instanceof the base'
    ).to.be.true;
    expect(
      customElements.get('reg-test-sub-default'),
      'default registration untouched'
    ).to.equal(El);
  });

  it('keeps the first definition and warns when a different class claims a taken tag', () => {
    class First extends HTMLElement {
      static is = 'reg-test-dup';
    }
    class Second extends HTMLElement {
      static is = 'reg-test-dup';
    }
    defineCustomElement(First);

    const originalWarn = globalThis.console.warn;
    let warned = '';
    globalThis.console.warn = (message) => {
      warned = message;
    };
    let returned;
    try {
      returned = defineCustomElement(Second);
    } finally {
      globalThis.console.warn = originalWarn;
    }

    expect(
      customElements.get('reg-test-dup'),
      'first definition wins'
    ).to.equal(First);
    expect(returned, 'returns the class passed in').to.equal(Second);
    expect(warned, 'warns about the conflicting class').to.include(
      'already defined by a different'
    );
  });
});
