function stringifyValue(value) {
  if (value === null) {
    return null;
  }

  switch (typeof value) {
    case 'object':
      return '[complex value]';
    case 'string':
      return `'${value}'`;
    default:
      return value;
  }
}

export default function plain(diff) {
  const result = [];

  function plainRecursion(diffObj, path = []) {
    const keys = Object.keys(diffObj);

    keys.forEach((key) => {
      const {
        type, value, oldValue, children,
      } = diffObj[key];

      const newPath = [...path, key];
      const joinPath = newPath.join('.');

      // eslint-disable-next-line default-case
      switch (type) {
        case 'nested':
          plainRecursion(children, newPath);
          break;
        case 'added':
          result.push(`Property '${joinPath}' was added with value: ${stringifyValue(value)}`);
          break;
        case 'removed':
          result.push(`Property '${joinPath}' was removed`);
          break;
        case 'changed':
          result.push(`Property '${joinPath}' was updated. From ${stringifyValue(oldValue)} to ${stringifyValue(value)}`);
      }
    });

    return result;
  }

  plainRecursion(diff);

  return result.join('\n');
}
