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
            'https://cdn.jsdelivr.net/npm/echarts@4.6.0/dist/echarts.min.js'
        ],
        // 事件绑定相关定义
        events: {
            'click #btn1': 'on_btn1_click',
        },
        // action的构造器，可以自行根据需求填入需要初始化的数据，比如获取context里的参数，根据条件判断初始化一些变量。
        init: function(parent, context) {
            this._super(parent, context);
            console.log("in action init!");
            this.echart_option = {
                title: {
                    text: 'ECharts 入门示例'
                },
                tooltip: {},
                legend: {
                    data:['销量']
                },
                xAxis: {
                    data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            };
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
                self.render_chart();
            });
        },
        render_chart: function() {
            var el = this.$el.find('#app')[0];
            this.myChart = echarts.init(el);
            this.myChart.setOption(this.echart_option);

        },
        on_btn1_click: function(event) {
            console.log('on_btn1_click!');
            var self = this;
            return this._rpc({
                route: '/custom_page/data/',
                params: {},
            }).done(function(result) {
                console.log(result);
                var data = result;
                self.echart_option.xAxis.data = data['x_data'];
                self.echart_option.series[0].data = data['y_data'];
                self.myChart.setOption(self.echart_option, true);
            });
        },
    });
    
    core.action_registry.add('custom_page.echart', CustomPageEchart);
    
    return CustomPageEchart;
    
    });
    