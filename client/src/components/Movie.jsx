const Movie = () => {
    return (
        <div className="flex items-start">
            <img
                src="https://cdn.shopify.com/s/files/1/1057/4964/products/Avengers-Endgame-Vintage-Movie-Poster-Original-1-Sheet-27x41.jpg?v=1670821335"
                className="w-32 px-4 drop-shadow-md"
            />
            <div className="flex flex-col py-4 gap-2">
                <div className="">
                    <h4 className="text-2xl font-semibold">Movie name</h4>
                    <p className="text-md font-medium">length : 320 min</p>
                </div>
                <div className="flex items-center gap-2 pt-1">
                    <div className="bg-gradient-to-br from-gray-600 to-gray-500 rounded-md drop-shadow-sm text-white px-2 py-1 text-lg">
                        10:00
                    </div>
                    <div className="bg-gradient-to-br from-gray-600 to-gray-500 rounded-md drop-shadow-sm text-white px-2 py-1 text-lg">
                        15:00
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Movie