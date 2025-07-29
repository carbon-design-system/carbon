import React from 'react';
import { render, screen } from '@testing-library/react';
import EduButton from '../EduButton';

describe('EduButton', () => {
  it('renders with default styles', () => {
    render(<EduButton>Test</EduButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle({ backgroundColor: '#005ae1' });
  });
});
