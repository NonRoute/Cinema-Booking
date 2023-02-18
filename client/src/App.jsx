import { Route, Routes } from 'react-router'
import Login from './Login'
import Register from './Register'
import Home from './home'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'

axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.withCredentials = true

function App() {
	return (
		<>
			<ToastContainer />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</>
	)
}

export default App
