
import  React, { useState , useEffect } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useTimecardsContext } from '../hooks/useTimecardsContext'
const EmployeeClock = () => {
    const { user } = useAuthContext()
    const [date,setDate] = useState(new Date());
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const { dispatch } = useTimecardsContext()
  
    const handleClockin = async () => {
        if (!user) {
          return
        }
       
        const response = await fetch('/api/timecards/timein/',{
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
        const json = await response.json()
    
        if (!response.ok)
        {
        setError(json.error)
     
         }
         
        if (response.ok) {
          dispatch({type: 'CREATE_TIMECARD', payload: json})
          setSuccess('Operation Successfully')
         
        }
      }

      const handleClockout = async () => {
        if (!user) {
          return
        }
       
      
        const response = await fetch('/api/timecards/timeout/', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
        const json = await response.json()
    
        if (!response.ok) {
          setError(json.error)
         
        }

        if (response.ok) {
          dispatch({type: 'UPDATE_TIMECARD', payload: json})
          setSuccess('Operation Successfully')
         
        }
      }


      if(error){
        setTimeout(()=>setError(null), 3000 )
        }

 
      if(success){
       setTimeout(()=>setSuccess(null), 3000 )
       }
   
    useEffect(() => {
        const timer = setInterval(()=>setDate(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }

    });

    if (!user) {
        setError('You must be logged in')
        return
      }

    return(
   <div  className="datetime">
            <span>  {date.toLocaleDateString()}</span>
            <span> <h1>{date.toLocaleTimeString()}</h1></span>
       <div className="employee-clock">
       <input
       type="text"
       readOnly
       value= {user.employeename}
       />
<button className='btn-clockin' onClick={handleClockin}>CLOCK IN</button>
<button className='btn-clockout' onClick={handleClockout}>CLOCK OUT</button>
       </div>
       {error && <div className="error">{error}</div>}
       {success && <div className="success">{success}</div>}
   </div>
    )
}

export default EmployeeClock