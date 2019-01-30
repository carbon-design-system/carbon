import React from 'react';
import { Row, Column } from './Grid';
import { createColumns } from '../tools/grid';

export default function ExampleContent() {
  return (
    <React.Fragment>
      <Row>
        <Column auto>
          <h2>
            Small <span style={{ fontSize: '14px' }}>(4 columns @ 320px)</span>
          </h2>
        </Column>
      </Row>
      <Row>
        {createColumns({
          breakpoint: 'sm',
          total: 4,
          span: 1,
        })}
      </Row>
      <Row>
        <Column auto>
          <h2>
            Medium <span style={{ fontSize: '14px' }}>(8 columns @ 672px)</span>
          </h2>
        </Column>
      </Row>
      <Row>
        {createColumns({
          breakpoint: 'md',
          total: 8,
          span: 1,
        })}
      </Row>
      <Row>
        <Column auto>
          <h2>
            Large{' '}
            <span style={{ fontSize: '14px' }}>(16 columns @ 1056px)</span>
          </h2>
        </Column>
      </Row>
      <Row>
        {createColumns({
          breakpoint: 'lg',
          total: 16,
          span: 1,
        })}
      </Row>
      <Row>
        <Column auto>
          <h2>
            X-Large{' '}
            <span style={{ fontSize: '14px' }}>(16 columns @ 1312px)</span>
          </h2>
        </Column>
      </Row>
      <Row>
        {createColumns({
          breakpoint: 'xlg',
          total: 16,
          span: 1,
        })}
      </Row>
      <Row>
        <Column auto>
          <h2>
            Max <span style={{ fontSize: '14px' }}>(16 columns @ 1584px)</span>
          </h2>
        </Column>
      </Row>
      <Row>
        {createColumns({
          breakpoint: 'max',
          total: 16,
          span: 1,
        })}
      </Row>
    </React.Fragment>
  );
}
