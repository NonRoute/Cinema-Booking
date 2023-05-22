import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'

const AdminRoute = ({ children }) => {
	const { auth, setAuth } = useContext(AuthContext)
	if (auth.role !== 'admin') {
		return <Navigate to="/login" />
	}
	return children
}

export default AdminRoute
