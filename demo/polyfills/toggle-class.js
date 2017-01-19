export default function toggleClass(element, name, add) {
  if (element.classList.contains(name) === !add) {
    element.classList[add ? 'add' : 'remove'](name);
  }
}
