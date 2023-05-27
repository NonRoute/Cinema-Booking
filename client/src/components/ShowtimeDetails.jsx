const ShowtimeDetails = ({ showtime }) => {
	return (
		<>
			<div className="flex justify-between">
				<div className="flex flex-col rounded-tl-lg bg-gradient-to-br from-gray-800 to-gray-700 px-4 py-0.5 text-center font-bold text-white sm:px-8">
					<p className="text-sm">Theater</p>
					<p className="text-3xl">{showtime?.theater?.number}</p>
				</div>
				<div className="flex w-fit grow items-center justify-center rounded-tr-lg bg-gradient-to-br from-indigo-800 to-blue-700 px-4 py-0.5 text-center text-xl font-bold text-white sm:text-3xl">
					<p>{showtime?.theater?.cinema.name}</p>
				</div>
			</div>
			<div className="flex flex-col md:flex-row">
				<div className="flex grow flex-col gap-4 bg-gradient-to-br from-indigo-100 to-white py-4 drop-shadow-lg">
					<div className="flex items-center">
						<img src={showtime?.movie?.img} className="w-32 px-4 drop-shadow-md" />
						<div className="flex flex-col">
							<h4 className="mr-4 text-xl font-semibold sm:text-2xl md:text-3xl">
								{showtime?.movie?.name}
							</h4>
							{showtime?.movie && (
								<p className="mr-4 font-medium sm:text-lg">
									length : {showtime?.movie?.length || '-'} min
								</p>
							)}
						</div>
					</div>
				</div>
				<div className="flex min-w-fit flex-col items-center justify-center gap-y-1 bg-gradient-to-br from-indigo-100 to-white py-4 text-center text-2xl font-semibold drop-shadow-lg">
					<p className="mx-4">
						{showtime?.showtime
							? `${new Date(showtime?.showtime).toLocaleString('default', { weekday: 'long' })}
                ${new Date(showtime?.showtime).getDate()}
                ${new Date(showtime?.showtime).toLocaleString('default', { month: 'long' })}
                ${new Date(showtime?.showtime).getFullYear()}
                `
							: ''}
					</p>
					<p className="mx-4 bg-gradient-to-r from-indigo-800 to-blue-700 bg-clip-text text-5xl font-bold text-transparent">
						{showtime?.showtime
							? `${new Date(showtime?.showtime).getHours().toString().padStart(2, '0')} : ${new Date(
									showtime?.showtime
							  )
									.getMinutes()
									.toString()
									.padStart(2, '0')}`
							: ''}
					</p>
				</div>
			</div>
		</>
	)
}

export default ShowtimeDetails
