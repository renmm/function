(function(root, factory) {
    'use strict';

    /*global define, exports, module */
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['./src/util/type'],factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory(require('./src/util/type'));
    } else {
        // Browser globals (root is window)
        factory(util);
    }
}(this, function(util) {
    module('type.js 模块测试', {
        setup: function() {
            // TODO
            this.datas = [
                new Object(), 
                {},
                function() {},
                new Function(),
                new Array(), 
                [],
                new String(),
                "ABC",
                new Number(),
                5,
                5.6,
                new RegExp(),
                /\d/gi,
                new Boolean(),
                false,
                new Date(),
                new Error()
                // document.createElement('div') unsupport html node
            ];
        },
        teardown: function() {
            // TODO
        }
    });

    test('type', function() {
        var datatypes = [
            'object',
            'object',
            'function',
            'function',
            'array',
            'array',
            'string',
            'string',
            'number',
            'number',
            'number',
            'regexp',
            'regexp',
            'boolean',
            'boolean',
            'date',
            'error'
        ];
        this.datas.forEach(function(val, index) {
            equal(util.type(val), datatypes[index], val + ' to be tested');
        });
    });

    test('function isArguments test', function() {
        ok(util.isArguments(arguments), 'assert function isArguments ok');
    });
    test('function isBoolean test', function() {
        ok(util.isBoolean(false), 'assert function isBoolean ok');
    });
    test('function isString test', function() {
        ok(util.isString('abc'), 'assert function isString ok');
    });
    test('function isNumber test', function() {
        ok(util.isNumber(123), 'assert function isNumber ok');
    });
    test('function isObject test', function() {
        ok(!util.isObject([]), 'assert function isObject ok');
        ok(!util.isObject(null), 'assert function isObject ok');
        ok(!util.isObject(function() {}), 'assert function isObject ok');
        ok(!util.isObject(new String()), 'assert function isObject ok');
        ok(util.isObject({}), 'assert function isObject ok');
    });
    test('function isFunction test', function() {
        ok(util.isFunction(function() {}), 'assert function isFunction ok');
    });
    test('function isArray test', function() {
        ok(util.isArray([]), 'assert function isArray ok');
    });
    test('function isDate test', function() {
        ok(!util.isDate('2013-06-11'), 'assert function isDate ok');
        ok(util.isDate(new Date()), 'assert function isDate ok');
    });
    test('function isRegExp test', function() {
        ok(util.isRegExp(/\d/), 'assert function isRegExp ok');
    });
    test('function isError test', function() {
        ok(util.isError(new Error()), 'assert function isError ok');
    });
    test('functin isEmptyObject test', function() {
        ok(util.isEmptyObject({}), 'assert function isEmptyObject ok');
        ok(util.isEmptyObject([]), 'assert function isEmptyObject ok');
        ok(!util.isEmptyObject({
            add: function() {}
        }), 'assert function isEmptyObject ok');
    });
    test('function isWindow test', function() {
        ok(util.isWindow(window), 'assert function isWindow ok');
        ok(!util.isWindow(this), 'assert function isWindow ok');
    });
    test('function isArrayLike test', function() {
        ok(util.isArrayLike([]), 'assert function isArrayLike ok');
        ok(util.isArrayLike({
            0: 1,
            1: 2,
            length: 2
        }), 'assert function isArrayLike ok');
        ok(util.isArrayLike(arguments), 'assert function isArrayLike ok');
        ok(!util.isArray(arguments), 'assert function isArrayLike ok');
    });
    test('function isInt test', function() {
        ok(!util.isInt(5.5), 'assert function isArrayLike ok');
        ok(util.isInt(5), 'assert function isArrayLike ok');
    });
    test('function isEmpty test', function() {
        var emptydatas = [
            '',
            false,
            null,
            undefined,
            NaN
        ];
        emptydatas.forEach(function(val) {
            ok(util.isEmpty(val), 'assert val ' + val + ' of function isEmpty ok');
        });
    });
}));
