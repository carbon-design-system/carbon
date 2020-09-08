export default function normaliseVariableName(variable) {
  if (variable.startsWith('--')) {
    return `var(${variable})`;
  } else {
    return variable;
  }
}
