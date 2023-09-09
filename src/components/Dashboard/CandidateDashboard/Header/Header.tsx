import { useAuthStore } from '@/store/useAuthStore'
import { useQuery } from '@tanstack/react-query'
import { SheetIcon } from '@/lib/Icons'
// import { failingReasons } from '@/components/StaticData/FailingReason'
import { ChevronsLeft, ChevronsRight } from 'lucide-react'
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu'
import { Progress } from '@/components/ui/progress'
import { useQuestionResultStore } from '@/store/useQuestionResultStore'
import Loading from './Loading'
import { FailCandidateButton } from './FailCandidateButton'
import { CandidatePassButton } from './CandidatepassButton'

interface ChildProps {
  refetch: () => Promise<any> // Define the prop type for the refetch function
}

const Header = ({ refetch }: ChildProps) => {
  const { access_token } = useAuthStore()
  const {
    // question1_Result,
    // question2_Result,
    // question3_Result,
    // question4_Result,
    // question5_Result,
    setNextApplicant,
    setPrevApplicant,
    // candidate_Type,
  } = useQuestionResultStore()

  const { data, isLoading, error } = useQuery({
    queryKey: ['user-me'],
    queryFn: () => getUserData(),
  })
  const getUserData = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/user/me`,
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      const candidate = await res.json()

      if (res.status === 401) {
        return { message: 'Not authenticated' }
      }
      return candidate
    } catch (error: any) {
      return { message: 'Internal Server Error' }
    }
  }

  if (isLoading) return <Loading />

  if (error) return <p className=' text-base text-[#69C920]'>Error</p>
  if (data.message) {
    if (data.message === 'Not authenticated')
      return (
        <p className=' text-base text-[#69C920]'>Login Credentials Invalid</p>
      )
    return <p className=' text-base text-[#69C920]'>{data.message}</p>
  }
  if (data?.detail == 'No Candidate Found') {
    return <p className=' text-base text-[#69C920]'> No Application Found</p>
  }
  // console.log(data)

  // const checkManualQuestionGrading = () => {
  //   let allQuestions
  //   if (candidate_Type == 'CS') {
  //     // Combine all question arrays into one array
  //     allQuestions = [
  //       ...question1_Result,
  //       ...question2_Result,
  //       ...question3_Result,
  //       ...question4_Result,
  //       ...question5_Result,
  //     ]

  //     // Check if any value is equal to 0
  //     if (allQuestions.some((value) => parseFloat(value) === 0)) {
  //       // At least one value is equal to 0, send old values
  //       alert('ML VAlues will be pushed')
  //     } else {
  //       // All values are greater than 0, send new values
  //       alert('NEW VALUES FOR CS WILL BE PUSHED')
  //     }
  //   } else {
  //     allQuestions = [
  //       ...question1_Result,
  //       ...question2_Result,
  //       ...question3_Result,
  //     ]
  //     // Check if any value is equal to 0
  //     if (allQuestions.some((value) => parseFloat(value) === 0)) {
  //       // At least one value is equal to 0, send old values
  //       alert('ML VAlues will be pushed')
  //     } else {
  //       // All values are greater than 0, send new values
  //       alert('NEW VALUES FOR !CS WILL BE PUSHED')
  //     }
  //   }
  // }
  return (
    <header
      className=' flex gap-x-10 w-full px-10 py-1'
      style={{
        backgroundImage: `linear-gradient(
          90deg,
          rgba(201, 255, 206, 0.52) 0%,
          rgba(171, 254, 206, 0.09) 33.33%,
          rgba(169, 177, 243, 0.44) 66.67%,
          rgba(158, 0, 255, 0.05) 100%
        )`,
      }}
    >
      <div className=' flex items-center w-full'>
        <button
          onClick={() => {
            setPrevApplicant(),
              setTimeout(() => {
                refetch()
              }, 0)
          }}
        >
          <ChevronsLeft className=' w-8 h-8 text-red-500' />
        </button>
        <SheetIcon />
        <button
          onClick={() => {
            setNextApplicant(),
              setTimeout(() => {
                refetch()
              }, 0)
          }}
        >
          <ChevronsRight className=' w-8 h-8 text-purple-500' />
        </button>
      </div>

      <div className='flex items-center gap-x-4 w-full'>
        <Progress
          value={(data?.graded / data?.assigned) * 100}
          className=' w-96 bg-gray-400 h-2'
        />
        <span className=' text-[#1ea656] font-semibold text-sm'>
          {data?.graded}/{data?.assigned}
        </span>
      </div>
      <div className='flex w-full gap-x-4 items-center justify-end'>
        <FailCandidateButton />
        <CandidatePassButton />
        {/* <DropdownMenu>
          <DropdownMenuTrigger
            className={
              'bg-gradient-to-r  focus:outline-none from-[#8800f3] from-0% to-red-500 to-100% text-white text-sm  flex items-center gap-x-2 rounded-sm p-1 px-2 '
            }
          >
            <ChevronDown className='w-4 h-4' />
            Failed
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className=' text-sm'>
              Reason for Failing
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {failingReasons.map((reason, index) => (
              <DropdownMenuItem
                onClick={() => checkManualQuestionGrading()}
                className=' cursor-pointer'
                key={index}
              >
                {reason}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu> */}
        {/* <button
          onClick={() => checkManualQuestionGrading()}
          className={
            'bg-gradient-to-r  focus:outline-none from-[#6bf4a4] from-0% to-[#34ceff] to-100% text-white text-sm  flex items-center gap-x-2 rounded-sm p-1 px-2 '
          }
        >
          Passed
        </button> */}
      </div>
    </header>
  )
}

export default Header
