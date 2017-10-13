let lastId = 0;

export default function(prefix = 'id') {
  lastId++;
  return `${prefix}${lastId}`;
}
