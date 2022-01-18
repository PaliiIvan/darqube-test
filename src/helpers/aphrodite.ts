import { StyleSheet as St } from 'aphrodite';

const innerCssClass = function (selector, baseSelector, callback) {
  const regex = /^selector\((.*)\)$/;
  const match = selector.match(regex);

  if (!match) {
    return null;
  }

  return callback(`${baseSelector} ${match[1]}`);
} as any;

const extension = St.extend([innerCssClass]);

export const StyleSheet = extension.StyleSheet;
export const css = extension.css;
