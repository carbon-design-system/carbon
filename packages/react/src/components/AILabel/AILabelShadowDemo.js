/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import { AILabel, AILabelContent } from '.';

class AILabelShadowDemo extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // Create container structure
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        .demo-container {
          padding: 1rem;
          font-family: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif;
        }
        .demo-container h2 {
          margin: 0 0 0.5rem 0;
          font-size: 1rem;
          font-weight: 600;
        }
        .demo-description {
          margin: 0 0 1rem 0;
          font-size: 0.875rem;
        }
        .ai-content p {
          margin: 0 0 0.5rem 0;
        }
      </style>
      <div class="demo-container">
        <h2>Shadow DOM Test</h2>
        <p class="demo-description">
          This AILabel is rendered inside Shadow DOM. Click the link inside - the Toggletip should stay open.
        </p>
        <div id="react-root"></div>
      </div>
    `;

    // Inject Carbon styles into shadow root
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/@carbon/styles@1.103.0/css/styles.min.css';
    this.shadowRoot.appendChild(link);

    // Render React component
    const root = this.shadowRoot.querySelector('#react-root');
    const reactRoot = createRoot(root);

    reactRoot.render(
      <AILabel autoAlign size="md">
        <AILabelContent>
          <div className="ai-content">
            <p>Click the link below - Toggletip should stay open:</p>
            <a
              href="https://www.ibm.com/products/watsonx-ai"
              className="ai-link"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                window.open(
                  'https://www.ibm.com/products/watsonx-ai',
                  '_blank',
                  'noopener,noreferrer'
                );
              }}>
              Test Link (Click me!)
            </a>
          </div>
        </AILabelContent>
      </AILabel>
    );
  }
}

if (!customElements.get('ailabel-shadow-demo')) {
  customElements.define('ailabel-shadow-demo', AILabelShadowDemo);
}

export default AILabelShadowDemo;
