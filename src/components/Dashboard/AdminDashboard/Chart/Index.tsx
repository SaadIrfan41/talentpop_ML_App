import { EvaluatorBarChart } from './EvaluatorBarChart'

const EvaluatorChart = ({ data }: any) => {
  console.log(data)

  const names: string[] = []
  const graded: number[] = []
  const remaining: number[] = []
  const assigned: number[] = []

  data?.forEach((obj: any) => {
    if (obj?.name) {
      names.push(obj?.name)
    }
    if (obj?.total_assigned) {
      assigned.push(obj?.total_assigned as number)
    }
    if (obj?.total_graded) {
      graded.push(obj?.total_graded as number)
    }
    if (obj?.total_remaining) {
      remaining.push(obj?.total_remaining as number)
    }
  })
  return (
    <div className='w-full p-5 rounded-md border border-dashed border-green-500 mb-10'>
      <div className='flex divide-x '>
        <div className='flex max-h-[480px] max-w-[350px] flex-col gap-6 overflow-y-auto pt-4 text-base font-medium'>
          {data?.map((evaluator: any, index: number) => (
            <div key={index} className='flex gap-16 pl-4 pr-9  '>
              <span>
                {evaluator?.name === null ? 'No Name' : evaluator?.name}
              </span>
            </div>
          ))}
        </div>

        <div className=' mx-auto max-h-[480px] w-full flex-1 overflow-x-scroll '>
          <EvaluatorBarChart
            names={names}
            graded={graded}
            remaining={remaining}
            assigned={assigned}
          />
        </div>
      </div>
    </div>
  )
}

export default EvaluatorChart
