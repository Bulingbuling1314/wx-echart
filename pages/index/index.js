import * as echarts from '../../ec-canvas/echarts';

let chart = null;
function initChart(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);
  var option = {
    title: {
        text: '双向堆叠图'
    },
    tooltip: {
        trigger: 'axis',
        formatter: function(params) {
            var str = ''; //声明一个变量用来存储数据
            const[a, b] = params;
            console.log(params)
            var a1 = `${a.seriesName}: ${a.value > 0 ? a.value : -a.value}`;
            var b1 = `${b.seriesName}: ${b.value > 0 ? b.value : -b.value}`;
            str = a1 + '</br>' + b1;
            return str;
        },
    },
    legend: { 
        //位置需要与color对应，方可得到相应颜色
        data: ['上行', '下行']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
    ],
    yAxis: [
        {
            type: 'value',
            axisLabel:{
                formatter:function(v){
                    return v>0?v:-v;
                }
            }
        }
    ],
    series: [
        {
            name: '下行',
            type: 'bar',
            stack: '总量',
            data: [-180, -262, -201, -154, -110, -230, -110]
        },
        {
            name: '上行',
            type: 'bar',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410]
        },
    ]
  };

 


  chart.setOption(option);
  return chart;
}

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    ec: {
      onInit: initChart
    }
  },

  onReady() {
    setTimeout(function () {
      // 获取 chart 实例的方式
      // console.log(chart)
    }, 2000);
  }
});
