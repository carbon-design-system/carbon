/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react'; // https://testing-library.com/docs/react-testing-library/intro
import React from 'react';

import { pkg } from '../../settings';

import uuidv4 from '../../global/js/utils/uuidv4';

import { StatusIcon } from '.';

const blockClass = `${pkg.prefix}--status-icon`;
const componentName = StatusIcon.displayName;
const className = `class-${uuidv4()}`;
const dataTestId = uuidv4();

const iconSizes = [
  { sizeProp: 'sm', sizeValue: '16' },
  { sizeProp: 'md', sizeValue: '20' },
  { sizeProp: 'lg', sizeValue: '24' },
  { sizeProp: 'xl', sizeValue: '32' },
];

const iconKinds = [
  'fatal',
  'critical',
  'major-warning',
  'minor-warning',
  'undefined',
  'unknown',
  'normal',
  'info',
  'in-progress',
  'running',
  'pending',
];

const iconThemes = ['light', 'dark'];

const renderComponent = ({ ...rest } = {}) =>
  render(
    <StatusIcon
      {...rest}
      kind="fatal"
      iconDescription="fatal"
      size="sm"
      theme="light"
    />
  );

describe(componentName, () => {
  it('renders a component StatusIcon', async () => {
    const { container } = renderComponent();
    expect(container).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = renderComponent();
    expect(container).toBeAccessible(componentName);
    expect(container).toHaveNoAxeViolations();
  });

  it('applies className to the root node', async () => {
    const { container } = renderComponent({ className });
    expect(container.querySelector(`.${className}`)).toBeInTheDocument();
  });

  it('forwards a ref to an appropriate node', async () => {
    const ref = React.createRef();
    renderComponent({ ref });
    expect(ref.current).toHaveClass(blockClass);
  });

  it('adds additional properties to the containing node', async () => {
    renderComponent({ 'data-testid': dataTestId });
    screen.getByTestId(dataTestId);
  });

  it('adds the Devtools attribute to the containing node', async () => {
    renderComponent({ 'data-testid': dataTestId });

    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      componentName
    );
  });

  iconThemes.forEach((theme) => {
    it(`applies the proper className when theme prop of \`${theme}\` is passed`, async () => {
      const { container } = render(
        <StatusIcon
          kind="fatal"
          iconDescription="fatal"
          size="sm"
          theme={theme}
        />
      );
      const element = container.querySelector(
        `.${blockClass}--${theme}.${blockClass}--${theme}-fatal`
      );
      const hasThemeProp = element.className.baseVal.includes(`${theme}`);
      expect(hasThemeProp).toBeTruthy();
    });
  });

  // Kind and size are tightly coupled in the code. Test all iterations of both here.
  iconKinds.forEach((kind) => {
    iconSizes.forEach(({ sizeProp, sizeValue }) => {
      it(`changes element kind and size when \`${kind}\` and \`${sizeProp}\` is passed`, async () => {
        const { container } = render(
          <StatusIcon
            kind={kind}
            iconDescription={kind}
            size={sizeProp}
            theme="light"
          />
        );
        const element = container.querySelector(
          `.${blockClass}--light.${blockClass}--light-${kind}`
        );
        const iconHeight = element.getAttribute('height');
        expect(iconHeight).toEqual(sizeValue);

        const hasKindProp = element.className.baseVal.includes(`${kind}`);
        expect(hasKindProp).toBeTruthy();
      });
    });
  });
});
