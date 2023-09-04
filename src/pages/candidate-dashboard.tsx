import Header from '@/components/Dashboard/CandidateDashboard/Header/Header'
import TriangleShape from '@/components/Dashboard/CandidateDashboard/TriangleShape'
import {
  questionsAGA,
  questionsCGA,
  questionsCS,
} from '@/components/StaticData/QuesionsData'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthStore } from '@/store/useAuthStore'
import { useQuestionResultStore } from '@/store/useQuestionResultStore'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

const CandidateDashboard = () => {
  const { access_token } = useAuthStore()

  const [canID, setcanID] = useState(null)

  const {
    question1_Result,
    question2_Result,
    question3_Result,
    question4_Result,
    question5_Result,
    setQuestion1_Result,
    setQuestion2_Result,
    setQuestion3_Result,
    setQuestion4_Result,
    setQuestion5_Result,
    handleInputChange,
    nextApplication,
    prevApplication,
    setCandidateType,
  } = useQuestionResultStore()
  const [questions, setquestions] = useState([''])

  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ['candidate-data'],
    queryFn: () => getCandidateData(),
  })
  console.log('NEXT', nextApplication, 'PREV', prevApplication)

  const getCandidateData = async () => {
    if (canID) {
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_BACKEND_BASE_URL
          }/candidate?candidate_id=${canID}&next_candidate=${nextApplication}&prev_candidate=${prevApplication}`,
          {
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${access_token}`,
            },
          }
        )
        const candidate = await res.json()
        console.log('NEW CANDIDATE', candidate)

        if (res.status === 401) {
          return { message: 'Not authenticated' }
        }
        return candidate
      } catch (error: any) {
        return { message: 'Internal Server Error' }
      }
    }

    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_BACKEND_BASE_URL
        }/candidate?next_candidate=${nextApplication}&prev_candidate=${prevApplication}`,
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
  useEffect(() => {
    if (data) {
      setcanID(data?.id)
      if (data?.candidate_type) {
        setCandidateType(data?.candidate_type)
        if (data?.candidate_type === 'CS') {
          setquestions(questionsCS)
        } else if (data?.candidate_type === 'AGA') {
          setquestions(questionsAGA)
        } else {
          setquestions(questionsCGA)
        }
      }
    }
  }, [data])

  if (isLoading || isFetching)
    return (
      <div className='grid place-items-center h-screen w-full bg-gray-200'>
        <span className='loader' />
      </div>
    )

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
  console.log(data.id)

  const getQuestionResult = (score: string[]) => {
    const sum = score.reduce((acc, val) => acc + parseFloat(val), 0)

    const result = (sum / 20) * 100
    // console.log(result)
    if (isNaN(result)) {
      return 0
    }
    return result?.toFixed(2).replace(/[.,]00$/, '')
  }
  console.log(data.candidate_type)

  return (
    <div className=' flex flex-col max-h-screen'>
      <Header refetch={refetch} />

      <div
        style={{
          backgroundImage: `linear-gradient(
    90deg,
    rgba(201, 255, 206, 0.52) 0%,
    rgba(171, 254, 206, 0.09) 33.33%,
    rgba(169, 177, 243, 0.44) 66.67%,
    rgba(158, 0, 255, 0.05) 100%
  )`,
        }}
        className='grid  grid-cols-3  overflow-hidden  '
      >
        <section className=' pl-2 pb-5 max-h-screen overflow-y-scroll no-scrollbar'>
          <div className='flex justify-between text-[#1C908A]  my-2 ml-2 '>
            <h1 className=' text-lg font-medium'>
              {data?.candidate_type} Quiz Questionnaire
            </h1>
            <span
              className={` ${
                data?.aggregate_score_ml >= 89
                  ? 'bg-[#488143] text-white'
                  : data?.aggregate_score_ml >= 79
                  ? 'bg-[#CEFF7E]'
                  : 'bg-red-400 text-white'
              } text-sm rounded-full w-12 h-12 border flex items-center justify-center border-[#A8A8A8]`}
            >
              {data?.aggregate_score_ml?.toFixed(1)?.replace(/[.,]0$/, '')}
            </span>
          </div>
          <div className='flex flex-col gap-y-3 text-sm  '>
            {questions.map((question, index) => (
              <div key={index} className=' flex flex-col gap-y-6 '>
                <span className=' font-medium mx-2 flex  gap-x-1'>
                  {' '}
                  Q{index + 1}. <span>{question}</span>{' '}
                </span>
                <div className='p-3 text-[#808080] rounded-2xl bg-white relative'>
                  {data[`CS_Quiz_${index + 1}`]}
                  <span
                    className={` bg-[#488143] ${
                      data[`question${index + 1}_result`] === null
                        ? 'hidden'
                        : 'flex'
                    } absolute  items-center justify-center text-white h-10 w-10 rounded-full top-[-25px] right-0`}
                  >
                    {data[`question${index + 1}_result`]?.score
                      .toFixed(1)
                      .replace(/[.,]0$/, '')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className='px-4 pb-5 max-h-screen overflow-y-scroll no-scrollbar'>
          <div className='flex justify-between  items-center my-2  '>
            <h1 className=' text-lg font-medium text-[#1C908A]'>
              Candidate Application
            </h1>
            <div className='flex gap-x-2'>
              <span
                className={` ${
                  data?.repeat ? 'bg-red-500' : 'bg-[#00793F]'
                } text-sm p-2 text-white rounded-sm  flex items-center justify-center border-[#A8A8A8]`}
              >
                Duplicate: {data?.repeat ? 'Yes' : 'No'}
              </span>

              <span
                className={` ${
                  data?.candidate_type == 'CS' ? 'bg-[#007937]' : 'bg-[#faa946]'
                } text-white p-2 text-sm rounded-sm  flex items-center justify-center border-[#A8A8A8]`}
              >
                Type: {data?.candidate_type}
              </span>
            </div>
          </div>
          <div className='flex flex-col gap-y-3'>
            <div className='flex gap-x-5 text-sm'>
              <div className='grow flex flex-col gap-y-2'>
                <Label className='text-sm' htmlFor='firstName'>
                  First Name
                </Label>
                <Input
                  className='bg-white text-[#808080] h-8 text-sm focus-visible:ring-offset-0 drop-shadow-md focus-visible:ring-[#69C920]'
                  name='firstName'
                  value={data?.First_Name ? data.First_Name : 'Not Provided'}
                  readOnly
                  type='text'
                />
              </div>
              <div className='grow flex flex-col gap-y-2'>
                <Label className='text-sm' htmlFor='lastName'>
                  Last Name
                </Label>
                <Input
                  className='bg-white text-[#808080] text-sm h-8 focus-visible:ring-offset-0 drop-shadow-md focus-visible:ring-[#69C920]'
                  name='lastName'
                  type='text'
                  value={data?.Last_Name ? data.Last_Name : 'Not Provided'}
                  readOnly
                />
              </div>
            </div>
            <div className='flex flex-col gap-y-2'>
              <Label className='text-sm' htmlFor='email'>
                Email
              </Label>
              <Input
                className='bg-white h-9 text-[#808080] focus-visible:ring-offset-0 drop-shadow-md focus-visible:ring-[#69C920]'
                name='email'
                value={
                  data?.Email_Address ? data.Email_Address : 'Not Provided'
                }
                readOnly
                type='text'
              />
            </div>
            <div className='flex flex-col gap-y-2'>
              <Label className='text-sm' htmlFor='phoneNumber'>
                Phone Number
              </Label>
              <Input
                className='bg-white h-9 text-[#808080] focus-visible:ring-offset-0 drop-shadow-md focus-visible:ring-[#69C920]'
                name='phoneNumber'
                value={data?.phonenumber ? data.phonenumber : 'Not Provided'}
                readOnly
                type='text'
              />
            </div>
            <div className='flex gap-x-5 text-sm'>
              <div className='grow flex flex-col gap-y-2'>
                <Label className='text-sm' htmlFor='gender'>
                  Gender
                </Label>
                <Input
                  className='bg-white text-[#808080] h-8 text-sm focus-visible:ring-offset-0 drop-shadow-md focus-visible:ring-[#69C920]'
                  name='gender'
                  value={data?.gender ? data.gender : 'Not Provided'}
                  readOnly
                  type='text'
                />
              </div>
              <div className='grow flex flex-col gap-y-2'>
                <Label className='text-sm' htmlFor='applicationCode'>
                  Application Code
                </Label>
                <Input
                  className='bg-white text-[#808080] text-sm h-8 focus-visible:ring-offset-0 drop-shadow-md focus-visible:ring-[#69C920]'
                  name='applicationCode'
                  type='text'
                  value={
                    data?.Application_Code
                      ? data.Application_Code
                      : 'Not Provided'
                  }
                  readOnly
                />
              </div>
            </div>
            <div className=' flex flex-col gap-y-2'>
              <Label className='text-sm' htmlFor='coverLetter'>
                Cover Letter
              </Label>
              <div
                className='bg-white  text-[#808080] drop-shadow-md  rounded-2xl p-3'

                // type='text'
              >
                {' '}
                {data?.Cover_Letter ? data.Cover_Letter : 'Not Provided'}
              </div>
            </div>
            <div className=' lg:text-sm text-xs text-center flex gap-x-3 justify-between mt-4'>
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    className={`relative  text-[#7000FF] tracking-[1px] hover:text-black duration-300 after:content-[''] after:bg-[#6BF4A4] after:h-[3px] after:w-[100%] after:left-0 after:-bottom-[10px] after:absolute`}
                  >
                    Application Resume Link
                  </button>
                </DialogTrigger>
                <DialogContent className=''>
                  <DialogHeader>
                    <DialogTitle>Application Resume Link</DialogTitle>
                    <DialogDescription>
                      Click the link below (if avaliable)
                    </DialogDescription>
                  </DialogHeader>
                  {data?.Applicant_Resume ? (
                    <a
                      href={data?.Applicant_Resume}
                      target='_blank'
                      rel='noopener noreferrer'
                      className={` border border-dashed border-green-400 rounded-xl p-3 text-blue-600`}
                    >
                      {data?.Applicant_Resume}
                    </a>
                  ) : (
                    <div className='text-red-400 font-medium'>
                      No Application Resume Link was Provided
                    </div>
                  )}
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    className={`relative  text-[#7000FF] tracking-[1px] hover:text-black duration-300 after:content-[''] after:bg-[#6BF4A4] after:h-[3px] after:w-[100%] after:left-0 after:-bottom-[10px] after:absolute`}
                  >
                    Creative Portfolio Link
                  </button>
                </DialogTrigger>
                <DialogContent className=''>
                  <DialogHeader>
                    <DialogTitle>Creative Portfolio Link</DialogTitle>
                    <DialogDescription>
                      Click the link below (if avaliable)
                    </DialogDescription>
                  </DialogHeader>
                  {data?.portfolio_link ? (
                    <a
                      href={data?.portfolio_link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className={` border border-dashed border-green-400 rounded-xl p-3 text-blue-600`}
                    >
                      {data?.portfolio_link}
                    </a>
                  ) : (
                    <div className='text-red-400 font-medium'>
                      No Portfolio Link was Provided
                    </div>
                  )}
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    className={`relative  text-[#7000FF] tracking-[1px] hover:text-black duration-300 after:content-[''] after:bg-[#6BF4A4] after:h-[3px] after:w-[100%] after:left-0 after:-bottom-[10px] after:absolute`}
                  >
                    Speed Test Link
                  </button>
                </DialogTrigger>
                <DialogContent className=''>
                  <DialogHeader>
                    <DialogTitle> Speed Test Link</DialogTitle>
                    <DialogDescription>
                      Click the link below (if avaliable)
                    </DialogDescription>
                  </DialogHeader>
                  {data?.Speedtest_Link ? (
                    <a
                      href={data?.Speedtest_Link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className={` border border-dashed border-green-400 rounded-xl p-3 text-blue-600`}
                    >
                      {data?.Speedtest_Link}
                    </a>
                  ) : (
                    <div className='text-red-400 font-medium'>
                      No SpeedTest Link was Provided
                    </div>
                  )}
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    className={`relative  text-[#7000FF] tracking-[1px] hover:text-black duration-300 after:content-[''] after:bg-[#6BF4A4] after:h-[3px] after:w-[100%] after:left-0 after:-bottom-[10px] after:absolute`}
                  >
                    Typing Quiz Link
                  </button>
                </DialogTrigger>
                <DialogContent className=''>
                  <DialogHeader>
                    <DialogTitle>Typing Quiz Link</DialogTitle>
                    <DialogDescription>
                      Click the link below (if avaliable)
                    </DialogDescription>
                  </DialogHeader>
                  {data?.Typing_Quiz_Link ? (
                    <a
                      href={data?.Typing_Quiz_Link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className={` border border-dashed border-green-400 rounded-xl p-3 text-blue-600`}
                    >
                      {data?.Typing_Quiz_Link}
                    </a>
                  ) : (
                    <div className='text-red-400 font-medium'>
                      No Typing Quiz Link was Provided
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
            <div className=' flex flex-col gap-y-2 mt-5'>
              <Label
                className='text-sm'
                htmlFor='How did you hear about this position?'
              >
                How did you hear about this position?
              </Label>
              <Input
                className='bg-white h-9 text-[#808080] focus-visible:ring-offset-0 drop-shadow-md focus-visible:ring-[#69C920]'
                name='How did you hear about this position?'
                value={
                  data?.referral_source ? data.referral_source : 'Not Provided'
                }
                readOnly
                type='text'
              />
            </div>
            <div className=' flex flex-col gap-y-2'>
              <Label className='text-sm' htmlFor='Referral Name'>
                Referral Name
              </Label>
              <Input
                className='bg-white h-9 text-[#808080] focus-visible:ring-offset-0 drop-shadow-md focus-visible:ring-[#69C920]'
                name='Referral Name'
                value={
                  data?.Referral_Name ? data.Referral_Name : 'Not Provided'
                }
                readOnly
                type='text'
              />
            </div>
            <div className=' flex flex-col gap-y-2'>
              <Label
                className='text-sm'
                htmlFor='What country are you applying from?'
              >
                What country are you applying from?
              </Label>
              <Input
                className='bg-white h-9 text-[#808080] focus-visible:ring-offset-0 drop-shadow-md focus-visible:ring-[#69C920]'
                name='What country are you applying from?'
                value={data?.Country ? data.Country : 'Not Provided'}
                readOnly
                type='text'
              />
            </div>
            <div className=' flex flex-col gap-y-2'>
              <Label
                className='text-sm'
                htmlFor='What languages can you speak/write?'
              >
                What languages can you speak/write?
              </Label>
              <Input
                className='bg-white h-9 text-[#808080] focus-visible:ring-offset-0 drop-shadow-md focus-visible:ring-[#69C920]'
                name='What languages can you speak/write?'
                value={
                  data?.spoken_languages
                    ? data.spoken_languages
                    : 'Not Provided'
                }
                readOnly
                type='text'
              />
            </div>
            <div className=' flex flex-col gap-y-2'>
              <Label className='text-sm' htmlFor='What is your availability?'>
                What is your availability?
              </Label>
              <Input
                className='bg-white h-9 text-[#808080] focus-visible:ring-offset-0 drop-shadow-md focus-visible:ring-[#69C920]'
                name='What is your availability?'
                value={data?.Availability ? data.Availability : 'Not Provided'}
                readOnly
                type='text'
              />
            </div>
            <div className=' flex flex-col gap-y-2'>
              <Label
                className='text-sm'
                htmlFor='What is your current employment status?'
              >
                What is your current employment status?
              </Label>
              <Input
                className='bg-white h-9 text-[#808080] focus-visible:ring-offset-0 drop-shadow-md focus-visible:ring-[#69C920]'
                name='What is your current employment status?'
                value={
                  data?.Current_Employment_Status
                    ? data.Current_Employment_Status
                    : 'Not Provided'
                }
                readOnly
                type='text'
              />
            </div>
            <div className=' flex flex-col gap-y-2'>
              <Label
                className='text-sm'
                htmlFor='Existing Commitments/Obligations'
              >
                Existing Commitments/Obligations
              </Label>
              <Input
                className='bg-white h-9 text-[#808080] focus-visible:ring-offset-0 drop-shadow-md focus-visible:ring-[#69C920]'
                name='Existing Commitments/Obligations'
                value={
                  data?.Existing_Commitment
                    ? data.Existing_Commitment
                    : 'Not Provided'
                }
                readOnly
                type='text'
              />
            </div>
            <div className=' flex flex-col gap-y-2'>
              <Label className='text-sm' htmlFor='Extended Leave of Absence'>
                Extended Leave of Absence
              </Label>
              <Input
                className='bg-white h-9 text-[#808080] focus-visible:ring-offset-0 drop-shadow-md focus-visible:ring-[#69C920]'
                name='Extended Leave of Absence'
                value={
                  data?.extended_absence
                    ? data.extended_absence
                    : 'Not Provided'
                }
                readOnly
                type='text'
              />
            </div>
            <div className=' flex flex-col gap-y-2'>
              <Label
                className='text-sm'
                htmlFor='Currently Studying Or Planning To Study'
              >
                Currently Studying Or Planning To Study
              </Label>
              <Input
                className='bg-white h-9 text-[#808080] focus-visible:ring-offset-0 drop-shadow-md focus-visible:ring-[#69C920]'
                name='Currently Studying Or Planning To Study'
                value={
                  data?.Studying_Planning_Studying
                    ? data.Studying_Planning_Studying
                    : 'Not Provided'
                }
                readOnly
                type='text'
              />
            </div>
            <div className=' flex flex-col gap-y-2'>
              <Label
                className='text-sm'
                htmlFor='If Hired, How Soon Would You Be Able To Get Started?'
              >
                If Hired, How Soon Would You Be Able To Get Started?
              </Label>
              <Input
                className='bg-white h-9 text-[#808080] focus-visible:ring-offset-0 drop-shadow-md focus-visible:ring-[#69C920]'
                name='If Hired, How Soon Would You Be Able To Get Started?'
                value={
                  data?.Tentative_Start_Date
                    ? data.Tentative_Start_Date
                    : 'Not Provided'
                }
                readOnly
                type='text'
              />
            </div>
            <div className=' flex flex-col gap-y-2'>
              <Label
                className='text-sm'
                htmlFor='Years of E-commerce Experience'
              >
                Years of E-commerce Experience
              </Label>
              <Input
                className='bg-white h-9 text-[#808080] focus-visible:ring-offset-0 drop-shadow-md focus-visible:ring-[#69C920]'
                name='Years of E-commerce Experience'
                value={
                  data?.Year_Ecom_Experience
                    ? data.Year_Ecom_Experience
                    : 'Not Provided'
                }
                readOnly
                type='text'
              />
            </div>
            <div className=' flex flex-col gap-y-2'>
              <Label
                className='text-sm'
                htmlFor='Years of Graphic Design Experience'
              >
                Years of Graphic Design Experience
              </Label>
              <Input
                className='bg-white h-9 text-[#808080] focus-visible:ring-offset-0 drop-shadow-md focus-visible:ring-[#69C920]'
                name='Years of Graphic Design Experience'
                value={
                  data?.years_graphic_design_exp
                    ? data.years_graphic_design_exp
                    : 'Not Provided'
                }
                readOnly
                type='text'
              />
            </div>
            <div className=' flex flex-col gap-y-2'>
              <Label
                className='text-sm'
                htmlFor='Years of Adobe Creative Cloud Experience'
              >
                Years of Adobe Creative Cloud Experience
              </Label>
              <Input
                className='bg-white h-9 text-[#808080] focus-visible:ring-offset-0 drop-shadow-md focus-visible:ring-[#69C920]'
                name='Years of Adobe Creative Cloud Experience'
                value={
                  data?.years_adobe_exp ? data.years_adobe_exp : 'Not Provided'
                }
                readOnly
                type='text'
              />
            </div>
            <div className=' flex flex-col gap-y-2'>
              <Label
                className='text-sm'
                htmlFor='Years of Video Editing Experience'
              >
                Years of Video Editing Experience
              </Label>
              <Input
                className='bg-white h-9 text-[#808080] focus-visible:ring-offset-0 drop-shadow-md focus-visible:ring-[#69C920]'
                name='Years of Video Editing Experience'
                value={
                  data?.years_video_editing_exp
                    ? data.years_video_editing_exp
                    : 'Not Provided'
                }
                readOnly
                type='text'
              />
            </div>
            <div className=' flex flex-col gap-y-2'>
              <Label
                className='text-sm'
                htmlFor='Application: Prior Experience/Roles'
              >
                Application: Prior Experience/Roles
              </Label>
              <Input
                className='bg-white h-9 text-[#808080] focus-visible:ring-offset-0 drop-shadow-md focus-visible:ring-[#69C920]'
                name='Application: Prior Experience/Roles'
                value={data?.previous_exp ? data.previous_exp : 'Not Provided'}
                readOnly
                type='text'
              />
            </div>
            <div className=' flex flex-col gap-y-2'>
              <Label className='text-sm' htmlFor='Software Tool Experience'>
                Software Tool Experience
              </Label>
              <Input
                className='bg-white h-9 text-[#808080] focus-visible:ring-offset-0 drop-shadow-md focus-visible:ring-[#69C920]'
                name='Software Tool Experience'
                value={
                  data?.Software_Tool_Experience
                    ? data.Software_Tool_Experience
                    : 'Not Provided'
                }
                readOnly
                type='text'
              />
            </div>
            <div className=' flex flex-col gap-y-2'>
              <Label className='text-sm' htmlFor='Accepted Compensation?'>
                Accepted Compensation?
              </Label>
              <Input
                className='bg-white h-9 text-[#808080] focus-visible:ring-offset-0 drop-shadow-md focus-visible:ring-[#69C920]'
                name='Accepted Compensation?'
                value={
                  data?.accepted_compensation
                    ? data.accepted_compensation
                    : 'Not Provided'
                }
                readOnly
                type='text'
              />
            </div>
            <div className=' flex flex-col gap-y-2'>
              <Label
                className='text-sm'
                htmlFor='Years of Administrative Experience'
              >
                Years of Administrative Experience
              </Label>
              <Input
                className='bg-white h-9 text-[#808080] focus-visible:ring-offset-0 drop-shadow-md focus-visible:ring-[#69C920]'
                name='Years of Administrative Experience'
                value={
                  data?.years_admin_exp ? data.years_admin_exp : 'Not Provided'
                }
                readOnly
                type='text'
              />
            </div>
            <div className=' flex flex-col gap-y-2'>
              <Label className='text-sm' htmlFor='Rehirable'>
                Rehirable
              </Label>
              <Input
                className='bg-white h-9 text-[#808080] focus-visible:ring-offset-0 drop-shadow-md focus-visible:ring-[#69C920]'
                name='Rehirable'
                value={data?.rehirable ? data.rehirable : 'Not Provided'}
                readOnly
                type='text'
              />
            </div>
            <div className='flex gap-x-5 text-sm'>
              <div className='grow flex flex-col gap-y-2'>
                <Label
                  className='text-sm'
                  htmlFor='Years of Customer Service Experience'
                >
                  Years of Customer Service Experience
                </Label>
                <Input
                  className='bg-white text-[#808080] h-8 text-sm focus-visible:ring-offset-0 drop-shadow-md focus-visible:ring-[#69C920]'
                  name='Years of Customer Service Experience'
                  value={
                    data?.Years_CS_Experience
                      ? data.Years_CS_Experience
                      : 'Not Provided'
                  }
                  readOnly
                  type='text'
                />
              </div>
              <div className='grow flex flex-col gap-y-2'>
                <Label className='text-sm' htmlFor='Skills Assessment Score'>
                  Skills Assessment Score
                </Label>
                <Input
                  className='bg-white text-[#808080] text-sm h-8 focus-visible:ring-offset-0 drop-shadow-md focus-visible:ring-[#69C920]'
                  name='Skills Assessment Score'
                  type='text'
                  value={
                    data?.Skill_Assesment_Score
                      ? data.Skill_Assesment_Score
                      : 'Not Provided'
                  }
                  readOnly
                />
              </div>
            </div>
            <div className=' flex flex-col gap-y-2'>
              <Label
                className='text-sm'
                htmlFor='Available To Work Graveyard? (9AM - 6PM EST/PST)'
              >
                Available To Work Graveyard? (9AM - 6PM EST/PST)
              </Label>
              <Input
                className='bg-white h-9 text-[#808080] focus-visible:ring-offset-0 drop-shadow-md focus-visible:ring-[#69C920]'
                name='Available To Work Graveyard? (9AM - 6PM EST/PST)'
                value={
                  data?.Graveyard_Availability
                    ? data.Graveyard_Availability
                    : 'Not Provided'
                }
                readOnly
                type='text'
              />
            </div>
            <div className=' flex flex-col gap-y-2 '>
              <Label className='text-sm' htmlFor='Valid ID'>
                Valid ID
              </Label>
              <Input
                className='bg-white h-9 text-[#808080] focus-visible:ring-offset-0 drop-shadow-md focus-visible:ring-[#69C920]'
                name='Valid ID'
                value={data?.valid_id ? data.valid_id : 'Not Provided'}
                readOnly
                type='text'
              />
            </div>
          </div>
        </section>
        <section className=' px-2 pb-5 flex flex-col gap-y-5 border-l-2 border-dashed border-indigo-300 opacity-84 max-h-screen overflow-y-scroll no-scrollbar'>
          {' '}
          <div className='flex justify-between text-[#1C908A] items-center m-2 '>
            <h1 className=' text-lg font-medium w-full'>Grading Rubric</h1>
            <div className='w-full flex'>
              <div className='w-full p-3 '>
                {' '}
                <TriangleShape direction='up' text='Q1' />
              </div>
              <div className='w-full p-3'>
                {' '}
                <TriangleShape direction='down' text='Q2' />
              </div>
              <div className='w-full p-3'>
                {' '}
                <TriangleShape direction='up' text='Q3' />
              </div>
            </div>
          </div>
          <div className='grid grid-cols-2  items-center'>
            <span className=' text-sm text-red-500 font-medium'>
              English Fluency (Word choice/Awkward language - How native of an
              English writer/speaker are they?) (0.5 pt each)
            </span>
            <div className='flex justify-center gap-x-2 '>
              <div className='flex rounded-md '>
                <input
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace') {
                      e.preventDefault() // Prevent the Backspace key from navigating back
                      const updatedQuestion1Array = [...question1_Result]
                      updatedQuestion1Array[0] = '0'
                      setQuestion1_Result(updatedQuestion1Array)
                    }
                  }}
                  type='number'
                  name='question_1_grade'
                  id='question_1_grade'
                  className=' w-11 text-center focus:outline-none bg-[#e4ffe7] min-w-0 flex-1 rounded-none rounded-l-md  border-0  text-gray-900  sm:text-sm sm:leading-6'
                  placeholder='0'
                  min={0}
                  max={10}
                  value={question1_Result[0] === '' ? '0' : question1_Result[0]}
                  onChange={(e) => handleInputChange(e, 0, 10)}
                />
                <span className='inline-flex items-center rounded-r-md border border-l-0 border-gray-300 px-2 text-gray-500 sm:text-sm'>
                  /10
                </span>
              </div>
              <div className='flex rounded-md '>
                <input
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace') {
                      e.preventDefault() // Prevent the Backspace key from navigating back
                      const updatedQuestion2Array = [...question2_Result]
                      updatedQuestion2Array[0] = '0'
                      setQuestion2_Result(updatedQuestion2Array)
                    }
                  }}
                  type='number'
                  name='question_2_grade'
                  id='question_2_grade'
                  className=' w-11 text-center focus:outline-none bg-[#e4ffe7]  flex-1 rounded-none rounded-l-md  border-0  text-gray-900  sm:text-sm sm:leading-6'
                  placeholder='0'
                  min={0}
                  max={9}
                  value={question2_Result[0] === '' ? '0' : question2_Result[0]}
                  onChange={(e) => handleInputChange(e, 0, 10)}
                />
                <span className='inline-flex items-center text-center rounded-r-md border border-l-0 border-gray-300 px-2 text-gray-500 sm:text-sm'>
                  /10
                </span>
              </div>{' '}
              <div className='flex rounded-md '>
                <input
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace') {
                      e.preventDefault() // Prevent the Backspace key from navigating back
                      const updatedQuestion3Array = [...question3_Result]
                      updatedQuestion3Array[0] = '0'
                      setQuestion3_Result(updatedQuestion3Array)
                    }
                  }}
                  type='number'
                  name='question_3_grade'
                  id='question_3_grade'
                  className=' w-11 text-center focus:outline-none bg-[#e4ffe7] flex-1 rounded-none rounded-l-md  border-0  text-gray-900  sm:text-sm sm:leading-6'
                  placeholder='0'
                  min={0}
                  max={9}
                  value={question3_Result[0] === '' ? '0' : question3_Result[0]}
                  onChange={(e) => handleInputChange(e, 0, 10)}
                />
                <span className='inline-flex items-center rounded-r-md border border-l-0 border-gray-300 px-2 text-gray-500 sm:text-sm'>
                  /10
                </span>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-2  items-center'>
            <span className=' text-sm text-[#7000FF] font-medium'>
              Grammar/Sentence Structure (Capitalization/Spelling /Punctuation,
              Count all the errors and subtract from 6 (-0.5pts for each, if
              repeat of same mistake, only count once))
            </span>
            <div className='flex justify-center gap-x-2 '>
              <div className='flex rounded-md '>
                <input
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace') {
                      e.preventDefault() // Prevent the Backspace key from navigating back
                      const updatedQuestion1Array = [...question1_Result]
                      updatedQuestion1Array[1] = '0'
                      setQuestion1_Result(updatedQuestion1Array)
                    }
                  }}
                  type='number'
                  name='question_1_grade'
                  id='question_1_grade'
                  className=' w-11 text-center focus:outline-none bg-[#e4ffe7] flex-1 rounded-none rounded-l-md  border-0  text-gray-900  sm:text-sm sm:leading-6'
                  placeholder='0'
                  value={question1_Result[1] === '' ? '0' : question1_Result[1]}
                  onChange={(e) => handleInputChange(e, 1, 6)}
                />
                <span className='inline-flex items-center rounded-r-md border border-l-0 border-gray-300 px-2 text-gray-500 sm:text-sm'>
                  /06
                </span>
              </div>
              <div className='flex rounded-md '>
                <input
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace') {
                      e.preventDefault() // Prevent the Backspace key from navigating back
                      const updatedQuestion2Array = [...question2_Result]
                      updatedQuestion2Array[1] = '0'
                      setQuestion2_Result(updatedQuestion2Array)
                    }
                  }}
                  type='number'
                  name='question_2_grade'
                  id='question_2_grade'
                  className=' w-11 text-center focus:outline-none bg-[#e4ffe7] flex-1 rounded-none rounded-l-md  border-0  text-gray-900  sm:text-sm sm:leading-6'
                  placeholder='0'
                  value={question2_Result[1] === '' ? '0' : question2_Result[1]}
                  onChange={(e) => handleInputChange(e, 1, 6)}
                />
                <span className='inline-flex items-center text-center rounded-r-md border border-l-0 border-gray-300 px-2 text-gray-500 sm:text-sm'>
                  /06
                </span>
              </div>{' '}
              <div className='flex rounded-md '>
                <input
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace') {
                      e.preventDefault() // Prevent the Backspace key from navigating back
                      const updatedQuestion3Array = [...question3_Result]
                      updatedQuestion3Array[1] = '0'
                      setQuestion3_Result(updatedQuestion3Array)
                    }
                  }}
                  type='number'
                  name='question_3_grade'
                  id='question_3_grade'
                  className=' w-11 text-center focus:outline-none bg-[#e4ffe7]  flex-1 rounded-none rounded-l-md  border-0  text-gray-900  sm:text-sm sm:leading-6'
                  placeholder='0'
                  min={0}
                  max={9}
                  value={question3_Result[1] === '' ? '0' : question3_Result[1]}
                  onChange={(e) => handleInputChange(e, 1, 6)}
                />
                <span className='inline-flex items-center rounded-r-md border border-l-0 border-gray-300 px-2 text-gray-500 sm:text-sm'>
                  /06
                </span>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-2  items-center'>
            <span className=' text-sm text-red-500 font-medium'>
              Followed Instructions (-0.5 pts for each, if the instructions
              weren't followed)
            </span>
            <div className='flex justify-center gap-x-2 '>
              <div className='flex rounded-md '>
                <input
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace') {
                      e.preventDefault() // Prevent the Backspace key from navigating back
                      const updatedQuestion1Array = [...question1_Result]
                      updatedQuestion1Array[2] = '0'
                      setQuestion1_Result(updatedQuestion1Array)
                    }
                  }}
                  type='number'
                  name='question_1_grade'
                  id='question_1_grade'
                  className=' w-11 text-center focus:outline-none bg-[#e4ffe7] flex-1 rounded-none rounded-l-md  border-0  text-gray-900  sm:text-sm sm:leading-6'
                  placeholder='0'
                  value={question1_Result[2] === '' ? '0' : question1_Result[2]}
                  onChange={(e) => handleInputChange(e, 2, 4)}
                />
                <span className='inline-flex items-center rounded-r-md border border-l-0 border-gray-300 px-2 text-gray-500 sm:text-sm'>
                  /04
                </span>
              </div>
              <div className='flex rounded-md '>
                <input
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace') {
                      e.preventDefault() // Prevent the Backspace key from navigating back
                      const updatedQuestion2Array = [...question2_Result]
                      updatedQuestion2Array[2] = '0'
                      setQuestion2_Result(updatedQuestion2Array)
                    }
                  }}
                  type='number'
                  name='question_2_grade'
                  id='question_2_grade'
                  className=' w-11 text-center focus:outline-none flex-1 bg-[#e4ffe7] rounded-none rounded-l-md  border-0  text-gray-900  sm:text-sm sm:leading-6'
                  placeholder='0'
                  value={question2_Result[2] === '' ? '0' : question2_Result[2]}
                  onChange={(e) => handleInputChange(e, 2, 4)}
                />
                <span className='inline-flex items-center text-center rounded-r-md border border-l-0 border-gray-300 px-2 text-gray-500 sm:text-sm'>
                  /04
                </span>
              </div>{' '}
              <div className='flex rounded-md '>
                <input
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace') {
                      e.preventDefault() // Prevent the Backspace key from navigating back
                      const updatedQuestion3Array = [...question3_Result]
                      updatedQuestion3Array[2] = '0'
                      setQuestion3_Result(updatedQuestion3Array)
                    }
                  }}
                  type='number'
                  name='question_3_grade'
                  id='question_3_grade'
                  className=' w-11 text-center focus:outline-none bg-[#e4ffe7] flex-1 rounded-none rounded-l-md  border-0  text-gray-900  sm:text-sm sm:leading-6'
                  placeholder='0'
                  min={0}
                  max={9}
                  value={question3_Result[2] === '' ? '0' : question3_Result[2]}
                  onChange={(e) => handleInputChange(e, 2, 4)}
                />
                <span className='inline-flex items-center rounded-r-md border border-l-0 border-gray-300 px-2 text-gray-500 sm:text-sm'>
                  /04
                </span>
              </div>
            </div>
          </div>
          <div className=' grid grid-cols-2 text-black items-center m-2 text-sm font-medium '>
            <div className='flex gap-x-2'>
              <span className=' flex flex-col items-center'>
                Q1{' '}
                <span className='bg-[#DFFFD0] px-3 py-2'>
                  {getQuestionResult(question1_Result)}
                </span>
              </span>
              <span className=' flex flex-col items-center'>
                Q2{' '}
                <span className='bg-[#DFFFD0] px-3 py-2'>
                  {getQuestionResult(question2_Result)}
                </span>
              </span>
              <span className=' flex flex-col items-center'>
                Q3{' '}
                <span className='bg-[#DFFFD0] px-3 py-2'>
                  {getQuestionResult(question3_Result)}
                </span>
              </span>
              <span className=' flex flex-col items-center'>
                Q4{' '}
                <span className='bg-[#DFFFD0] px-3 py-2'>
                  {getQuestionResult(question4_Result)}
                </span>
              </span>
              <span className=' flex flex-col items-center'>
                Q5{' '}
                <span className='bg-[#DFFFD0] px-3 py-2'>
                  {getQuestionResult(question5_Result)}
                </span>
              </span>
            </div>
            <div className='w-full flex justify-evenly'>
              <div className=' w-16  h-16  '>
                {' '}
                <TriangleShape direction='up' text='Q4' />
              </div>
              <div className='w-16  h-16 '>
                {' '}
                <TriangleShape direction='down' text='Q5' />
              </div>
            </div>
          </div>
          <div className='grid grid-cols-2  items-center'>
            <span className=' text-sm text-red-500 font-medium'>
              Grammar/Sentence Structure (Capitalization/Spelling/Punctuation,
              Count all the errors and subtract from 7 (-0.5pts for each, if
              repeat of same mistake, only count once))
            </span>
            <div className='flex justify-evenly gap-x-2 '>
              <div className='flex rounded-md '>
                <input
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace') {
                      e.preventDefault() // Prevent the Backspace key from navigating back
                      const updatedQuestion4Array = [...question4_Result]
                      updatedQuestion4Array[0] = '0'
                      setQuestion4_Result(updatedQuestion4Array)
                    }
                  }}
                  type='number'
                  name='question_4_grade'
                  id='question_4_grade'
                  className=' w-11 text-center focus:outline-none bg-[#e4ffe7] flex-1 rounded-none rounded-l-md  border-0  text-gray-900  sm:text-sm sm:leading-6'
                  placeholder='0'
                  min={0}
                  max={9}
                  value={question4_Result[0] === '' ? '0' : question4_Result[0]}
                  onChange={(e) => handleInputChange(e, 0, 7)}
                />
                <span className='inline-flex items-center rounded-r-md border border-l-0 border-gray-300 px-2 text-gray-500 sm:text-sm'>
                  /07
                </span>
              </div>
              <div className='flex rounded-md '>
                <input
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace') {
                      e.preventDefault() // Prevent the Backspace key from navigating back
                      const updatedQuestion5Array = [...question5_Result]
                      updatedQuestion5Array[0] = '0'
                      setQuestion5_Result(updatedQuestion5Array)
                    }
                  }}
                  type='number'
                  name='question_5_grade'
                  id='question_5_grade'
                  className=' w-11 text-center focus:outline-none bg-[#e4ffe7] flex-1 rounded-none rounded-l-md  border-0  text-gray-900  sm:text-sm sm:leading-6'
                  placeholder='0'
                  min={0}
                  max={9}
                  value={question5_Result[0] === '' ? '0' : question5_Result[0]}
                  onChange={(e) => handleInputChange(e, 0, 7)}
                />
                <span className='inline-flex items-center text-center rounded-r-md border border-l-0 border-gray-300 px-2 text-gray-500 sm:text-sm'>
                  /07
                </span>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-2  items-center'>
            <span className=' text-sm text-[#7000FF] font-medium'>
              Content/ Solutions-Oriented in the best way possible? (-0.5 pts
              for each, responds to questions in a clear manner/resolution,
              closing remarks, clarity of resolution)
            </span>
            <div className='flex justify-evenly gap-x-2 '>
              <div className='flex rounded-md '>
                <input
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace') {
                      e.preventDefault() // Prevent the Backspace key from navigating back
                      const updatedQuestion4Array = [...question4_Result]
                      updatedQuestion4Array[1] = '0'
                      setQuestion4_Result(updatedQuestion4Array)
                    }
                  }}
                  type='number'
                  name='question_4_grade'
                  id='question_4_grade'
                  className=' w-11 text-center focus:outline-none bg-[#e4ffe7] flex-1 rounded-none rounded-l-md  border-0  text-gray-900  sm:text-sm sm:leading-6'
                  placeholder='0'
                  min={0}
                  max={9}
                  value={question4_Result[1] === '' ? '0' : question4_Result[1]}
                  onChange={(e) => handleInputChange(e, 1, 6)}
                />
                <span className='inline-flex items-center rounded-r-md border border-l-0 border-gray-300 px-2 text-gray-500 sm:text-sm'>
                  /06
                </span>
              </div>
              <div className='flex rounded-md '>
                <input
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace') {
                      e.preventDefault() // Prevent the Backspace key from navigating back
                      const updatedQuestion5Array = [...question5_Result]
                      updatedQuestion5Array[1] = '0'
                      setQuestion5_Result(updatedQuestion5Array)
                    }
                  }}
                  type='number'
                  name='question_5_grade'
                  id='question_5_grade'
                  className=' w-11 text-center focus:outline-none bg-[#e4ffe7] flex-1 rounded-none rounded-l-md  border-0  text-gray-900  sm:text-sm sm:leading-6'
                  placeholder='0'
                  min={0}
                  max={9}
                  value={question5_Result[1] === '' ? '0' : question5_Result[1]}
                  onChange={(e) => handleInputChange(e, 1, 6)}
                />
                <span className='inline-flex items-center text-center rounded-r-md border border-l-0 border-gray-300 px-2 text-gray-500 sm:text-sm'>
                  /06
                </span>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-2  items-center'>
            <span className=' text-sm text-red-500 font-medium'>
              Formatting (Salutation and complimentary close (worth 0.5 pt
              each), Paragraph formatting, i.e. strikes the right balance of #
              of paragraphs)
            </span>
            <div className='flex justify-evenly gap-x-2 '>
              <div className='flex rounded-md '>
                <input
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace') {
                      e.preventDefault() // Prevent the Backspace key from navigating back
                      const updatedQuestion4Array = [...question4_Result]
                      updatedQuestion4Array[2] = '0'
                      setQuestion4_Result(updatedQuestion4Array)
                    }
                  }}
                  type='number'
                  name='question_4_grade'
                  id='question_4_grade'
                  className=' w-11 text-center focus:outline-none bg-[#e4ffe7] flex-1 rounded-none rounded-l-md  border-0  text-gray-900  sm:text-sm sm:leading-6'
                  placeholder='0'
                  value={question4_Result[2] === '' ? '0' : question4_Result[2]}
                  onChange={(e) => handleInputChange(e, 2, 4)}
                />
                <span className='inline-flex items-center rounded-r-md border border-l-0 border-gray-300 px-2 text-gray-500 sm:text-sm'>
                  /04
                </span>
              </div>
              <div className='flex rounded-md '>
                <input
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace') {
                      e.preventDefault() // Prevent the Backspace key from navigating back
                      const updatedQuestion5Array = [...question5_Result]
                      updatedQuestion5Array[2] = '0'
                      setQuestion5_Result(updatedQuestion5Array)
                    }
                  }}
                  type='number'
                  name='question_5_grade'
                  id='question_5_grade'
                  className=' w-11 text-center focus:outline-none bg-[#e4ffe7] flex-1 rounded-none rounded-l-md  border-0  text-gray-900  sm:text-sm sm:leading-6'
                  placeholder='0'
                  min={0}
                  max={9}
                  value={question5_Result[2] === '' ? '0' : question5_Result[2]}
                  onChange={(e) => handleInputChange(e, 2, 4)}
                />
                <span className='inline-flex items-center text-center rounded-r-md border border-l-0 border-gray-300 px-2 text-gray-500 sm:text-sm'>
                  /04
                </span>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-2  items-center'>
            <span className=' text-sm text-[#7000FF] font-medium'>
              Appropriate Tone (Empathy/Friendliness, i.e. thank you, apology,
              considerate in response) (-0.5pt)
            </span>
            <div className='flex justify-evenly gap-x-2 '>
              <div className='flex rounded-md '>
                <input
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace') {
                      e.preventDefault() // Prevent the Backspace key from navigating back
                      const updatedQuestion4Array = [...question4_Result]
                      updatedQuestion4Array[3] = '0'
                      setQuestion4_Result(updatedQuestion4Array)
                    }
                  }}
                  type='number'
                  name='question_4_grade'
                  id='question_4_grade'
                  className=' w-11 text-center focus:outline-none bg-[#e4ffe7] flex-1 rounded-none rounded-l-md  border-0  text-gray-900  sm:text-sm sm:leading-6'
                  placeholder='0'
                  value={question4_Result[3] === '' ? '0' : question4_Result[3]}
                  onChange={(e) => handleInputChange(e, 3, 3)}
                />
                <span className='inline-flex items-center rounded-r-md border border-l-0 border-gray-300 px-2 text-gray-500 sm:text-sm'>
                  /03
                </span>
              </div>
              <div className='flex rounded-md '>
                <input
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace') {
                      e.preventDefault() // Prevent the Backspace key from navigating back
                      const updatedQuestion5Array = [...question5_Result]
                      updatedQuestion5Array[3] = '0'
                      setQuestion5_Result(updatedQuestion5Array)
                    }
                  }}
                  type='number'
                  name='question_5_grade'
                  id='question_5_grade'
                  className=' w-11 text-center focus:outline-none bg-[#e4ffe7] flex-1 rounded-none rounded-l-md  border-0  text-gray-900  sm:text-sm sm:leading-6'
                  placeholder='0'
                  min={0}
                  max={9}
                  value={question5_Result[3] === '' ? '0' : question5_Result[3]}
                  onChange={(e) => handleInputChange(e, 3, 3)}
                />
                <span className='inline-flex items-center text-center rounded-r-md border border-l-0 border-gray-300 px-2 text-gray-500 sm:text-sm'>
                  /03
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default CandidateDashboard
