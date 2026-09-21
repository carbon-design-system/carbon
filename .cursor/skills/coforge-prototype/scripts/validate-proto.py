#!/usr/bin/env python3
"""Validate Luma proto-spec.json structure and P09 anti-HMW strings."""
from __future__ import annotations

import json
import sys
from pathlib import Path

FORBIDDEN_DEFAULT = {"book", "checkout", "hold"}


def main(path: str) -> int:
    data = json.loads(Path(path).read_text())
    errors: list[str] = []
    if not data.get("flow_id") or not data.get("persona"):
        errors.append("flow_id and persona required")
    if "entry" not in data:
        errors.append("entry required")
    nodes = data.get("nodes") or []
    if not nodes:
        errors.append("nodes required")
    for node in nodes:
        screen = node.get("screen", "?")
        forbidden = {s.lower() for s in node.get("forbidden_hotspots") or []}
        if data.get("persona") == "P09" and not FORBIDDEN_DEFAULT <= forbidden:
            errors.append(f"{screen}: P09 must forbid book, checkout, hold")
        froms = {h.get("from", "").lower() for h in node.get("hotspots") or []}
        overlap = froms & (forbidden | FORBIDDEN_DEFAULT)
        if overlap:
            errors.append(f"{screen}: hotspot collides with forbidden {sorted(overlap)}")
        if not node.get("states"):
            errors.append(f"{screen}: states required")
    if errors:
        print("FAIL")
        for e in errors:
            print(f"  {e}")
        return 1
    print("OK")
    return 0


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("usage: validate-proto.py <proto-spec.json>", file=sys.stderr)
        sys.exit(2)
    sys.exit(main(sys.argv[1]))
