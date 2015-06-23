(function(root, factory) {
    'use strict';

    /*global define, exports, module */
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['./src/util/object'],factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory(require('./src/util/object'));
    } else {
        // Browser globals (root is window)
        factory(util);
    }
}(this, function(util) {
    module('object module test', {
        setup:function(){},
        teardown: function() {
            
        }
    });
    test('function util.mixin test', function() {

        util.extend({id:function(){
            this._id = this._id || 0;
            return ++this._id;
        }});

        equal(util.id(), 1, 'when util.mixin({}) add to util object');

        var person = Object.create({
            name:"ddd"
        });
        var man = Object.create(person);
        util.mixin(man,{
            sex:"male"
        })
        var man2 = Object.create(man);
        ok(man.sex === 'male', 'message');
        ok(man !== man2, 'message');

        var obj1 = {
            add:function(x){return x+1;}
        };
        var obj2 = {
            reduce:function(x){return -x},
            add:function(x){return x*2},
            class2:{
                id:function(){
                    this._id = this._id || 0;
                    return ++this._id;
                }
            }
        }
        // util.mixin(obj1,obj2);
        // equal(obj1.add(3), 4, 'message');
        // obj2.class2.id();
        // equal(obj1.class2.id(), 2, 'message');

        util.mixin(obj1,obj2,true,true);
        equal(obj1.add(5), 10, 'message');
        obj2.class2.id();
        obj2.class2.id();
        obj2.class2.id();
        obj2.class2.id();
        equal(obj1.class2.id(), 1, 'message');
    });
}));