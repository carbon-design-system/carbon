# Task — create-request (calibration)

**Status:** FILLED **slug:** create-request **Screen name:** Create request
**Flow:** One operations practitioner files a work request (one persona, one
scenario). **Goal:** Capture a title, description, and optional
notify-on-complete flag, then submit. **Success:** User can fill the form and
activate a large primary Submit. Cancel returns without save. `ASSUMPTION`:
cancel is in-page, not a router. **Constraints:** Carbon + CoForge overlay only.
Light `white`. Large primary may be coral; no coral on labels. Fields stay
Carbon `field-*`. **Steps:**

1. Land on empty form (default = blank fields, Submit enabled `ASSUMPTION`).
2. Enter title and description.
3. Optionally check notify.
4. Submit → success acknowledgment (inline notification). Invalid title → error
   on the text input.

**States:** default / empty (same as default for v1) / error / success
**Assumptions:** Copy is placeholder calibration, not researched voice. No user
quotes.
