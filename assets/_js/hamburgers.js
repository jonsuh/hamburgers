(function() {
  "use strict";

  /**
   * forEach implementation for Objects/NodeLists/Arrays, automatic type loops and context options
   *
   * @private
   * @author Todd Motto
   * @link https://github.com/toddmotto/foreach
   * @param {Array|Object|NodeList} collection - Collection of items to iterate, could be an Array, Object or NodeList
   * @callback requestCallback      callback   - Callback function for each iteration.
   * @param {Array|Object|NodeList} scope=null - Object/NodeList/Array that forEach is iterating over, to use as the this value when executing callback.
   * @returns {}
   */
  var forEach = function (collection, callback, scope) {
    if (Object.prototype.toString.call(collection) === "[object Object]") {
      for (var prop in collection) {
        if (Object.prototype.hasOwnProperty.call(collection, prop)) {
          callback.call(scope, collection[prop], prop, collection);
        }
      }
    } else {
      for (var i = 0, len = collection.length; i < len; i++) {
        callback.call(scope, collection[i], i, collection);
      }
    }
  };

  var Hamburgers = {
    make: function() {
      var hamburgers = document.querySelectorAll(".js-hamburger");

      if (hamburgers.length > 0) {
        forEach(hamburgers, function(hamburger) {
          hamburger.addEventListener("click", Hamburgers.clickHandle, false);
        });
      }
    },

    clickHandle: function(e) {
      e.preventDefault();

      this.classList.toggle("is-active");
    }
  }

  Hamburgers.make();

}());
