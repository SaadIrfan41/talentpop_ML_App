import { create } from 'zustand'
interface State {
  isLoading: boolean
  error: string | null
}

interface Actions {
  //   setUser: (token: string, user: User) => void
  refetchRecruitersTable: (refetch: any) => void
}

const INITIAL_STATE: State = {
  isLoading: false,
  error: null,
}

export const useAuthStore = create<State & Actions>((set) => ({
  isLoading: INITIAL_STATE.isLoading,
  error: INITIAL_STATE.error,

  //   setUser: (token, user) => {
  //     cookies.set('talentPOP_ML_App_Token', token)
  //     cookies.set('talentPOP_ML_App_User', user)
  //     try {
  //       return set(() => ({
  //         isLoading: false,
  //         error: null,
  //         access_token: token,
  //         user: user,
  //       }))
  //     } catch (error) {
  //       if (error instanceof Error)
  //         set({ error: error.message, isLoading: false })
  //     }
  //   },
  refetchRecruitersTable: (refetch) => {
    try {
      refetch()
      return set(() => ({
        isLoading: false,
        error: null,
      }))
    } catch (error) {
      if (error instanceof Error)
        set({ error: error.message, isLoading: false })
    }
  },
}))
