/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import FileUploaderContainer from './preview_FileUploader';
import FileUploaderButtonComponent from './preview_FileUploader.Button';
import FileUploaderDropContainerComponent from './preview_FileUploader.DropContainer';
import FileUploaderItemComponent from './preview_FileUploader.Item';
import FileUploaderListComponent from './preview_FileUploader.List';

/**
 * Preview: Composable FileUploader component following the compound component pattern.
 * This provides a flexible, user-controlled alternative to the monolithic FileUploader.
 *
 * This component is in preview status. See docs/preview-code.md for more information.
 *
 * @example Basic usage with button
 * ```jsx
 * import { preview_FileUploader as FileUploader } from '@carbon/react';
 *
 * function MyComponent() {
 *   const [files, setFiles] = useState([]);
 *
 *   const handleAddFiles = (evt, { addedFiles }) => {
 *     const newFiles = addedFiles.map(file => ({
 *       uuid: generateUuid(),
 *       name: file.name,
 *       status: 'edit',
 *       invalid: file.size > 500000,
 *     }));
 *     setFiles(prev => [...prev, ...newFiles]);
 *   };
 *
 *   const handleDelete = (evt, { uuid }) => {
 *     setFiles(prev => prev.filter(f => f.uuid !== uuid));
 *   };
 *
 *   return (
 *     <FileUploader labelTitle="Upload files" labelDescription="Max 500kb">
 *       <FileUploader.Button onAddFiles={handleAddFiles} multiple>
 *         Add files
 *       </FileUploader.Button>
 *       <FileUploader.List>
 *         {files.map(file => (
 *           <FileUploader.Item
 *             key={file.uuid}
 *             uuid={file.uuid}
 *             name={file.name}
 *             status={file.status}
 *             invalid={file.invalid}
 *             errorSubject={file.invalid ? 'File size exceeds limit' : undefined}
 *             onDelete={handleDelete}
 *           />
 *         ))}
 *       </FileUploader.List>
 *     </FileUploader>
 *   );
 * }
 * ```
 *
 * @example With drag and drop
 * ```jsx
 * <FileUploader labelTitle="Upload files">
 *   <FileUploader.DropContainer
 *     labelText="Drag and drop files here or click to upload"
 *     onAddFiles={handleAddFiles}
 *     multiple
 *   />
 *   <FileUploader.List>
 *     {files.map(file => (
 *       <FileUploader.Item key={file.uuid} {...file} onDelete={handleDelete} />
 *     ))}
 *   </FileUploader.List>
 * </FileUploader>
 * ```
 *
 * @example With both button and drop container
 * ```jsx
 * <FileUploader labelTitle="Upload files">
 *   <FileUploader.Button onAddFiles={handleAddFiles}>
 *     Add files
 *   </FileUploader.Button>
 *   <FileUploader.DropContainer
 *     labelText="Or drag and drop files here"
 *     onAddFiles={handleAddFiles}
 *   />
 *   <FileUploader.List>
 *     {files.map(file => (
 *       <FileUploader.Item key={file.uuid} {...file} onDelete={handleDelete} />
 *     ))}
 *   </FileUploader.List>
 * </FileUploader>
 * ```
 */
const FileUploaderComposable = Object.assign(FileUploaderContainer, {
  Button: FileUploaderButtonComponent,
  DropContainer: FileUploaderDropContainerComponent,
  Item: FileUploaderItemComponent,
  List: FileUploaderListComponent,
});

// Export with preview_ prefix as per docs/preview-code.md
export { FileUploaderComposable as preview_FileUploader };

// Also export default for internal use (tests, stories)
export default FileUploaderComposable;
