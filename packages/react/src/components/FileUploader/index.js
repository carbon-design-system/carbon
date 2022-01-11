/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as FeatureFlags from '@carbon/feature-flags';
import Filename from './Filename';
import FileUploader from './FileUploader';
import FileUploaderSkeleton from './FileUploader.Skeleton';
import FileUploaderButton from './FileUploaderButton';
import FileUploaderDropContainer from './FileUploaderDropContainer';
import FileUploaderItem from './FileUploaderItem';
import { createClassWrapper } from '../../internal/createClassWrapper';

export {
  Filename,
  FileUploaderSkeleton,
  FileUploaderButton,
  FileUploaderDropContainer,
  FileUploaderItem,
};

export default FeatureFlags.enabled('enable-v11-release')
  ? createClassWrapper(FileUploader)
  : FileUploader;
