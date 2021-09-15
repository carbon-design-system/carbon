/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import headerImg from './img/carbon.png';
import folder from './img/folder.png';
import knobs from './img/knobs.png';
import actions from './img/actions.gif';
import docs from './img/docs.png';
import props from './img/props.png';
import './usage.scss';
import Link from '../../src/components/Link';

function Usage() {
  return (
    <div className="usage__container">
      <img
        className="usage__header-img"
        src={headerImg}
        alt="Carbon Design System"
      />
      <h2 id="getting-started">Getting Started</h2>
      <ul>
        <li>
          <Link href="#playground">Playground</Link>
        </li>
        <li>
          <Link href="#actions">Actions</Link>
        </li>
        <li>
          <Link href="#docs">Docs</Link>
        </li>
      </ul>

      <p>
        Each component that is publicly available can be viewed in our
        Storybook. Each component folder contains an example of the component
        variants, its skeleton state, and a playground.
      </p>
      <figure>
        <img src={folder} alt="example of storybook folder structure" />{' '}
        <figcaption>An example of the storybook folder structure</figcaption>
      </figure>
      <h3 id="playground">Playground</h3>
      <p>
        The <code>Playground</code> story allows users to dig in to specific
        props that are available to that component. This allows you to view the
        component in different states and with different data values. To access
        these props, navigate via the <code>knobs</code> tab at the bottom of
        the canvas. Keep in mind, not all props are hooked up into the knobs
        tab. For a comprehensive list of props available for each component,
        refer to the <a href="#docs">Docs tab</a>.
      </p>
      <figure>
        <img src={knobs} alt="example of the knobs tab in storybook" />{' '}
        <figcaption>An example of the Knobs tab in storybook</figcaption>
      </figure>
      <h3 id="actions">Actions</h3>
      <p>
        Within the <code>Playground</code> story, you can also access the
        <code> Actions</code> tab, which shows the event signature of actions
        taken on that component
      </p>
      <figure>
        <img src={actions} alt="example of the actions tab in storybook" />{' '}
        <figcaption>An example of the Actions tab in storybook</figcaption>
      </figure>
      <h3 id="docs">Docs</h3>
      <p>
        Each React component also has an MDX file containing more in-depth
        documentation regarding specific props or common functionality. To
        access these, click the <code>Docs</code> tab at the top of the screen.
        This is also where the component API can be located.
      </p>
      <figure>
        <img src={docs} alt="example of the docs tab in storybook" />{' '}
        <figcaption>An example of the Docs tab in storybook</figcaption>
      </figure>
      <figure>
        <img src={props} alt="example of the component API in storybook" />{' '}
        <figcaption>
          An example of the component API table in storybook
        </figcaption>
      </figure>
    </div>
  );
}

export default Usage;
