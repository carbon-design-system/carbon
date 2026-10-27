#!/usr/bin/env node
/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { readFileSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Wrapper Generator for @carbon/angular.
 *
 * Automatically parses `packages/web-components/custom-elements.json` and emits:
 * - Standalone Angular component wrapper classes (@Component({ selector: 'cds-*' }))
 * - Custom element registrations with the default tag (no cds-ng-* renaming)
 * - Typed @Input() properties forwarded to the host element in ngOnChanges
 * - Typed @Output() event emitters — never for native DOM events (change/input/invalid)
 * - ControlValueAccessor for form-associated components
 * - Barrel index.ts files
 *
 * Architecture (ADR 0015): the Angular wrapper's selector IS the web component tag.
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

const WC_ROOT = join(__dirname, '../../../web-components');
const MANIFEST_PATH = join(WC_ROOT, 'custom-elements.json');

const OUTPUT_DIR = join(__dirname, '../../src/generated');

/**
 * Resolve the `@carbon/web-components` barrel that registers a tag's family.
 *
 * Class files are pure (ADR 0007): importing one registers nothing, and it
 * never registers the child elements the component renders (e.g. `cds-modal`
 * renders `cds-dialog`). The folder barrel registers all of them.
 *
 * `tag.path` is `./src/components/<dir>/<file>.ts`. Folders can be nested
 * (`date-picker/next`) and a folder without an `index.ts`
 * (`date-picker/next/components`) is covered by its nearest parent barrel.
 *
 * @returns {string} import specifier, e.g.
 *   `@carbon/web-components/es/components/modal/index.js`
 */
function resolveBarrelImport(tag) {
  const segments = dirname(tag.path.replace(/^\.\/src\//, '')).split('/');
  while (segments.length > 1) {
    if (existsSync(join(WC_ROOT, 'src', ...segments, 'index.ts'))) {
      return `@carbon/web-components/es/${segments.join('/')}/index.js`;
    }
    segments.pop();
  }
  throw new Error(`No barrel found for <${tag.name}> (${tag.path})`);
}

/** Helper to convert kebab-case or prefix-kebab to PascalCase */
function toPascalCase(str) {
  return str
    .replace(/^cds-/, '')
    .split('-')
    .map((seg) => seg.charAt(0).toUpperCase() + seg.slice(1))
    .join('');
}

/** Helper to convert kebab-case to camelCase */
function toCamelCase(str) {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

/** Sanitize type strings into valid TypeScript types */
function sanitizeType(typeStr) {
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
  if (/^[A-Z0-9_]+$/.test(trimmed)) {
    return 'string';
  }
  if (/^[A-Z0-9_]+\s*\|\s*undefined$/.test(trimmed)) {
    return 'string | undefined';
  }
  return 'any';
}

function sanitizeDefault(defaultVal, type) {
  if (
    !defaultVal ||
    defaultVal === 'undefined' ||
    defaultVal === '""' ||
    defaultVal === '""'
  ) {
    return undefined;
  }
  if (type === 'boolean') {
    return defaultVal === 'true' ? 'true' : 'false';
  }
  if (type === 'number') {
    return !isNaN(Number(defaultVal)) ? defaultVal : undefined;
  }
  if (type === 'string' || type === 'string | undefined') {
    if (defaultVal.startsWith('"') && defaultVal.endsWith('"')) {
      return defaultVal;
    }
  }
  return undefined;
}

/** Internal properties on Lit elements to ignore */
const IGNORED_PROPERTIES = new Set([
  'styles',
  'is',
  '_hasIcon',
  '_handleSlotChange',
  '_handleDisabledClick',
  '_checkBadgeWarning',
  '_handleOver',
  '_handleHoverOut',
  '_handleFocus',
  '_handleFocusout',
  'hasMainContent',
  'shadowRoot',
  'shadowRootOptions',
  'updateComplete',
  'elementProperties',
  'properties',
  'elementStyles',
  'TRIGGER_KEYS',
  'TABLE_SORT_CYCLES',
  'enabledWarnings',
  'enableWarning',
  'disableWarning',
  'cardContext',
  // Lit reactive-element internals
  'renderRoot',
  'isUpdatePending',
  'hasUpdated',
  // Form-associated / validity internals. These are read-only state owned by
  // the web component (or the browser), not something a consumer can set.
  'formAssociated',
  'formValueProperties',
  'form',
  'labels',
  'validity',
  'validationMessage',
  'willValidate',
]);

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
  'cds-fluid-date-picker',
  'cds-fluid-date-picker-input',
  'cds-fluid-date-picker-skeleton',
  'cds-preview-fluid-date-picker',
]);

/**
 * Events (besides `input`/`change`) that signal a form-associated element's
 * value changed, e.g. `cds-checkbox-changed`, `cds-dropdown-selected`.
 */
const VALUE_CHANGE_EVENT = /-(changed|selected|input)$/;

function generateWrapperForTag(tag) {
  const tagName = tag.name; // e.g. "cds-button"
  const displayName = toPascalCase(tagName); // e.g. "Button"
  const className = `${displayName}Component`; // e.g. "ButtonComponent"

  // Import the folder barrel, not the class file, so child elements register.
  // e.g. path: "./src/components/modal/modal.ts" -> "@carbon/web-components/es/components/modal/index.js"
  const wcImportPath = resolveBarrelImport(tag);

  // Form-associated elements with a `value`/`checked` get a ControlValueAccessor
  // so `ngModel`, `formControl` and `formControlName` work.
  const allPropNames = new Set((tag.properties || []).map((p) => p.name));
  const isFormAssociated = allPropNames.has('formAssociated');
  const cvaProp = !isFormAssociated
    ? null
    : allPropNames.has('checked')
      ? 'checked'
      : allPropNames.has('value')
        ? 'value'
        : null;

  // Process properties. All inputs are forwarded as properties in ngOnChanges
  // (host element = the web component itself). No [attr.x] bindings in template.
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

      const propName = prop.name;
      const type = sanitizeType(prop.type);
      const isBoolean =
        type === 'boolean' ||
        prop.default === 'false' ||
        prop.default === 'true';
      const cleanDefault = sanitizeDefault(prop.default, type);

      inputs.push({
        name: propName,
        type: type,
        isBoolean: isBoolean,
        description: prop.description || '',
        default: cleanDefault,
      });
    }
  }

  // Process custom events. Skip native DOM events (ADR 0015 §4).
  const outputs = [];
  if (Array.isArray(tag.events)) {
    for (const ev of tag.events) {
      const eventName = ev.name;
      if (NATIVE_DOM_EVENTS.has(eventName)) {
        // No @Output — Angular's (eventName)="..." binding catches the DOM event
        // once directly on the host. Adding an @Output with the same name causes
        // a double-call or a call-stack overflow (measured: change → 580 calls).
        continue;
      }
      let outputName = toCamelCase(eventName);
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

  // Template: only <ng-content /> — host element IS the web component.
  // No inner element, no attribute bindings, no @ViewChild needed.
  const template = `    <ng-content />`;

  // Events that tell a ControlValueAccessor the value changed.
  // We listen on the host element (this._el.nativeElement) in ngOnInit.
  const cvaEvents = cvaProp
    ? [
        'input',
        'change',
        ...outputs
          .map((out) => out.eventName)
          .filter((name) => VALUE_CHANGE_EVENT.test(name)),
      ]
    : [];
  const uniqueCvaEvents = [...new Set(cvaEvents)];

  // All inputs need forwarding — host IS the WC, Angular doesn't set them.
  const hasInputs = inputs.length > 0;
  const needsElementRef = hasInputs || cvaProp;

  const usesBooleanAttribute = inputs.some((input) => input.type === 'boolean');
  const angularImports = [
    ...(usesBooleanAttribute ? ['booleanAttribute'] : []),
    'Component',
    ...(needsElementRef ? ['ElementRef', 'inject'] : []),
    'EventEmitter',
    'Input',
    ...(hasInputs ? ['OnChanges', 'SimpleChanges'] : []),
    ...(cvaProp ? ['OnInit', 'forwardRef'] : []),
    'Output',
    'ViewEncapsulation',
  ].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

  const implementsList = [
    ...(hasInputs ? ['OnChanges'] : []),
    ...(cvaProp ? ['OnInit', 'ControlValueAccessor'] : []),
  ];

  const propertyInputsConst = hasInputs
    ? `\nconst PROPERTY_INPUTS = new Set<string>([${inputs
        .map((input) => `'${input.name}'`)
        .join(', ')}]);\n`
    : '';

  // In the host-is-WC design the element ref is obtained via inject(ElementRef)
  // in the constructor, not @ViewChild — there is no inner element to query.
  const classBodyExtras = [
    needsElementRef
      ? `  private readonly _el = inject(ElementRef<HTMLElement>);`
      : '',
    hasInputs
      ? `  /** Forwards changed inputs to the host web component as properties. */
  ngOnChanges(changes: SimpleChanges): void {
    const el = this._el.nativeElement;
    for (const key of Object.keys(changes)) {
      if (PROPERTY_INPUTS.has(key)) {
        (el as any)[key] = changes[key].currentValue;
      }
    }
  }`
      : '',
    cvaProp
      ? `  private _cvaOnChange: (value: any) => void = () => {};
  private _cvaOnTouched: () => void = () => {};

  ngOnInit(): void {
    const el = this._el.nativeElement as any;
    for (const eventName of [${uniqueCvaEvents
      .map((name) => `'${name}'`)
      .join(', ')}]) {
      el.addEventListener(eventName, () =>
        this._cvaOnChange(el.${cvaProp})
      );
    }
    el.addEventListener('focusout', () => this._cvaOnTouched());
  }

  writeValue(value: any): void {
    (this._el.nativeElement as any).${cvaProp} = value ?? ${cvaProp === 'checked' ? 'false' : "''"};
  }

  registerOnChange(fn: (value: any) => void): void {
    this._cvaOnChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._cvaOnTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    (this._el.nativeElement as any).disabled = isDisabled;
  }`
      : '',
  ].filter(Boolean);

  // Build TypeScript class members.
  // Boolean inputs use `booleanAttribute` so the bare-attribute form
  // (`<cds-button disabled>`, which Angular passes as `""`) is treated as true.
  const inputDeclarations = inputs
    .map((input) => {
      const doc = input.description
        ? `  /** ${input.description.replace(/\n/g, ' ')} */\n`
        : '';
      const decorator =
        input.type === 'boolean'
          ? '@Input({ transform: booleanAttribute })'
          : '@Input()';
      if (input.default !== undefined) {
        return `${doc}  ${decorator} ${input.name}: ${input.type} = ${input.default};`;
      }
      if (input.isBoolean) {
        return `${doc}  ${decorator} ${input.name}: ${input.type} = false;`;
      }
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
      ? `\nimport { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';`
      : ''
  }
import '${wcImportPath}';
${propertyInputsConst}

/**
 * ${tag.description || `Angular wrapper for ${tagName}.`}
 *
 * Selector : \`${tagName}\` (host element IS the web component — ADR 0015)
 */
@Component({
  selector: '${tagName}',
  template: \`
${template}
  \`,
  encapsulation: ViewEncapsulation.None,
  standalone: true,${
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
export class ${className}${
    implementsList.length ? ` implements ${implementsList.join(', ')}` : ''
  } {
${inputDeclarations}

${outputDeclarations}${
    classBodyExtras.length ? '\n\n' + classBodyExtras.join('\n\n') : ''
  }
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

  return { displayName, code, indexCode };
}

function main() {
  if (!existsSync(MANIFEST_PATH)) {
    console.error(`Error: Manifest file not found at ${MANIFEST_PATH}`);
    console.error(`Run 'yarn workspace @carbon/web-components wca' first.`);
    process.exit(1);
  }

  const manifest = JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'));
  const tags = manifest.tags || [];

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

  const generatedExports = [];

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

    const { displayName, code, indexCode } = generateWrapperForTag(tag);
    const componentDir = join(OUTPUT_DIR, displayName);
    mkdirSync(componentDir, { recursive: true });

    writeFileSync(
      join(componentDir, `${displayName}.component.ts`),
      code,
      'utf8'
    );
    writeFileSync(join(componentDir, 'index.ts'), indexCode, 'utf8');
    generatedExports.push(`export * from './${displayName}';`);

    console.log(`  ✓ Generated <${tag.name}> -> src/generated/${displayName}/`);
  }

  const rootIndexCode = `/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* -------------------------------------------------------------------------
 * THIS FILE IS AUTOMATICALLY GENERATED FROM custom-elements.json.
 * DO NOT EDIT MANUALLY.
 * ------------------------------------------------------------------------- */

${generatedExports.join('\n')}
`;

  writeFileSync(join(OUTPUT_DIR, 'index.ts'), rootIndexCode, 'utf8');

  console.log(`\n🎉 Wrapper generation completed successfully.\n`);
}

main();
