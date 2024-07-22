import React from 'react';
import { Grid } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  Grid, //Screen in Figma
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=1830-2335&t=Qm7ndWAwgu7d5Uxc-4',
  {
    props: {
      breakpoint: figma.enum('Breakpoint', {
        'Max plus (1784px)': 'max-plus--1784px-',
        'Max (1584px)': 'max--1584px-',
        'X-Large (1312px)': 'x-large--1312px-',
        'Large (1056px)': 'large--1056px-',
        'Medium (672px)': 'medium--672px-',
        'Small (320px)': 'small--320px-',
        Breakpoint7: 'breakpoint7',
        Breakpoint8: 'breakpoint8',
      }),
      children: figma.children('*'),
    },
    example: ({ children }) => <Grid>{children}</Grid>,
  }
);
