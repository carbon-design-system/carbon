import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'markdown-it';

import ComponentExample from '../ComponentExample/ComponentExample';

/**
 * The page to show the component demo, its code as well as its README.
 */
const CodePage = ({
  metadata,
  hideViewFullRender,
  useStaticFullRenderPage,
}) => {
  const md = new Markdown({ html: true });
  const subItems = metadata.items || [];
  const useSingleVariant = !metadata.isCollection && subItems.length <= 1;
  /* eslint-disable react/no-danger */
  const componentContent = subItems
    .filter((item) => !item.isHidden)
    .map((item) => (
      <div key={item.id} className="component-variation">
        {!useSingleVariant && (
          <h2 className="component-variation__name">{item.label}</h2>
        )}
        {!useSingleVariant && item.notes && <p>{item.notes}</p>}
        <ComponentExample
          variant={item.handle.replace(/--default$/, '')}
          component={metadata.name}
          htmlFile={item.renderedContent}
          hideViewFullRender={hideViewFullRender}
          linkOnly={metadata.meta.linkOnly || item.meta.linkOnly}
          useIframe={metadata.meta.useIframe || item.meta.useIframe}
          useStaticFullRenderPage={useStaticFullRenderPage}
        />
      </div>
    ));

  return (
    <div className="page code-page test">
      {componentContent}
      {metadata.notes && (
        <div
          className="page_md"
          dangerouslySetInnerHTML={{ __html: md.render(metadata.notes) }}
        />
      )}
    </div>
  );
  /* eslint-enable react/no-danger */
};

CodePage.propTypes = {
  /**
   * `true` to hide "full render" link.
   */
  hideViewFullRender: PropTypes.bool,

  /**
   * The component data.
   */
  metadata: PropTypes.shape().isRequired,

  /**
   * `true` to use static full render page.
   */
  useStaticFullRenderPage: PropTypes.bool,
};

export default CodePage;
