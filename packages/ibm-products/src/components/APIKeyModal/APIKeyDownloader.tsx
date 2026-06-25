/**
 * Copyright IBM Corp. 2021, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { pkg } from '../../settings';
const componentName = 'APIKeyDownloader';

interface APIKeyDownloaderProps {
  /**
   * the api key that's displayed to the user when a request to create is fulfilled.
   */
  apiKey?: string;
  /**
   * the content that appears that indicates the key is downloadable
   */
  body?: string;
  /**
   * designates the name of downloadable json file with the key. if not specified will default to 'apikey'
   */
  fileName?: string;
  /**
   * designates the file type for the downloadable key
   */
  fileType: 'txt' | 'json';
  /**
   * anchor text for the download link
   */
  linkText: string;
  /**
   * Aria-label for the download link
   */
  downloadLinkLabel;
}

export const APIKeyDownloader = (props: APIKeyDownloaderProps) => {
  const { apiKey, body, fileName, fileType, linkText, downloadLinkLabel } =
    props;
  const [linkProps, setLinkProps] = useState({});

  useEffect(() => {
    const generateLinkProps = async () => {
      const data = fileType === 'txt' ? apiKey : JSON.stringify({ apiKey });
      const blob = new Blob([data as BlobPart], {
        type: fileType === 'txt' ? 'text/plain' : 'application/json',
      });
      const href = await URL.createObjectURL(blob);
      const download = `${fileName || 'apikey'}.${fileType}`;
      const props = {
        href,
        download,
      };
      setLinkProps(props);
    };

    generateLinkProps();
  }, [apiKey, fileName, fileType]);

  return (
    <div className={`${pkg.prefix}--apikey-modal__download-container`}>
      <p className={`${pkg.prefix}--apikey-modal__messaging-text`}>
        {body}{' '}
        <a
          {...linkProps}
          className={`${pkg.prefix}--apikey-modal__download-link`}
          aria-label={downloadLinkLabel ?? linkText}
          role="button"
        >
          {downloadLinkLabel ?? linkText}
        </a>
      </p>
    </div>
  );
};

APIKeyDownloader.displayName = componentName;
APIKeyDownloader.propTypes = {
  /**
   * the api key that's displayed to the user when a request to create is fulfilled.
   */
  apiKey: PropTypes.string.isRequired,
  /**
   * body content for the downloader
   */
  body: PropTypes.string,
  /**
   * aria-label for the download link
   */
  downloadLinkLabel: PropTypes.string,
  /**
   * designates the name of downloadable json file with the key. if not specified will default to 'apikey'
   */
  fileName: PropTypes.string.isRequired,
  /**
   * designates the file type for the downloadable key
   */
  fileType: PropTypes.oneOf(['txt', 'json']).isRequired,
  /**
   * anchor text for the download link
   */
  linkText: PropTypes.string.isRequired,
};
