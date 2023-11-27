/* eslint-disable */

export default function stylish(diff) {
  const makeDifference = (object) => {
    const diffObj = {};

    const keys = Object.keys(object);
    keys.forEach((key) => {
      const {
        type, value, oldValue, children,
      } = object[key];

      const minusKey = `- ${key}`;
      const plusKey = `+ ${key}`;

      // eslint-disable-next-line default-case
      switch (type) {
        case 'nested':
          diffObj[key] = makeDifference(children);
          break;
        case 'added':
          diffObj[plusKey] = value;
          break;
        case 'removed':
          diffObj[minusKey] = value;
          break;
        case 'changed':
          diffObj[minusKey] = oldValue;
          diffObj[plusKey] = value;
          break;
        case 'unchanged':
          diffObj[key] = value;
          break;
      }
    });

    return diffObj;
  };

  return JSON.stringify(makeDifference(diff), null, 4)
    .replace(/"/g, '')
    .replace(/,/g, '')
    .replace(/\s\s\+/g, '+')
    .replace(/\s\s-/g, '-');
}
