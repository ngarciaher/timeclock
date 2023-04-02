import { createContext, useReducer } from 'react'

export const EmployeesContext = createContext()

export const employeesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_EMPLOYEES':
      return { 
        employees: action.payload 
      }
    case 'CREATE_EMPLOYEE':
      return { 
        employees: [action.payload, ...state.employees] // add to an array the newone (action.payload) and the previous (...state.workouts)
      }
      case 'UPDATE_EMPLOYEE':
        return { 
          employees:state.employees.filter(w => w.id === action.payload.id)
        }
      case 'GET_EMPLOYEE':
        return { 
            employees: state.employees.filter(w => w.id === action.payload.id) 
          
        }
      case 'DELETE_EMPLOYEE':
        return { 
            employees: state.employees.filter(w => w.id !== action.payload.id) 
        }
    default:
      return state
  }
}

export const EmployeesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(employeesReducer, { 
    employees: null
  })
  
  return (
    <EmployeesContext.Provider value={{ ...state, dispatch }}>
      { children }
    </EmployeesContext.Provider>
  )
}