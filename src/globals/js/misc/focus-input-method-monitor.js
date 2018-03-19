let lastInteraction = 'none';
let lastActiveElement = null;
let lastTimeStamp = 0;

const debounce = 1000; // ms - simulated mouse events observed 600ms after touch
const attr = 'data-input-method';
const state = function state() {
  return { lastInteraction, lastActiveElement };
};
const interact = function interact(type) {
  // performance.now is better cross browser than event.timestamp
  if (performance.now > lastTimeStamp + debounce) {
    // debounce helps us detect simulated mouse events that happen near touch
    lastTimeStamp = performance.now();
    lastInteraction = type;
  }
};

const init = () => {
  lastActiveElement = document.activeElement;

  document.body.setAttribute(attr, 'none');
  document.body.addEventListener('mousedown', () => interact('mouse'), true);
  document.body.addEventListener('pointerdown', e => interact(e.pointerType ? e.pointerType : 'mouse'), true);
  document.body.addEventListener('touchstart', () => interact('touch'), true);
  document.body.addEventListener('keydown', () => interact('keyboard'), true);

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
