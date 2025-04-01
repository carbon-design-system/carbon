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
import Document16 from '@carbon/icons/lib/document/16.js';
import Folder16 from '@carbon/icons/lib/folder/16.js';
import styles from './tree-view-story.scss?lit';

const sizes = {
  [`Small size (${TREE_SIZE.SMALL})`]: TREE_SIZE.SMALL,
  [`XS size (${TREE_SIZE.EXTRA_SMALL})`]: TREE_SIZE.EXTRA_SMALL,
};

console.log(sizes);

const defaultArgs = {
  label: 'Tree View',
};

const controls = {
  size: {
    control: 'select',
    description: 'Tree size',
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
  render: ({ hideLabel, label, size }) => html`
    <style>
      ${styles}
    </style>
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

export const withIcons = {
  argTypes: controls,
  args: defaultArgs,
  render: ({ hideLabel, label, size }) => html`
    <style>
      ${styles}
    </style>
    <cds-tree-view ?hide-label=${hideLabel} label=${label} size="${size}">
      <cds-tree-node label="Artificial intelligence">
        ${Document16({ slot: 'icon' })}
      </cds-tree-node>
      <cds-tree-node label="Blockchain">
        ${Document16({ slot: 'icon' })}
      </cds-tree-node>
      <cds-tree-node label="Business automation">
        ${Folder16({ slot: 'icon' })}
        <cds-tree-node label="Business process automation">
          ${Document16({ slot: 'icon' })}
        </cds-tree-node>
        <cds-tree-node label="Business process mapping">
          ${Document16({ slot: 'icon' })}
        </cds-tree-node>
      </cds-tree-node>
      <cds-tree-node label="Business operations">
        ${Document16({ slot: 'icon' })}
      </cds-tree-node>
      <cds-tree-node label="Cloud computing" is-expanded>
        ${Folder16({ slot: 'icon' })}
        <cds-tree-node label="Containers">
          ${Document16({ slot: 'icon' })}
        </cds-tree-node>
        <cds-tree-node label="Databases">
          ${Document16({ slot: 'icon' })}
        </cds-tree-node>
        <cds-tree-node label="DevOps">
          ${Folder16({ slot: 'icon' })}
          <cds-tree-node label="Solutions">
            ${Document16({ slot: 'icon' })}
          </cds-tree-node>
          <cds-tree-node label="Case studies">
            ${Folder16({ slot: 'icon' })}
            <cds-tree-node label="Resources">
              ${Document16({ slot: 'icon' })}
            </cds-tree-node>
          </cds-tree-node>
        </cds-tree-node>
      </cds-tree-node>
      <cds-tree-node label="Data & Analytics" is-expanded>
        ${Folder16({ slot: 'icon' })}
        <cds-tree-node label="Big data">
          ${Document16({ slot: 'icon' })}
        </cds-tree-node>
        <cds-tree-node label="Business Intelligence">
          ${Document16({ slot: 'icon' })}
        </cds-tree-node>
      </cds-tree-node>
      <cds-tree-node label="Models" is-expanded disabled>
        ${Folder16({ slot: 'icon' })}
        <cds-tree-node label="Audit">
          ${Document16({ slot: 'icon' })}
        </cds-tree-node>
        <cds-tree-node label="Monthly data">
          ${Document16({ slot: 'icon' })}
        </cds-tree-node>
        <cds-tree-node label="Data warehouse" is-expanded>
          ${Folder16({ slot: 'icon' })}
          <cds-tree-node label="Report samples">
            ${Document16({ slot: 'icon' })}
          </cds-tree-node>
          <cds-tree-node label="Sales performance">
            ${Document16({ slot: 'icon' })}
          </cds-tree-node>
        </cds-tree-node>
      </cds-tree-node>
    </cds-tree-view>
  `,
};

export const withLinks = {
  argTypes: controls,
  args: defaultArgs,
  render: ({ hideLabel, label, size }) => html`
    <style>
      ${styles}
    </style>
    <div id="page-body">
      <cds-tree-view ?hide-label=${hideLabel} label=${label} size="${size}">
        <cds-tree-node
          label="Artificial intelligence"
          href="/artificial-intelligence"></cds-tree-node>
        <cds-tree-node label="Blockchain" href="/blockchain"></cds-tree-node>
        <cds-tree-node label="Business automation" href="/business-automation">
          <cds-tree-node
            label="Business process automation"
            href="/business-process-automation"></cds-tree-node>
          <cds-tree-node
            label="Business process mapping"
            href="/business-process-mapping"></cds-tree-node>
        </cds-tree-node>
        <cds-tree-node
          label="Business operations"
          href="/business-operations"></cds-tree-node>
        <cds-tree-node
          label="Cloud computing"
          href="/cloud-computing"
          is-expanded>
          <cds-tree-node label="Containers" href="/containers"></cds-tree-node>
          <cds-tree-node label="Databases" href="/databases"></cds-tree-node>
          <cds-tree-node label="DevOps" href="/devops">
            <cds-tree-node label="Solutions" href="/solutions"></cds-tree-node>
            <cds-tree-node label="Case studies" href="/case-studies">
              <cds-tree-node
                label="Resources"
                href="/resources"></cds-tree-node>
            </cds-tree-node>
          </cds-tree-node>
        </cds-tree-node>
        <cds-tree-node
          label="Data & Analytics"
          href="/data-analytics"
          is-expanded>
          <cds-tree-node label="Big data" href="/big-data"> </cds-tree-node>
          <cds-tree-node
            label="Business Intelligence"
            href="/business-intelligence">
          </cds-tree-node>
        </cds-tree-node>
        <cds-tree-node label="Models" is-expanded disabled href="/models">
          <cds-tree-node label="Audit" href="/audit"> </cds-tree-node>
          <cds-tree-node label="Monthly data" href="/monthly-data">
          </cds-tree-node>
          <cds-tree-node
            label="Data warehouse"
            is-expanded
            href="/data-warehouse">
            <cds-tree-node label="Report samples" href="/report-samples">
            </cds-tree-node>
            <cds-tree-node label="Sales performance" href="/sales-performance">
            </cds-tree-node>
          </cds-tree-node>
        </cds-tree-node>
      </cds-tree-view>
      <main></main>
    </div>
  `,
};

const meta = {
  title: 'Components/TreeView',
};

export default meta;
