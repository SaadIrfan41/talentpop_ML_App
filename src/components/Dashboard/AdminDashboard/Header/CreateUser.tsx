import { Button } from '@/components/ui/button'
// import { v4 as uuidv4 } from 'uuid'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  //   DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { registerFormSchema } from '@/lib/validations/auth/authValidations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useAuthStore } from '@/store/useAuthStore'

export function RegisterUserDialogButton() {
  const [open, setopen] = useState(false)
  const { access_token } = useAuthStore()
  // const [showPassword, setshowPassword] = useState(false)

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: '',
      password: '',
      user_name: '',
      name: '',
    },
  })

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    console.log(values)
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/users`,
        {
          method: 'POST',
          headers: {
            accept: 'application/json',
            authorization: `Bearer ${access_token}`,
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            email: values.email,
            name: values.name,
            password: values.password,
            user_name: values.user_name,
            user_id: values.user_id,
          }),
        }
      )
      const data = await res.json()
      console.log(data)

      if (data.detail) {
        toast.error(data.detail)
        return
      }
      toast.success('New Account Created')
      setopen(false)

      form.reset()
    } catch (error) {
      toast.error('Server Is not responding')
      console.log(error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger asChild>
        <button
          //   variant='outline'
          className={
            'bg-gradient-to-r  focus:outline-none from-[#8800f3] from-0% to-red-500 to-100% text-white text-sm  flex items-center gap-x-2 rounded-sm p-1 px-2 '
          }
        >
          Create User
        </button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Create a new User</DialogTitle>
          <DialogDescription>
            Enter Credentials for a New User
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5 '>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className=' max-w-md '>
                  <FormControl>
                    <Input
                      className='  placeholder:text-lg placeholder:font-normal focus-visible:ring-[#69C920] focus-visible:ring-offset-1 focus-visible:ring-offset-[#69C920] '
                      placeholder='Email'
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className=' max-w-md '>
                  <FormControl>
                    <Input
                      className='  placeholder:text-lg placeholder:font-normal focus-visible:ring-[#69C920] focus-visible:ring-offset-1 focus-visible:ring-offset-[#69C920] '
                      placeholder='Name'
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='user_name'
              render={({ field }) => (
                <FormItem className=' max-w-md '>
                  <FormControl>
                    <Input
                      className='  placeholder:text-lg placeholder:font-normal focus-visible:ring-[#69C920] focus-visible:ring-offset-1 focus-visible:ring-offset-[#69C920] '
                      placeholder='UserName'
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex flex-col gap-y-2'>
              <div className='flex gap-x-2 items-center'>
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem className=' max-w-md flex-1'>
                      <FormControl>
                        <Input
                          // disabled={true}
                          className='  placeholder:text-lg placeholder:font-normal focus-visible:ring-[#69C920] focus-visible:ring-offset-1 focus-visible:ring-offset-[#69C920] '
                          placeholder='Password'
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name='user_id'
              render={({ field }) => (
                <FormItem className=' max-w-md '>
                  <FormControl>
                    <Input
                      type='number'
                      className='placeholder:text-lg placeholder:font-normal focus-visible:ring-[#69C920] focus-visible:ring-offset-1 focus-visible:ring-offset-[#69C920] '
                      placeholder='User ID'
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={form.formState.isSubmitting}
              asChild
              className=' bg-[#69C920] px-6 text-lg flex items-center gap-1 w-full'
              type='submit'
            >
              {form.formState.isSubmitting ? (
                <button className=' gap-x-1'>
                  Creating User
                  <Loader2 className='mr-2 h-4 w-4 animate-spin mt-1' />
                </button>
              ) : (
                <button>Create User</button>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
