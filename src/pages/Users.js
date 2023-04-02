import { useEffect } from "react"
import { useEmployeesContext } from "../hooks/useEmployeesContext"
import { useAuthContext } from '../hooks/useAuthContext'

// components
import EmployeeDetails from '../components/EmployeeDetails'
import EmployeeForm from '../components/EmployeeForm'

const Users =  () => {
  const { employees, dispatch } = useEmployeesContext()
  const { user } = useAuthContext()
 
  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch('/api/employees', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_EMPLOYEES', payload: json})
      }
    }

    if (user) {
      fetchEmployees()
    }
  }, [dispatch, user])


  return (
    <div className="users">
       <div className="timecard">
       <h3 className="user-list">Users List</h3>
        {employees && employees.map((employee) => (
          <EmployeeDetails key={employee.id} employee={employee} />
        ))}
      </div> 
            <EmployeeForm />
    </div>
  )

  
}

export default Users