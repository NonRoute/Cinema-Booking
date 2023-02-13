import { Route, Routes } from 'react-router'
import Login from './Login'
import Navbar from './components/Navbar'
import Home from './home'

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</>
	)
}

export default App
