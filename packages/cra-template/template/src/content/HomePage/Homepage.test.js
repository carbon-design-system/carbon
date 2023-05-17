import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import HomePage from './HomePage';

describe('Homepage -', () => {
  it('Check Getting started hyperlink to be clickable', () => {
    const { queryByLabelText, getByLabelText, getByTestId, getByRole } = render(
      <HomePage />
    );
    const linkItem = screen.getByText(/Getting Started/i);
    expect(linkItem).toBeInTheDocument();
    fireEvent.click(linkItem);
    expect(linkItem).toBeTruthy();
  });

  it('Learn more button', () => {
    const { getByRole } = render(<HomePage />);
    const button = screen.getByText(/Learn more/i);
    fireEvent.click(button);
    expect(button).toBeTruthy();
  });

  it('Check tab switching', async () => {
    const { getByRole } = render(<HomePage />);
    const aboutTab = screen.getByText(/About/i);
    fireEvent.click(aboutTab);
    await screen.getByText(/What is Carbon?/i);
    //switch to another tab;
    const designTab = screen.getByText('Design');
    fireEvent.click(designTab);
    await screen.getByText(
      /Rapidly build beautiful and accessible experiences/i
    );
    //switch to another tab;
    const developTab = screen.getByText(/Develop/i);
    fireEvent.click(developTab);
    await screen.getByText(
      /Carbon provides styles and components in Vanilla, React, Angular, and Vue for anyone building on the web/i
    );
  });
});
