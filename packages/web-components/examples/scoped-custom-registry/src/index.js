/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import CDSAccordion from '@carbon/web-components/scoped-elements/components/accordion/accordion.js';
import CDSAccordionItem from '@carbon/web-components/scoped-elements/components/accordion/accordion-item.js';
import CDSAccordionSkeleton from '@carbon/web-components/scoped-elements/components/accordion/accordion-skeleton.js';

const accordionElements = [
  ['cds-accordion', CDSAccordion],
  ['cds-accordion-item', CDSAccordionItem],
  ['cds-accordion-skeleton', CDSAccordionSkeleton],
];

const defineAccordionElements = (registry) => {
  accordionElements.forEach(([tagName, elementClass]) => {
    if (!registry.get(tagName)) {
      registry.define(tagName, elementClass);
    }
  });
};

const createScopedRegistry = () => {
  if (typeof CustomElementRegistry === 'undefined') {
    return undefined;
  }

  try {
    return new CustomElementRegistry();
  } catch {
    return undefined;
  }
};

const scopedAccordionRoot = document.querySelector('[data-scoped-accordion-root]');

if (scopedAccordionRoot) {
  const host = document.createElement('div');
  const markup = scopedAccordionRoot.outerHTML;
  const fallbackRoot = scopedAccordionRoot;

  scopedAccordionRoot.replaceWith(host);

  try {
    const scopedRegistry = createScopedRegistry();
    if (!scopedRegistry) {
      host.replaceWith(fallbackRoot);
    } else {
      defineAccordionElements(scopedRegistry);

      const shadowRoot = host.attachShadow({
        mode: 'open',
        customElementRegistry: scopedRegistry,
      });

      shadowRoot.innerHTML = markup;
      if (typeof scopedRegistry.upgrade === 'function') {
        scopedRegistry.upgrade(shadowRoot);
      }

      if (!shadowRoot.querySelector('cds-accordion')) {
        throw new Error(
          'Accordion markup was not rendered in scoped shadow root.'
        );
      }
    }
  } catch (error) {
    host.replaceWith(fallbackRoot);
    const message =
      error instanceof Error ? error.message : 'Unknown scoped registry error.';
    throw new Error(`Scoped registry initialization failed: ${message}`);
  }
}
