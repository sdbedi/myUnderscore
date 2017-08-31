(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. T
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n > array.length) {
    return array;
  }
    else { 
      return n === undefined ? array[array.length - 1] : array.slice(array.length - n);
    }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
     if(Array.isArray(collection) === true){
         for (var i =0; i < collection.length; i++) {
         iterator(collection[i], i, collection);
         }
      } 
      else {
        for(var key in collection){
        iterator(collection[key], key, collection);
        }
      }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var results = [];
    _.each(collection, function (item){
      if (test(item)) {
        results.push(item)
      }
    })
    return results;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // We can re-use filter here - look for every element that fails a truth test
    return _.filter(collection, function (item){return !test(item)});
   
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var uniqueArray = [];
    var trackerObj = {}; //use a tracker object to remember what we have seen in the array previously.
    for (var i = 0; i < array.length; i ++) {
      trackerObj[array[i]] = array[i]
    };
    for (var key in trackerObj) {
      uniqueArray.push(trackerObj[key])
    }
  return uniqueArray;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    var results = [];
    _.each(collection, function (item){
        results.push(iterator(item))
    })
    return results;
  };

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as it's second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    _.each(collection, function (item) {
      if (accumulator === undefined) {
        accumulator = item;
      }
      else {
        accumulator = iterator(accumulator, item);
      }
    });
    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // We can use reduce:
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test. If no iterator is passed in, we simply check if the item returns a true value
  _.every = function(collection, iterator) {
    if (iterator === undefined) {
      iterator = function (item) {return item === true;}
    }
     
     return _.reduce(collection, function(wasFound, item) {
      if (wasFound === false) {
        return false;
      }
      return Boolean(iterator(item));
    }, true);
     
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) { //use every to see if see if every element fails the test
      if (iterator === undefined) {
      iterator = function (item) {return item === true;}
    }
      return !_.every(collection, function (item) {return !iterator(item)})
  };


  /**
   * OBJECTS
   * =======
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    _.each(arguments, function(source) {
        for (var key in source) {
            obj[key] = source[key];
          }
    });
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) { //a conditional extend
    _.each(arguments, function(source) {
        for (var key in source) {
          if (!(key in obj)) { 
            obj[key] = source[key];
          }
        }
          
    });
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   */

  // Return a function that can be called at most one time. Subsequent calls should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them.
  _.memoize = function(func) {
    var cache = {};
    return function() {
        var args = [].slice.call(arguments);
        return cache[args] = (args in cache) ? cache[args] : func.apply(this, args);
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = [].slice.call(arguments, 2);
    setTimeout(function() {
        func.apply(null, args);
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  _.shuffle = function(array) {
   var clone = array.slice(0);
   var rand, temp;
    for (var i = 0; i < clone.length; i ++) {
        rand = Math.floor(Math.random() * clone.length);
        temp = clone[i]; // three step swap, move clone[i]'s value to temp, move the random value to clone[i], move temp to clone[rand]
        clone[i] = clone[rand];
        clone[rand] = temp;
    }
    return clone;
  };


  /**
   * EXTRA CREDIT
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
