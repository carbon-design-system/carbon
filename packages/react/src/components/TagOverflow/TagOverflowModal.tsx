/**
 * Copyright IBM Corp. 2024, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import cx from 'classnames';

import { ComposedModal, ModalHeader, ModalBody } from '../ComposedModal';
import { Search } from '../Search';
import { Tag, DismissibleTag } from '../Tag';
import { usePrefix } from '../../internal/usePrefix';

const componentName = 'TagOverflowModal';

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
type AllTags = (TagType & Omit<React.ComponentProps<typeof Tag>, 'filter'>)[];

interface TagOverflowModalProps {
  allTags?: AllTags;
  className?: string;
  /**
   * Disable the portal and render the modal inline. Useful for tests and
   * contexts where you need to inherit React context from parent components.
   *
   * @default false
   */
  disablePortal?: boolean;
  modalAriaLabel?: string;
  onClose?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onTagClose?: (params: { label: string; id: any }) => void;
  open?: boolean;
  overflowType?: 'default' | 'tag';
  /**
   * DOM element to portal the modal into. Defaults to `document.body`.
   */
  portalTarget?: HTMLElement | null;
  searchLabel?: string;
  searchPlaceholder?: string;
  title?: string;
}

export const TagOverflowModal = ({
  allTags,
  className,
  disablePortal = false,
  modalAriaLabel = defaults.modalAriaLabel,
  onClose,
  onTagClose,
  open,
  overflowType,
  portalTarget: portalTargetIn,
  searchLabel = defaults.searchLabel,
  searchPlaceholder,
  title,
  ...rest
}: TagOverflowModalProps) => {
  const prefix = usePrefix();
  const blockClass = `${prefix}--tag-overflow-modal`;
  const [search, setSearch] = useState('');
  const mountNode = disablePortal ? null : (portalTargetIn ?? document.body);

  const getFilteredItems = (): AllTags => {
    if (open && search && allTags) {
      return allTags.filter((tag) =>
        tag.label?.toLocaleLowerCase()?.includes(search.toLocaleLowerCase())
      );
    }
    return allTags || [];
  };

  const handleSearch = (evt) => {
    setSearch(evt.target.value || '');
  };

  const modal = (
    <ComposedModal
      {...rest}
      containerClassName={`${blockClass}__container`}
      className={cx(className, blockClass)}
      size="sm"
      aria-label="Search all"
      {...{ open, onClose }}>
      <ModalHeader
        className={`${blockClass}__header`}
        closeModal={onClose}
        title={title}>
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
        aria-label={modalAriaLabel}>
        {getFilteredItems().map(({ label, id, filter, onClose }) => {
          const isFilterable =
            overflowType === 'tag' && (typeof onClose === 'function' || filter);

          return isFilterable ? (
            <DismissibleTag
              key={id}
              text={label}
              onClose={() => onTagClose?.({ label, id })}
            />
          ) : (
            <Tag key={id}>{label}</Tag>
          );
        })}
        <div className={`${blockClass}__fade`} />
      </ModalBody>
    </ComposedModal>
  );

  return mountNode ? createPortal(modal, mountNode) : modal;
};

TagOverflowModal.displayName = componentName;
