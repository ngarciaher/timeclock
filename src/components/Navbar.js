import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>TimeClock - Dr. Mirel Sanchez Clinic</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.employeename}</span>
              <button onClick={handleClick}>Log out</button>
             
            </div>
          )}
           {user && user.admin && (
            <div>
              <Link to="/">Home</Link>
              <Link to="/users">Users</Link>
             
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar