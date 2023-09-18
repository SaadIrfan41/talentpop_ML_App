import { ChangeEvent } from 'react'
import { create } from 'zustand'

interface State {
  isLoading: boolean
  error: string | null
  question1_Result: string[]
  question2_Result: string[]
  question3_Result: string[]
  question4_Result: string[]
  question5_Result: string[]
  question1_ML_Result: number
  question2_ML_Result: number
  question3_ML_Result: number
  question4_ML_Result: number
  question5_ML_Result: number
  nextApplication: string
  prevApplication: string
  ascApplication: string
  candidate_Type: string | null
  candidate_id_cs: number | null
  candidate_id_aga: number | null
  candidate_id_cga: number | null
}

interface Actions {
  setQuestion1_Result: (result: string[]) => void
  setQuestion2_Result: (result: string[]) => void
  setQuestion3_Result: (result: string[]) => void
  setQuestion4_Result: (result: string[]) => void
  setQuestion5_Result: (result: string[]) => void
  setQuestion1_ML_Result: (result: number) => void
  setQuestion2_ML_Result: (result: number) => void
  setQuestion3_ML_Result: (result: number) => void
  setQuestion4_ML_Result: (result: number) => void
  setQuestion5_ML_Result: (result: number) => void
  handleInputChange: (
    event: ChangeEvent<HTMLInputElement>,
    index: number,
    range: number
  ) => void
  setNextApplicant: () => void
  setPrevApplicant: () => void
  setAscApplicant: () => void
  resetApplicant: () => void
  setCandidateType: (type: string) => void
  setCandidateId_CS: (id: number) => void
  setCandidateId_AGA: (id: number) => void
  setCandidateId_CGA: (id: number) => void
}

const INITIAL_STATE: State = {
  isLoading: false,
  error: null,
  question1_Result: ['0', '0', '0'],
  question2_Result: ['0', '0', '0'],
  question3_Result: ['0', '0', '0'],
  question4_Result: ['0', '0', '0', '0'],
  question5_Result: ['0', '0', '0', '0'],
  question1_ML_Result: 0,
  question2_ML_Result: 0,
  question3_ML_Result: 0,
  question4_ML_Result: 0,
  question5_ML_Result: 0,
  nextApplication: 'false',
  prevApplication: 'false',
  ascApplication: 'true',
  candidate_Type: null,
  candidate_id_cs: null,
  candidate_id_aga: null,
  candidate_id_cga: null,
}

