const data = require( './data/foodGroupServings' )();

module.exports = async function queryServings({ ages, gender, fgid }) {
  return data.filter( ( item ) =>
    item.ages == ages && item.gender == gender && item.fgid == fgid
  );
};
