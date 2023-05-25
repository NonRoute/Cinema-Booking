const Showtimes = ({ showtimes, movies, selectedDate }) => {
	const sortedShowtimes = showtimes?.reduce((result, showtime) => {
		const { movie, showtime: showDateTime, seats, _id } = showtime

		if (new Date(showDateTime).getDay() === selectedDate.getDay()) {
			if (!result[movie]) {
				result[movie] = []
			}

			result[movie].push({ showtime: showDateTime, seats, _id })
		}
		return result
	}, {})

	// Sort the showtimes array for each movie by showtime
	sortedShowtimes &&
		Object.values(sortedShowtimes).forEach((movie) => {
			movie.sort((a, b) => new Date(a.showtime) - new Date(b.showtime))
		})

	return (
		<>
			{movies?.map((movie, index) => {
				return (
					sortedShowtimes &&
					sortedShowtimes[movie._id] && (
						<div key={index} className="flex items-center">
							<img src={movie.img} className="w-32 px-4 drop-shadow-md" />
							<div className="flex flex-col py-4 gap-2">
								<div>
									<h4 className="text-2xl font-semibold">{movie.name}</h4>
									<p className="text-md font-medium">length : {movie.length || '-'} min</p>
								</div>
								<div className="flex flex-wrap items-center gap-2 pt-1">
									{sortedShowtimes[movie._id]?.map((showtime, index) => {
										return (
											<button className="bg-gradient-to-br from-gray-600 to-gray-500 hover:from-gray-500 hover:to-gray-400 rounded-md drop-shadow-sm text-white px-2 py-1 text-lg">
												{`${new Date(showtime.showtime)
													.getHours()
													.toString()
													.padStart(2, '0')} : ${new Date(showtime.showtime)
													.getMinutes()
													.toString()
													.padStart(2, '0')}`}
											</button>
										)
									})}
								</div>
							</div>
						</div>
					)
				)
			})}
		</>
	)
}

export default Showtimes
