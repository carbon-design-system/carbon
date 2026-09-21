# proto-spec.json

```json
{
  "flow_id": "p09-access-gate",
  "persona": "P09",
  "entry": { "route": "/venues", "from": ["home"] },
  "exit": [
    { "id": "drop-unpublished", "to": "/venues", "success": true },
    { "id": "switch-job", "to": "/" }
  ],
  "screens": [
    "luma-home",
    "luma-p09-shortlist",
    "luma-p09-venue",
    "luma-p09-how-verified"
  ],
  "nodes": [
    {
      "screen": "luma-p09-shortlist",
      "route": "/venues",
      "states": ["default", "empty", "unpublished-access"],
      "hotspots": [
        {
          "from": "search",
          "event": "submit",
          "to": "luma-p09-shortlist",
          "state": "default"
        },
        { "from": "tile-verified", "event": "click", "to": "luma-p09-venue" },
        { "from": "help", "event": "click", "to": "luma-p09-how-verified" }
      ],
      "forbidden_hotspots": ["book", "checkout", "hold"]
    }
  ]
}
```

- `from` = region `id` in that screen's `screen-spec.json`.
- `to` = another `screen` slug or `state` on the same screen.
- `forbidden_hotspots` must not exist as buttons, links, or Figma reactions.
