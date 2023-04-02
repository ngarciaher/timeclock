import { createContext, useReducer } from 'react'

export const TimecardsContext = createContext()

export const timecardsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TIMECARDS':
      return { 
        timecards: action.payload 
      }
    case 'CREATE_TIMECARD':
      return { 
        timecards: [...state.timecards, action.payload] // add to an array the newone (action.payload) and the previous (...state.workouts)
      }
      case 'UPDATE_TIMECARD':
      return { 
        timecards: [...state.timecards.filter(w => w.id !== action.payload.id), action.payload] // add to an array the newone (action.payload) and the previous (...state.workouts)
      }
      case 'DELETE_TIMECARD':
        return { 
        timecards: state.timecards.filter(w => w.id !== action.payload.id) 
        }
    default:
      return state
  }
}

export const TimecardsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(timecardsReducer, { 
    timecards: null
  })
  
  return (
    <TimecardsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </TimecardsContext.Provider>
  )
}