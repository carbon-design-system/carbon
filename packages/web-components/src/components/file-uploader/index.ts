/**
 * Copyright IBM Corp. 2021, 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import '../button/index';
import '../loading/index';
import '../skeleton-text/index';
import CDSFileUploader from './file-uploader';
import CDSFileUploaderItem from './file-uploader-item';
import CDSFileUploaderDropContainer from './file-uploader-drop-container';
import CDSFileUploaderButton from './file-uploader-button';
import CDSFileUploaderSkeleton from './file-uploader-skeleton';

export {
  CDSFileUploader,
  CDSFileUploaderItem,
  CDSFileUploaderDropContainer,
  CDSFileUploaderButton,
  CDSFileUploaderSkeleton,
};

defineCustomElement(CDSFileUploader);
defineCustomElement(CDSFileUploaderItem);
defineCustomElement(CDSFileUploaderDropContainer);
defineCustomElement(CDSFileUploaderButton);
defineCustomElement(CDSFileUploaderSkeleton);
