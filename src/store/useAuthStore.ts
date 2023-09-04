import { create } from 'zustand'
import Cookies from 'universal-cookie'
const cookies = new Cookies()
interface State {
  isLoading: boolean
  error: string | null
  access_token: string | null
  user: User | null
}

type User = {
  name: string
  user_name: string
  email: string
  job_title: string
  role: string
}

interface Actions {
  setUser: (token: string, user: User) => void
  logout: () => void
}

const INITIAL_STATE: State = {
  isLoading: false,
  error: null,
  access_token: cookies.get('talentPOP_ML_App_Token') || null,
  user: cookies.get('talentPOP_ML_App_User') || null,
}

export const useAuthStore = create<State & Actions>((set) => ({
  isLoading: INITIAL_STATE.isLoading,
  error: INITIAL_STATE.error,
  access_token: INITIAL_STATE.access_token,
  user: INITIAL_STATE.user,
  setUser: (token, user) => {
    cookies.set('talentPOP_ML_App_Token', token)
    cookies.set('talentPOP_ML_App_User', user)
    try {
      return set(() => ({
        isLoading: false,
        error: null,
        access_token: token,
        user: user,
      }))
    } catch (error) {
      if (error instanceof Error)
        set({ error: error.message, isLoading: false })
    }
  },
  logout: () => {
    cookies.remove('talentPOP_ML_App_Token')
    cookies.remove('talentPOP_ML_App_User')

    try {
      return set(() => ({
        isLoading: false,
        error: null,
        access_token: null,
      }))
    } catch (error) {
      if (error instanceof Error)
        set({ error: error.message, isLoading: false })
    }
  },
}))
