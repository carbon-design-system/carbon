/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from 'react';

interface APIKeyDownloaderProps {
  apiKey?: string;
  body?: string;
  fileName?: string;
  fileType: 'txt' | 'json';
  linkText: string;
  downloadLinkLabel?: string;
}

export const APIKeyDownloader = ({
  apiKey,
  body,
  fileName,
  fileType,
  linkText,
  downloadLinkLabel,
}: APIKeyDownloaderProps) => {
  const [linkProps, setLinkProps] = useState({});

  useEffect(() => {
    const generateLinkProps = async () => {
      const data = fileType === 'txt' ? apiKey : JSON.stringify({ apiKey });
      const blob = new Blob([data as BlobPart], {
        type: fileType === 'txt' ? 'text/plain' : 'application/json',
      });
      const href = await URL.createObjectURL(blob);
      const download = `${fileName || 'apikey'}.${fileType}`;
      setLinkProps({ href, download });
    };

    generateLinkProps();
  }, [apiKey, fileName, fileType]);

  return (
    <div className="apikey-modal-pattern__download-container">
      <p className="apikey-modal-pattern__messaging-text">
        {body}{' '}
        <a
          {...linkProps}
          className="apikey-modal-pattern__download-link"
          aria-label={downloadLinkLabel ?? linkText}
          role="button"
        >
          {downloadLinkLabel ?? linkText}
        </a>
      </p>
    </div>
  );
};