export const useQuestionResultStore = create<State & Actions>((set, get) => ({
  isLoading: INITIAL_STATE.isLoading,
  error: INITIAL_STATE.error,
  candidate_Type: INITIAL_STATE.candidate_Type,
  candidate_id_cs: INITIAL_STATE.candidate_id_cs,
  candidate_id_aga: INITIAL_STATE.candidate_id_aga,
  candidate_id_cga: INITIAL_STATE.candidate_id_cga,
  nextApplication: INITIAL_STATE.nextApplication,
  prevApplication: INITIAL_STATE.prevApplication,
  ascApplication: INITIAL_STATE.ascApplication,
  question1_Result: INITIAL_STATE.question1_Result,
  question2_Result: INITIAL_STATE.question2_Result,
  question3_Result: INITIAL_STATE.question3_Result,
  question4_Result: INITIAL_STATE.question4_Result,
  question5_Result: INITIAL_STATE.question5_Result,
  question1_ML_Result: INITIAL_STATE.question1_ML_Result,
  question2_ML_Result: INITIAL_STATE.question2_ML_Result,
  question3_ML_Result: INITIAL_STATE.question3_ML_Result,
  question4_ML_Result: INITIAL_STATE.question4_ML_Result,
  question5_ML_Result: INITIAL_STATE.question5_ML_Result,
  handleInputChange: (event, index, range) => {
    const inputValue = parseInt(
      parseInt(event.target.value) === range
        ? range.toString()
        : event.target.value[event.target.value.length - 1]
    )
    // console.log(inputValue)
    if (!isNaN(inputValue) && inputValue >= 0 && inputValue <= range) {
      // console.log(event.target.value)
      if (event.target.id === 'question_1_grade') {
        const updatedQuestion1Array = [...get().question1_Result]
        updatedQuestion1Array[index] = inputValue.toString()
        get().setQuestion1_Result(updatedQuestion1Array)
      } else if (event.target.id === 'question_2_grade') {
        const updatedQuestion2Array = [...get().question2_Result]
        updatedQuestion2Array[index] = inputValue.toString()
        get().setQuestion2_Result(updatedQuestion2Array)
      } else if (event.target.id === 'question_3_grade') {
        const updatedQuestion3Array = [...get().question3_Result]
        updatedQuestion3Array[index] = inputValue.toString()
        get().setQuestion3_Result(updatedQuestion3Array)
      } else if (event.target.id === 'question_4_grade') {
        const updatedQuestion4Array = [...get().question4_Result]
        updatedQuestion4Array[index] = inputValue.toString()
        get().setQuestion4_Result(updatedQuestion4Array)
      } else {
        const updatedQuestion5Array = [...get().question5_Result]
        updatedQuestion5Array[index] = inputValue.toString()
        get().setQuestion5_Result(updatedQuestion5Array)
      }
    }
  },
  setQuestion1_ML_Result: (result) => {
    try {
      return set(() => ({
        isLoading: false,
        error: null,
        question1_ML_Result: result,
      }))
    } catch (error) {
      if (error instanceof Error)
        set({ error: error.message, isLoading: false })
    }
  },
  setQuestion2_ML_Result: (result) => {
    try {
      return set(() => ({
        isLoading: false,
        error: null,
        question2_ML_Result: result,
      }))
    } catch (error) {
      if (error instanceof Error)
        set({ error: error.message, isLoading: false })
    }
  },
  setQuestion3_ML_Result: (result) => {
    try {
      return set(() => ({
        isLoading: false,
        error: null,
        question3_ML_Result: result,
      }))
    } catch (error) {
      if (error instanceof Error)
        set({ error: error.message, isLoading: false })
    }
  },
  setQuestion4_ML_Result: (result) => {
    try {
      return set(() => ({
        isLoading: false,
        error: null,
        question4_ML_Result: result,
      }))
    } catch (error) {
      if (error instanceof Error)
        set({ error: error.message, isLoading: false })
    }
  },
  setQuestion5_ML_Result: (result) => {
    try {
      return set(() => ({
        isLoading: false,
        error: null,
        question5_ML_Result: result,
      }))
    } catch (error) {
      if (error instanceof Error)
        set({ error: error.message, isLoading: false })
    }
  },

  setQuestion1_Result: (result) => {
    try {
      return set(() => ({
        isLoading: false,
        error: null,
        question1_Result: result,
      }))
    } catch (error) {
      if (error instanceof Error)
        set({ error: error.message, isLoading: false })
    }
  },
  setQuestion2_Result: (result) => {
    try {
      return set(() => ({
        isLoading: false,
        error: null,
        question2_Result: result,
      }))
    } catch (error) {
      if (error instanceof Error)
        set({ error: error.message, isLoading: false })
    }
  },
  setQuestion3_Result: (result) => {
    try {
      return set(() => ({
        isLoading: false,
        error: null,
        question3_Result: result,
      }))
    } catch (error) {
      if (error instanceof Error)
        set({ error: error.message, isLoading: false })
    }
  },
  setQuestion4_Result: (result) => {
    try {
      return set(() => ({
        isLoading: false,
        error: null,
        question4_Result: result,
      }))
    } catch (error) {
      if (error instanceof Error)
        set({ error: error.message, isLoading: false })
    }
  },
  setQuestion5_Result: (result) => {
    try {
      return set(() => ({
        isLoading: false,
        error: null,
        question5_Result: result,
      }))
    } catch (error) {
      if (error instanceof Error)
        set({ error: error.message, isLoading: false })
    }
  },
  setCandidateType: (type) => {
    try {
      return set(() => ({
        isLoading: false,
        error: null,
        candidate_Type: type,
      }))
    } catch (error) {
      if (error instanceof Error)
        set({ error: error.message, isLoading: false })
    }
  },
  setCandidateId_CS: (id) => {
    try {
      return set(() => ({
        isLoading: false,
        error: null,
        candidate_id_cs: id,
        candidate_id_aga: null,
        candidate_id_cga: null,
      }))
    } catch (error) {
      if (error instanceof Error)
        set({ error: error.message, isLoading: false })
    }
  },
  setCandidateId_AGA: (id) => {
    try {
      return set(() => ({
        isLoading: false,
        error: null,
        candidate_id_aga: id,
        candidate_id_cs: null,
        candidate_id_cga: null,
      }))
    } catch (error) {
      if (error instanceof Error)
        set({ error: error.message, isLoading: false })
    }
  },
  setCandidateId_CGA: (id) => {
    try {
      return set(() => ({
        isLoading: false,
        error: null,
        candidate_id_cga: id,
        candidate_id_cs: null,
        candidate_id_aga: null,
      }))
    } catch (error) {
      if (error instanceof Error)
        set({ error: error.message, isLoading: false })
    }
  },
  setNextApplicant: () => {
    try {
      return set(() => ({
        isLoading: false,
        error: null,
        nextApplication: 'true',
        prevApplication: 'false',
        question1_Result: INITIAL_STATE.question1_Result,
        question2_Result: INITIAL_STATE.question2_Result,
        question3_Result: INITIAL_STATE.question3_Result,
        question4_Result: INITIAL_STATE.question4_Result,
        question5_Result: INITIAL_STATE.question5_Result,
      }))
    } catch (error) {
      if (error instanceof Error)
        set({ error: error.message, isLoading: false })
    }
  },
  setPrevApplicant: () => {
    try {
      return set(() => ({
        isLoading: false,
        error: null,
        nextApplication: 'false',
        prevApplication: 'true',
        question1_Result: INITIAL_STATE.question1_Result,
        question2_Result: INITIAL_STATE.question2_Result,
        question3_Result: INITIAL_STATE.question3_Result,
        question4_Result: INITIAL_STATE.question4_Result,
        question5_Result: INITIAL_STATE.question5_Result,
      }))
    } catch (error) {
      if (error instanceof Error)
        set({ error: error.message, isLoading: false })
    }
  },
  setAscApplicant: () => {
    try {
      return set(() => ({
        isLoading: false,
        error: null,
        nextApplication: 'false',
        prevApplication: 'false',
        ascApplication: get().ascApplication === 'true' ? 'false' : 'true',
        candidate_id_aga: INITIAL_STATE.candidate_id_aga,
        candidate_id_cga: INITIAL_STATE.candidate_id_cga,
        candidate_id_cs: INITIAL_STATE.candidate_id_cs,
        question1_Result: INITIAL_STATE.question1_Result,
        question2_Result: INITIAL_STATE.question2_Result,
        question3_Result: INITIAL_STATE.question3_Result,
        question4_Result: INITIAL_STATE.question4_Result,
        question5_Result: INITIAL_STATE.question5_Result,
      }))
    } catch (error) {
      if (error instanceof Error)
        set({ error: error.message, isLoading: false })
    }
  },
  resetApplicant: () => {
    try {
      return set(() => ({
        isLoading: false,
        error: null,
        nextApplication: 'false',
        prevApplication: 'false',
      }))
    } catch (error) {
      if (error instanceof Error)
        set({ error: error.message, isLoading: false })
    }
  },
}))
