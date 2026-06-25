/**
 * Copyright IBM Corp. 2023, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { stackblitzPrefillConfig } from '../../../../previewer/codePreviewer';

import {
  Title,
  Description,
  Source,
  Controls,
  Canvas,
  Stories,
  AnchorMdx,
  useOf,
  Markdown,
} from '@storybook/addon-docs/blocks';
import * as changeCase from 'change-case';

import {
  codeSandboxHref,
  stackblitzHref,
  storyDocsPageInfo,
} from './story-helper';

import { pkg } from '../../../settings';

export const CustomBlocks = ({ blocks }) => {
  return blocks.map((block, index) => {
    const source = { ...block?.source };
    if (source.code && !source.language) {
      source.language = 'jsx';
    }
    return (
      <div key={`block-index--${index}`}>
        {block.title && (
          <h3 id={changeCase.kebabCase(block.title)}>{block.title}</h3>
        )}
        {block.subTitle && <h4>{block.subTitle}</h4>}
        {block.image}
        {block.description && typeof block.description === 'string' ? (
          <Markdown>{block.description}</Markdown>
        ) : (
          block.description
        )}
        {block.story && <Canvas of={block.story} />}
        {block.source && <Source {...source} />}
      </div>
    );
  });
};

/**
 * This function checks blocks against stories and then
 * - Adds title if no alternative is supplied
 * - Adds blocks for unreferenced stories if omitUnreferencedStories is false
 */
const processBlocks = (blocks, stories, omitUnreferencedStories) => {
  const blocksWithStoryTitles = blocks ? [...blocks] : [];
  const restOfStories = [];

  const storyKeys = Object.keys(stories);
  storyKeys.forEach((sk) => {
    const story = stories[sk].moduleExport;
    const storyName = stories[sk].name;

    const matchingBlock = blocksWithStoryTitles.find(
      (block) => block.story === story
    );

    if (matchingBlock) {
      matchingBlock.title = matchingBlock.title ?? storyName;
    } else if (!omitUnreferencedStories) {
      restOfStories.push({ story, title: storyName });
    }
  });

  if (!omitUnreferencedStories) {
    return blocksWithStoryTitles.concat(restOfStories);
  }

  return blocksWithStoryTitles;
};

/**
 * Calling with no parameters will produce the default output.
 * Customize by providing alternative values and/or blocks defining sections
 * @param {*} param0
 * @returns
 */
