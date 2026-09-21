# Figma reactions

`use_figma` on fileKey `mnPFHuLUzXItWQimrWQEvV`. `skillNames`:
`figma-use,figma-generate-design`.

After frames exist, set reactions on the **instance or text** that matches
`from` (prefer named nodes from screen-spec ids).

```js
target.reactions = [
  {
    trigger: { type: 'ON_CLICK' },
    actions: [
      {
        type: 'NODE',
        navigation: 'NAVIGATE',
        destinationId: destFrame.id,
        transition: { type: 'DISSOLVE', duration: 0.2 },
      },
    ],
  },
];
```

Use `INSTANT` if dissolve fails. Do not add reactions for `forbidden_hotspots`.

Header menu items: four reactions to job frames (Home, Venues, Documents, Plan,
Airport).

Present prototype: starting frame = Home (`/` / `luma-home`).
