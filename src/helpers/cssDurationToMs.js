/**
 * Converts CSS duration into number.
 *
 * Examples:
 * '0.5s' -> 500
 * '500ms' -> 500
 * null -> 0
 * 'error' -> 0
 *
 * @param {string} cssDuration
 * @returns {number}
 */
export default function cssDurationToMs(cssDuration) {
  if (!cssDuration) return 0;
  const duration = parseFloat(cssDuration);
  if (Number.isNaN(duration)) return 0;
  return duration * (/\ds$/.test(cssDuration) ? 1000 : 1);
}
