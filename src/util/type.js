(function(root, factory) {
    'use strict';

    /*global define, exports, module */
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.util = factory();
    }
}(this, function() {
    var ap = Array.prototype,
        fp = Function.prototype,
        op = Object.prototype,
        each = fp.call.bind(ap.forEach),
        class2type = {},
        util = {},
        extend, has;

    extend = function(target, source) {
        for (var k in source) {
            target[k] = source[k];
        }
        return target;
    }

    /**
     * general class2type
     * @param  {[type]} name){                         class2type[ "[object " + name + "]" ] [description]
     * @return null         
     */
    each("Arguments Boolean Number String Function Array Date RegExp Object Error".split(" "), function(name) {
        class2type['[object ' + name + ']'] = name.toLowerCase();
        // Add some isType methods: isArguments, isBoolean, isString, isFunction, isNumber, isDate, isRegExp, isError.
        util['is' + name] = function(obj) {
            return this.type(obj) === name.toLowerCase();
        };
    });

    has = function(obj, key) {
        return obj != null && op.hasOwnProperty.call(obj, key);
    };

    extend(util, {
        /**
         * get object type
         * @param  {Object} obj any object to be tested
         * @return {String}   obj of type 
         */
        type: function(obj) {
            if (obj === null) {
                return obj + "";
            }
            return typeof obj === "object" || typeof obj === "function" ? class2type[op.toString.call(obj)] || "object" : typeof obj;
        },
        /**
         * is Empty Object ?
         * @param  {Object}  obj any object to be tested
         * @return {Boolean}     
         */
        isEmptyObject: function(obj) {
            var name;
            for (name in obj) {
                // in ie < 9, we add some function to array,object,function,in order to support ecmascript5
                if (obj.hasOwnProperty(name)) {
                    return false;
                }
            }
            return true;
        },
        /**
         * is Empty ? one of ["",0,false,null,undefined,NaN] return true
         * @param  {Object}  obj any object to be tested
         * @return {Boolean}     
         */
        isEmpty: function(obj) {
            return !obj;
        },
        /**
         * is window ?
         * @param  {[type]}  obj any object to be tested
         * @return {Boolean}     
         */
        isWindow: function(obj) {
            /* jshint eqeqeq: false */
            return obj != null && obj == obj.window;
        },
        isPlainObject: function(obj) {
            return this.isObject(obj) && !this.isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype;
        },
        /**
         * is array like ? Array-like objects
         * @param  {Object}  obj any object to be tested
         * @return {Boolean}     
         */
        isArrayLike: function(obj) {
            // Support: iOS 8.2 (not reproducible in simulator)
            // `in` check used to prevent JIT error (gh-2145)
            // hasOwn isn't used here due to false negatives
            // regarding Nodelist length in IE
            var length = "length" in obj && obj.length,
                type = this.type(obj);

            if (type === "function" || this.isWindow(obj)) {
                return false;
            }

            if (obj.nodeType === 1 && length) {
                return true;
            }

            return type === "array" || length === 0 ||
                typeof length === "number" && length > 0;
        },
        /**
         * is Primitive ?
         * @param  {Object}  input  any object to be tested
         * @return {Boolean}       
         */
        isPrimitive: function(input) {
            var type = typeof input;
            return input === null || type !== "object" || type !== "function";
        },
        isNull: function(input) {
            return input === null;
        },
        isUndefined: function(obj) {
            return obj === undefined;
        },
        // Is the given value `NaN`? (NaN is the only number which does not equal itself).
        isNaN: function(obj) {
            return this.isNumber(obj) && obj !== +obj;
        },
        // Is a given object a finite number?
        isFinite: function(obj) {
            return isFinite(obj) && !isNaN(parseFloat(obj));
        },
        isInt: function(obj) {
            return this.isNumber(obj) && parseInt(obj) === obj;
        }
    });

    util.isArray = Array.isArray || util.isArray;

    // Define a fallback version of the method in browsers (ahem, IE < 9), where
    // there isn't any inspectable "Arguments" type.
    if (!util.isArguments(arguments)) {
        util.isArguments = function(obj) {
            return has(obj, 'callee');
        };
    }
    return util;
}));
