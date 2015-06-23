(function(root, factory) {
    'use strict';

    /*global define, exports, module */
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['./type'], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory(require('./type'));
    } else {
        // Browser globals (root is window)
        root.util = factory(util);
    }
}(this, function(util) {
    var hasProp = Object.prototype.hasOwnProperty,
        slice = Array.prototype.slice;

    function extend(target, source, force, deep, onlyOwnProperty) {
        for (key in source) {
            if (onlyOwnProperty) {
                if (source.hasOwnProperty(key) && (force || !hasProp.call(target, key))) {
                    extendInternal(target, source, force, deep, onlyOwnProperty);
                }
            } else {
                extendInternal(target, source, force, deep, onlyOwnProperty);
            }
        }

    }

    function extendInternal(target, source, force, deep, onlyOwnProperty) {
        if (deep && (util.isPlainObject(source[key]) || util.isArray(source[key]))) {
            if (util.isPlainObject(source[key]) && !util.isPlainObject(target[key]))
                target[key] = {}
            if (util.isArray(source[key]) && !util.isArray(target[key]))
                target[key] = []
            extend(target[key], source[key], force, deep, onlyOwnProperty);
        } else if (source[key] !== undefined) {
            target[key] = source[key]
        }
    }

    /**
     * Simple function to mix in properties from source into target,
     * but only if target does not already have a property of the same name.
     */

    function mixin(target, source, force, deep) {
        if (source) {
            extend(target, source, force, deep, true);
        }
        return target;
    }
    mixin(util, {
        /**
         * extend property form src to target  
         * @param  {Obejct} target copy obj
         * @param  {Object} src    source obj
         * @return {Objet}        target
         */
        extend: function(target, src) {
            var deep,
                force = false,
                onlyOwnProperty = false,
                target = arguments[0] || {},
                args = slice.call(arguments, 1),
                i = 1,
                length = arguments.length;

            if (typeof target == 'boolean') {
                deep = target;
                target = args.shift();
                i++;
            }
            // Handle case when target is a string or something (possible in deep copy)
            if (typeof target !== "object" && !isFunction(target)) {
                target = {};
            }
            // extend zepto itself if only one argument is passed
            if (i === length) {
                args.push(arguments[0]);
                target = this;
                i--;
            }
            args.forEach(function(arg) {
                extend(target, arg, force, deep, onlyOwnProperty);
            })
            return target;
        },
        mixin: mixin
    });

    return util;
}));
