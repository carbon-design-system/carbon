/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Column, FormGroup, Grid, Heading, Section } from '@carbon/react';

const blockClass = 'create-full-page-pattern';
const stepBlockClass = `${blockClass}__step`;

export const CreateFullPageStep = ({
  title,
  subtitle,
  description,
  children,
  hasFieldset,
  fieldsetLegendText,
  // Note: disableSubmit, onNext, onPrevious, secondaryLabel are passed to CreateFullPage parent
  // and handled there, not used directly in this component
}) => {
  const span = { span: 50 }; // Half width

  const renderDescription = () => {
    if (description) {
      const common = {
        children: description,
        className: `${blockClass}__step-description`,
        ...span,
      };

      if (typeof description === 'string') {
        return <Column {...common} as="p" />;
      } else if (React.isValidElement(description)) {
        return <Column {...common} as="div" />;
      }
    }
    return null;
  };

  return (
    <Section className={stepBlockClass}>
      <Grid>
        <Column {...span}>
          <Grid>
            <Column
              className={`${blockClass}__step-title`}
              as={Heading}
              {...span}
            >
              {title}
            </Column>

            {subtitle && (
              <Column
                className={`${blockClass}__step-subtitle`}
                as="p"
                {...span}
              >
                {subtitle}
              </Column>
            )}

            {renderDescription()}
          </Grid>
        </Column>
      </Grid>

      {hasFieldset ? (
        <FormGroup
          legendText={fieldsetLegendText}
          className={`${blockClass}__step-fieldset`}
        >
          {children}
        </FormGroup>
      ) : (
        children
      )}
    </Section>
  );
};

CreateFullPageStep.propTypes = {
  children: PropTypes.node.isRequired,
  description: PropTypes.node,
  fieldsetLegendText: PropTypes.string,
  hasFieldset: PropTypes.bool,
  subtitle: PropTypes.string,
  title: PropTypes.node.isRequired,
};
