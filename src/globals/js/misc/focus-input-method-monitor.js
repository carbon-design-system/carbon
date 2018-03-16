let lastInteraction = 'none';
let lastActiveElement = null;
let lastTimeStamp = 0;

const debounce = 100; // ms
const attr = 'data-input-method';
const state = function state() {
  return { lastInteraction, lastActiveElement };
};
const interact = function interact(type, e) {
  if (e.timeStamp > lastTimeStamp + debounce) {
    // debounce helps us detect simulated mouse events that happen near touch
    lastTimeStamp = e.timeStamp;
    lastInteraction = type;
  }
};

const init = () => {
  lastActiveElement = document.activeElement;

  document.body.setAttribute(attr, 'none');
  document.body.addEventListener('mousedown', e => interact('mouse', e), true);
  document.body.addEventListener('pointerdown', e => interact(e.pointerType ? e.pointerType : 'mouse', e), true);
  document.body.addEventListener('touchstart', e => interact('touch', e), true);
  document.body.addEventListener('keydown', e => interact('keyboard', e), true);

  document.body.addEventListener(
    'focus',
    () => {
      if (document.activeElement !== lastActiveElement) {
        // only update attribute on actual focus changes
        document.body.setAttribute(attr, lastInteraction);
        lastActiveElement = document.activeElement;
      }
    },
    true
  );
};
init();

export default { state };
