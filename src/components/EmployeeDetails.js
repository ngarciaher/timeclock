import { useEmployeesContext } from '../hooks/useEmployeesContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useState } from "react"
import { Link} from 'react-router-dom'

const EmployeeDetails = ({ employee }) => {
  const { dispatch } = useEmployeesContext()
  const { user } = useAuthContext()
  const [error, setError] = useState(null)

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('/api/employees/' + employee.id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      setError(null)
      dispatch({type: 'DELETE_EMPLOYEE', payload: json})
    }
     
     if (!response.ok) {
      setError(json.error)
    } 

  }

  if(error){
    setTimeout(()=>setError(null), 3000 )
    } 


    
  return (
    
    <div className="employee-details">
    <h4>{employee.firstname} {employee.lastname}</h4>

      <p><strong>Username: </strong>{employee.username}</p>
      <p><strong>Admin: </strong>{employee.admin === 1 ? 'Yes' : 'No'}</p>
      <p><strong>Active: </strong>{employee.active === 1 ? 'Yes' : 'No' }</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span> 
      <Link to={`/updateuser/${employee.id}`}><span id="edit" className="material-symbols-outlined" >edit</span> </Link>
      {error && <div className="error">{error}</div>} 
    </div>
    
  )
}

export default EmployeeDetails