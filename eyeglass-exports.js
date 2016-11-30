var hamburgers = require("./index");

module.exports = function(eyeglass, sass) {
  return {
    sassDir: hamburgers.includePaths[0]
  };
};
