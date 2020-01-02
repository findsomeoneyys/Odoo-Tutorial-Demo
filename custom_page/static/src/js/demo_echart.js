odoo.define('custom_page.echart', function (require) {
    "use strict";
    
    var AbstractAction = require('web.AbstractAction');
    var core = require('web.core');
    var ajax = require('web.ajax');
    
    var CustomPageEchart = AbstractAction.extend({
        template: 'EchartPage',
        // 需要额外引入的css文件
        cssLibs: [
        ],
        // 需要额外引入的js文件
        jsLibs: [
        ],
        // 事件绑定相关定义
        events: {
        },
        // action的构造器，可以自行根据需求填入需要初始化的数据，比如获取context里的参数，根据条件判断初始化一些变量。
        init: function(parent, context) {
            this._super(parent, context);
            console.log("in action init!");
        },
        // willStart是执行介于init和start中间的一个异步方法，一般会执行向后台请求数据的请求，并储存返回来的数据。
        // 其中ajax.loadLibs(this)会帮加载定义在cssLibs，jsLibs的js组件。
        willStart: function() {
            var self = this;
            return $.when(ajax.loadLibs(this), this._super()).then(function() {
                console.log("in action willStart!");
            });
        },
        // start方法会在渲染完template后执行，此时可以做任何需要处理的事情。
        // 比如根据willStart返回来数据，初始化引入的第三方js库组件
        start: function() {
            var self = this;
            return this._super().then(function() {
                console.log("in action start!");
            });
        },
    });
    
    core.action_registry.add('custom_page.echart', CustomPageEchart);
    
    return CustomPageEchart;
    
    });
    