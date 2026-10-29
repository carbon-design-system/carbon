#!/usr/bin/env node
/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  readFileSync,
  mkdirSync,
  rmSync,
  writeFileSync,
  existsSync,
} from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { globSync } from 'node:fs';
import { vendorPrefixedCopy } from '../vendor.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

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

const WC_ROOT = join(__dirname, '../../../web-components');
const MANIFEST_PATH = join(WC_ROOT, 'custom-elements.json');

/**
 * Resolved enum name → string-literal union type, built once at startup by
 * scanning every `defs.ts` file in the web components source tree.
 *
 * Example:  BUTTON_KIND  →  '"primary" | "secondary" | "tertiary" | ...'
 *
 * Used in sanitizeType() to upgrade manifest entries that carry an all-caps
 * enum name (e.g. `"type": "BUTTON_KIND"`) into a proper TypeScript union so
 * Angular consumers get completion and type-narrowing instead of `string`.
 */
const ENUM_TYPE_MAP = buildEnumTypeMap();

function buildEnumTypeMap() {
  const map = new Map();
  const defsFiles = globSync('src/components/**/defs.ts', {
    cwd: WC_ROOT,
  });
  for (const rel of defsFiles) {
    const src = readFileSync(join(WC_ROOT, rel), 'utf8');
    // Match: export enum ENUM_NAME { ... }
    for (const [, enumName, body] of src.matchAll(
      /export\s+enum\s+([A-Z0-9_]+)\s*\{([\s\S]*?)\}/g
    )) {
      // Collect string values: FOO = 'value' or FOO = "value"
      const values = [...body.matchAll(/=\s*['"]([^'"]*)['"]/g)].map(
        (m) => m[1]
      );
      if (values.length > 0) {
        map.set(enumName, values.map((v) => `"${v}"`).join(' | '));
      }
    }
  }
  return map;
}

const OUTPUT_DIR = join(__dirname, '../../src/generated');

/**
 * Resolve the vendored `@carbon/web-components` barrel that registers a tag's family.
 *
 * Class files are pure (ADR 0007): importing one registers nothing, and it
 * never registers the child elements the component renders (e.g. `cds-ng-modal`
 * renders `cds-ng-dialog`). The folder barrel registers all of them.
 *
 * `tag.path` is `./src/components/<dir>/<file>.ts`. Folders can be nested
 * (`date-picker/next`) and a folder without an `index.ts`
 * (`date-picker/next/components`) is covered by its nearest parent barrel.
 *
 * @returns {string} import specifier, e.g.
 *   `#carbon-ng/components/modal/index.js`
 */
