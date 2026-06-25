/**
 * Copyright IBM Corp. 2021, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
// cspell:words Scooby

import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expectError } from '../../global/js/utils/test-helper';

import { pkg, carbon } from '../../settings';

import uuidv4 from '../../global/js/utils/uuidv4';

import { ActionSet } from '.';
import { validateActionSetProps } from './ActionSet';

const blockClass = `${pkg.prefix}--action-set`;
const componentName = ActionSet.displayName;

const className = `class-${uuidv4()}`;
const dataTestId = uuidv4();
const dangerDescription = 'Run Scooby!';
const labelP = `Primary button ${uuidv4()}`;
const actionP = { label: labelP };
const labelD = `Danger button ${uuidv4()}`;
const actionD = { label: labelD, dangerDescription };
const labelS = `Secondary button ${uuidv4()}`;
const actionS = { label: labelS, kind: 'secondary' };
const labelS2 = `Another secondary button ${uuidv4()}`;
const actionS2 = { label: labelS2, kind: 'secondary' };
const labelG = `Ghost button ${uuidv4()}`;
const actionG = { label: labelG, kind: 'ghost' };
const labelDG = `Danger Ghost button ${uuidv4()}`;
const actionDG = { label: labelDG, kind: 'danger--ghost', dangerDescription };

const getByRoleAndLabel = (role, label) =>
  screen.getByRole(role, { name: label });

describe(componentName, () => {
  it('renders a component ActionSet', async () => {
    render(<ActionSet actions={[]} />);
    expect(screen.getByRole('presentation')).toHaveClass(blockClass);
  });

  it('renders one action button', async () => {
    render(<ActionSet actions={[actionS]} />);
    getByRoleAndLabel('button', labelS);
  });

  it('renders three action buttons', async () => {
    const primaryButton = `${carbon.prefix}--btn--primary`;
    const secondaryButton = `${carbon.prefix}--btn--secondary`;
    const ghostButton = `${carbon.prefix}--btn--ghost`;
    render(<ActionSet size="lg" actions={[actionS, actionP, actionG]} />);
    expect(getByRoleAndLabel('button', labelS)).toHaveClass(secondaryButton);
    expect(getByRoleAndLabel('button', labelP)).toHaveClass(primaryButton);
    expect(getByRoleAndLabel('button', labelG)).toHaveClass(ghostButton);
  });

  it('renders ghost button first and primary button last', async () => {
    render(
      <ActionSet size="2xl" actions={[actionS, actionP, actionG, actionS2]} />
    );
    const buttons = screen.getAllByRole('button');
    expect(buttons[0].textContent).toEqual(labelG);
    expect(buttons[1].textContent).toEqual(labelS);
    expect(buttons[2].textContent).toEqual(labelS2);
    expect(buttons[3].textContent).toEqual(labelP);
  });

  it('renders danger--ghost button first and danger button last', async () => {
    render(
      <ActionSet size="2xl" actions={[actionS, actionD, actionDG, actionS2]} />
    );
    const buttons = screen.getAllByRole('button');
    expect(buttons[0].textContent).toEqual(dangerDescription + labelDG);
    expect(buttons[1].textContent).toEqual(labelS);
    expect(buttons[2].textContent).toEqual(labelS2);
    expect(buttons[3].textContent).toEqual(labelD);
  });

  it('renders primary button first when stacking', async () => {
    render(<ActionSet size="sm" actions={[actionS, actionP]} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons[0].textContent).toEqual(labelP);
    expect(buttons[1].textContent).toEqual(labelS);
  });

  it('renders primary button first when stacking whichever way round they are supplied', async () => {
    render(<ActionSet size="sm" actions={[actionP, actionS]} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons[0].textContent).toEqual(labelP);
    expect(buttons[1].textContent).toEqual(labelS);
  });

  it('rejects too many buttons using the custom validator', async () =>
    expectError(
      'Invalid prop `actions` supplied to `ActionSet`: you cannot have more than three actions',
      () =>
        render(
          <ActionSet
            actions={[
              actionP,
              actionP,
              actionG,
              actionG,
              { kind: 'danger--tertiary' },
            ]}
          />
        )
    ));

  it('applies className to an action button', async () => {
    render(<ActionSet actions={[{ ...actionS, className }, actionP]} />);
    expect(getByRoleAndLabel('button', labelS)).toHaveClass(className);
    expect(getByRoleAndLabel('button', labelP)).not.toHaveClass(className);
  });

  it('renders a loading button', async () => {
    render(<ActionSet actions={[{ ...actionS, loading: true }]} />);
    const loader = 'loading';
    expect(screen.getByRole('button').textContent).toEqual(
      `${labelS}${loader}`
    );
  });

  it('reports clicks on an action button', async () => {
    const onClick = jest.fn();
    render(<ActionSet actions={[{ ...actionS, onClick }]} />);
    expect(onClick).toBeCalledTimes(0);
    await act(() => userEvent.click(getByRoleAndLabel('button', labelS)));
    expect(onClick).toBeCalledTimes(1);
  });

  it('adds additional properties to an action button', async () => {
    render(<ActionSet actions={[{ ...actionS, 'data-testid': dataTestId }]} />);
    screen.getByTestId(dataTestId);
  });

  it('forwards a ref to an action button', async () => {
    const ref = React.createRef();
    render(<ActionSet actions={[{ ...actionS, ref }, actionP]} />);
    expect(ref.current).toEqual(getByRoleAndLabel('button', labelS));
  });

  it('applies className to the containing node', async () => {
    render(<ActionSet className={className} />);
    expect(screen.getByRole('presentation')).toHaveClass(className);
  });

  it('adds additional properties to the containing node', async () => {
    render(<ActionSet data-testid={dataTestId} />);
    screen.getByTestId(dataTestId);
  });

  it('forwards a ref to an appropriate node', async () => {
    const ref = React.createRef();
    render(<ActionSet ref={ref} />);
    expect(ref.current).toEqual(screen.getByRole('presentation'));
  });
});

const prop = `prop-${uuidv4()}`;

const primary = { kind: 'primary' };
const secondary = { kind: 'secondary' };
const danger = { kind: 'danger' };
const ghost = { kind: 'ghost' };
const dangerPrimary = { kind: 'danger--primary' };
const dangerGhost = { kind: 'danger--ghost' };
const dangerTertiary = { kind: 'danger--tertiary' };
const tertiary = { kind: 'tertiary' };

const props = {
  0: { [prop]: [] },
  1: { [prop]: [primary] },
  2: { [prop]: [primary, secondary] },
  3: { [prop]: [primary, secondary, secondary] },
  4: { [prop]: [primary, secondary, secondary, secondary] },
  5: { [prop]: [primary, secondary, secondary, secondary, secondary] },
  primary: { [prop]: [primary] },
  secondary: { [prop]: [secondary] },
  danger: { [prop]: [danger] },
  ghost: { [prop]: [ghost] },
  dangerPrimary: { [prop]: [dangerPrimary] },
  dangerGhost: { [prop]: [dangerGhost] },
  dangerTertiary: { [prop]: [dangerTertiary] },
  tertiary: { [prop]: [tertiary] },
  twoPrimaries: { [prop]: [primary, primary] },
  twoGhosts: { [prop]: [ghost, ghost] },
  psg: { [prop]: [primary, secondary, ghost] },
};

describe(`${componentName}.validateActions`, () => {
  let mockError;
  beforeEach(() => {
    mockError = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    mockError.mockRestore();
  });
  it('rejects more than three actions for a small size', async () => {
    expect(
      validateActionSetProps({ size: 'sm', actions: props[1][prop] })
    ).toBeNull();
    expect(
      validateActionSetProps({ size: 'sm', actions: props[2][prop] })
    ).toBeNull();
    expect(
      validateActionSetProps({ size: 'sm', actions: props[3][prop] })
    ).toBeNull();
    expect(validateActionSetProps({ size: 'sm', actions: props[4][prop] }));
    expect(mockError).toHaveBeenCalledTimes(1);
  });

  it('rejects more than three actions for a medium size', async () => {
    expect(
      validateActionSetProps({ size: 'md', actions: props[1][prop] })
    ).toBeNull();
    expect(
      validateActionSetProps({ size: 'md', actions: props[2][prop] })
    ).toBeNull();
    expect(
      validateActionSetProps({ size: 'md', actions: props[3][prop] })
    ).toBeNull();
    expect(validateActionSetProps({ size: 'md', actions: props[4][prop] }));
    expect(mockError).toHaveBeenCalledTimes(1);
  });

  it('rejects more than four actions for a large size', async () => {
    expect(
      validateActionSetProps({ size: 'lg', actions: props[1][prop] })
    ).toBeNull();
    expect(
      validateActionSetProps({ size: 'lg', actions: props[2][prop] })
    ).toBeNull();
    expect(
      validateActionSetProps({ size: 'lg', actions: props[3][prop] })
    ).toBeNull();
    expect(
      validateActionSetProps({ size: 'lg', actions: props[4][prop] })
    ).toBeNull();
    expect(validateActionSetProps({ size: 'lg', actions: props[5][prop] }));
    expect(mockError).toHaveBeenCalledTimes(1);
  });

  it('rejects more than four actions for a 2xl size', async () => {
    expect(
      validateActionSetProps({ size: '2xl', actions: props[1][prop] })
    ).toBeNull();
    expect(
      validateActionSetProps({ size: '2xl', actions: props[2][prop] })
    ).toBeNull();
    expect(
      validateActionSetProps({ size: '2xl', actions: props[3][prop] })
    ).toBeNull();
    expect(
      validateActionSetProps({ size: '2xl', actions: props[4][prop] })
    ).toBeNull();
    expect(validateActionSetProps({ size: '2xl', actions: props[5][prop] }));
    expect(mockError).toHaveBeenCalledTimes(1);
  });

  it('rejects more than one primary kind', async () => {
    expect(
      validateActionSetProps({ size: 'md', actions: props.primary[prop] })
    ).toBeNull();
    expect(
      validateActionSetProps({ size: 'md', actions: props.twoPrimaries[prop] })
    );
    expect(mockError).toHaveBeenCalledTimes(1);
  });

  it('rejects more than one ghost kind', async () => {
    expect(
      validateActionSetProps({ size: 'md', actions: props.ghost[prop] })
    ).toBeNull();
    expect(
      validateActionSetProps({ size: 'md', actions: props.twoGhosts[prop] })
    );
    expect(mockError).toHaveBeenCalledTimes(1);
  });

  it('rejects ghost kind with other kinds for extra small, small, medium size', async () => {
    expect(validateActionSetProps({ size: 'sm', actions: props.psg[prop] }));
    expect(mockError).toHaveBeenCalledTimes(1);
    expect(validateActionSetProps({ size: 'md', actions: props.psg[prop] }));
    expect(mockError).toHaveBeenCalledTimes(2);
    expect(
      validateActionSetProps({ size: 'lg', actions: props.psg[prop] })
    ).toBeNull();
    expect(
      validateActionSetProps({ size: '2xl', actions: props.psg[prop] })
    ).toBeNull();
  });

  it('rejects any kind other than primary, danger, secondary, tertiary, danger--ghost, ghost', async () => {
    expect(
      validateActionSetProps({ size: 'md', actions: props.primary[prop] })
    ).toBeNull();
    expect(
      validateActionSetProps({ size: 'md', actions: props.danger[prop] })
    ).toBeNull();
    expect(
      validateActionSetProps({ size: 'md', actions: props.secondary[prop] })
    ).toBeNull();
    expect(
      validateActionSetProps({ size: 'md', actions: props.tertiary[prop] })
    ).toBeNull();
    expect(
      validateActionSetProps({ size: 'md', actions: props.dangerGhost[prop] })
    ).toBeNull();
    expect(
      validateActionSetProps({ size: 'md', actions: props.ghost[prop] })
    ).toBeNull();
    expect(
      validateActionSetProps({ size: 'md', actions: props.dangerPrimary[prop] })
    );
    expect(mockError).toHaveBeenCalledTimes(1);
    expect(
      validateActionSetProps({
        size: 'md',
        actions: props.dangerTertiary[prop],
      })
    );
    expect(mockError).toHaveBeenCalledTimes(2);
    expect(
      validateActionSetProps({ size: 'md', actions: props.twoPrimaries[prop] })
    );
    expect(mockError).toHaveBeenCalledTimes(3);
    expect(
      validateActionSetProps({ size: 'md', actions: props.twoGhosts[prop] })
    );
    expect(mockError).toHaveBeenCalledTimes(4);
  });

  it('should render both expressive and regular buttons inside of the button set', async () => {
    const { rerender } = render(<ActionSet actions={[actionG]} />);
    const actionButton = screen.getByText(labelG);
    expect(actionButton).toHaveClass(
      `${carbon.prefix}--btn--expressive`,
      `${blockClass}__action-button--expressive`
    );
    rerender(<ActionSet actions={[{ ...actionG, isExpressive: false }]} />);
    expect(actionButton).not.toHaveClass(
      `${carbon.prefix}--btn--expressive`,
      `${blockClass}__action-button--expressive`
    );
  });
});
