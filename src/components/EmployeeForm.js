import { useState } from "react"
import { useEmployeesContext } from "../hooks/useEmployeesContext"
import { useAuthContext } from '../hooks/useAuthContext'

const EmployeeForm =  () => {
  const { dispatch } = useEmployeesContext()
  const { user } = useAuthContext()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [username, setUsername] = useState('')
  const [deptid, setDeptid] = useState(1)
  const [password, setPassword] = useState('')
  const [admin, setAdmin] = useState(false)
  const [active, setActive] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
 
    if (!user) {
      setError('You must be logged in')
      return
    }
setDeptid(1);
    const employee = {firstname, lastname, username, deptid, password, admin, active}

    const response = await fetch('/api/employees/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify(employee)
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error, json.emptyFields )
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
     // document.getElementById("Admin").checked = false;
     // document.getElementById("Active").checked = true;
      // update loading state     
      setIsLoading(false)
      dispatch({type: 'CREATE_EMPLOYEE', payload: json})
    }
    
  }
   
  return (

    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New User</h3>
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
        id="Active"
       />
       </div>
      <button disabled={isLoading}>Add User</button>
       {error && <div className="error">{error}</div>}
    </form>
  )
  
}

export default EmployeeForm