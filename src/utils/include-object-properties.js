/**
 * Returns a new object including only the specified properties.
 * @param {Object} obj - The source object.
 * @param {string[]} props - Array of property names to include.
 * @returns {Object} New object with only the included properties.
 */
function includeObjectProperties(obj, props) {
  if (!obj || typeof obj !== 'object') return {};
  if (!Array.isArray(props)) return {};

  return props.reduce((acc, key) => {
    if (obj[key]) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
}

module.exports = includeObjectProperties;
