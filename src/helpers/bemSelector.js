/**
 * Generates CSS class names in BEM style
 *
 * Example:
 * bemSelector('comment', 'title', ['blocked', 'archived])
 * returns:
 * 'comment comment__title comment_blocked comment_archived'
 *
 * @param {string} block
 * @param {string[] | string} elements
 * @param {string[] | string } modifiers
 * @returns string
 */
export default function bemSelector(block, elements, modifiers) {
  const classes = [block];

  if (elements) {
    (Array.isArray(elements) ? elements : [elements])
      .filter((element) => element)
      .forEach((element) => classes.push(`${block}__${element}`));
  }

  if (modifiers) {
    (Array.isArray(modifiers) ? modifiers : [modifiers])
      .filter((modifier) => modifier)
      .forEach((modifier) => classes.push(`${block}_${modifier}`));
  }

  return classes.join(' ');
}
