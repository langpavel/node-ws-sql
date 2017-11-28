const luidSuffix = Math.random().toString(36).substring(2, 8);
let serie = 0;

export default function getLuid() {
  return `${(++serie).toString(36)}.${luidSuffix}`;
}