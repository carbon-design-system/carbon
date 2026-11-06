/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Renders one story at a time when its button is clicked.

const STORIES: Record<string, string> = {
  default: `<empty-state-preview heading="Start by adding data assets" subtitle-type="default"></empty-state-preview>`,
  isometric: `<empty-state-isometric></empty-state-isometric>`,
  pictogram: `<empty-state-pictogram></empty-state-pictogram>`,
  'no-data': `<no-data-empty-state></no-data-empty-state>`,
  error: `<error-empty-state></error-empty-state>`,
  'not-found': `<not-found-empty-state></not-found-empty-state>`,
  notifications: `<notifications-empty-state></notifications-empty-state>`,
  unauthorized: `<unauthorized-empty-state></unauthorized-empty-state>`,
  'no-tags': `<no-tags-empty-state></no-tags-empty-state>`,
};

// The "In a UI" story renders a fixed Header, so it is wrapped in a transformed
// container to keep the header inside the page and the buttons above visible.
const UI_STORY = `
  <section>
    <div style="padding: 0.5rem 1rem; background: #e0e0e0;">
      <h2 style="font-size: 1.125rem; margin: 0 0 0.5rem;">Empty State unit</h2>
      <label>
        Placement:
        <select id="placement-select">
          <option value="left">left</option>
          <option value="centre">centre</option>
        </select>
      </label>
    </div>
    <div style="position: relative; transform: translateZ(0);">
      <empty-state-unit placement="left"></empty-state-unit>
    </div>
  </section>
`;

const outlet = document.getElementById('story-outlet');
const buttons = Array.from(
  document.querySelectorAll<HTMLElement>('#story-buttons [data-story]')
);

function show(id: string) {
  if (!outlet) return;
  buttons.forEach((button) =>
    button.setAttribute(
      'kind',
      button.dataset.story === id ? 'primary' : 'tertiary'
    )
  );
  outlet.style.padding = id === 'ui' ? '0' : '2rem';
  outlet.innerHTML = id === 'ui' ? UI_STORY : (STORIES[id] ?? '');

  if (id === 'ui') {
    const select = outlet.querySelector<HTMLSelectElement>('#placement-select');
    const unit = outlet.querySelector('empty-state-unit');
    select?.addEventListener('change', () =>
      unit?.setAttribute('placement', select.value)
    );
  }
}

buttons.forEach((button) =>
  button.addEventListener('click', () => show(button.dataset.story ?? ''))
);
