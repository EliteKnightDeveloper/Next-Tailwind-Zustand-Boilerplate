import { FC, useCallback, useRef, useState } from 'react'
import { Line } from 'react-chartjs-2'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
  Tooltip,
  Legend
)

interface CharProp {
  period: number
}

const CreditChart: FC<CharProp> = ({ period }) => {
  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        display: false,
      },
      tooltip: {
        bodyFont: {
          size: 14,
          family: 'Poppins',
        },
        enabled: true,
        backgroundColor: '#202225',
        displayColors: false,
        padding: 12,
        callbacks: {
          title: () => null,
          label: function (context: any) {
            const label = 'Total Credit: ' + context.parsed.y
            const label2 = 'Date: ' + context.label
            return [label, label2]
          },
        },
      },
    },
    interaction: {
      mode: 'index',
      intersect: true,
    },
    scales: {
      x: {
        grid: {
          drawBorder: false,
          display: false,
        },
        border: {},
      },
      y: {
        grid: {
          color: '#F1F5F9',
          display: false,
        },
        border: {
          display: false,
        },
      },
    },
  }

  const labels = []

  for (let i = 0; i < period; i++) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const month = date.getMonth() + 1
    const day = date.getDate()
    if (day <= 0) {
      date.setMonth(date.getMonth() - 1)
      date.setDate(30 + day)
    }
    const formattedDate = `${month}/${day}`
    labels.push(formattedDate)
  }

  const data = {
    labels,
    datasets: [
      {
        data: labels.reverse().map(() => Math.floor(Math.random() * 100)),
        fill: true,
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx
          const gradient = ctx.createLinearGradient(
            0,
            0,
            0,
            context.chart.height
          )
          gradient.addColorStop(0, '#00AEEFBF')
          gradient.addColorStop(1, '#20213600')
          return gradient
        },
        borderColor: '#00AEEF',
        maxBarThickness: 30,
        borderRadius: 10,
        categoryPercentage: 0.4,
        barPercentage: 1.0,
        pointBackgroundColor: '#00AEEF',
        pointRadius: 6,
      },
    ],
  }
  return <Line options={options} data={data} height="300px" />
}

export default CreditChart
