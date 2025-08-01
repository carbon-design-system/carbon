/**
 * @license
 *
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './index';
import { TREE_SIZE } from './defs';
import Document16 from '@carbon/icons/es/document/16.js';
import Folder16 from '@carbon/icons/es/folder/16.js';
import '../button/index';
import { iconLoader } from '../../globals/internal/icon-loader';

const sizes = {
  [`XS size (${TREE_SIZE.EXTRA_SMALL})`]: TREE_SIZE.EXTRA_SMALL,
  [`Small size (${TREE_SIZE.SMALL})`]: TREE_SIZE.SMALL,
};

const defaultArgs = {
  label: 'Tree View',
};

const controls = {
  size: {
    control: 'select',
    description: 'Specify the size of the Tree.',
    options: sizes,
  },
  hideLabel: {
    control: 'boolean',
    description: 'Will hide label if true',
  },
  label: {
    control: 'text',
    description: 'label',
  },
};

export const Default = {
  argTypes: controls,
  args: defaultArgs,
  decorators: [
    (story) => html` <div style="inline-size: 20rem">${story()}</div> `,
  ],
  render: ({ hideLabel, label, size }) => html`
    <cds-tree-view ?hide-label=${hideLabel} label=${label} size="${size}">
      <cds-tree-node label="Artificial intelligence"></cds-tree-node>
      <cds-tree-node label="Blockchain"></cds-tree-node>
      <cds-tree-node label="Business automation">
        <cds-tree-node label="Business process automation"></cds-tree-node>
        <cds-tree-node label="Business process mapping"></cds-tree-node>
      </cds-tree-node>
      <cds-tree-node label="Business operations"></cds-tree-node>
      <cds-tree-node label="Cloud computing" is-expanded>
        <cds-tree-node label="Containers"></cds-tree-node>
        <cds-tree-node label="Databases"></cds-tree-node>
        <cds-tree-node label="DevOps">
          <cds-tree-node label="Solutions"></cds-tree-node>
          <cds-tree-node label="Case studies">
            <cds-tree-node label="Resources"></cds-tree-node>
          </cds-tree-node>
        </cds-tree-node>
      </cds-tree-node>
      <cds-tree-node label="Data & Analytics" is-expanded>
        <cds-tree-node label="Big data"> </cds-tree-node>
        <cds-tree-node label="Business Intelligence"> </cds-tree-node>
      </cds-tree-node>
      <cds-tree-node label="Models" is-expanded disabled>
        <cds-tree-node label="Audit"> </cds-tree-node>
        <cds-tree-node label="Monthly data"> </cds-tree-node>
        <cds-tree-node label="Data warehouse" is-expanded>
          <cds-tree-node label="Report samples"> </cds-tree-node>
          <cds-tree-node label="Sales performance"> </cds-tree-node>
        </cds-tree-node>
      </cds-tree-node>
    </cds-tree-view>
  `,
};

export const withControlledExpansion = {
  decorators: [
    (story) => html` <div style="inline-size: 20rem">${story()}</div> `,
  ],
  render: () => html`
    <script>
      function expandAll() {
        document
          .querySelector('cds-tree-view[controlled]')
          .querySelectorAll('cds-tree-node')
          .forEach((node) => {
            node.isExpanded = true;
          });
      }

      function collapseAll() {
        document
          .querySelector('cds-tree-view[controlled]')
          .querySelectorAll('cds-tree-node')
          .forEach((node) => {
            node.isExpanded = false;
          });
      }
    </script>
    <div style="margin-block-end: 1rem">
      <cds-button onclick="expandAll()">Expand All</cds-button>
      <cds-button onclick="collapseAll()">Collapse All</cds-button>
    </div>
    <cds-tree-view controlled label="Tree View">
      <cds-tree-node label="Artificial intelligence"></cds-tree-node>
      <cds-tree-node label="Blockchain"></cds-tree-node>
      <cds-tree-node label="Business automation">
        <cds-tree-node label="Business process automation"></cds-tree-node>
        <cds-tree-node label="Business process mapping"></cds-tree-node>
      </cds-tree-node>
      <cds-tree-node label="Business operations"></cds-tree-node>
      <cds-tree-node label="Cloud computing" is-expanded>
        <cds-tree-node label="Containers"></cds-tree-node>
        <cds-tree-node label="Databases"></cds-tree-node>
        <cds-tree-node label="DevOps">
          <cds-tree-node label="Solutions"></cds-tree-node>
          <cds-tree-node label="Case studies">
            <cds-tree-node label="Resources"></cds-tree-node>
          </cds-tree-node>
        </cds-tree-node>
      </cds-tree-node>
      <cds-tree-node label="Data & Analytics" is-expanded>
        <cds-tree-node label="Big data"> </cds-tree-node>
        <cds-tree-node label="Business Intelligence"> </cds-tree-node>
      </cds-tree-node>
      <cds-tree-node label="Models" is-expanded disabled>
        <cds-tree-node label="Audit"> </cds-tree-node>
        <cds-tree-node label="Monthly data"> </cds-tree-node>
        <cds-tree-node label="Data warehouse" is-expanded>
          <cds-tree-node label="Report samples"> </cds-tree-node>
          <cds-tree-node label="Sales performance"> </cds-tree-node>
        </cds-tree-node>
      </cds-tree-node>
    </cds-tree-view>
  `,
};

export const withIcons = {
  decorators: [
    (story) => html` <div style="inline-size: 20rem">${story()}</div> `,
  ],
  render: () => html`
    <cds-tree-view label="Tree View">
      <cds-tree-node label="Artificial intelligence">
        ${iconLoader(Document16, { slot: 'icon' })}
      </cds-tree-node>
      <cds-tree-node label="Blockchain">
        ${iconLoader(Document16, { slot: 'icon' })}
      </cds-tree-node>
      <cds-tree-node label="Business automation">
        ${iconLoader(Folder16, { slot: 'icon' })}
        <cds-tree-node label="Business process automation">
          ${iconLoader(Document16, { slot: 'icon' })}
        </cds-tree-node>
        <cds-tree-node label="Business process mapping">
          ${iconLoader(Document16, { slot: 'icon' })}
        </cds-tree-node>
      </cds-tree-node>
      <cds-tree-node label="Business operations">
        ${iconLoader(Document16, { slot: 'icon' })}
      </cds-tree-node>
      <cds-tree-node label="Cloud computing" is-expanded>
        ${iconLoader(Folder16, { slot: 'icon' })}
        <cds-tree-node label="Containers">
          ${iconLoader(Document16, { slot: 'icon' })}
        </cds-tree-node>
        <cds-tree-node label="Databases">
          ${iconLoader(Document16, { slot: 'icon' })}
        </cds-tree-node>
        <cds-tree-node label="DevOps">
          ${iconLoader(Folder16, { slot: 'icon' })}
          <cds-tree-node label="Solutions">
            ${iconLoader(Document16, { slot: 'icon' })}
          </cds-tree-node>
          <cds-tree-node label="Case studies">
            ${iconLoader(Folder16, { slot: 'icon' })}
            <cds-tree-node label="Resources">
              ${iconLoader(Document16, { slot: 'icon' })}
            </cds-tree-node>
          </cds-tree-node>
        </cds-tree-node>
      </cds-tree-node>
      <cds-tree-node label="Data & Analytics" is-expanded>
        ${iconLoader(Folder16, { slot: 'icon' })}
        <cds-tree-node label="Big data">
          ${iconLoader(Document16, { slot: 'icon' })}
        </cds-tree-node>
        <cds-tree-node label="Business Intelligence">
          ${iconLoader(Document16, { slot: 'icon' })}
        </cds-tree-node>
      </cds-tree-node>
      <cds-tree-node label="Models" is-expanded disabled>
        ${iconLoader(Folder16, { slot: 'icon' })}
        <cds-tree-node label="Audit">
          ${iconLoader(Document16, { slot: 'icon' })}
        </cds-tree-node>
        <cds-tree-node label="Monthly data">
          ${iconLoader(Document16, { slot: 'icon' })}
        </cds-tree-node>
        <cds-tree-node label="Data warehouse" is-expanded>
          ${iconLoader(Folder16, { slot: 'icon' })}
          <cds-tree-node label="Report samples">
            ${iconLoader(Document16, { slot: 'icon' })}
          </cds-tree-node>
          <cds-tree-node label="Sales performance">
            ${iconLoader(Document16, { slot: 'icon' })}
          </cds-tree-node>
        </cds-tree-node>
      </cds-tree-node>
    </cds-tree-view>
  `,
};

export const withLinks = {
  render: () => html`
    <script>
      document
        .querySelector('cds-tree-view[links]')
        .addEventListener('cds-tree-node-selected', (e) => {
          document.querySelector('h3').innerText =
            'The current page is: ' + e.detail.value;
        });
    </script>
    <div id="page-body" style="display: flex">
      <cds-tree-view
        links
        hide-label
        label="Tree view"
        style="inline-size: 20rem">
        <cds-tree-node
          label="Artificial intelligence"
          href="/artificial-intelligence"
          selected
          active
          .onClick=${(event) => event.preventDefault()}></cds-tree-node>
        <cds-tree-node
          label="Blockchain"
          href="/blockchain"
          .onClick=${(event) => event.preventDefault()}></cds-tree-node>
        <cds-tree-node
          label="Business automation"
          href="/business-automation"
          .onClick=${(event) => event.preventDefault()}>
          <cds-tree-node
            label="Business process automation"
            href="/business-process-automation"
            .onClick=${(event) => event.preventDefault()}></cds-tree-node>
          <cds-tree-node
            label="Business process mapping"
            href="/business-process-mapping"
            .onClick=${(event) => event.preventDefault()}></cds-tree-node>
        </cds-tree-node>
        <cds-tree-node
          label="Business operations"
          href="/business-operations"
          .onClick=${(event) => event.preventDefault()}></cds-tree-node>
        <cds-tree-node
          label="Cloud computing"
          href="/cloud-computing"
          is-expanded
          .onClick=${(event) => event.preventDefault()}>
          <cds-tree-node
            label="Containers"
            href="/containers"
            .onClick=${(event) => event.preventDefault()}></cds-tree-node>
          <cds-tree-node
            label="Databases"
            href="/databases"
            .onClick=${(event) => event.preventDefault()}></cds-tree-node>
          <cds-tree-node
            label="DevOps"
            href="/devops"
            .onClick=${(event) => event.preventDefault()}>
            <cds-tree-node
              label="Solutions"
              href="/solutions"
              .onClick=${(event) => event.preventDefault()}></cds-tree-node>
            <cds-tree-node
              label="Case studies"
              href="/case-studies"
              .onClick=${(event) => event.preventDefault()}>
              <cds-tree-node
                label="Resources"
                href="/resources"
                .onClick=${(event) => event.preventDefault()}></cds-tree-node>
            </cds-tree-node>
          </cds-tree-node>
        </cds-tree-node>
        <cds-tree-node
          label="Data & Analytics"
          href="/data-analytics"
          is-expanded
          .onClick=${(event) => event.preventDefault()}>
          <cds-tree-node
            label="Big data"
            href="/big-data"
            .onClick=${(event) => event.preventDefault()}>
          </cds-tree-node>
          <cds-tree-node
            label="Business Intelligence"
            href="/business-intelligence"
            .onClick=${(event) => event.preventDefault()}>
          </cds-tree-node>
        </cds-tree-node>
        <cds-tree-node
          label="Models"
          is-expanded
          disabled
          href="/models"
          .onClick=${(event) => event.preventDefault()}>
          <cds-tree-node
            label="Audit"
            href="/audit"
            .onClick=${(event) => event.preventDefault()}>
          </cds-tree-node>
          <cds-tree-node
            label="Monthly data"
            href="/monthly-data"
            .onClick=${(event) => event.preventDefault()}>
          </cds-tree-node>
          <cds-tree-node
            label="Data warehouse"
            is-expanded
            href="/data-warehouse"
            .onClick=${(event) => event.preventDefault()}>
            <cds-tree-node
              label="Report samples"
              href="/report-samples"
              .onClick=${(event) => event.preventDefault()}>
            </cds-tree-node>
            <cds-tree-node
              label="Sales performance"
              href="/sales-performance"
              .onClick=${(event) => event.preventDefault()}>
            </cds-tree-node>
          </cds-tree-node>
        </cds-tree-node>
      </cds-tree-view>
      <main style="flex: 1">
        <h3>The current page is: Artifical Intelligence</h3>
      </main>
    </div>
  `,
};

const meta = {
  title: 'Components/TreeView',
};

export default meta;
