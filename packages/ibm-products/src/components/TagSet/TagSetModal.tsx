//
// Copyright IBM Corp. 2021, 2020
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import React, { ReactNode, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  ComposedModal,
  ModalHeader,
  ModalBody,
  Search,
  Tag,
} from '@carbon/react';

import { pkg } from '../../settings';
import { prepareProps } from '../../global/js/utils/props-helper';
import { usePortalTarget } from '../../global/js/hooks/usePortalTarget';

const componentName = 'TagSetModal';
const blockClass = `${pkg.prefix}--tag-set-modal`;

// Default values for props
const defaults = {
  // required for accessibility if using hasScrollingContent
  modalAriaLabel: 'List of all tags',
  // marked as required by TagSet if needed, default used to satisfy <Search /> component
  searchLabel: '',
};

interface TagType {
  label: string;
}
type AllTags = TagType[] & Omit<React.ComponentProps<typeof Tag>, 'filter'>[];

interface TagSetModalProps {
  allTags?: AllTags;
  className?: string;
  modalAriaLabel?: string;
  onClose?: () => void;
  open?: boolean;
  portalTarget?: ReactNode;
  searchLabel?: string;
  searchPlaceholder?: string;
  title?: string;
}
export const TagSetModal = ({
  // The component props, in alphabetical order (for consistency).

  allTags,
  className,
  title,
  modalAriaLabel = defaults.modalAriaLabel,
  onClose,
  open,
  portalTarget: portalTargetIn,
  searchLabel = defaults.searchLabel,
  searchPlaceholder,

  // Collect any other property values passed in.
  ...rest
}: TagSetModalProps) => {
  const [filteredModalTags, setFilteredModalTags] = useState<AllTags>([]);
  const [search, setSearch] = useState('');
  const renderPortalUse = usePortalTarget(portalTargetIn);
  useEffect(() => {
    let newFilteredModalTags: AllTags = [];
    if (open) {
      if (search === '' && allTags) {
        newFilteredModalTags = allTags?.slice(0);
      } else {
        const lCaseSearch = search.toLocaleLowerCase();

        allTags?.forEach((tag) => {
          const dataSearch = tag['data-search']
            ?.toLocaleLowerCase()
            ?.indexOf(lCaseSearch);
          const labelSearch = tag.label
            ?.toLocaleLowerCase()
            ?.indexOf(lCaseSearch);

          if (dataSearch > -1 || labelSearch > -1) {
            newFilteredModalTags.push(tag);
          }
        });
      }
    }
    setFilteredModalTags(newFilteredModalTags);
  }, [allTags, open, search]);

  const handleSearch = (ev) => {
    setSearch(ev.target.value || '');
  };

  return renderPortalUse(
    <ComposedModal
      {
        // Pass through any other property values as HTML attributes.
        ...rest
      }
      containerClassName={`${blockClass}__container`}
      className={cx(className, `${blockClass}`)}
      size="sm"
      {...{ open, onClose }}
    >
      <ModalHeader
        className={`${blockClass}__header`}
        closeModal={onClose}
        title={title}
      >
        <Search
          data-modal-primary-focus
          className={`${blockClass}__search`}
          labelText={searchLabel}
          placeholder={searchPlaceholder}
          onChange={handleSearch}
          size="lg"
        />
      </ModalHeader>
      <ModalBody
        className={`${blockClass}__body`}
        hasForm
        hasScrollingContent
        aria-label={modalAriaLabel}
      >
        {filteredModalTags.map(({ label, ...other }, index) => (
          <Tag {...other} key={`all-tags-${index}`}>
            {label}
          </Tag>
        ))}
        <div className={`${blockClass}__fade`} />
      </ModalBody>
    </ComposedModal>
  );
};

TagSetModal.propTypes = {
  allTags: PropTypes.arrayOf(
    PropTypes.shape({
      ...prepareProps(Tag.propTypes, 'filter'),
      label: PropTypes.string.isRequired,
    })
  ),
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  portalTarget: PropTypes.node,
  searchLabel: PropTypes.string,
  searchPlaceholder: PropTypes.string,
  title: PropTypes.string,
};

TagSetModal.displayName = componentName;
