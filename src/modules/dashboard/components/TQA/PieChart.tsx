import { FC } from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement } from 'chart.js'

ChartJS.register(ArcElement)

interface PieChartProps {
  data: {
    datasets: {
      data: number[]
      backgroundColor: string[]
    }[]
  }
}

const Chart: FC<PieChartProps> = ({ data }) => <Pie data={data} />

export default Chart
