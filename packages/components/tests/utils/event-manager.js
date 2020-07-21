export default class EventManager {
  constructor() {
    this.handles = [];
  }

  on(element, name, handler) {
    element.addEventListener(name, handler);
    const handle = () => {
      element.removeEventListener(name, handler);
    };
    this.handles.push(handle);
    return handle;
  }

  reset() {
    for (
      let handle = this.handles.shift();
      handle;
      handle = this.handles.shift()
    ) {
      handle();
    }
  }
}
