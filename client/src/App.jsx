import axios from 'axios'
import { Route, Routes } from 'react-router'
import { ToastContainer } from 'react-toastify'
import AdminRoute from './AdminRoute'
import Cinema from './Cinema'
import Home from './Home'
import Login from './Login'
import Movie from './Movie'
import Purchase from './Purchase'
import Register from './Register'
import Schedule from './Schedule'
import Showtime from './Showtime'
import Tickets from './Tickets'
import Utils from './Utils'

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL || 'http://localhost:8080'
axios.defaults.withCredentials = true

function App() {
	return (
		<>
			<ToastContainer />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/cinema" element={<Cinema />} />
				<Route
					path="/movie"
					element={
						<AdminRoute>
							<Movie />
						</AdminRoute>
					}
				/>
				<Route
					path="/utils"
					element={
						<AdminRoute>
							<Utils />
						</AdminRoute>
					}
				/>
				<Route path="/showtime/:id" element={<Showtime />} />
				<Route path="/purchase/:id" element={<Purchase />} />
				<Route path="/tickets" element={<Tickets />} />
				<Route path="/schedule" element={<Schedule />} />
			</Routes>
		</>
	)
}

export default App
