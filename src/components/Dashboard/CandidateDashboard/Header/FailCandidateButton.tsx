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

export function FailCandidateButton() {
  const [open, setopen] = useState(false)
  //   const { access_token } = useAuthStore()
  // const [showPassword, setshowPassword] = useState(false)

  const form = useForm<z.infer<typeof failCandidateFormSchema>>({
    resolver: zodResolver(failCandidateFormSchema),
  })

  async function onSubmit(values: z.infer<typeof failCandidateFormSchema>) {
    console.log(values)
    toast.success('Candidate Failed')
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
              disabled={
                form.formState.isSubmitting ||
                !form.formState.isDirty ||
                !form.formState.isValid
              }
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
