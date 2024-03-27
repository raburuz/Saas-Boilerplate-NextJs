/**
 * Replaces a pattern in a string where "XXX-" matches a number.
 *
 * @param {string} value - The input string to be modified.
 * @returns {string} The updated string with the pattern replaced.
 */
export const replaceNumberPattern = ( value: string ) => {
  const pattern = /\d+-/g;
  return value.replace(pattern, '');
}


export const getNumberFromString = ( name: string ) => {
  const matches = name.match(/(\d+)/g); // Use 'g' flag to match all occurrences
  if (matches) {
    return matches.join('-');
  } else {
    return '0'; // Return 0 if there are no matches
  }
}