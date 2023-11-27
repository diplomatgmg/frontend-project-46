/* eslint-disable */

import {DiffNode, ValueTypes} from '../types.js';

interface DiffObject {
  [key: string]: ValueTypes | DiffObject;
}

export default function stylish(diff: Record<string, DiffNode>): string {
  const makeDifference = (object: Record<string, DiffNode>): DiffObject => {
    const diffObj: DiffObject = {};

    const keys = Object.keys(object);
    keys.forEach((key) => {
      const node = object[key];

      const minusKey = `- ${key}`;
      const plusKey = `+ ${key}`;

      switch (node.type) {
        case 'nested':
          diffObj[key] = makeDifference(node.children);
          break;
        case 'added':
          diffObj[plusKey] = node.value;
          break;
        case 'removed':
          diffObj[minusKey] = node.value;
          break;
        case 'changed':
          diffObj[minusKey] = node.oldValue;
          diffObj[plusKey] = node.value;
          break;
        case 'unchanged':
          diffObj[key] = node.value;
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
