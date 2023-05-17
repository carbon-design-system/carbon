import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import AppHeader from './Header';
//import renderer from 'react-test-renderer';
afterEach(cleanup);

let sendDataToParent = jest.fn().mockReturnValue('white');

describe('Header', () => {
  it('Check theme section - White', () => {
    const sendDataToParent = jest.fn().mockReturnValue('White');
    const { getByTestId, queryByTestId, getByLabelText, queryByLabelText } =
      render(<AppHeader sendDataToParent={sendDataToParent} />);
    const radioButton = getByLabelText('White');
    expect(radioButton).toBeInTheDocument();
    expect(radioButton.checked).toEqual(false);
    fireEvent.click(radioButton);
    expect(sendDataToParent()).toEqual('White');
    expect(radioButton.checked).toEqual(true);
  });

  it('Check theme section - g10', () => {
    const sendDataToParent = jest.fn().mockReturnValue('g10');
    const { getByTestId, queryByTestId, getByLabelText, queryByLabelText } =
      render(<AppHeader sendDataToParent={sendDataToParent} />);
    const radioButton = getByLabelText('g10');
    expect(radioButton).toBeInTheDocument();
    expect(radioButton.checked).toEqual(false);
    fireEvent.click(radioButton);
    expect(sendDataToParent()).toEqual('g10');
    expect(radioButton.checked).toEqual(true);
  });

  it('Check theme section - g80', () => {
    const sendDataToParent = jest.fn().mockReturnValue('g80');
    const { getByTestId, queryByTestId, getByLabelText, queryByLabelText } =
      render(<AppHeader sendDataToParent={sendDataToParent} />);
    const radioButton = getByLabelText('g80');
    expect(radioButton).toBeInTheDocument();
    expect(radioButton.checked).toEqual(false);
    fireEvent.click(radioButton);
    expect(sendDataToParent()).toEqual('g80');
    expect(radioButton.checked).toEqual(true);
  });

  it('Check theme section - g100', () => {
    const sendDataToParent = jest.fn().mockReturnValue('g100');
    const { getByTestId, queryByTestId, getByLabelText, queryByLabelText } =
      render(<AppHeader sendDataToParent={sendDataToParent} />);
    const radioButton = getByLabelText('g100');
    expect(radioButton).toBeInTheDocument();
    expect(radioButton.checked).toEqual(false);
    fireEvent.click(radioButton);
    expect(sendDataToParent()).toEqual('g100');
    expect(radioButton.checked).toEqual(true);
  });
});
