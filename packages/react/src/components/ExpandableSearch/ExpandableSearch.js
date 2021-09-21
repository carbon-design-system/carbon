/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useRef, useEffect } from 'react';
import classnames from 'classnames';
import { settings } from 'carbon-components';

import Search from '../Search';

const { prefix } = settings;

function ExpandableSearch(props) {
  const [expanded, setExpanded] = useState(false);
  const searchRef = useRef(null);

  function handleFocus() {
    if (!expanded) {
      setExpanded(true);
    }
  }

  function handleBlur(evt) {
    const relatedTargetIsAllowed =
      evt.relatedTarget &&
      evt.relatedTarget.classList.contains(`${prefix}--search-close`);

    if (
      expanded &&
      !relatedTargetIsAllowed &&
      !searchRef.current.state.hasContent
    ) {
      setExpanded(false);
    }
  }

  useEffect(() => {
    function focusInput() {
      if (!expanded && searchRef.current?.input) {
        searchRef.current.input.focus();
      }
    }

    if (searchRef.current?.magnifier) {
      const { magnifier } = searchRef.current;
      magnifier.addEventListener('click', focusInput);

      return () => {
        magnifier.removeEventListener('click', focusInput);
      };
    }
  }, [expanded, searchRef]);

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
    />
  );
}

ExpandableSearch.propTypes = Search.propTypes;

export default ExpandableSearch;
