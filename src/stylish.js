export default function stylish(object) {
  return JSON.stringify(object, null, 4)
    .replace(/"/g, '')
    .replace(/,/g, '')
    .replace(/\s\s\+/g, '+')
    .replace(/\s\s-/g, '-');
}
