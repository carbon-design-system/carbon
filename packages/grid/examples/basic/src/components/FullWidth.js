import React from 'react';
import { Grid, Row, Column } from './Grid';
import Main from './Main';
import ExampleContent from './ExampleContent';

export default function BasicUsage() {
  return (
    <Main>
      <div class="bx--fluid-grid bx--grid--full-width">
        <Row>
          <Column breakpoint="md" span={4}>
            <h1>Full width example</h1>
          </Column>
        </Row>
        <Row>
          <Column breakpoint="md" span={4}>
            <p>
              This example showcases the full width modifier on the fluid grid.
            </p>
          </Column>
        </Row>
        <Row>
          <Column breakpoint="md" span={4}>
            <h2>
              Small{' '}
              <span style={{ fontSize: '14px' }}>(4 columns @ 320px)</span>
            </h2>
          </Column>
        </Row>
        <Row>
          <Column breakpoint="sm" span={1}>
            <div class="outside">
              <div class="inside">1</div>
            </div>
          </Column>
          <Column breakpoint="sm" span={1}>
            <div class="outside">
              <div class="inside">1</div>
            </div>
          </Column>
          <Column breakpoint="sm" span={1}>
            <div class="outside">
              <div class="inside">1</div>
            </div>
          </Column>
          <Column breakpoint="sm" span={1}>
            <div class="outside">
              <div class="inside">1</div>
            </div>
          </Column>
        </Row>
      </div>
      <div class="bx--grid bx--grid--full-width">
        <Row>
          <Column breakpoint="md" span={4}>
            <p>
              This example showcases the full width modifier on the basic grid.
            </p>
          </Column>
        </Row>
        <Row>
          <Column breakpoint="md" span={4}>
            <h2>
              Small{' '}
              <span style={{ fontSize: '14px' }}>(4 columns @ 320px)</span>
            </h2>
          </Column>
        </Row>
        <Row>
          <Column breakpoint="sm" span={1}>
            <div class="outside">
              <div class="inside">1</div>
            </div>
          </Column>
          <Column breakpoint="sm" span={1}>
            <div class="outside">
              <div class="inside">1</div>
            </div>
          </Column>
          <Column breakpoint="sm" span={1}>
            <div class="outside">
              <div class="inside">1</div>
            </div>
          </Column>
          <Column breakpoint="sm" span={1}>
            <div class="outside">
              <div class="inside">1</div>
            </div>
          </Column>
        </Row>
      </div>
    </Main>
  );
}
