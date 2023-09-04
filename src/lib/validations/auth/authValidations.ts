import { z } from 'zod'

export const registerFormSchema = z.object({
  email: z.string().email(),
  name: z.string().trim().nonempty('Name is required'),
  user_name: z.string().trim().nonempty('Username is required'),
  user_id: z.coerce.number({ required_error: 'User ID is required' }),
  password: z.string().trim().nonempty('Password is required'),
})

export const loginFormSchema = z.object({
  username: z.string().trim().nonempty('UserName is required'),
  password: z.string().trim().nonempty('Password is required'),
})
