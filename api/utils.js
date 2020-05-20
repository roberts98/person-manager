/**
 * Takes users and gives unique ID to each user object
 *
 * @param {Array} users Array of users
 */
function addId(users) {
  return users.map((user, index) => ({
    id: index,
    ...user,
  }));
}

module.exports = { addId };
