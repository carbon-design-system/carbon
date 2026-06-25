/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, waitFor, screen } from '@testing-library/react';
import React from 'react';
import { APIKeyDownloader } from './APIKeyDownloader';

const componentName = APIKeyDownloader.name;
const defaultProps = {
  apiKey: '123-456-789',
  body: 'API key created',
  fileName: 'file',
  fileType: 'json',
  linkText: 'download',
};

URL.createObjectURL = jest.fn(() => Promise.resolve('download-link'));

describe('APIKeyDownloader', () => {
  it('has json file download', async () => {
    render(<APIKeyDownloader {...defaultProps} />);
    const link = screen.getByText(defaultProps.linkText);
    await waitFor(() => {
      expect(link).toHaveProperty('download', 'file.json');
    });
    expect(link).toHaveProperty('href', 'http://localhost/download-link');
  });

  it('has txt file download', async () => {
    const props = {
      ...defaultProps,
      fileType: 'txt',
    };
    render(<APIKeyDownloader {...props} />);
    const link = screen.getByText(props.linkText);
    await waitFor(() => {
      expect(link).toHaveProperty('download', 'file.txt');
    });
    expect(link).toHaveProperty('href', 'http://localhost/download-link');
  });

  /**
   * even though fileName is marked isRequired it's still possible to pass an empty string and not trigger a console warning
   * to avoid any issues with trying to download the file the code still checks for this and use
   * a default file name if an empty string or null is found
   */
  it('adds default file name when empty string is passed', async () => {
    const props = {
      ...defaultProps,
      fileName: '',
    };
    render(<APIKeyDownloader {...props} />);
    const link = screen.getByText('download');
    await waitFor(() => {
      expect(link).toHaveProperty('download', 'apikey.json');
    });
    expect(link).toHaveProperty('href', 'http://localhost/download-link');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<APIKeyDownloader {...defaultProps} />);
    await waitFor(() => screen.getByText('download'));
    expect(container).toBeAccessible(componentName);
    expect(container).toHaveNoAxeViolations();
  });
});