export const StoryDocsPage = ({
  altTitle,
  altDescription,
  altGuidelinesHref,
  blocks,
  omitCodedExample,
  omitUnreferencedStories,
  deprecationNotice,
}) => {
  const { csfFile } = useOf('meta', ['meta']);

  const storyInfo = storyDocsPageInfo(csfFile);
  const guidelinesHref = altGuidelinesHref ?? storyInfo.guidelinesHref;

  const isFullScreen =
    csfFile?.meta?.parameters?.layout === 'fullscreen' || false;

  const storyHelperClass = isFullScreen
    ? `${pkg.prefix}--story-docs-page--fullscreen`
    : '';
  const processedBlocks = processBlocks(
    blocks,
    csfFile.stories,
    omitUnreferencedStories
  );

  const storyCount =
    processedBlocks?.filter((block) => !!block.story).length ?? 0;

  return (
    <div data-story-title={storyInfo.title}>
      <Title>{altTitle ?? storyInfo.title}</Title>
      {guidelinesHref ? (
        guidelinesHref && Array.isArray(guidelinesHref) ? (
          guidelinesHref.map(({ href, label }, index) => (
            <React.Fragment key={href}>
              {index > 0 && ' | '}
              <AnchorMdx href={href}>{label}</AnchorMdx>
            </React.Fragment>
          ))
        ) : (
          <AnchorMdx href={guidelinesHref}>
            {altTitle ? `Usage guidelines` : storyInfo.guidelinesLinkLabel}
          </AnchorMdx>
        )
      ) : null}

      {deprecationNotice && (
        <>
          <h2 style={{ marginTop: '16px' }}>Deprecation notice</h2>
          <Markdown>{deprecationNotice}</Markdown>
        </>
      )}
      <h2 style={{ marginTop: guidelinesHref ? '16px' : '' }}>
        Table of contents
      </h2>
      <ul>
        {['Overview', 'Coded examples', 'Example usage', 'Component API'].map(
          (item) => (
            <li key={item}>
              <AnchorMdx href={`#${changeCase.kebabCase(item)}`}>
                {item}
              </AnchorMdx>
              {processedBlocks && item === 'Example usage' ? (
                <ul>
                  {processedBlocks.map((block) => {
                    return block?.title ? (
                      <li key={block.title}>
                        <AnchorMdx
                          href={`#${changeCase.kebabCase(block.title)}`}
                        >
                          {block.title}
                        </AnchorMdx>
                      </li>
                    ) : null;
                  })}
                </ul>
              ) : null}
            </li>
          )
        )}
      </ul>
      <h2 id="overview">Overview</h2>
      <Description>{altDescription}</Description>
      {!omitCodedExample && storyInfo.expectCodedExample ? (
        <>
          <h2 id="coded-examples">Coded examples</h2>
          <p>
            Coded examples can be edited and are a great way to try out a
            component.
          </p>
          <ul>
            <li key="codesandbox">
              <AnchorMdx href={codeSandboxHref(storyInfo.title)}>
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    height: '16px',
                    width: '16px',
                    color: 'black',
                    boxShadow: '0 0 0 2px white',
                    marginRight: '8px',
                    verticalAlign: '-2px',
                  }}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 0h23.987v24H0V0Zm21.533 2.455v19.09H2.453V2.456h19.08Z"
                    fill="currentColor"
                  ></path>
                </svg>
                CodeSandbox
              </AnchorMdx>
            </li>
            <li key="stackblitz">
              <AnchorMdx href={stackblitzHref(storyInfo.title)}>
                <img
                  src="https://c.staticblitz.com/assets/favicon_sb-861fe1b85c0dc928750c62de15fed96fc75e57ee366bd937bad17a3938917b3f.svg"
                  alt="Stackblitz logo"
                  style={{ verticalAlign: '-2px', marginRight: '8px' }}
                />
                Stackblitz
              </AnchorMdx>
            </li>
          </ul>
        </>
      ) : null}
      <h2 id="example-usage">Example usage</h2>
      <div className={storyHelperClass}>
        {processedBlocks ? (
          <CustomBlocks blocks={processedBlocks} />
        ) : (
          <Stories />
        )}
      </div>
      <h2 id="component-api">Component API</h2>
      {storyCount > 1 && (
        <p>
          NOTE: Changing the controls below affects the default/primary example
          shown on the docs page.
        </p>
      )}
      <Controls />
    </div>
  );
};

StoryDocsPage.propTypes = {
  /**
   * Uses doc block from the component where possible.
   *
   * Note: use `export default { component: ExampleComponent }` in the story if the main component is wrapped by some
   * additional code. This will allow the doc block to pass through.
   *
   * If passed as string treated as markdown.
   */
  altDescription: PropTypes.node,
  /**
   * location if any of guidelines on the PAL site, constructed by default
   */
  altGuidelinesHref: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(
      PropTypes.shape({ href: PropTypes.string, label: PropTypes.string })
    ),
  ]),
  /**
   * Uses component name by default
   */
  altTitle: PropTypes.string,
  /**
   * Array with content sections
   */
  blocks: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * Optional title story name used by default<h3>
       */
      title: PropTypes.string,
      /**
       * Optional subTitle a <h4>
       */
      subTitle: PropTypes.string,
      /**
       * Optional description, strings treated as markdown.
       */
      description: PropTypes.node,
      /**
       * Optional block image
       */
      image: PropTypes.node,
      /**
       * Story imported from story file
       */
      story: PropTypes.func,
      /**
       * Some source code
       * default language `jsx`
       */
      source: PropTypes.shape({
        language: PropTypes.oneOf(['javascript', 'css', 'jsx', 'json']),
        code: PropTypes.string,
      }),
    })
  ),
  /**
   * Designates a special top level area for important notices or messaging like deprecation
   */
  deprecationNotice: PropTypes.string,
  /**
   * Set to true if no published example exists (all components and patterns should have an example)
   */
  omitCodedExample: PropTypes.bool,
  /**
   * Stories unreferenced in blocks included by default
   */
  omitUnreferencedStories: PropTypes.bool,
};
