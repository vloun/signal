const data = require( './data/servings' )();

module.exports = async function queryServings({ ages, gender, fgid }) {
  return data.filter( ( item ) =>
    item.ages == ages && item.gender == gender && item.fgid == fgid
  );
};
