/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export function fileMatchesAccept(
  file: File,
  accept: readonly string[],
  fileExtensionRegExp: RegExp
) {
  if (!accept.length) {
    return true;
  }

  const fileName = file.name.toLowerCase();
  const mimeType = file.type.toLowerCase();
  const [fileExtension] = file.name.match(fileExtensionRegExp) ?? [];

  return accept.some((acceptedType) => {
    const normalizedType = acceptedType.trim().toLowerCase();

    if (!normalizedType) {
      return false;
    }

    if (normalizedType.startsWith('.')) {
      return (
        fileName.endsWith(normalizedType) ||
        fileExtension?.toLowerCase() === normalizedType
      );
    }

    if (normalizedType.endsWith('/*')) {
      return mimeType.startsWith(normalizedType.slice(0, -1));
    }

    return mimeType === normalizedType;
  });
}
