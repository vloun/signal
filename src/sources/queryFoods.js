const data = require( './data/foods' )();

module.exports = async function queryFoods({ fgid }) {
  return data.filter( ( item ) =>
    item.fgid == fgid
  );
};
