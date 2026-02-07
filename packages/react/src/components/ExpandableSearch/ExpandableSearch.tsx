/**
 * Copyright IBM Corp. 2021, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useRef, useEffect, forwardRef } from 'react';
import classnames from 'classnames';
import Search, { type SearchProps } from '../Search';
import { usePrefix } from '../../internal/usePrefix';
import { composeEventHandlers } from '../../tools/events';
import { match, keys } from '../../internal/keyboard';
import { mergeRefs } from '../../tools/mergeRefs';

const frFn = forwardRef<HTMLInputElement, SearchProps>;

const ExpandableSearch = frFn((props, forwardedRef) => {
  const {
    onBlur,
    onChange,
    onExpand,
    onKeyDown,
    defaultValue,
    isExpanded,
    ...rest
  } = props;

  const [expanded, setExpanded] = useState(isExpanded || false);
  const [hasContent, setHasContent] = useState(defaultValue ? true : false);
  const searchRef = useRef<HTMLInputElement>(null);
  const prefix = usePrefix();

  function handleBlur(evt) {
    const relatedTargetIsAllowed =
      evt.relatedTarget &&
      evt.relatedTarget.classList.contains(`${prefix}--search-close`);

    if (expanded && !relatedTargetIsAllowed && !hasContent && !isExpanded) {
      setExpanded(false);
    }
  }

  useEffect(() => {
    setExpanded(!!isExpanded);
  }, [isExpanded]);

  function handleChange(evt) {
    setHasContent(evt.target.value !== '');
  }

  function handleExpand() {
    setExpanded(true);
    searchRef.current?.focus?.();
  }

  function handleKeyDown(evt) {
    if (expanded && match(evt, keys.Escape)) {
      evt.stopPropagation();

      // escape key only clears if the input is empty, otherwise it clears the input
      if (!evt.target?.value && !isExpanded) {
        setExpanded(false);
      }
    }
  }

  const classes = classnames(
    `${prefix}--search--expandable`,
    {
      [`${prefix}--search--expanded`]: expanded,
    },
    rest.className
  );

  return (
    <Search
      {...rest}
      defaultValue={defaultValue}
      isExpanded={expanded}
      ref={mergeRefs(searchRef, forwardedRef)}
      className={classes}
      onBlur={composeEventHandlers([onBlur, handleBlur])}
      onChange={composeEventHandlers([onChange, handleChange])}
      onExpand={composeEventHandlers([onExpand, handleExpand])}
      onKeyDown={composeEventHandlers([onKeyDown, handleKeyDown])}
    />
  );
});

ExpandableSearch.propTypes = Search.propTypes;
ExpandableSearch.displayName = 'ExpandableSearch';

export default ExpandableSearch;
