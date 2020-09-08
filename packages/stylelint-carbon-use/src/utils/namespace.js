const prefix = 'carbon';

export default function namespace(ruleName) {
  return `${prefix}/${ruleName}`;
}
