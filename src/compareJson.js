const formatKey = (key, operation = ' ') => `${operation} ${key}`;

function sortKeys(keys) {
  return keys.sort((a, b) => {
    const cleanA = a.startsWith('+-') ? a.slice(2) : a;
    const cleanB = b.startsWith('+-') ? b.slice(2) : b;
    return cleanA.localeCompare(cleanB);
  });
}

export default function test(json1, json2) {
  const difference = {};

  const keys = [...new Set([...Object.keys(json1), ...Object.keys(json2)])];
  const sortedKeys = sortKeys(keys);

  sortedKeys.forEach((key) => {
    if (json1[key] === json2[key]) {
      const formattedKey = formatKey(key);
      difference[formattedKey] = json1[key];
    } else {
      const newKey = formatKey(key, '+');
      const oldKey = formatKey(key, '-');

      difference[oldKey] = json1[key];
      difference[newKey] = json2[key];
    }
  });

  return JSON.stringify(difference, null, 2)
    .replace(/"/g, '')
    .replace(/,/g, '');
}
