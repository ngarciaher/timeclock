import { useAuthContext } from './useAuthContext'
import { useTimecardsContext } from './useTimecardsContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchTimecards } = useTimecardsContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchTimecards({ type: 'SET_TIMECARDS', payload: null })
  }

  return { logout }
}