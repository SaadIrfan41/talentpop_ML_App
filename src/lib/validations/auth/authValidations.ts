import { z } from 'zod'

export const registerFormSchema = z.object({
  email: z.string().email(),
  name: z.string().trim().nonempty('Name is required'),
  user_name: z.string().trim().nonempty('Username is required'),
  user_id: z.coerce.number({ required_error: 'User ID is required' }),
  password: z.string().trim().nonempty('Password is required'),
})
export const failCandidateFormSchema = z.object({
  failing_reason: z.enum([
    'Grammar/sentence agreement',
    'Didn’t answer questions well on CS Quiz (Quality of addressing concerns)',
    'No CS XP/No relevant XP',
    'Less than 1 year of CS XP',
    'Not Looking for Full-Time Positions',
    'Internet Speed Test - Does Not Meet Requirements',
    'Commitments',
    'Re-applied with 90 days',
    'Responses copied and pasted from external sources',
    'No Failed Screening Email',
    'Ineligible For Wise',
    'Skills Assessment Score Not Met',
    'Creative Portfolio Not Suitable',
    'Less than 1 year of CGA XP',
    'Less than 1 year of AGA XP',
    'No Relevant AGA XP',
    'No Relevant CGA XP',
  ]),
})
export const passCandidateFormSchema = z.object({
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
