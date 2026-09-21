#!/usr/bin/env python3
"""Join Code Connect parserless files to CoForge/Carbon token roles.

Run from repo root:
  python3 packages/themes/src/dtcg/coforge/scripts/build-component-token-map.py
"""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[6]
CC_DIR = ROOT / "packages/web-components/code-connect-parserless"
OUT = ROOT / "packages/themes/src/dtcg/coforge/component-token-map.json"

PUBLISHED = "Ude8f8dEgXxxnpbzrvWfwE"
WRITE_KEY = "mnPFHuLUzXItWQimrWQEvV"

URL_RE = re.compile(r"^// url=(https://www\.figma\.com/design/([^/?]+)/[^?\s]*\?node-id=([0-9-]+))", re.M)
ID_RE = re.compile(r"^\s*id:\s*'([^']+)'", re.M)
COMP_RE = re.compile(r"^// component=(\S+)", re.M)

# React export when cds-* id is known; fallback: PascalCase of tag without cds-
REACT = {
    "cds-button": "Button",
    "cds-link": "Link",
    "cds-text-input": "TextInput",
    "cds-text-input-fluid": "FluidTextInput",
    "cds-textarea": "TextArea",
    "cds-textarea-fluid": "FluidTextArea",
    "cds-form": "Form",
    "cds-checkbox": "Checkbox",
    "cds-checkbox-group": "CheckboxGroup",
    "cds-password-input": "PasswordInput",
    "cds-select": "Select",
    "cds-search": "Search",
    "cds-tile": "Tile",
    "cds-modal": "Modal",
    "cds-inline-notification": "InlineNotification",
    "cds-toast-notification": "ToastNotification",
    "cds-breadcrumb": "Breadcrumb",
    "cds-breadcrumb-item": "BreadcrumbItem",
    "cds-table": "DataTable",
    "cds-tag-readonly": "Tag",
    "cds-toggle": "Toggle",
    "cds-header": "Header",
}

# Token roles by cds family prefix (first two segments after cds-)
FAMILY_TOKENS = {
    "button": [
        "--cds-button-primary",
        "--cds-button-primary-hover",
        "--cds-button-primary-active",
        "--cds-text-on-color",
        "--cds-focus",
    ],
    "link": ["--cds-link-primary", "--cds-link-primary-hover", "--coforge-accent-text"],
    "text-input": ["--cds-field-01", "--cds-text-primary", "--cds-text-secondary", "--cds-border-strong"],
    "textarea": ["--cds-field-01", "--cds-text-primary", "--cds-text-secondary", "--cds-border-strong"],
    "password-input": ["--cds-field-01", "--cds-text-primary", "--cds-icon-primary"],
    "select": ["--cds-field-01", "--cds-text-primary", "--cds-border-strong"],
    "search": ["--cds-field-01", "--cds-icon-primary", "--cds-text-primary"],
    "checkbox": ["--cds-icon-primary", "--cds-text-primary", "--cds-icon-interactive"],
    "form": ["--cds-text-primary", "--cds-text-secondary", "--cds-background"],
    "tile": ["--cds-layer-01", "--cds-text-primary", "--cds-border-subtle-01"],
    "modal": ["--cds-layer-01", "--cds-text-primary", "--cds-overlay"],
    "notification": ["--cds-support-error", "--cds-text-primary", "--cds-notification-background-error"],
    "breadcrumb": ["--cds-link-primary", "--cds-text-primary"],
    "table": ["--cds-layer-01", "--cds-text-primary", "--cds-border-subtle-01"],
    "tag": ["--cds-tag-background-gray", "--cds-text-primary"],
    "toggle": ["--cds-support-success", "--cds-icon-on-color"],
    "header": ["--cds-background", "--cds-text-primary", "--cds-icon-primary"],
    "ui-shell": ["--cds-background", "--cds-text-primary"],
}


def family(cds_id: str) -> str:
    rest = cds_id.replace("cds-", "", 1)
    for key in sorted(FAMILY_TOKENS, key=len, reverse=True):
        if rest == key or rest.startswith(key + "-"):
            return key
    return rest.split("-")[0]


def react_name(cds_id: str) -> str:
    if cds_id in REACT:
        return REACT[cds_id]
    parts = cds_id.replace("cds-", "").split("-")
    return "".join(p[:1].upper() + p[1:] for p in parts if p)


def parse_file(path: Path) -> dict | None:
    text = path.read_text(encoding="utf-8")
    url_m = URL_RE.search(text)
    if not url_m:
        return None
    url, file_key, node_hyphen = url_m.group(1), url_m.group(2), url_m.group(3)
    id_m = ID_RE.search(text)
    comp_m = COMP_RE.search(text)
    cds_id = (id_m.group(1) if id_m else None) or (comp_m.group(1) if comp_m else None)
    if not cds_id:
        cds_id = path.stem.replace("_", "-")
        if not cds_id.startswith("cds-"):
            cds_id = f"cds-{path.parent.name}"
    fam = family(cds_id)
    node_id = node_hyphen.replace("-", ":")
    write_url = url.replace(PUBLISHED, WRITE_KEY) if file_key == PUBLISHED else url
    return {
        "id": cds_id,
        "react": react_name(cds_id),
        "code_connect": str(path.relative_to(ROOT)),
        "figma": {
            "published_fileKey": file_key,
            "write_fileKey": WRITE_KEY if file_key == PUBLISHED else file_key,
            "nodeId": node_id,
            "nodeIdHyphen": node_hyphen,
            "published_url": url,
            "write_url": write_url,
        },
        "tokens": FAMILY_TOKENS.get(fam, ["--cds-text-primary", "--cds-background"]),
        "notes": "field/layer/syntax stay IBM; bind CoForge only on listed overlay vars",
    }


def main() -> None:
    rows = []
    for path in sorted(CC_DIR.rglob("*.figma.ts")):
        row = parse_file(path)
        if row:
            rows.append(row)
    payload = {
        "$comment": "Generated by scripts/build-component-token-map.py. Do not hand-edit mappings. Writes use write_fileKey (Community branch), never published main.",
        "write_fileKey": WRITE_KEY,
        "published_fileKey": PUBLISHED,
        "do_not_override": [
            "layer-01",
            "layer-02",
            "layer-03",
            "field-01",
            "field-02",
            "border-subtle-01",
            "syntax-*",
        ],
        "mappings": rows,
    }
    OUT.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    print(f"wrote {len(rows)} mappings → {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
