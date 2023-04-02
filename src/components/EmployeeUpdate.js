
import { useState } from "react"
import { useNavigate } from "react-router-dom";

import { useEmployeesContext } from "../hooks/useEmployeesContext"
import { useAuthContext } from '../hooks/useAuthContext'

const EmployeeUpdate =  ({employee}) => {
  const { dispatch } = useEmployeesContext()
  const { user } = useAuthContext()
  const navigate = useNavigate();
   const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
   const [firstname, setFirstname] = useState(employee.firstname)
  const [lastname, setLastname] = useState(employee.lastname)
  const [username, setUsername] = useState(employee.username)
 const [deptid, setDeptid] = useState(1)
  const [password, setPassword] = useState('')
  const [admin, setAdmin] = useState(employee.admin )
  const [active, setActive] = useState(employee.active ) 



   if (!user) {
    setError('You must be logged in')
    return
  } 
  
    const handleSubmit = async (e) => {
    e.preventDefault()
 
    if (!user) {
      setError('You must be logged in')
      return
    }

    setDeptid(1);
     const employeec = {firstname, lastname, username, deptid, password, admin, active}
  
    const response = await fetch('/api/employees/' + employee.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify(employeec)
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    if(json.emptyFields) { setEmptyFields(json.emptyFields)}
     
    }
    if (response.ok) {
      setFirstname('');
      setLastname('')
      setUsername('')
      setPassword('')
      setAdmin(false)
      setActive(true)
      setError(null)
      setEmptyFields([])
        
      setIsLoading(false)
      dispatch({type: 'UPDATE_EMPLOYEE', payload: json})
      navigate('/users')
    } 
    
  } 
   
  return (
   
   
    <form className="update" onSubmit={handleSubmit}>
      <h3>Update User</h3>
      <label>First Name:</label>
      <input 
        type="Text" 
        onChange={(e) => setFirstname(e.target.value)} 
        value={firstname} 
        className={emptyFields.includes('firstname') ? 'error' : ''}
      />
       <label>Last Name:</label>
      <input 
        type="Text" 
        onChange={(e) => setLastname(e.target.value)} 
        value={lastname} 
        className={emptyFields.includes('lastname') ? 'error' : ''}
      />
      <label>Username:</label>
      <input 
        type="Text" 
        onChange={(e) => setUsername(e.target.value)} 
        value={username} 
        className={emptyFields.includes('username') ? 'error' : ''}
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
        placeholder="Leave Blank if no change"
        className={emptyFields.includes('password') ? 'error' : ''}
      />
      <div className="checkbox">
      <label>Admin:</label>
      <input 
        type="checkbox" 
        onChange={(e) => setAdmin(e.target.checked)} 
        checked={admin} 
       
       />
       <label>Active:</label>
      <input 
        type="checkbox" 
        onChange={(e) => setActive(e.target.checked)} 
        checked={active}
        
       />
       </div>
      <button disabled={isLoading}>Update User</button>
       {error && <div className="error">{error}</div>}
    </form>
 
  )
  
}

export default EmployeeUpdate