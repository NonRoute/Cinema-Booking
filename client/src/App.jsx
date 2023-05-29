import { Route, Routes } from 'react-router'
import Login from './Login'
import Register from './Register'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import AdminRoute from './AdminRoute'
import Showtime from './Showtime'
import Purchase from './Purchase'
import Cinema from './Cinema'
import Movie from './Movie'
import Tickets from './Tickets'
import Home from './Home'
import Utils from './Utils'

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
			</Routes>
		</>
	)
}

export default App
