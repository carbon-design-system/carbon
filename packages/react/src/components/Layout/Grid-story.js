/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './story.scss';

import { storiesOf } from '@storybook/react';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {
  unstable_Grid as Grid,
  unstable_Row as Row,
  unstable_Column as Column,
} from '../Layout';

function DemoFullPage({ children }) {
  const [portalNode, setPortalNode] = useState(null);

  useEffect(() => {
    const node = document.createElement('div');
    document.body.appendChild(node);

    setPortalNode(node);

    return () => {
      document.body.removeChild(node);
    };
  }, []);

  return (
    portalNode &&
    ReactDOM.createPortal(<div className="example">{children}</div>, portalNode)
  );
}

function DemoContent({ children }) {
  return (
    <div className="outside">
      <div className="inside">{children}</div>
    </div>
  );
}

storiesOf('Layout/Grid', module)
  .addDecorator(story => <DemoFullPage>{story()}</DemoFullPage>)
  .add('auto-columns', () => (
    <Grid>
      <Row>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
      </Row>
    </Grid>
  ))
  .add('responsive grid', () => (
    <Grid>
      <Row>
        <Column span={[1, 4, 8]}>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column span={[1, 2, 2]}>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column span={[1, 1, 1]}>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column span={[1, 1, 1]}>
          <DemoContent>1/4</DemoContent>
        </Column>
      </Row>
    </Grid>
  ))
  .add('responsive grid - object syntax', () => (
    <Grid>
      <Row>
        <Column span={{ sm: 1, md: 4, lg: 8 }}>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column span={{ sm: 1, md: 2, lg: 2 }}>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column span={{ sm: 1, md: 1, lg: 1 }}>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column span={{ sm: 1, md: 1, lg: 1 }}>
          <DemoContent>1/4</DemoContent>
        </Column>
      </Row>
    </Grid>
  ))
  .add('offset', () => (
    <Grid>
      <Row>
        <Column offset={[3]} span={[1]}>
          <DemoContent>Offset 3</DemoContent>
        </Column>
        <Column offset={[2]} span={[2]}>
          <DemoContent>Offset 3</DemoContent>
        </Column>
        <Column offset={[1]} span={[3]}>
          <DemoContent>Offset 3</DemoContent>
        </Column>
        <Column offset={[0]} span={[4]}>
          <DemoContent>Offset 3</DemoContent>
        </Column>
      </Row>
    </Grid>
  ))
  .add('condensed', () => (
    <Grid condensed>
      <Row>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
      </Row>
    </Grid>
  ))
  .add('condensed row', () => (
    <Grid>
      <Row>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
      </Row>
      <Row condensed>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
      </Row>
      <Row>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
      </Row>
    </Grid>
  ))
  .add('no gutter - column', () => (
    <Grid>
      <Row>
        <Column noGutter>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column noGutter>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column noGutter>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column noGutter>
          <DemoContent>1/4</DemoContent>
        </Column>
      </Row>
    </Grid>
  ))
  .add('no gutter - row', () => (
    <Grid>
      <Row noGutter>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
      </Row>
    </Grid>
  ))
  .add('no gutter - directional', () => (
    <Grid>
      <Row>
        <Column noGutterLeft>
          <DemoContent>No Gutter on the left-hand side</DemoContent>
        </Column>
        <Column noGutterLeft>
          <DemoContent>No Gutter on the left-hand side</DemoContent>
        </Column>
        <Column noGutterRight>
          <DemoContent>No Gutter on the right-hand side</DemoContent>
        </Column>
        <Column noGutterRight>
          <DemoContent>No Gutter on the right-hand side</DemoContent>
        </Column>
      </Row>
    </Grid>
  ))
  .add('full width', () => (
    <Grid fullWidth>
      <Row>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
        <Column>
          <DemoContent>1/4</DemoContent>
        </Column>
      </Row>
    </Grid>
  ));
