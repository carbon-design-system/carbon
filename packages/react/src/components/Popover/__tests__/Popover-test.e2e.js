/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../../../../index.scss';

import { Checkbox } from '@carbon/icons-react';
import { mount } from '@cypress/react';
import React from 'react';
import { Popover, PopoverContent } from '../';
import { PrefixContext } from '../../../internal/usePrefix';

const scenarios = [
  {
    group: 'align',
    children: [
      {
        title: 'align: bottom',
        props: {
          align: 'bottom',
        },
      },
      {
        title: 'align: bottom-left',
        props: {
          align: 'bottom-left',
        },
        alignment: {
          alignItems: 'center',
          justifyContent: 'start',
        },
      },
      {
        title: 'align: bottom-right',
        props: {
          align: 'bottom-right',
        },
        alignment: {
          alignItems: 'center',
          justifyContent: 'end',
        },
      },
      {
        title: 'align: right',
        props: {
          align: 'right',
        },
        alignment: {
          alignItems: 'center',
          justifyContent: 'start',
        },
      },
      {
        title: 'align: right-top',
        props: {
          align: 'right-top',
        },
        alignment: {
          alignItems: 'center',
          justifyContent: 'start',
        },
      },
      {
        title: 'align: right-bottom',
        props: {
          align: 'right-bottom',
        },
        alignment: {
          alignItems: 'center',
          justifyContent: 'start',
        },
      },
      {
        title: 'align: left',
        props: {
          align: 'left',
        },
        alignment: {
          alignItems: 'center',
          justifyContent: 'end',
        },
      },
      {
        title: 'align: left-top',
        props: {
          align: 'left-top',
        },
        alignment: {
          alignItems: 'center',
          justifyContent: 'end',
        },
      },
      {
        title: 'align: left-bottom',
        props: {
          align: 'left-bottom',
        },
        alignment: {
          alignItems: 'center',
          justifyContent: 'end',
        },
      },
      {
        title: 'align: top',
        props: {
          align: 'top',
        },
      },
      {
        title: 'align: top-left',
        props: {
          align: 'top-left',
        },
        alignment: {
          alignItems: 'center',
          justifyContent: 'start',
        },
      },
      {
        title: 'align: top-right',
        props: {
          align: 'top-right',
        },
        alignment: {
          alignItems: 'center',
          justifyContent: 'end',
        },
      },
    ],
  },
  {
    group: 'caret',
    children: [
      {
        title: 'caret: false, align: bottom',
        props: {
          align: 'bottom',
          caret: false,
        },
      },
      {
        title: 'caret: false, align: bottom-left',
        props: {
          align: 'bottom-left',
          caret: false,
        },
        alignment: {
          alignItems: 'center',
          justifyContent: 'start',
        },
      },
      {
        title: 'caret: false, align: bottom-right',
        props: {
          align: 'bottom-right',
          caret: false,
        },
        alignment: {
          alignItems: 'center',
          justifyContent: 'end',
        },
      },
      {
        title: 'caret: false, align: right',
        props: {
          align: 'right',
          caret: false,
        },
        alignment: {
          alignItems: 'center',
          justifyContent: 'start',
        },
      },
      {
        title: 'caret: false, align: right-top',
        props: {
          align: 'right-top',
          caret: false,
        },
        alignment: {
          alignItems: 'center',
          justifyContent: 'start',
        },
      },
      {
        title: 'caret: false, align: right-bottom',
        props: {
          align: 'right-bottom',
          caret: false,
        },
        alignment: {
          alignItems: 'center',
          justifyContent: 'start',
        },
      },
      {
        title: 'caret: false, align: left',
        props: {
          align: 'left',
          caret: false,
        },
        alignment: {
          alignItems: 'center',
          justifyContent: 'end',
        },
      },
      {
        title: 'caret: false, align: left-top',
        props: {
          align: 'left-top',
          caret: false,
        },
        alignment: {
          alignItems: 'center',
          justifyContent: 'end',
        },
      },
      {
        title: 'caret: false, align: left-bottom',
        props: {
          align: 'left-bottom',
          caret: false,
        },
        alignment: {
          alignItems: 'center',
          justifyContent: 'end',
        },
      },
      {
        title: 'caret: false, align: top',
        props: {
          align: 'top',
          caret: false,
        },
      },
      {
        title: 'caret: false, align: top-left',
        props: {
          align: 'top-left',
          caret: false,
        },
        alignment: {
          alignItems: 'center',
          justifyContent: 'start',
        },
      },
      {
        title: 'caret: false, align: top-right',
        props: {
          align: 'top-right',
          caret: false,
        },
        alignment: {
          alignItems: 'center',
          justifyContent: 'end',
        },
      },
    ],
  },
  {
    group: 'high-contrast',
    children: [
      {
        title: 'high contrast: true',
        props: {
          align: 'bottom',
          highContrast: true,
        },
      },
    ],
  },
  {
    group: 'light',
    children: [
      {
        title: 'light: true',
        props: {
          align: 'bottom',
          light: true,
        },
      },
    ],
  },
  {
    group: 'drop-shadow',
    children: [
      {
        title: 'drop-shadow: false',
        props: {
          align: 'bottom',
          dropShadow: false,
        },
      },
      {
        title: 'drop-shadow: false, high-contrast: true',
        props: {
          align: 'bottom',
          dropShadow: false,
          highContrast: true,
        },
      },
    ],
  },
];

describe('Popover', () => {
  it('should match VRT in the white theme', () => {
    mount(
      <PrefixContext.Provider value="cds">
        <div style={{ display: 'grid', gridRowGap: 150 }}>
          {scenarios.flatMap((scenario) => {
            if (scenario.children) {
              return scenario.children.map((child) => {
                const key = `${scenario.group}:${child.title}`;
                const style = {
                  display: 'grid',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px dashed black',
                  padding: '2rem',
                  position: 'relative',
                  ...child.alignment,
                };
                return (
                  <div key={key} style={style}>
                    <p
                      style={{
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        background: 'black',
                        color: 'white',
                        margin: 0,
                        fontSize: 12,
                        padding: '2px 8px',
                      }}>
                      {child.title}
                    </p>
                    <Popover open={open} align="bottom" {...child.props}>
                      <div className="playground-trigger">
                        <Checkbox />
                      </div>
                      <PopoverContent style={{ padding: '1rem' }}>
                        <p className="popover-title">Available storage</p>
                        <p className="popover-details">
                          This server has 150 GB of block storage remaining.
                        </p>
                      </PopoverContent>
                    </Popover>
                  </div>
                );
              });
            }
          })}
        </div>
      </PrefixContext.Provider>
    );

    cy.percySnapshot();
  });
});
