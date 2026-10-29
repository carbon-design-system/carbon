#!/usr/bin/env node
/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  readFileSync,
  readdirSync,
  mkdirSync,
  rmSync,
  writeFileSync,
  existsSync,
} from 'node:fs';
import { join, dirname } from 'node:path';
import { ENTRIES_ROOT, vendorPrefixedCopy, WC_ES, WC_ROOT } from '../vendor.js';

/**
 * Wrapper Generator for @carbon/angular.
 *
 * Automatically parses `packages/web-components/custom-elements.json` and emits:
 * - Standalone Angular component wrapper classes (@Component({ selector: 'cds-ng-*' }))
 * - Custom element registrations with the cds-ng-* prefix (ADR 0020)
 * - Typed @Input() properties forwarded to the host element in ngOnChanges
 * - Typed @Output() event emitters — never for native DOM events (change/input/invalid)
 * - ControlValueAccessor for form-associated components
 * - Barrel index.ts files
 *
 * Architecture (ADR 0015, ADR 0020): the Angular wrapper's selector IS the web component tag.
 * The template contains only <ng-content />, so the host element IS the web component.
 * Inputs are forwarded to this._el.nativeElement in ngOnChanges (host = WC element).
 *
 * Usage:
 *   # Generate all components from manifest
 *   node tasks/generate-wrappers/index.js
 *
 *   # Generate a single tag
 *   node tasks/generate-wrappers/index.js --tag cds-button
 */

const MANIFEST_PATH = join(WC_ROOT, 'custom-elements.json');

/**
 * Resolve the vendored `@carbon/web-components` barrel that registers a tag's family.
 *
 * Class files are pure (ADR 0007): importing one registers nothing, and it
 * never registers the child elements the component renders (e.g. `cds-ng-modal`
 * renders `cds-ng-dialog`). The folder barrel registers all of them.
 *
 * `tag.path` is the manifest module path, `es/components/<dir>/<file>.js`.
 * Folders can be nested (`date-picker/next`) and a folder without an
 * `index.js` (`date-picker/next/components`) is covered by its nearest parent
 * barrel.
 *
 * @returns {string} import specifier, e.g.
 *   `#carbon-ng/components/modal/index.js`
 */
