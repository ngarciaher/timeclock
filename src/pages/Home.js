import { useEffect }from 'react'
import { useTimecardsContext } from "../hooks/useTimecardsContext"
import { useAuthContext } from "../hooks/useAuthContext"


// components
import TimecardDetails from '../components/TimecardDetails'

import EmployeeClock from '../components/EmployeeClock'

const Home = () => {
  const {timecards, dispatch} = useTimecardsContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchTimecards = async () => {
      const response = await fetch('/api/timecards', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_TIMECARDS', payload: json})
      }
    }

    if (user) {
      fetchTimecards()
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <EmployeeClock />
        <div className="timecards">
        {timecards && timecards.map((timecard) => (
          <TimecardDetails key={timecard.id} timecard={timecard} sort={timecard.id}  />
        ))}
      </div> 
      
    </div>
  )
}

export default Home