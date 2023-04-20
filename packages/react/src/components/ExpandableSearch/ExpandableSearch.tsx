/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useRef } from 'react';
import classnames from 'classnames';
import Search, { type SearchProps } from '../Search';
import { usePrefix } from '../../internal/usePrefix';
import { composeEventHandlers } from '../../tools/events';

function ExpandableSearch({
  onBlur,
  onChange,
  onExpand,
  onFocus,
  ...props
}: SearchProps) {
  const [expanded, setExpanded] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
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

  function handleChange(evt) {
    setHasContent(evt.target.value !== '');
  }

  function handleExpand() {
    searchRef.current?.focus?.();
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
      onFocus={composeEventHandlers([onFocus, handleFocus])}
      onBlur={composeEventHandlers([onBlur, handleBlur])}
      onChange={composeEventHandlers([onChange, handleChange])}
      onExpand={composeEventHandlers([onExpand, handleExpand])}
    />
  );
}

ExpandableSearch.propTypes = Search.propTypes;

export default ExpandableSearch;
