const data = require( './data/foodGroups' )();

module.exports = async function queryFoodGroups({ fgid }) {
  return data.filter( ( item ) =>
    item.fgid == fgid
  );
};
