import React from 'react';
import { Grid, Row, Column } from './Grid';
import Main from './Main';

export default function FullBleedPage() {
  return (
    <Main>
      <div className="full-bleed-example">
        <div className="bx--fluid-grid">
          <Row>
            <Column breakpoint="lg" span={10}>
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                }}>
                Content
              </div>
            </Column>
            <Column auto>
              <div>Content</div>
            </Column>
          </Row>
        </div>
      </div>
    </Main>
  );
}
