import React from 'react'
import ReactECharts, { EChartsOption } from 'echarts-for-react'

const option: EChartsOption = {
  series: [
    {
      type: 'gauge',
      startAngle: 180,
      endAngle: 0,
      min: 0,
      max: 240,
      splitNumber: 1,
      itemStyle: {
        color: '#58D9F9',
        borderWidth: 1,
        borderColor: {
          type: 'linear',
          x: 0,
          y: 1,
          x2: 1,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#562586',
            },
            {
              offset: 0.7,
              color: '#00CDCD',
            },
          ],
          global: false,
        },
        shadowColor: '#ffffff00',
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
      },
      progress: {
        show: true,
        roundCap: true,
        width: 14,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 1,
            x2: 1,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#562586',
              },
              {
                offset: 0.7,
                color: '#00CDCD',
              },
            ],
            global: false,
          },
        },
      },
      pointer: {
        show: false,
        icon: 'circle',
        offsetCenter: [0, '-91%'],
        length: '12%',
        width: 50,
        itemStyle: {
          color: '#1B6176',
          borderColor: '#74DEFF',
          borderWidth: 5,
          shadowColor: 'rgba(10, 31, 68, 0)',
          shadowBlur: 2,
          shadowOffsetY: 1,
        },
      },
      axisLine: {
        roundCap: true,
        lineStyle: {
          width: 14,
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: false,
        formatter: (value: number) => `${(value / 240) * 100}`,
        fontSize: 14,
      },
      title: {
        show: false,
      },
      detail: {
        margin: [10, 10, 10, 10],
        borderRadius: 8,
        offsetCenter: [0, '-10%'],
        color: 'white',
        fontSize: 45,
        fontFamily: 'Poppins',
        valueAnimation: true,
        formatter: function (value: number) {
          return `${~~((value / 240) * 100)}%`
        },
      },
      data: [
        {
          value: 200,
        },
      ],
    },
  ],
}

export default function ProgressBar() {
  return (
    <div>
      <ReactECharts option={option} />
    </div>
  )
}
