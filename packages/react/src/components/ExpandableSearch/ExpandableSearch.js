/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useRef } from 'react';
import classnames from 'classnames';
import Search from '../Search';
import { usePrefix } from '../../internal/usePrefix';

function ExpandableSearch(props) {
  const [expanded, setExpanded] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const searchRef = useRef(null);
  const prefix = usePrefix();

  function handleFocus() {
    if (!expanded) {
      setExpanded(true);
    }
  }

  function handleBlur(evt) {
    const relatedTargetIsAllowed =
      evt.relatedTarget &&
      evt.relatedTarget.classList.contains(`${prefix}--search-close`);

    if (expanded && !relatedTargetIsAllowed && !hasContent) {
      setExpanded(false);
    }
  }

  const classes = classnames(
    `${prefix}--search--expandable`,
    {
      [`${prefix}--search--expanded`]: expanded,
    },
    props.className
  );

  return (
    <Search
      {...props}
      ref={searchRef}
      className={classes}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={(event) => {
        setHasContent(event.target.value !== '');
      }}
      onExpand={() => {
        searchRef.current.focus?.();
      }}
    />
  );
}

ExpandableSearch.propTypes = Search.propTypes;

export default ExpandableSearch;