function resolveBarrelImport(tag) {
  const segments = dirname(tag.path.replace(/^\.\/src\//, '')).split('/');
  while (segments.length > 1) {
    if (existsSync(join(WC_ROOT, 'src', ...segments, 'index.ts'))) {
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
 * The WCA analyser sometimes infers the wrong type from the default value
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
  // All-caps enum name (e.g. BUTTON_KIND) — resolve to a string-literal union
  // from the defs.ts file so consumers get type-narrowing and completion.
  if (/^[A-Z0-9_]+$/.test(trimmed)) {
    const union = ENUM_TYPE_MAP.get(trimmed);
    return union ?? 'string';
  }
  if (/^[A-Z0-9_]+\s*\|\s*undefined$/.test(trimmed)) {
    const base = trimmed.replace(/\s*\|\s*undefined$/, '');
    const union = ENUM_TYPE_MAP.get(base);
    return union ? `${union} | undefined` : 'string | undefined';
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
  // string-literal union (e.g. `"primary" | "secondary" | ...`).
  if (defaultVal.startsWith('"') && defaultVal.endsWith('"')) {
    // The manifest occasionally has `"'value'"` (inner single-quotes). Normalise
    // to `"value"` so the emitted TypeScript literal is valid.
    const inner = defaultVal.slice(1, -1);
    if (inner.startsWith("'") && inner.endsWith("'")) {
      return `"${inner.slice(1, -1)}"`;
    }
    return defaultVal;
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
 * Synthetic tag descriptors for WC elements that are missing from
 * custom-elements.json because their classes use `defineCustomElement()`
 * instead of the `@customElement()` decorator, which the CEM analyser cannot
 * see.
 *
 * Each entry mirrors the shape of a real manifest tag object. The `path`
 * field is relative to the WC package root (`./src/components/…`) and is used
 * by `resolveBarrelImport` to find the correct folder barrel.
 */
const SYNTHETIC_TAGS = [
  {
    name: 'cds-accordion-skeleton',
    path: './src/components/accordion/accordion-skeleton.ts',
    description: 'Skeleton of accordion.',
    properties: [
      {
        name: 'alignment',
        attribute: 'alignment',
        description:
          'Specify the alignment of the accordion heading title and chevron.',
        type: 'string',
        default: '"END"',
      },
      {
        name: 'count',
        attribute: 'count',
        description: 'Set number of items to render.',
        type: 'number',
        default: '4',
      },
      {
        name: 'isFlush',
        attribute: 'isFlush',
        description:
          'Specify whether Accordion text should be flush, default is false, does not work with align="start".',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'open',
        attribute: 'open',
        description: '`true` if the first accordion item should be open.',
        type: 'boolean',
        default: 'true',
      },
    ],
  },
  {
    name: 'cds-checkbox-skeleton',
    path: './src/components/checkbox/checkbox-skeleton.ts',
    description: 'Skeleton of checkbox.',
    properties: [],
  },
  {
    name: 'cds-dropdown-skeleton',
    path: './src/components/dropdown/dropdown-skeleton.ts',
    description: 'Skeleton of dropdown.',
    properties: [
      {
        name: 'hideLabel',
        attribute: 'hide-label',
        description: 'Specify whether the label should be hidden, or not.',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'size',
        attribute: 'size',
        description: 'Specify the size of the ListBox.',
        type: 'string',
        default: '"md"',
      },
    ],
  },
];

/**
 * Events (besides `input`/`change`) that signal a form-associated element's
 * value changed, e.g. `cds-ng-checkbox-changed`, `cds-ng-dropdown-selected`.
 */
const VALUE_CHANGE_EVENT = /-(changed|selected|input)$/;

function generateWrapperForTag(tag) {
  const tagName = tag.name.replace(/^cds-/, 'cds-ng-'); // e.g. "cds-ng-button"
  const displayName = toPascalCase(tag.name); // e.g. "Button"
  const className = `${displayName}Component`; // e.g. "ButtonComponent"

  // Import the folder barrel of the vendored prefixed build so child elements register.
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
      const type = sanitizeType(prop.type, tag.name, prop.name);
      // isBoolean drives the `= false` default and booleanAttribute transform.
      // Only set it when the resolved type is boolean — not when the manifest
      // default happens to be "false" for a property that was overridden to string.
      const isBoolean =
        type === 'boolean' ||
        (type !== 'string' &&
          type !== 'string | undefined' &&
          (prop.default === 'false' || prop.default === 'true'));
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
  const hasOutputs = outputs.length > 0;
  const hasDisabledInput = inputs.some((input) => input.name === 'disabled');
  const needsElementRef = hasInputs || cvaProp || hasOutputs;

  const usesBooleanAttribute = inputs.some((input) => input.type === 'boolean');
  const angularImports = [
    ...(usesBooleanAttribute ? ['booleanAttribute'] : []),
    'ChangeDetectionStrategy',
    'Component',
    ...(needsElementRef ? ['ElementRef', 'inject'] : []),
    'EventEmitter',
    'Input',
    ...(hasInputs ? ['OnChanges', 'SimpleChanges'] : []),
    ...(cvaProp || hasOutputs ? ['OnInit'] : []),
    ...(cvaProp ? ['forwardRef'] : []),
    'Output',
    'ViewEncapsulation',
  ].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

  const implementsList = [
    ...(hasInputs ? ['OnChanges'] : []),
    ...(cvaProp || hasOutputs ? ['OnInit'] : []),
    ...(cvaProp ? ['ControlValueAccessor'] : []),
  ];

  // Forward each custom event to its @Output. The listener is on the host
  // element, which lives and dies with this component, so it needs no cleanup.
  const outputListeners = outputs
    .map(
      (out) =>
        `    el.addEventListener('${out.eventName}', (event: Event) =>
      this.${out.outputName}.emit(event)
    );`
    )
    .join('\n');
  const cvaListeners = cvaProp
    ? `    for (const eventName of [${uniqueCvaEvents
        .map((name) => `'${name}'`)
        .join(', ')}]) {
      el.addEventListener(eventName, () =>
        this._cvaOnChange(el.${cvaProp})
      );
    }
    el.addEventListener('focusout', () => this._cvaOnTouched());`
    : '';
  const onInitBody = [outputListeners, cvaListeners].filter(Boolean).join('\n');

  // In the host-is-WC design the element ref is obtained via inject(ElementRef)
  // in the constructor, not @ViewChild — there is no inner element to query.
  // PROPERTY_INPUTS Set removed: Angular only calls ngOnChanges for declared
  // @Input() keys, so Object.keys(changes) is always a subset of inputs.
  const classBodyExtras = [
    needsElementRef
      ? `  private readonly _el = inject(ElementRef<HTMLElement>);`
      : '',
    hasInputs
      ? `  /** Forwards changed inputs to the host web component as properties. */
  ngOnChanges(changes: SimpleChanges): void {
    const el = this._el.nativeElement;
    for (const key of Object.keys(changes)) {
      (el as any)[key] = changes[key].currentValue;
    }
  }`
      : '',
    cvaProp || hasOutputs
      ? `${
          cvaProp
            ? `  private _cvaOnChange: (value: any) => void = () => {};
  private _cvaOnTouched: () => void = () => {};

`
            : ''
        }  ngOnInit(): void {
    const el = this._el.nativeElement as any;
${onInitBody}
  }`
      : '',
    cvaProp
      ? `  writeValue(value: any): void {
    (this._el.nativeElement as any).${cvaProp} = value ?? ${cvaProp === 'checked' ? 'false' : "''"};
  }

  registerOnChange(fn: (value: any) => void): void {
    this._cvaOnChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._cvaOnTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
${hasDisabledInput ? '    this.disabled = isDisabled;\n' : ''}    (this._el.nativeElement as any).disabled = isDisabled;
  }`
      : '',
  ].filter(Boolean);

  // Build TypeScript class members.
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

/**
 * ${tag.description || `Angular wrapper for ${tagName}.`}
 *
 * Selector : \`${tagName}\` (host element IS the web component — ADR 0015, ADR 0020)
 */
@Component({
  selector: '${tagName}',
  template: \`
${template}
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,${
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

  // Ensure prefixed vendor build exists before emitting wrappers
  vendorPrefixedCopy();

  const manifest = JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'));
  // Merge synthetic tags (elements missing from the CEM analyser output) before
  // the main tag list so they receive identical treatment — SKIPPED_TAGS,
  // --tag filter, and full-run rmSync all apply to them normally.
  const tags = [...SYNTHETIC_TAGS, ...(manifest.tags || [])];

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

  // A full run starts from an empty folder, so wrappers for tags that are now
  // skipped (ADR 0021) or removed from the manifest do not linger.
  if (!targetTag) {
    rmSync(OUTPUT_DIR, { recursive: true, force: true });
  }

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

    try {
      const { displayName, code, indexCode } = generateWrapperForTag(tag);
      const componentDir = join(OUTPUT_DIR, displayName);

      mkdirSync(componentDir, { recursive: true });
      writeFileSync(
        join(componentDir, `${displayName}.component.ts`),
        code,
        'utf8'
      );
      writeFileSync(join(componentDir, 'index.ts'), indexCode, 'utf8');

      generatedExports.push(displayName);
      console.log(`  ✓ Generated <${tag.name}> -> ${displayName}Component`);
    } catch (err) {
      console.error(
        `  ✗ Error generating wrapper for <${tag.name}>:`,
        err.message
      );
    }
  }

  // Only rewrite root index.ts if doing a full generation run
  if (!targetTag) {
    const rootIndexContent = `/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Auto-generated root entry point
${generatedExports
  .sort()
  .map((name) => `export * from './${name}';`)
  .join('\n')}
`;
    writeFileSync(join(OUTPUT_DIR, 'index.ts'), rootIndexContent, 'utf8');
  }

  console.log(
    `\n✨ Successfully generated ${generatedExports.length} Angular wrapper component(s).\n`
  );
}

main();
