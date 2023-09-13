import { Button } from '@/components/ui/button'
// import { v4 as uuidv4 } from 'uuid'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
// import { Input } from '@/components/ui/input'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  //   DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { failCandidateFormSchema } from '@/lib/validations/auth/authValidations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
// import { useAuthStore } from '@/store/useAuthStore'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { failingReasons } from '@/components/StaticData/FailingReason'
import { useQuestionResultStore } from '@/store/useQuestionResultStore'

const getQuestionResult = (score: string[]) => {
  const sum = score.reduce((acc, val) => acc + parseFloat(val), 0)

  const result = (sum / 20) * 100
  // console.log(result)
  if (isNaN(result)) {
    return 0
  }
  return parseInt(result?.toFixed(1).replace(/[.,]0$/, ''))
}

export function FailCandidateButton() {
  const [open, setopen] = useState(false)
  //   const { access_token } = useAuthStore()
  const {
    question1_ML_Result,
    question1_Result,
    question2_ML_Result,
    question2_Result,
    question3_ML_Result,
    question3_Result,
    question4_ML_Result,
    question4_Result,
    question5_ML_Result,
    question5_Result,
    candidate_Type,
  } = useQuestionResultStore()
  // const [showPassword, setshowPassword] = useState(false)

  const form = useForm<z.infer<typeof failCandidateFormSchema>>({
    resolver: zodResolver(failCandidateFormSchema),
  })

  async function onSubmit(values: z.infer<typeof failCandidateFormSchema>) {
    console.log(values)
    let question_1_Score = question1_ML_Result
    let question_2_Score = question2_ML_Result
    let question_3_Score = question3_ML_Result
    let question_4_Score = question4_ML_Result
    let question_5_Score = question5_ML_Result
    toast.success('Candidate Failed')
    if (candidate_Type === 'CS') {
      // const containsZeroInCSQuestions = [
      //   question1_Result,
      //   question2_Result,
      //   question3_Result,
      //   question4_Result,
      //   question5_Result,
      // ].some((arr) => arr.includes('0'))
      if (!question1_Result.includes('0')) {
        question_1_Score = getQuestionResult(question1_Result)
      }
      if (!question2_Result.includes('0')) {
        question_2_Score = getQuestionResult(question2_Result)
      }
      if (!question3_Result.includes('0')) {
        question_3_Score = getQuestionResult(question3_Result)
      }
      if (!question4_Result.includes('0')) {
        question_4_Score = getQuestionResult(question4_Result)
      }
      if (!question5_Result.includes('0')) {
        question_5_Score = getQuestionResult(question5_Result)
      }
      console.log('Final CS GRADED SCORE', {
        question1_score: question_1_Score,
        question2_score: question_2_Score,
        question3_score: question_3_Score,
        question4_score: question_4_Score,
        question5_score: question_5_Score,
        decision: 'Failed',
        remarks: values.failing_reason,
      })
      //   if (containsZeroInCSQuestions) {
      //     console.log('ML GRADED SCORE', {
      //       question1_score: question1_ML_Result,
      //       question2_score: question2_ML_Result,
      //       question3_score: question3_ML_Result,
      //       question4_score: question4_ML_Result,
      //       question5_score: question5_ML_Result,
      //       decision: 'Failed',
      //       remarks: values.failing_reason,
      //     })
      //   } else {
      //     console.log('USER GRADED SCORE', {
      //       question1_score: getQuestionResult(question1_Result),
      //       question2_score: getQuestionResult(question2_Result),
      //       question3_score: getQuestionResult(question3_Result),
      //       question4_score: getQuestionResult(question4_Result),
      //       question5_score: getQuestionResult(question5_Result),
      //       decision: 'Failed',
      //       remarks: values.failing_reason,
      //     })
      //   }
    } else {
      if (!question1_Result.includes('0')) {
        question_1_Score = getQuestionResult(question1_Result)
      }
      if (!question2_Result.includes('0')) {
        question_2_Score = getQuestionResult(question2_Result)
      }
      if (!question3_Result.includes('0')) {
        question_3_Score = getQuestionResult(question3_Result)
      }
      //  if (!question4_Result.includes('0')) {
      //    question_4_Score = getQuestionResult(question4_Result)
      //  }
      //  if (!question5_Result.includes('0')) {
      //    question_5_Score = getQuestionResult(question5_Result)
      //  }
      console.log('Final NON CS GRADED SCORE', {
        question1_score: question_1_Score,
        question2_score: question_2_Score,
        question3_score: question_3_Score,
        question4_score: question_4_Score,
        question5_score: question_5_Score,
        decision: 'Failed',
        remarks: values.failing_reason,
      })
      // const containsZeroInQuestions = [
      //   question1_Result,
      //   question2_Result,
      //   question3_Result,
      //   //  question4_Result,
      //   //  question5_Result,
      // ].some((arr) => arr.includes('0'))
      // if (containsZeroInQuestions) {
      //   console.log('ML GRADED SCORE FOR NON CS Candidate', {
      //     question1_score: question1_ML_Result,
      //     question2_score: question2_ML_Result,
      //     question3_score: question3_ML_Result,
      //     question4_score: question4_ML_Result,
      //     question5_score: question5_ML_Result,
      //     decision: 'Failed',
      //     remarks: values.failing_reason,
      //   })
      // } else {
      //   console.log('USER GRADED SCORE FOR NON CS Candidate', {
      //     question1_score: getQuestionResult(question1_Result),
      //     question2_score: getQuestionResult(question2_Result),
      //     question3_score: getQuestionResult(question3_Result),
      //     question4_score: 0,
      //     question5_score: 0,
      //     //  question4_score: getQuestionResult(question4_Result),
      //     //  question5_score: getQuestionResult(question5_Result),
      //     decision: 'Failed',
      //     remarks: values.failing_reason,
      //   })
      // }
    }

    setopen(false)

    form.reset()
    // try {
    //   const res = await fetch(
    //     `${import.meta.env.VITE_BACKEND_BASE_URL}/users`,
    //     {
    //       method: 'POST',
    //       headers: {
    //         accept: 'application/json',
    //         authorization: `Bearer ${access_token}`,
    //         'content-type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         email: values.email,
    //         name: values.name,
    //         password: values.password,
    //         user_name: values.user_name,
    //         user_id: values.user_id,
    //       }),
    //     }
    //   )
    //   const data = await res.json()
    //   console.log(data)

    //   if (data.detail) {
    //     toast.error(data.detail)
    //     return
    //   }
    //   toast.success('New Account Created')
    //   setopen(false)

    //   form.reset()
    // } catch (error) {
    //   toast.error('Server Is not responding')
    //   console.log(error)
    // }
  }

  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger asChild>
        <button
          className={
            'bg-gradient-to-r  focus:outline-none from-[#8800f3] from-0% to-red-500 to-100% text-white text-sm  flex items-center gap-x-2 rounded-sm py-1 px-3 '
          }
        >
          Failed
        </button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] '>
        <DialogHeader>
          <DialogTitle>Failing Candidate</DialogTitle>
          <DialogDescription>
            Select a Reason for Failing this Candidate
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5 '>
            <FormField
              control={form.control}
              name='failing_reason'
              render={({ field }) => (
                <FormItem className='  '>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className='text-md py-6 font-normal text-black/60 focus:ring-1 focus:ring-[#69C920]  focus:ring-offset-1 focus:ring-offset-[#69C920]'>
                      <SelectTrigger>
                        <SelectValue placeholder='Failing Reason' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className=' md:-top-24 xl:-top-24 '>
                      {failingReasons.map((reason) => (
                        <SelectItem className='' key={reason} value={reason}>
                          {reason}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={form.formState.isSubmitting || !form.formState.isValid}
              asChild
              className=' bg-[#69C920] px-6 text-lg flex items-center  transition-all disabled:bg-gray-500 disabled:cursor-not-allowed gap-1 w-full'
              type='submit'
            >
              {form.formState.isSubmitting ? (
                <button className=' gap-x-1'>
                  Submiting...
                  <Loader2 className='mr-2 h-4 w-4 animate-spin mt-1' />
                </button>
              ) : (
                <button>Submit</button>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