function resolveBarrelImport(tag) {
  const segments = dirname(tag.path.replace(/^es\//, '')).split('/');
  while (segments.length > 1) {
    if (existsSync(join(WC_ES, ...segments, 'index.js'))) {
      return `#carbon-ng/${segments.join('/')}/index.js`;
    }
    segments.pop();
  }
  throw new Error(`No barrel found for <${tag.name}> (${tag.path})`);
}

/** Helper to convert kebab-case or prefix-kebab to PascalCase */
function toPascalCase(str) {
  return str
    .replace(/^cds-(ng-)?/, '')
    .split('-')
    .map((seg) => seg.charAt(0).toUpperCase() + seg.slice(1))
    .join('');
}

/** Helper to convert kebab-case to camelCase */
function toCamelCase(str) {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

/**
 * Known manifest type errors, keyed by `"tagName.propertyName"`.
 * The manifest analyser sometimes infers the wrong type from the default value
 * rather than the declared TypeScript type. Fix the generator output here
 * until the manifest is corrected upstream.
 *
 * TODO(@carbon/web-components): remove entries once the manifest is fixed.
 */
const MANIFEST_TYPE_OVERRIDES = {
  // cds-checkbox: warnText is declared as `string` but the manifest emits
  // `"type": "boolean"` because the default value is `""` (empty string),
  // which the analyser misreads. Filed upstream.
  'cds-checkbox.warnText': 'string',
};

/** Sanitize type strings into valid TypeScript types */
function sanitizeType(typeStr, tagName, propName) {
  const override = MANIFEST_TYPE_OVERRIDES[`${tagName}.${propName}`];
  if (override) return override;
  if (!typeStr) return 'any';
  const trimmed = typeStr.trim();
  if (
    trimmed === 'string' ||
    trimmed === 'boolean' ||
    trimmed === 'number' ||
    trimmed === 'any' ||
    trimmed === 'unknown'
  ) {
    return trimmed;
  }
  if (
    trimmed === 'string | undefined' ||
    trimmed === 'number | undefined' ||
    trimmed === 'boolean | undefined'
  ) {
    return trimmed;
  }
  if (/^("|')[^"']*("|')(\s*\|\s*("|')[^"']*("|'))*$/.test(trimmed)) {
    return trimmed;
  }
  // The manifest resolves most enums to string-literal unions. An enum name it
  // leaves unresolved (e.g. LINK_SIZE_TYPE) is string-valued.
  if (/^[A-Z0-9_]+$/.test(trimmed)) {
    return 'string';
  }
  if (/^[A-Z0-9_]+\s*\|\s*undefined$/.test(trimmed)) {
    return 'string | undefined';
  }
  // A union that already includes `string` (e.g. `BUTTON_SIZE | string |
  // undefined`) accepts any string; keep only its nullish members.
  const members = trimmed.split('|').map((member) => member.trim());
  if (
    members.includes('string') &&
    members.every((member) => /^([\w.]+|'[^']*'|"[^"]*")$/.test(member))
  ) {
    return ['string', 'null', 'undefined']
      .filter((member) => members.includes(member))
      .join(' | ');
  }
  return 'any';
}

function sanitizeDefault(defaultVal, type) {
  if (
    !defaultVal ||
    defaultVal === 'undefined' ||
    defaultVal === '"undefined"' ||
    defaultVal === '""' ||
    defaultVal === "''"
  ) {
    return undefined;
  }
  if (type === 'boolean') {
    return defaultVal === 'true' ? 'true' : 'false';
  }
  if (type === 'number') {
    // The manifest sometimes wraps numbers in quotes (e.g. `"0"`).
    const raw =
      defaultVal.startsWith('"') && defaultVal.endsWith('"')
        ? defaultVal.slice(1, -1)
        : defaultVal;
    return !isNaN(Number(raw)) ? raw : undefined;
  }
  // Accept a quoted string default for any type that is a string or a
  // string-literal union (e.g. `'primary' | 'secondary' | ...`). The manifest
  // emits source literals (`'primary'`); normalise them to `"primary"`.
  if (/^'[^'"\\]*'$/.test(defaultVal)) {
    return `"${defaultVal.slice(1, -1)}"`;
  }
  if (defaultVal.startsWith('"') && defaultVal.endsWith('"')) {
    return defaultVal;
  }
  return undefined;
}

/**
 * Public, writable fields that are internal state, not consumer API. Statics,
 * protected and read-only members are already excluded by `toTag`.
 */
const IGNORED_PROPERTIES = new Set(['hasMainContent', 'cardContext']);

/**
 * Native DOM event names that MUST NOT get an @Output — see ADR 0015 §4.
 * An Angular (name)="..." listener on the host already catches them once.
 * Emitting a second time from an @Output causes double-calls (or a loop for
 * 'change'/'input' re-emitted via @HostListener on the same element).
 */
const NATIVE_DOM_EVENTS = new Set([
  'change',
  'input',
  'invalid',
  'focus',
  'blur',
  'focusin',
  'focusout',
  'click',
  'dblclick',
  'mousedown',
  'mouseup',
  'mouseover',
  'mouseout',
  'mousemove',
  'keydown',
  'keyup',
  'keypress',
  'submit',
  'reset',
  'scroll',
  'resize',
  'error',
  'load',
  'unload',
]);

/**
 * Tags that @carbon/angular intentionally does not wrap.
 *
 * ADR 0021: the classic and fluid Date Pickers bring in flatpickr.
 * The Preview Date Picker (`cds-preview-date-picker*`) is still wrapped.
 * The Preview Fluid Date Picker extends the classic fluid class, so it
 * also carries flatpickr until the web components decouple that dependency.
 */
const SKIPPED_TAGS = new Set([
  'cds-date-picker',
  'cds-date-picker-input',
  'cds-date-picker-input-skeleton',
  'cds-fluid-date-picker',
  'cds-fluid-date-picker-input',
  'cds-fluid-date-picker-skeleton',
  'cds-preview-fluid-date-picker',
]);

/**
 * Convert a Custom Elements Manifest declaration into the tag shape the
 * generator works with. Only public, writable instance fields become inputs:
 * static members (`is`, `formAssociated`), protected members and read-only
 * fields (getters and form internals such as `validity`) are not settable.
 *
 * @param {object} declaration a `modules[].declarations[]` entry with a
 *   `tagName`
 * @param {string} modulePath the module path, e.g.
 *   `es/components/button/button.js`
 */
function toTag(declaration, modulePath) {
  const members = declaration.members || [];
  return {
    name: declaration.tagName,
    path: modulePath,
    description: declaration.description || declaration.summary || '',
    formAssociated: members.some(
      (member) => member.name === 'formAssociated' && member.static
    ),
    properties: members
      .filter(
        (member) =>
          member.kind === 'field' &&
          !member.static &&
          !member.readonly &&
          (member.privacy ?? 'public') === 'public'
      )
      .map((member) => ({
        name: member.name,
        type: member.type?.text,
        default: member.default,
        description: member.description,
      })),
    events: (declaration.events || []).map((event) => ({
      name: event.name,
      description: event.description,
    })),
  };
}

/**
 * Events (besides `input`/`change`) that signal a form-associated element's
 * value changed, e.g. `cds-ng-checkbox-changed`, `cds-ng-dropdown-selected`.
 */
const VALUE_CHANGE_EVENT = /-(changed|selected|input)$/;

/**
 * The secondary entry point a wrapper belongs to: the web component folder
 * whose barrel it imports, e.g. `button` for `#carbon-ng/components/button/…`.
 */
function entryForBarrel(barrelImport) {
  const match = barrelImport.match(/^#carbon-ng\/components\/([^/]+)\//);
  if (!match) {
    throw new Error(`No entry point for barrel ${barrelImport}`);
  }
  return match[1];
}

function generateWrapperForTag(tag) {
  const tagName = tag.name.replace(/^cds-/, 'cds-ng-'); // e.g. "cds-ng-button"
  const displayName = toPascalCase(tag.name); // e.g. "Button"
  const className = `${displayName}Component`; // e.g. "ButtonComponent"

  // Import the folder barrel of the vendored prefixed build so child elements register.
  const wcImportPath = resolveBarrelImport(tag);

  // Form-associated elements with a `value`/`checked` get a ControlValueAccessor
  // so `ngModel`, `formControl` and `formControlName` work.
  const allPropNames = new Set((tag.properties || []).map((p) => p.name));
  const cvaProp = !tag.formAssociated
    ? null
    : allPropNames.has('checked')
      ? 'checked'
      : allPropNames.has('value')
        ? 'value'
        : null;

  // Inputs have no Angular-side default: an unbound input is never forwarded,
  // so the web component keeps its own default.
  const inputs = [];
  const processedNames = new Set();

  if (Array.isArray(tag.properties)) {
    for (const prop of tag.properties) {
      if (IGNORED_PROPERTIES.has(prop.name) || prop.name.startsWith('_')) {
        continue;
      }
      if (processedNames.has(prop.name)) {
        continue;
      }
      processedNames.add(prop.name);

      let type = sanitizeType(prop.type, tag.name, prop.name);
      const manifestDefault = sanitizeDefault(prop.default, type);

      // A subclass can default an inherited property to a value outside the
      // union the parent declares (`cds-number-input` defaults `type` to
      // 'number'). The element uses that value, so the input must accept it.
      const literals = [...type.matchAll(/'([^']*)'|"([^"]*)"/g)].map(
        (match) => match[1] ?? match[2]
      );
      if (
        literals.length > 0 &&
        /^("|')[^"']*("|')(\s*\|\s*("|')[^"']*("|'))*$/.test(type) &&
        manifestDefault?.startsWith('"') &&
        !literals.includes(manifestDefault.slice(1, -1))
      ) {
        type = `${type} | '${manifestDefault.slice(1, -1)}'`;
      }

      inputs.push({
        name: prop.name,
        type,
        description: prop.description || '',
      });
    }
  }

  // Process custom events. Skip native DOM events (ADR 0015 §4).
  const outputs = [];
  if (Array.isArray(tag.events)) {
    for (const ev of tag.events) {
      const originalEventName = ev.name;
      if (NATIVE_DOM_EVENTS.has(originalEventName)) {
        // No @Output — Angular's (eventName)="..." binding catches the DOM event
        // once directly on the host. Adding an @Output with the same name causes
        // a double-call or a call-stack overflow (measured: change → 580 calls).
        continue;
      }
      const eventName = originalEventName.replace(/^cds-/, 'cds-ng-');
      let outputName = toCamelCase(originalEventName);
      if (processedNames.has(outputName)) {
        outputName = `${outputName}Change`;
      }
      outputs.push({
        eventName: eventName,
        outputName: outputName,
        description: ev.description || '',
      });
    }
  }

  // Host listeners, keyed by event name. One event can feed an output and also
  // report a form value, so each event maps to a list of statements. Host
  // listeners need no ElementRef or cleanup, and Angular schedules change
  // detection for them, which zoneless applications rely on.
  const hostListeners = new Map();
  const listen = (eventName, statement) => {
    const statements = hostListeners.get(eventName) ?? [];
    if (!statements.includes(statement)) {
      statements.push(statement);
    }
    hostListeners.set(eventName, statements);
  };
  for (const out of outputs) {
    listen(out.eventName, `${out.outputName}.emit($event)`);
  }
  if (cvaProp) {
    const valueEvents = [
      'input',
      'change',
      ...outputs
        .map((out) => out.eventName)
        .filter((name) => VALUE_CHANGE_EVENT.test(name)),
    ];
    for (const eventName of valueEvents) {
      listen(eventName, 'handleValueEvent()');
    }
    listen('focusout', 'handleTouched()');
  }
  const hostMetadata = hostListeners.size
    ? `
  host: {
${[...hostListeners]
  .map(
    ([eventName, statements]) =>
      `    '(${eventName})': '${statements.join('; ')}',`
  )
  .join('\n')}
  },`
    : '';

  const hasInputs = inputs.length > 0;
  const hasOutputs = outputs.length > 0;

  const usesBooleanAttribute = inputs.some((input) => input.type === 'boolean');
  const angularImports = [
    ...(usesBooleanAttribute ? ['booleanAttribute'] : []),
    'ChangeDetectionStrategy',
    'Component',
    ...(hasInputs && !cvaProp ? ['ElementRef', 'inject'] : []),
    ...(hasOutputs ? ['EventEmitter', 'Output'] : []),
    ...(cvaProp ? ['forwardRef'] : []),
    ...(hasInputs ? ['Input', 'OnChanges', 'SimpleChanges'] : []),
    'ViewEncapsulation',
  ].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

  // Form wrappers get the host element from CdsValueAccessor.
  const hostElement = cvaProp ? 'this.hostElement' : 'this._el.nativeElement';
  const classBodyExtras = [
    cvaProp
      ? `  protected readonly valueProperty = '${cvaProp}' as const;`
      : '',
    hasInputs && !cvaProp
      ? `  private readonly _el = inject(ElementRef<HTMLElement>);`
      : '',
    hasInputs
      ? `  /** Forwards changed inputs to the host web component as properties. */
  ngOnChanges(changes: SimpleChanges): void {
    const el = ${hostElement};
    for (const key of Object.keys(changes)) {
      (el as any)[key] = changes[key].currentValue;
    }
  }`
      : '',
  ].filter(Boolean);

  // Boolean inputs use `booleanAttribute` so the bare-attribute form
  // (`<cds-ng-button disabled>`, which Angular passes as `""`) is treated as true.
  const inputDeclarations = inputs
    .map((input) => {
      const doc = input.description
        ? `  /** ${input.description.replace(/\n/g, ' ')} */\n`
        : '';
      const decorator =
        input.type === 'boolean'
          ? '@Input({ transform: booleanAttribute })'
          : '@Input()';
      return `${doc}  ${decorator} ${input.name}?: ${input.type};`;
    })
    .join('\n\n');

  const outputDeclarations = outputs
    .map((out) => {
      const doc = out.description
        ? `  /** ${out.description.replace(/\n/g, ' ')} */\n`
        : '';
      return `${doc}  @Output() readonly ${out.outputName} = new EventEmitter<any>();`;
    })
    .join('\n\n');

  const classBody = [inputDeclarations, outputDeclarations, ...classBodyExtras]
    .filter(Boolean)
    .join('\n\n');

  const code = `/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* -------------------------------------------------------------------------
 * THIS FILE IS AUTOMATICALLY GENERATED FROM custom-elements.json.
 * DO NOT EDIT MANUALLY.
 * ------------------------------------------------------------------------- */

import {
  ${angularImports.join(',\n  ')},
} from '@angular/core';${
    cvaProp
      ? `\nimport { NG_VALUE_ACCESSOR } from '@angular/forms';\nimport { CdsValueAccessor } from '@carbon/angular';`
      : ''
  }
import '${wcImportPath}';

/**
 * ${tag.description || `Angular wrapper for ${tagName}.`}
 *
 * Selector : \`${tagName}\` (host element IS the web component — ADR 0015, ADR 0020)
 */
@Component({
  selector: '${tagName}',
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,${hostMetadata}${
    cvaProp
      ? `
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ${className}),
      multi: true,
    },
  ],`
      : ''
  }
})
export class ${className}${cvaProp ? ' extends CdsValueAccessor' : ''}${
    hasInputs ? ' implements OnChanges' : ''
  } {
${classBody}
}
`;

  const indexCode = `/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export * from './${displayName}.component';
`;

  return { displayName, entry: entryForBarrel(wcImportPath), code, indexCode };
}

function main() {
  if (!existsSync(MANIFEST_PATH)) {
    console.error(`Error: Manifest file not found at ${MANIFEST_PATH}`);
    console.error(`Run 'yarn workspace @carbon/web-components cem' first.`);
    process.exit(1);
  }

  // Ensure prefixed vendor build exists before emitting wrappers
  vendorPrefixedCopy();

  const manifest = JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'));
  const tags = (manifest.modules || []).flatMap((module) =>
    (module.declarations || [])
      .filter((declaration) => declaration.tagName)
      .map((declaration) => toTag(declaration, module.path))
  );

  // An empty list means the manifest format changed, not that there is
  // nothing to wrap. Fail instead of publishing a package without wrappers.
  if (tags.length === 0) {
    console.error(`Error: No custom elements found in ${MANIFEST_PATH}`);
    process.exit(1);
  }

  const args = process.argv.slice(2);
  const tagFilterIndex = args.indexOf('--tag');
  const targetTag = tagFilterIndex !== -1 ? args[tagFilterIndex + 1] : null;

  const tagsToProcess = targetTag
    ? tags.filter((t) => t.name === targetTag)
    : tags;

  if (tagsToProcess.length === 0) {
    console.error(`No tags found matching filter: ${targetTag}`);
    process.exit(1);
  }

  console.log(
    `\n🚀 Generating ${tagsToProcess.length} Angular wrapper(s) from custom-elements.json...\n`
  );

  // A full run removes every entry point folder (but not the vendored copy),
  // so wrappers for tags that are now skipped (ADR 0021) or removed from the
  // manifest do not linger.
  if (!targetTag) {
    for (const dirent of readdirSync(ENTRIES_ROOT, { withFileTypes: true })) {
      if (
        dirent.isDirectory() &&
        dirent.name !== 'vendor' &&
        !dirent.name.startsWith('.')
      ) {
        rmSync(join(ENTRIES_ROOT, dirent.name), {
          recursive: true,
          force: true,
        });
      }
    }
  }

  let generatedCount = 0;
  const failedTags = [];

  for (const tag of tagsToProcess) {
    // Skip sub-elements that don't need top-level component wrappers or internal helpers
    if (!tag.name.startsWith('cds-')) {
      continue;
    }

    // Skip tags that @carbon/angular intentionally does not expose (ADR 0021).
    if (SKIPPED_TAGS.has(tag.name)) {
      console.log(`  ⏭  Skipped  <${tag.name}> (ADR 0021)`);
      continue;
    }

    try {
      const { displayName, entry, code, indexCode } =
        generateWrapperForTag(tag);
      // Wrappers are written straight into their secondary entry point folder;
      // build-entries adds each entry's index.ts and ng-package.json.
      const componentDir = join(ENTRIES_ROOT, entry, displayName);

      mkdirSync(componentDir, { recursive: true });
      writeFileSync(
        join(componentDir, `${displayName}.component.ts`),
        code,
        'utf8'
      );
      writeFileSync(join(componentDir, 'index.ts'), indexCode, 'utf8');

      generatedCount++;
      console.log(
        `  ✓ Generated <${tag.name}> -> ${entry}/${displayName}Component`
      );
    } catch (err) {
      failedTags.push(tag.name);
      console.error(
        `  ✗ Error generating wrapper for <${tag.name}>:`,
        err.message
      );
    }
  }

  if (failedTags.length > 0) {
    console.error(
      `\nError: ${failedTags.length} wrapper(s) failed to generate: ${failedTags.join(', ')}`
    );
    process.exit(1);
  }

  console.log(
    `\n✨ Successfully generated ${generatedCount} Angular wrapper component(s).\n`
  );
}

main();
