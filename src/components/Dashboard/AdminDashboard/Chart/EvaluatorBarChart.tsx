import { useRef, useEffect, useState } from 'react'
import type { ChartData } from 'chart.js'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  BarElement,
  Title,
} from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

// function createGradient(ctx: CanvasRenderingContext2D, area: ChartArea) {
//   const colorStart = '#163143'
//   const colorMid = '#69C920'
//   const colorEnd = '#69C920'

//   const gradient = ctx.createLinearGradient(0, area.top, 0, area.bottom)

//   gradient.addColorStop(0, colorStart)
//   gradient.addColorStop(0.5, colorMid)
//   gradient.addColorStop(1, colorEnd)

//   return gradient
// }

export function EvaluatorBarChart({ names, graded, remaining, assigned }: any) {
  // console.log(names, values)
  const chartRef = useRef<ChartJS>(null)
  const [chartData, setChartData] = useState<ChartData<'bar'>>({
    datasets: [],
  })
  //
  useEffect(() => {
    const chart = chartRef.current

    if (!chart) {
      return
    }
    const data = {
      labels: names,
      datasets: [
        {
          label: 'Graded',
          data: graded,
          backgroundColor: 'rgb(75, 192, 95)',
          stack: 'Stack 0',
        },
        {
          label: 'Remaining',
          data: remaining,
          backgroundColor: 'rgb(255, 99, 132)',
          stack: 'Stack 1',
        },
        {
          label: 'Remaining',
          data: assigned,
          backgroundColor: 'rgb(99, 122, 255)',
          stack: 'Stack 2',
        },
        // {
        //   //  label: 'Dataset 1',
        //   data: values,
        // },
        // {
        //   label: 'Dataset 2',
        //   data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        // },
      ],
    }

    // const chartData = {
    //   ...data,
    //   datasets: data.datasets.map((dataset) => ({
    //     ...dataset,
    //     backgroundColor: createGradient(chart.ctx, chart.chartArea),
    //   })),
    // }

    setChartData(data)
  }, [names, graded, remaining, assigned])

  const options = {
    // indexAxis: 'x' as const,
    // barThickness: names.length < 200 ? 50 : 10,
    barThickness: names.length < 30 ? 30 : 10,

    maintainAspectRatio: false,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      x: {
        display: false,
      },

      y: {
        type: 'logarithmic',
        stacked: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      // title: {
      //   display: true,
      //   text: 'Chart.js Horizontal Bar Chart',
      // },
    },
  }

  return (
    <div
      // style={{ width: names.length * 20 }}
      style={{
        width: names.length < 50 ? '100%' : names.length * 15,
      }}
      className='mx-auto h-[450px]  '
    >
      <Chart
        ref={chartRef}
        //@ts-ignore
        options={options}
        type='bar'
        data={chartData}
        // width={names.length * 20}
        height={'100%'}
        className={` `}
      />
    </div>
  )
}
