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
  nextApplication: string
  prevApplication: string
  candidate_Type: string | null
}

interface Actions {
  setQuestion1_Result: (result: string[]) => void
  setQuestion2_Result: (result: string[]) => void
  setQuestion3_Result: (result: string[]) => void
  setQuestion4_Result: (result: string[]) => void
  setQuestion5_Result: (result: string[]) => void
  handleInputChange: (
    event: ChangeEvent<HTMLInputElement>,
    index: number,
    range: number
  ) => void
  setNextApplicant: () => void
  setPrevApplicant: () => void
  resetApplicant: () => void
  setCandidateType: (type: string) => void
}

const INITIAL_STATE: State = {
  isLoading: false,
  error: null,
  question1_Result: ['0', '0', '0'],
  question2_Result: ['0', '0', '0'],
  question3_Result: ['0', '0', '0'],
  question4_Result: ['0', '0', '0', '0'],
  question5_Result: ['0', '0', '0', '0'],
  nextApplication: 'false',
  prevApplication: 'false',
  candidate_Type: null,
}

export const useQuestionResultStore = create<State & Actions>((set, get) => ({
  isLoading: INITIAL_STATE.isLoading,
  error: INITIAL_STATE.error,
  candidate_Type: INITIAL_STATE.candidate_Type,
  nextApplication: INITIAL_STATE.nextApplication,
  prevApplication: INITIAL_STATE.prevApplication,
  question1_Result: INITIAL_STATE.question1_Result,
  question2_Result: INITIAL_STATE.question2_Result,
  question3_Result: INITIAL_STATE.question3_Result,
  question4_Result: INITIAL_STATE.question4_Result,
  question5_Result: INITIAL_STATE.question5_Result,
  handleInputChange: (event, index, range) => {
    const inputValue = parseInt(
      parseInt(event.target.value) === range
        ? range.toString()
        : event.target.value[event.target.value.length - 1]
    )
    console.log(inputValue)
    if (!isNaN(inputValue) && inputValue >= 0 && inputValue <= range) {
      console.log(event.target.value)
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
  setNextApplicant: () => {
    try {
      return set(() => ({
        isLoading: false,
        error: null,
        nextApplication: 'true',
        prevApplication: 'false',
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
