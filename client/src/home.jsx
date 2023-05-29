import Navbar from './components/Navbar'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
import { AuthContext } from './context/AuthContext'
import { useContext, useEffect, useState } from 'react'
import CinemaLists from './components/CinemaLists'
import TheaterLists from './components/TheaterListsByCinema'
import MovieLists from './components/MovieLists'
import TheaterListsByMovie from './components/TheaterListsByMovie'

const Home = () => {
	const { auth } = useContext(AuthContext)
	const [selectedMovieIndex, setSelectedMovieIndex] = useState(parseInt(localStorage.getItem('selectedMovieIndex')))
	const [movies, setMovies] = useState([])

	const fetchMovies = async (data) => {
		try {
			const response = await axios.get('/movie/showing')
			console.log(response.data.data)
			setMovies(response.data.data)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		fetchMovies()
	}, [])

	const props = {
		movies,
		selectedMovieIndex,
		setSelectedMovieIndex,
		auth
	}
	return (
		<div className="flex min-h-screen flex-col gap-4 bg-gradient-to-br from-indigo-900 to-blue-500 pb-8 sm:gap-8">
			<Navbar />
			<MovieLists {...props} />
			{movies[selectedMovieIndex]?.name && <TheaterListsByMovie {...props} />}
		</div>
	)
}

export default Home
