import stylish from './stylish.js';

const formatKey = (key, operation) => `${operation} ${key}`;

function sortKeys(keys) {
  return keys.sort((a, b) => {
    const cleanA = a.startsWith('+-') ? a.slice(2) : a;
    const cleanB = b.startsWith('+-') ? b.slice(2) : b;
    return cleanA.localeCompare(cleanB);
  });
}

export default function compareJson(json1, json2) {
  const recursionCompare = (object1, object2) => {
    const difference = {};

    const keys = [...new Set([...Object.keys(object1), ...Object.keys(object2)])];
    const sortedKeys = sortKeys(keys);

    sortedKeys.forEach((key) => {
      if (object1[key] === object2[key]) {
        difference[key] = object1[key];
      } else if (typeof object1[key] === 'object' && typeof object2[key] === 'object') {
        difference[key] = recursionCompare(object1[key], object2[key]);
      } else {
        const newKey = formatKey(key, '+');
        const oldKey = formatKey(key, '-');

        if (object1[key] !== undefined) {
          difference[oldKey] = object1[key];
        }

        if (object2[key] !== undefined) {
          difference[newKey] = object2[key];
        }
      }
    });

    return difference;
  };

  const objDifference = recursionCompare(json1, json2);

  return stylish(objDifference);
}
