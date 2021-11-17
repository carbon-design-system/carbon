/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './DefinitionTooltip.scss';
import { Popover, PopoverContent } from '../../Popover';
import { match, keys } from '../../../internal/keyboard';

const DefinitionTooltip = ({ children, definition }) => {
  const [isOpen, setOpen] = useState(false);

  function handleKeyDown(event) {
    if (match(event, keys.Escape) && isOpen) {
      setOpen(false);
    }
  }

  return (
    <Popover as="span" open={isOpen}>
      <button
        className="term-class"
        aria-controls="definition-id"
        aria-expanded={isOpen}
        onMouseOut={() => setOpen(!isOpen)}
        onMouseOver={() => setOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        onClick={() => {
          setOpen(!isOpen);
        }}>
        {children}
      </button>
      <PopoverContent id="definition-id">{definition}</PopoverContent>
    </Popover>
  );
};

DefinitionTooltip.propTypes = {
  /**
   * Provide the content being defined
   */
  children: PropTypes.node,

  /**
   * Provide the content being defined
   */
  definition: PropTypes.string.isRequired,
};

export { DefinitionTooltip };

