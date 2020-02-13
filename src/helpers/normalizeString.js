/**
 * Normalizes strings by replacing diacritics to regular symbol for
 * correct compare.
 *
 * Example:
 * 'Átila Pinto' -> 'Atila Pinto'
 *
 * @param {string} str
 * @returns string
 */
export default function(str) {
  if (!str) return '';
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
