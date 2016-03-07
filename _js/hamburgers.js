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

  /**
  Drop in replace functions for setTimeout() & setInterval() that
  make use of requestAnimationFrame() for performance where available
  http://www.joelambert.co.uk

  Copyright 2011, Joe Lambert.
  Free to use under the MIT license.
  http://www.opensource.org/licenses/mit-license.php
  */

  // requestAnimationFrame() shim by Paul Irish
  // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  window.requestAnimFrame = (function() {
    return window.requestAnimationFrame  ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      window.oRequestAnimationFrame      ||
      window.msRequestAnimationFrame     ||
      function(callback, element){
        window.setTimeout(callback, 1000 / 60);
      };
  })();

  /**
   * Behaves the same as setInterval except uses requestAnimationFrame() where possible for better performance
   * @param {function} fn The callback function
   * @param {int} delay The delay in milliseconds
   */
  window.requestInterval = function(fn, delay) {
    if ( ! window.requestAnimationFrame    &&
      ! window.webkitRequestAnimationFrame &&
      ! (window.mozRequestAnimationFrame   && window.mozCancelRequestAnimationFrame) &&
      ! window.oRequestAnimationFrame      &&
      ! window.msRequestAnimationFrame)
        return window.setInterval(fn, delay);

    var start = new Date().getTime(),
        handle = new Object();

    function loop() {
      var current = new Date().getTime(),
        delta = current - start;

      if (delta >= delay) {
        fn.call();
        start = new Date().getTime();
      }

      handle.value = window.requestAnimFrame(loop);
    }

    handle.value = window.requestAnimFrame(loop);
    return handle;
  }

  /**
   * Behaves the same as clearInterval except uses cancelRequestAnimationFrame() where possible for better performance
   * @param {int|object} fn The callback function
   */
  window.clearRequestInterval = function(handle) {
    window.cancelAnimationFrame ? window.cancelAnimationFrame(handle.value) :
    window.webkitCancelAnimationFrame ? window.webkitCancelAnimationFrame(handle.value) :
    window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(handle.value) : /* Support for legacy API */
    window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame(handle.value) :
    window.oCancelRequestAnimationFrame ? window.oCancelRequestAnimationFrame(handle.value) :
    window.msCancelRequestAnimationFrame ? window.msCancelRequestAnimationFrame(handle.value) :
    clearInterval(handle);
  };

  /**
   * Behaves the same as setTimeout except uses requestAnimationFrame() where possible for better performance
   * @param {function} fn The callback function
   * @param {int} delay The delay in milliseconds
   */
  window.requestTimeout = function(fn, delay) {
    if ( ! window.requestAnimationFrame    &&
      ! window.webkitRequestAnimationFrame &&
      ! (window.mozRequestAnimationFrame   && window.mozCancelRequestAnimationFrame) && // Firefox 5 ships without cancel support
      ! window.oRequestAnimationFrame      &&
      ! window.msRequestAnimationFrame)
        return window.setTimeout(fn, delay);

    var start = new Date().getTime(),
        handle = new Object();

    function loop() {
      var current = new Date().getTime(),
          delta = current - start;

      delta >= delay ? fn.call() : handle.value = window.requestAnimFrame(loop);
    }

    handle.value = window.requestAnimFrame(loop);
    return handle;
  };

  /**
   * Shuffles array in place.
   * @link http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
   * @param {Array} a items The array containing the items.
   * @return {Array} a The shuffled array
   */
  function shuffle(array) {
    var j, x, i;

    for (i = array.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = array[i - 1];
        array[i - 1] = array[j];
        array[j] = x;
    }

    return array;
  }

  /**
           _....----"""----...._
        .-'  o    o    o    o   '-.
       /  o    o    o         o    \
    __/__o___o_ _ o___ _ o_ o_ _ _o_\__
   /                                   \
   \___________________________________/
     \~`-`.__.`-~`._.~`-`~.-~.__.~`-`/
  jgs \                             /
       `-._______________________.-'

   */
  var Hamburgers = {
    make: function() {
      var hamburgers = document.querySelectorAll(".js-hamburger");

      if (hamburgers.length > 0) {
        forEach(hamburgers, function(hamburger) {
          hamburger.addEventListener("click", Hamburgers.clickHandle, false);
        });
      }

      Hamburgers.headerAnimate();

      document.querySelector(".js-hint").addEventListener("click", Hamburgers.hintHandle, false);
    },

    clickHandle: function(e) {
      e.preventDefault();

      this.classList.toggle("is-active");
    },

    hintHandle: function(e) {
      e.preventDefault();

      this.parentNode.removeChild(this);

      document.getElementById("hint").classList.add("is-visible");
    },

    headerAnimateDelay: 200,
    headerAnimateInterval: 3250,

    headerAnimate: function() {
      var classes = [
        "slider", "squeeze", "arrow", "arrowalt", "spin", "elastic", "emphatic", "collapse", "vortex", "stand", "spring", "3dx", "3dy", "boring"
      ];

      shuffle(classes);

      var logo = document.querySelector(".hamburger--header");

      var animateTimer = window.requestInterval(animate, Hamburgers.headerAnimateDelay);

      window.requestTimeout(function() {
        window.clearRequestInterval(animateTimer);
        animateTimer = window.requestInterval(animate, Hamburgers.headerAnimateInterval);
      }, Hamburgers.headerAnimateDelay);

      function animate() {
        var current = parseInt(logo.getAttribute("data-class"), 10);

        logo.classList.add("hamburger--" + classes[current]);

        window.requestTimeout(function() {
          logo.classList.add("is-active");

          window.requestTimeout(function() {
            logo.classList.remove("is-active");

            window.requestTimeout(function() {
              logo.classList.remove("hamburger--" + classes[current]);

              var next = current + 1;

              if (next === classes.length) {
                next = 1;
              }
              logo.setAttribute("data-class", next);
            }, 750);
          }, 1000);
        }, 750);
      }
    }
  };

  Hamburgers.make();

}());
