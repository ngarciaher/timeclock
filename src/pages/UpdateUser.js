import { useEffect } from "react"
import { useEmployeesContext } from "../hooks/useEmployeesContext"
import { useAuthContext } from '../hooks/useAuthContext'
import { useParams } from "react-router-dom";

// components
//import EmployeeDetails from '../components/EmployeeDetails'
import EmployeeUpdate from '../components/EmployeeUpdate'

const UpdateUsers =  () => {
  const { employees, dispatch } = useEmployeesContext()
  const { user } = useAuthContext()
  const { id } = useParams();

   useEffect(() => {
        const fetchEmployee = async () => {
            const response = await fetch('/api/employees/' + id, {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${user.token}`
                }
              })
              const json = await response.json()
           
          if (response.ok) {
          dispatch({type: 'GET_EMPLOYEE', payload: json})
      
          }
        }
   
        if (user) {
            fetchEmployee()
        }
      }, [dispatch, user, id]) 
   
  return (
    <div className="updateusers">
       <div className="employee">
        {employees.length ===1 && employees.map((employee) => (
          <EmployeeUpdate key={employee.id} employee={employee} />
        ))}
      </div>
            
    </div>
  )

  
}

export default UpdateUsers