/* jshint noarg: false, unused: false */
/**
 * @file Defines the namespace and base functionality for Huge JS Component Library.
 * @author Tim McDuffie <tmcduffie@hugeinc.com>
 */


var Huge = {};


Huge.inherit = function (childCtor, parentCtor) {
  // create a temporary constructor based on the parent
  function TmpCtor() {}
  TmpCtor.prototype = parentCtor.prototype;

  // store the parent
  childCtor.parentClass_ = parentCtor.prototype;

  // set the child prototype
  childCtor.prototype = new TmpCtor();
  childCtor.prototype.constructor = childCtor;
};


Huge.parent = function (me, opt_methodName, varArgs) {
  var caller = arguments.callee.caller;
  if (caller.parentClass_) {
    // This is a constructor. Call the superclass constructor.
    return caller.parentClass_.constructor.apply(me, Array.prototype.slice.call(arguments, 1));
  }

  var args = Array.prototype.slice.call(arguments, 2);
  var foundCaller = false;
  for (var ctor = me.constructor;
       ctor; ctor = ctor.parentClass_ && ctor.parentClass_.constructor) {
    if (ctor.prototype[opt_methodName] === caller) {
      foundCaller = true;
    } else if (foundCaller) {
      return ctor.prototype[opt_methodName].apply(me, args);
    }
  }

  // If we did not find the caller in the prototype chain,
  // then one of two things happened:
  // 1) The caller is an instance method.
  // 2) This method was not called by the right caller.
  if (me[opt_methodName] === caller) {
    return me.constructor.prototype[opt_methodName].apply(me, args);
  } else {
    throw new Error('Huge.parent called from a method of one name to a method of a different name');
  }
};
