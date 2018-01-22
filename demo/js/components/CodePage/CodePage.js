import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'markdown-it';

import ComponentExample from '../ComponentExample/ComponentExample';

/**
 * @param {ComponentCollection|Component} metadata The component data.
 * @returns {string} The HTML snippet for the component.
 */
const getContent = metadata => {
  const { variants = {} } = metadata;
  const { items = [] } = variants;
  const variant = items[0];
  return metadata.content || (variant && variant.content) || '';
};

/**
 * @param {ComponentCollection|Component} metadata The component data.
 * @returns {Component[]|Variant[]} The data of the component variants.
 */
const getSubItems = metadata => {
  if (metadata.isCollection) {
    return metadata.items;
  }
  if (!metadata.isCollated) {
    return metadata.variants.items;
  }
  return [];
};

/**
 * The page to show the component demo, its code as well as its README.
 */
const CodePage = ({ metadata, hideViewFullRender }) => {
  const md = new Markdown({ html: true });
  const subItems = getSubItems(metadata).filter(item => !item.isHidden);
  const componentContent =
    !metadata.isCollection && subItems.length <= 1 ? (
      <ComponentExample hideViewFullRender={hideViewFullRender} component={metadata.name} htmlFile={getContent(metadata)} />
    ) : (
      subItems.map(item => (
        <div key={item.id} className="component-variation">
          <h2 className="component-variation__name">{item.label}</h2>
          <ComponentExample
            variant={item.handle.replace(/--default$/, '')}
            component={metadata.name}
            htmlFile={getContent(item)}
          />
        </div>
      ))
    );

  /* eslint-disable react/no-danger */
  return (
    <div className="page code-page test">
      {componentContent}
      {metadata.notes && <div className="page_md" dangerouslySetInnerHTML={{ __html: md.render(metadata.notes) }} />}
    </div>
  );
  /* eslint-enable react/no-danger */
};

CodePage.propTypes = {
  /**
   * The component data.
   */
  metadata: PropTypes.shape().isRequired,

  /**
   * `true` to hide "full render" link.
   */
  hideViewFullRender: PropTypes.bool,
};

export default CodePage;
