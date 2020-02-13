import PropTypes from 'prop-types';

/**
 * Type definition for a contact
 *
 * How to use:
 * /** @param {{contact: contactPropType}} * / <- REMOVE THIS SPACE
 * const ComponentName = ({ contact }) => {...}
 * ComponentName.propTypes = {
 *   contact: PropTypes.shape(contactPropType).isRequired,
 * };
 */
export default {
  /** @type {string} */
  gender: PropTypes.string.isRequired,
  /** @type {{
   * title: string,
   * first: string,
   * last: string}}
   */
  name: PropTypes.shape({
    title: PropTypes.string.isRequired,
    first: PropTypes.string.isRequired,
    last: PropTypes.string.isRequired,
  }),
  /** @type {{
   * street: {number: string, name: string},
   * city: string,
   * state: string,
   * country: string,
   * postcode: string | number,
   * coordinates: {latitude: string, longitude: string},
   * timezone: {offset: string, description: string}
   * }}
   */
  location: PropTypes.shape({
    street: PropTypes.shape({
      number: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    // Looks like a bug in randomuser.me API
    postcode: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      .isRequired,
    coordinates: PropTypes.shape({
      latitude: PropTypes.string.isRequired,
      longitude: PropTypes.string.isRequired,
    }).isRequired,
    timezone: PropTypes.shape({
      offset: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
  }).isRequired,
  /** @type {string} */
  email: PropTypes.string.isRequired,
  /** @type {{
   * uuid: string,
   * username: string,
   * password: string,
   * salt: string,
   * md5: string,
   * sha1: string,
   * sha256: string,
   * }}
   */
  login: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    salt: PropTypes.string.isRequired,
    md5: PropTypes.string.isRequired,
    sha1: PropTypes.string.isRequired,
    sha256: PropTypes.string.isRequired,
  }).isRequired,
  /** @type {{
   * date: string,
   * age: number
   * }}
   */
  dob: PropTypes.shape({
    date: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
  }).isRequired,
  /** @type {{
   * date: string,
   * age: number
   * }}
   */
  registered: PropTypes.shape({
    date: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
  }).isRequired,
  /** @type {string} */
  phone: PropTypes.string.isRequired,
  /** @type {string} */
  cell: PropTypes.string.isRequired,
  /** @type {{
   * name?: string,
   * value?: string,
   * }}
   */
  id: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
  /** @type {{
   * large: string,
   * medium: string,
   * thumbnail: string,
   * }}
   */
  picture: PropTypes.shape({
    large: PropTypes.string.isRequired,
    medium: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
  }).isRequired,
  /** @type {string} */
  nat: PropTypes.string.isRequired,
};
