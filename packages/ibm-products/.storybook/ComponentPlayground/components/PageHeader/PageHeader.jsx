/**
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { PageHeader as CCPageHeader } from '../../../../src';
import { Lightning, Bee } from '@carbon/react/icons';

const PageHeader = (props) => {
  const content = (
    <div style={{ display: 'flex' }}>
      <p
        style={{
          // stylelint-disable-next-line carbon/layout-use
          marginRight: '50px',
          maxWidth: '400px',
        }}
      >
        The component playground allows a developer or designer to see how the
        components function in a &lsquo;real-world&rsquo; setting. Click around
        and see how the animations behave.
      </p>
      <p>
        Property: Value
        <br />
        Property: Value
        <br />
        Property: Value
      </p>
    </div>
  );

  const actionBarItems = [1, 2, 3, 4].map((item, index) => ({
    key: `${index}_action_bar_item`,
    renderIcon:
      index % 2
        ? (props) => <Lightning size={16} {...props} />
        : (props) => <Bee size={16} {...props} />,
    iconDescription: `Action ${item}`,
    label: `Action ${item}`,
    onClick: () => {},
  }));

  return (
    <CCPageHeader
      actionBarOverflowAriaLabel="label"
      breadcrumbs={[
        {
          href: '#',
          key: 'breadcrumb_1',
          label: 'Breadcrumb 1',
        },
        {
          href: '#',
          key: 'breadcrumb_2',
          label: 'Breadcrumb 2',
        },
        {
          href: '#',
          key: 'breadcrumb_3',
          label: 'Breadcrumb 3',
        },
        {
          href: '#',
          key: 'breadcrumb_4',
          label: 'Breadcrumb 4',
        },
      ]}
      breadcrumbOverflowAriaLabel="View breadcrumbs"
      actionBarItems={actionBarItems}
      title="Task manager"
      pageActionsOverflowLabel="Actions..."
      pageActions={[
        {
          key: 'secondary',
          kind: 'secondary',
          label: 'Secondary button',
          onClick: () => {},
        },
        {
          key: 'primary',
          kind: 'primary',
          label: 'Create new task',
          onClick: () => {
            props.setIsOpen(true);
          },
        },
      ]}
      subtitle="Help manage your team's tasks"
      tags={[
        { type: 'blue', label: 'Tag 1' },
        { type: 'green', label: 'Tag 2' },
        { type: 'warm-gray', label: 'Tag 3' },
        { type: 'purple', label: 'Tag 4' },
      ]}
    >
      {content}
    </CCPageHeader>
  );
};
PageHeader.propTypes = {
  setIsOpen: PropTypes.func,
};

export default PageHeader;
