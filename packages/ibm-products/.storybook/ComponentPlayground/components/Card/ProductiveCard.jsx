/**
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { ProductiveCard as CCProductiveCard } from '../../../../src';
import { TrashCan, Edit } from '@carbon/react/icons';
import { StatusIcon } from '../../../../src';
import { Column, Grid } from '@carbon/react';

const ProductiveCard = (props) => {
  const kinds = [
    { type: 'fatal', label: 'Fatal' },
    { type: 'critical', label: 'Critical' },
    { type: 'major-warning', label: 'Major warning' },
    { type: 'minor-warning', label: 'Minor warning' },
    { type: 'undefined', label: 'Undefined' },
    { type: 'unknown', label: 'Unknown' },
    { type: 'normal', label: 'Normal' },
    { type: 'info', label: 'Info' },
    { type: 'in-progress', label: 'In progress' },
    { type: 'running', label: 'Running' },
    { type: 'pending', label: 'Pending' },
  ];

  const [statusIconKind /*setStatusIconKind*/] = useState(
    kinds[Math.floor(Math.random() * (kinds.length - 1))]
  );

  const actionIcons = [
    {
      id: '1',
      icon: () => (
        <StatusIcon
          iconDescription={statusIconKind.label}
          kind={statusIconKind.type}
          size="sm"
          theme="dark"
        />
      ),
      iconDescription: statusIconKind.label,
    },
    {
      id: '2',
      icon: (props) => <TrashCan size={16} {...props} />,
      iconDescription: 'Delete',
    },
    {
      id: '3',
      icon: (props) => <Edit size={16} {...props} />,
      onClick: () => {
        props.actions.setSidePanelOpen(true);
        props.actions.setCardToEdit(props.index);
      },
      iconDescription: 'Edit',
    },
  ];

  return (
    <CCProductiveCard
      label={props.data.topic.author ? props.data.topic.author : 'No Author'}
      actionIcons={actionIcons}
      actionsPlacement="bottom"
      description={props.data.topic.description}
      //onPrimaryButtonClick={props.data[props.index] ? actions[props.data[props.index].onPrimaryButtonClick] : () => console.log('clicking')}
      //primaryButtonText={ props.data[props.index].primaryButtonText ? props.data[props.index].primaryButtonText : "Button action" }
      title={props.data.topic.name}
    >
      <Grid>
        <Column lg={2}>Partitions</Column>
        <Column lg={2}>{props.data.partitions}</Column>
      </Grid>
      <Grid>
        <Column lg={2}>Replicas</Column>
        <Column lg={2}>{props.data.replicas}</Column>
      </Grid>
      <Grid>
        <Column lg={2}>Message Retention</Column>
        <Column lg={2}>{props.data.retention}</Column>
      </Grid>
    </CCProductiveCard>
  );
};
ProductiveCard.propTypes = {
  actions: PropTypes.object,
  data: PropTypes.object,
  index: PropTypes.number,
};

export default ProductiveCard;
